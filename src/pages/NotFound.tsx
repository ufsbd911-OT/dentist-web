import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, FileText, Home, Search } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page non trouvée | UFSBD Hérault</title>
        <meta name="description" content="La page que vous recherchez n’existe pas ou a été déplacée." />
      </Helmet>
      <div className="public-site internal-page not-found-page">
        <SiteHeader />
        <main className="not-found-main">
          <div className="site-container not-found-grid">
            <div className="not-found-code" aria-hidden="true">404</div>
            <div className="not-found-copy">
              <p className="eyebrow"><span />Page introuvable</p>
              <h1>Cette page a pris un autre chemin.</h1>
              <p>L’adresse <code>{location.pathname}</code> n’existe plus ou a été déplacée. Retrouvez rapidement l’information dont vous avez besoin.</p>
              <div className="not-found-actions">
                <Link to="/" className="button button--navy"><Home size={18} />Retour à l’accueil</Link>
                <button onClick={() => window.history.back()} className="button button--outline-brand"><ArrowLeft size={18} />Page précédente</button>
              </div>
            </div>
          </div>
          <div className="site-container not-found-links">
            <Link to="/prevention"><Search size={20} /><span><strong>Prévention</strong><small>Nos conseils et actions</small></span><ArrowRight size={17} /></Link>
            <Link to="/blog"><FileText size={20} /><span><strong>Actualités</strong><small>Nos dernières publications</small></span><ArrowRight size={17} /></Link>
            <Link to="/contact"><Home size={20} /><span><strong>Contact</strong><small>Parler avec notre équipe</small></span><ArrowRight size={17} /></Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
