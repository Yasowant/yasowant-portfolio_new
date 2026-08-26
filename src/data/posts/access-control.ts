/**
 * Article body in Markdown. Rendered by src/lib/markdown.ts both in the
 * browser and during the build-time prerender, so the full text ships in the
 * HTML that search engines and AI answer engines read.
 */
export const content = `
Most developers learn authentication first: a login form, a password hash, a session token. That part is well-trodden. The harder question comes immediately after — this user is who they claim to be, but *what are they allowed to do?*

Getting that wrong is how a support agent ends up reading another company's invoices, or a trial user quietly hits an endpoint that should have been admin-only. This article walks through the five access control models you will actually meet in backend work — RBAC, FGAC, ABAC, PBAC and ReBAC — what each is good at, where each breaks, and how they combine in a real system.

## Authentication and authorization are not the same thing

It is worth being precise, because the two get conflated constantly.

**Authentication** answers *who are you?* It happens once per session and produces an identity: a user id, an email, maybe a tenant id. Passwords, OAuth, magic links and passkeys are all authentication mechanisms.

**Authorization** answers *what may you do?* It happens on every single request, and it depends on far more than identity — the resource being touched, the action being attempted, the state of that resource, and sometimes the time of day or the IP the request came from.

A common architectural mistake is to treat authorization as a property of the user alone. It almost never is. It is a property of the *(user, action, resource)* triple.

## RBAC — Role-Based Access Control

RBAC is where nearly every system starts, and for good reason: it is simple, it is legible to non-engineers, and it maps neatly onto how organisations describe themselves. You define roles — admin, editor, viewer — attach permissions to those roles, and assign roles to users.

\`\`\`javascript
const PERMISSIONS = {
  admin:  ["post:create", "post:update", "post:delete", "user:manage"],
  editor: ["post:create", "post:update"],
  viewer: ["post:read"],
};

function requirePermission(permission) {
  return (req, res, next) => {
    const granted = PERMISSIONS[req.user.role] || [];
    if (!granted.includes(permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

router.delete("/posts/:id", requirePermission("post:delete"), deletePost);
\`\`\`

Two details matter even in something this small. First, permissions are strings describing *actions*, not booleans like isAdmin — the moment you write **if (user.isAdmin)** scattered through your handlers, every future permission change becomes a search-and-replace across the codebase. Second, the check returns 403, not 404 or 401. A 401 means "you are not authenticated"; a 403 means "you are, and you still may not do this".

**Where RBAC breaks.** It has no concept of *which* resource. "Editor may update posts" cannot express "editor may update posts *they wrote*". The usual response is to invent more roles — editor, senior_editor, regional_editor_emea — and you end up with role explosion, where the number of roles grows faster than the number of real distinctions in the business.

## FGAC — Fine-Grained Access Control

Fine-grained access control is the fix for the missing half of RBAC: it brings the specific resource into the decision. In practice this usually means an ownership or membership check on the row itself.

\`\`\`javascript
async function canEditPost(user, postId) {
  const post = await Post.findById(postId).lean();
  if (!post) return { allowed: false, reason: "not_found" };
  if (post.authorId === user.id) return { allowed: true };
  if (user.role === "admin") return { allowed: true };
  return { allowed: false, reason: "not_owner" };
}
\`\`\`

The important discipline here is to push the constraint into the query rather than filtering after the fact. This is wrong:

\`\`\`javascript
const posts = await Post.find({});
return posts.filter((p) => p.tenantId === user.tenantId);
\`\`\`

It loads every tenant's data into memory and relies on application code to be perfect forever. This is right:

\`\`\`javascript
const posts = await Post.find({ tenantId: user.tenantId });
\`\`\`

In a multi-tenant system, tenant scoping should be enforced at the lowest layer you can reach — a Mongoose plugin that injects the tenant filter, or Postgres row-level security — so that forgetting it in one handler is not a data breach.

## ABAC — Attribute-Based Access Control

ABAC generalises the idea: instead of roles or ownership specifically, decisions are made from *attributes* of the subject, the resource, the action and the environment.

\`\`\`javascript
function canAccess(user, resource, action, env) {
  return (
    user.department === resource.department &&
    user.clearanceLevel >= resource.sensitivity &&
    action === "read" &&
    env.hour >= 9 && env.hour < 18
  );
}
\`\`\`

This buys enormous expressiveness. "A claims handler in the same region may read a claim under 50,000 during business hours from a corporate IP" is a single ABAC rule and an unmanageable pile of RBAC roles.

The cost is that rules written as code get scattered and become hard to audit. Nobody can answer "who can read this document?" without reading every branch of every function. Which leads directly to the next model.

## PBAC — Policy-Based Access Control

PBAC keeps ABAC's attribute-driven logic but moves the rules *out of application code* and into declarative policies evaluated by a dedicated engine — Open Policy Agent, AWS Cedar, or Casbin. Your service stops deciding and starts asking.

\`\`\`javascript
const decision = await opa.evaluate("app/authz/allow", {
  subject: { id: user.id, role: user.role, region: user.region },
  action: "claim:approve",
  resource: { id: claim.id, amount: claim.amount, region: claim.region },
});

if (!decision.allow) return res.status(403).json({ error: "Forbidden" });
\`\`\`

The advantages are real and mostly organisational: policies live in one reviewable place, they can be version-controlled and tested independently, they can be changed without redeploying services, and auditors can read them. The cost is another moving part in your request path, and a latency budget you now have to think about — which is why policy decisions are usually cached aggressively.

## ReBAC — Relationship-Based Access Control

ReBAC models permission as a graph of relationships rather than a set of attributes. It is the model behind Google Drive, and it was described publicly in Google's Zanzibar paper. Access is stored as tuples:

\`\`\`
document:q3-report#owner@user:yasowant
document:q3-report#viewer@group:finance#member
folder:reports#viewer@user:priya
document:q3-report#parent@folder:reports
\`\`\`

The question "may Priya view q3-report?" becomes a graph traversal: she is not a direct viewer, but the document's parent folder is one she can view, so permission is inherited.

This is the only model that handles the sharing semantics people actually expect from modern products — nested folders, groups containing groups, "anyone with the link", permissions that cascade downward. Implementations include SpiceDB, Ory Keto and OpenFGA.

The trade-off is operational weight. You are now running a consistency-sensitive distributed system whose data must not lag behind your primary database, or a user will revoke access and watch it keep working for ten seconds. Zanzibar's "zookies" exist precisely to solve that ordering problem. Do not reach for ReBAC until sharing is genuinely the shape of your product.

## Comparing the five

| Model | Decides from | Best at | Main weakness |
|---|---|---|---|
| RBAC | User's role | Simple, legible org structures | Cannot express per-resource rules |
| FGAC | Resource ownership | Multi-tenant isolation, "my records" | Logic scatters across handlers |
| ABAC | Arbitrary attributes | Contextual, conditional rules | Hard to audit as code |
| PBAC | Declarative policy | Centralised, reviewable rules | Extra service, added latency |
| ReBAC | Relationship graph | Sharing, nesting, inheritance | Operationally heavy |

## What production systems actually run

Almost nobody picks one. The architecture that holds up over time is layered, cheapest check first:

1. **Authenticate** and resolve the identity, including the tenant.
2. **Coarse RBAC gate** at the route — does this role touch this endpoint at all? Rejecting here costs one array lookup and avoids a database round trip.
3. **Tenant scoping** enforced in the data layer, not the handler. This should be impossible to forget.
4. **Fine-grained ownership or relationship check** on the specific resource.
5. **Policy evaluation** for the conditional business rules — amount thresholds, regions, time windows.

That ordering matters for both performance and safety: the broad, cheap checks eliminate most bad requests before you have spent a query on them.

## Mistakes worth avoiding

**Trusting the client.** Hiding a delete button is a UX decision, not a security control. Every check must exist on the server.

**Putting permissions in the JWT and never revoking them.** A token with a one-hour expiry carries whatever permissions it was minted with. Demote a user and they keep their old powers until it expires. Either keep tokens short-lived, or check critical permissions against live state.

**Leaking existence through status codes.** Returning 403 for a record that belongs to another tenant confirms that the record exists. For cross-tenant resources, 404 is usually the more honest answer.

**Checking in the controller only.** If the same rule is enforced in three handlers and one background job, it will eventually be four places and one of them will drift. Put it in one function and call it everywhere.

**Testing only the happy path.** The valuable authorization tests are the ones asserting that the *wrong* user gets refused. Write those first.

## Closing thought

Access control is not a feature you finish; it is a property of the system you keep. Start with RBAC because it is cheap and clear, add resource-level checks the moment you have per-record ownership, and reach for policy engines or relationship graphs only when the rules genuinely outgrow code. The goal is not the most sophisticated model — it is the simplest one that makes an unsafe request impossible to write by accident.
`;
