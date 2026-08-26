import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { getBlogPostBySlug, blogPosts } from '@/data/blogData';
import { renderMarkdown } from '@/lib/markdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;
  const shareUrl = post
    ? `https://www.yasowantdev.info/blog/${post.slug}`
    : 'https://www.yasowantdev.info/';
  const rendered = post ? renderMarkdown(post.content) : null;

  // Per-post SEO: title, description, canonical + Article structured data
  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    document.title = `${post.title} | Yasowant Nayak`;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    const url = `https://www.yasowantdev.info/blog/${post.slug}`;
    setMeta('name', 'description', post.excerpt);
    setMeta('property', 'og:title', post.title);
    setMeta('property', 'og:description', post.excerpt);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:image', post.image);
    setMeta('name', 'twitter:title', post.title);
    setMeta('name', 'twitter:description', post.excerpt);
    setMeta('name', 'twitter:image', post.image);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.href;
    if (canonical) canonical.href = url;
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'blog-post-ld';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      keywords: post.tags.join(', '),
      author: { '@type': 'Person', name: 'Yasowant Nayak', url: 'https://www.yasowantdev.info/' },
      mainEntityOfPage: url,
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      if (canonical && prevCanonical) canonical.href = prevCanonical;
      document.getElementById('blog-post-ld')?.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/#blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <article className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[50vh] min-h-[400px] overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/#blog"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <span className="inline-block px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="container mx-auto px-4 md:px-6 mt-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-none"
            >
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: rendered?.html ?? '' }}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
              {/* On this page */}
              {rendered && rendered.headings.length > 2 && (
                <nav
                  aria-label="On this page"
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <h3 className="text-lg font-bold mb-4">On This Page</h3>
                  <ul className="space-y-2 text-sm">
                    {rendered.headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav>
              )}

              {/* Tags */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {relatedPost.readTime}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-bold mb-4">Share This Post</h3>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-lg text-center hover:bg-[#1DA1F2]/20 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg text-center hover:bg-[#0A66C2]/20 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
