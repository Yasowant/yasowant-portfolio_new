export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'building-scalable-rest-apis',
    title: 'Building Scalable REST APIs with Node.js and Express',
    excerpt: 'Learn best practices for designing and implementing RESTful APIs that can handle millions of requests.',
    content: `
## Introduction

Building scalable REST APIs is crucial for modern web applications. In this comprehensive guide, we'll explore best practices for designing and implementing APIs that can handle millions of requests efficiently.

## Key Principles

### 1. Proper Route Structure

Organizing your routes properly is the foundation of a scalable API. Here's an example:

\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
\`\`\`

### 2. Middleware Implementation

Middleware helps you handle cross-cutting concerns like authentication, logging, and error handling:

\`\`\`javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verify token logic here
  next();
};
\`\`\`

### 3. Database Connection Pooling

Always use connection pooling to efficiently manage database connections:

\`\`\`javascript
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
\`\`\`

## Performance Optimization

- **Caching**: Implement Redis for frequently accessed data
- **Compression**: Use gzip compression for responses
- **Rate Limiting**: Protect your API from abuse
- **Load Balancing**: Distribute traffic across multiple servers

## Conclusion

Building scalable APIs requires careful planning and implementation. By following these best practices, you can create APIs that grow with your application.
    `,
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    author: 'Kamlesh Bhati',
    tags: ['Node.js', 'Express', 'REST API', 'Backend'],
  },
  {
    id: 2,
    slug: 'jwt-authentication-complete-guide',
    title: 'JWT Authentication: A Complete Guide',
    excerpt: 'Everything you need to know about implementing secure authentication using JSON Web Tokens.',
    content: `
## What is JWT?

JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

## Structure of a JWT

A JWT consists of three parts separated by dots:

1. **Header**: Contains the type of token and signing algorithm
2. **Payload**: Contains the claims (user data)
3. **Signature**: Ensures the token hasn't been tampered with

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

## Implementation in Node.js

### Generating Tokens

\`\`\`javascript
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
\`\`\`

### Verifying Tokens

\`\`\`javascript
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
\`\`\`

## Security Best Practices

1. **Use HTTPS**: Always transmit tokens over secure connections
2. **Short Expiration**: Keep token lifetime short
3. **Refresh Tokens**: Implement refresh token rotation
4. **Secure Storage**: Store tokens securely on the client side

## Conclusion

JWT provides a stateless, scalable solution for authentication. When implemented correctly, it offers a secure and efficient way to manage user sessions.
    `,
    date: '2024-12-28',
    readTime: '6 min read',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    author: 'Kamlesh Bhati',
    tags: ['JWT', 'Authentication', 'Security', 'Node.js'],
  },
  {
    id: 3,
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization Techniques',
    excerpt: 'Discover advanced techniques to make your React applications blazing fast and responsive.',
    content: `
## Why Performance Matters

A fast application leads to better user experience, higher engagement, and improved SEO rankings. Let's explore how to optimize React applications.

## Key Optimization Techniques

### 1. React.memo for Component Memoization

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  // This component only re-renders when 'data' changes
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
});
\`\`\`

### 2. useMemo for Expensive Calculations

\`\`\`jsx
const MyComponent = ({ items }) => {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);
  
  return <List items={sortedItems} />;
};
\`\`\`

### 3. useCallback for Function References

\`\`\`jsx
const ParentComponent = () => {
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
};
\`\`\`

### 4. Code Splitting with React.lazy

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Virtual List for Large Data Sets

For rendering large lists, use virtualization:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items }) => (
  <FixedSizeList
    height={400}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);
\`\`\`

## Conclusion

React performance optimization is an ongoing process. Use React DevTools Profiler to identify bottlenecks and apply these techniques strategically.
    `,
    date: '2024-12-10',
    readTime: '10 min read',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: 'Kamlesh Bhati',
    tags: ['React', 'Performance', 'Optimization', 'Frontend'],
  },
  {
    id: 4,
    slug: 'database-design-patterns',
    title: 'Database Design Patterns for Modern Applications',
    excerpt: 'Explore common database design patterns and when to use SQL vs NoSQL databases.',
    content: `
## Introduction to Database Design

Choosing the right database and design patterns is crucial for application success. This guide covers both SQL and NoSQL approaches.

## SQL vs NoSQL: When to Use What?

### Use SQL (PostgreSQL, MySQL) When:
- You need ACID transactions
- Data has complex relationships
- Schema is well-defined
- Strong consistency is required

### Use NoSQL (MongoDB, Redis) When:
- Schema is flexible/evolving
- Horizontal scaling is priority
- Working with unstructured data
- High write throughput needed

## Common Design Patterns

### 1. Normalization

Breaking down tables to eliminate redundancy:

\`\`\`sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(100)
);

-- Orders table (references users)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 2. Indexing Strategies

\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
\`\`\`

### 3. Caching Layer Pattern

\`\`\`javascript
async function getUser(id) {
  // Check cache first
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  
  // Store in cache
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  
  return user;
}
\`\`\`

## Conclusion

Understanding database design patterns helps you build scalable, maintainable applications. Choose patterns based on your specific use case and requirements.
    `,
    date: '2024-11-20',
    readTime: '12 min read',
    category: 'Database',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    author: 'Kamlesh Bhati',
    tags: ['Database', 'SQL', 'NoSQL', 'Design Patterns'],
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
