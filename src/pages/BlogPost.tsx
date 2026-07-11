import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, PenLine } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { BulletproofBlogImage } from '@/components/BulletproofBlogImage';
import { Footer } from '@/components/Footer';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { SiteHeader } from '@/components/SiteHeader';
import { FadeInView } from '@/components/FadeInView';
import { useAuth } from '@/hooks/useAuth';
import { bulletproofImageCache } from '@/lib/bulletproof-image-cache';
import { registerImageForMonitoring } from '@/lib/image-health-monitor';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author_email: string;
  created_at: string;
  image?: string;
}

const stripCoverImages = (content: string, hasCoverImage: boolean) => {
  if (!content || !hasCoverImage) return content;
  return content
    .replace(/<img[^>]*>/gi, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/^\s+|\s+$/gm, '');
};

const descriptionFrom = (content = '') => content
  .replace(/<[^>]*>/g, ' ')
  .replace(/[#*_>`~|-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 155);

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { userRole } = useAuth();

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).eq('status', 'approved').single();
        if (error) {
          setNotFound(true);
          return;
        }
        setPost(data);
        if (data.image) {
          registerImageForMonitoring(data.image, { title: data.title, category: data.category, postId: data.id });
          bulletproofImageCache.preload(data.image);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="public-site internal-page article-page">
        <SiteHeader />
        <main className="article-loading site-container"><div /><span /><span /></main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) return <Navigate to="/blog" replace />;

  const description = descriptionFrom(post.content) || 'Article UFSBD Hérault consacré à la santé bucco-dentaire.';
  const date = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.created_at));

  return (
    <>
      <Helmet>
        <title>{post.title} | UFSBD Hérault</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://ufsbd34.fr/blog/${post.id}`} />
        <meta property="og:title" content={`${post.title} | UFSBD Hérault`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://ufsbd34.fr/blog/${post.id}`} />
      </Helmet>
      <div className="public-site internal-page article-page">
        <SiteHeader />
        <main>
          <header className="article-editorial-header overflow-hidden">
            <FadeInView className="site-container article-editorial-header__inner">
              <nav className="breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span>/</span><Link to="/blog">Actualités</Link><span>/</span><span>{post.category}</span></nav>
              <div className="article-editorial-header__meta"><span>{post.category}</span><time><CalendarDays size={16} />{date}</time></div>
              <h1>{post.title}</h1>
              <div className="article-editorial-header__actions">
                <Link to="/blog" className="transition-transform hover:-translate-x-1"><ArrowLeft size={17} />Toutes les actualités</Link>
                {(userRole === 'admin' || userRole === 'author') && <Link to={`/edit/${post.id}`} className="transition-transform hover:scale-105"><PenLine size={16} />Modifier l’article</Link>}
              </div>
            </FadeInView>
          </header>

          {post.image && (
            <FadeInView delay={150} className="site-container article-cover-wrap">
              <BulletproofBlogImage src={post.image} alt={post.title} title={post.title} postId={post.id} className="article-cover" />
            </FadeInView>
          )}

          <AutoScrollTape items={['Conseils fiables', 'Prévention au quotidien', 'Comprendre pour mieux agir', 'UFSBD Hérault']} tone="light" direction="right" label="Repères éditoriaux" />

          <section className="article-reading-section overflow-hidden">
            <FadeInView className="site-container article-reading-grid">
              <aside className="article-reading-aside"><span>Lecture</span><strong>{post.category}</strong><p>Une information proposée par l’UFSBD Hérault.</p></aside>
              <article className="article-prose prose prose-lg max-w-none">
                <MarkdownRenderer content={stripCoverImages(post.content, !!post.image)} />
              </article>
            </FadeInView>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
