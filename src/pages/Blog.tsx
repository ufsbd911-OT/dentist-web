import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Newspaper } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { BulletproofBlogImage } from '@/components/BulletproofBlogImage';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { FadeInView } from '@/components/FadeInView';
import { useToast } from '@/hooks/use-toast';
import { preloadBlogImages } from '@/lib/bulletproof-image-cache';
import { registerImageForMonitoring } from '@/lib/image-health-monitor';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author_email: string;
  created_at: string;
  image?: string;
  status?: string;
}

const createExcerpt = (content: string, maxLength = 190) => {
  if (!content) return '';
  const clean = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.length > maxLength ? `${clean.slice(0, maxLength).trim()}…` : clean;
};

const formatDate = (date: string) => new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date(date));

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const { toast } = useToast();

  const fetchApprovedPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      const postsData = data || [];
      setPosts(postsData);
      postsData.forEach((post) => {
        if (post.image) {
          registerImageForMonitoring(post.image, { title: post.title, category: post.category, postId: post.id });
        }
      });
      await preloadBlogImages(postsData);
    } catch (fetchError) {
      console.error('Error fetching posts:', fetchError);
      setError('Impossible de charger les articles pour le moment.');
      toast({ title: 'Erreur', description: 'Impossible de charger les articles. Veuillez réessayer.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedPosts();
  }, []);

  const categories = useMemo(() => ['Tous', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);
  const filteredPosts = activeCategory === 'Tous' ? posts : posts.filter((post) => post.category === activeCategory);
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  const pageHelmet = (
    <Helmet>
      <title>Actualités et conseils | UFSBD Hérault</title>
      <meta name="description" content="Retrouvez les actualités, actions de terrain et conseils de prévention bucco-dentaire de l’UFSBD Hérault." />
      <link rel="canonical" href="https://ufsbd34.fr/blog" />
      <meta property="og:title" content="Actualités et conseils | UFSBD Hérault" />
      <meta property="og:description" content="Actualités, prévention et actions de terrain de l’UFSBD Hérault." />
      <meta property="og:url" content="https://ufsbd34.fr/blog" />
    </Helmet>
  );

  if (loading) {
    return (
      <div className="public-site internal-page blog-page min-h-screen">
        {pageHelmet}<SiteHeader />
        <main className="blog-loading site-container" aria-live="polite">
          <div className="blog-loading__title" /><div className="blog-loading__lead" />
          <div className="blog-loading__grid"><span /><span /><span /></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-site internal-page blog-page min-h-screen">
        {pageHelmet}<SiteHeader />
        <main className="blog-error site-container">
          <Newspaper size={38} /><h1>Les actualités font une petite pause.</h1><p>{error}</p>
          <Button onClick={fetchApprovedPosts}>Réessayer</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {pageHelmet}
      <div className="public-site internal-page blog-page">
        <SiteHeader />
        <main>
          <section className="blog-editorial-hero overflow-hidden">
            <FadeInView className="site-container">
              <nav className="breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span>/</span><span>Actualités</span></nav>
              <div className="blog-editorial-hero__grid">
                <div>
                  <p className="eyebrow"><span />Le journal de l’UFSBD Hérault</p>
                  <h1>Comprendre aujourd’hui, <em>mieux prévenir</em> demain.</h1>
                </div>
                <div className="blog-editorial-hero__aside">
                  <p>Conseils pratiques, actualités de l’association et retours sur nos actions de terrain dans l’Hérault.</p>
                  <div><strong>{posts.length}</strong><span>publication{posts.length > 1 ? 's' : ''}<br />à découvrir</span></div>
                </div>
              </div>
            </FadeInView>
          </section>

          <AutoScrollTape
            items={['Prévention', 'Conseils pratiques', 'Actions de terrain', 'Santé à chaque âge', 'Formation', 'Vie de l’association']}
            direction="right"
            tone="yellow"
            label="Thématiques des actualités"
          />

          <section className="blog-index-section section-pad">
            <div className="site-container">
              <div className="blog-filter-row">
                <div><p className="eyebrow"><span />À la une</p><h2>Nos dernières publications</h2></div>
                <div className="blog-filters" role="tablist" aria-label="Filtrer les articles par catégorie">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={activeCategory === category}
                      className={activeCategory === category ? 'is-active' : ''}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {!featuredPost ? (
                <div className="blog-empty"><Newspaper size={34} /><h3>Aucun article dans cette catégorie</h3><p>Choisissez une autre thématique pour poursuivre votre lecture.</p></div>
              ) : (
                <>
                  <FadeInView delay={0}>
                    <Link to={`/blog/${featuredPost.id}`} className="featured-article transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl group">
                      <div className="featured-article__media overflow-hidden">
                        {featuredPost.image ? (
                          <BulletproofBlogImage src={featuredPost.image} alt={featuredPost.title} title={featuredPost.title} postId={featuredPost.id} className="featured-article__image transition-transform duration-700 group-hover:scale-105" />
                        ) : <div className="article-image-placeholder transition-transform duration-700 group-hover:scale-105"><Newspaper size={42} /></div>}
                      </div>
                      <div className="featured-article__content">
                        <div className="article-meta"><span>{featuredPost.category}</span><time>{formatDate(featuredPost.created_at)}</time></div>
                        <h2>{featuredPost.title}</h2>
                        <p>{createExcerpt(featuredPost.content, 260)}</p>
                        <span className="article-read-link">Lire l’article <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </Link>
                  </FadeInView>

                  {remainingPosts.length > 0 && (
                    <div className="editorial-article-grid">
                      {remainingPosts.map((post, index) => (
                        <FadeInView key={post.id} delay={index * 150}>
                          <Link to={`/blog/${post.id}`} className="editorial-article-card h-full transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl group bg-white block">
                            <div className="editorial-article-card__media overflow-hidden">
                              {post.image ? (
                                <BulletproofBlogImage src={post.image} alt={post.title} title={post.title} postId={post.id} className="editorial-article-card__image transition-transform duration-700 group-hover:scale-105" />
                              ) : <div className="article-image-placeholder transition-transform duration-700 group-hover:scale-105"><Newspaper size={32} /></div>}
                            </div>
                            <div className="editorial-article-card__content">
                              <div className="article-meta"><span>{post.category}</span><time>{formatDate(post.created_at)}</time></div>
                              <h3>{post.title}</h3>
                              <p>{createExcerpt(post.content)}</p>
                              <span className="article-read-link"><Clock3 size={15} />Lire la suite <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
                            </div>
                          </Link>
                        </FadeInView>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
