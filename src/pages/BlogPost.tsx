import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { getBlogPostBySlug, blogPosts } from '@/data/blogData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;

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
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>')
                    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
                    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
                }}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
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
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-lg text-center hover:bg-[#1DA1F2]/20 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
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
