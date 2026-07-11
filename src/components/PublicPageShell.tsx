import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Check } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { FadeInView } from '@/components/FadeInView';

interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface PublicPageShellProps {
  title: string;
  metaTitle: string;
  description: string;
  canonicalPath: string;
  intro: string;
  sections: Section[];
}

export function PublicPageShell({ title, metaTitle, description, canonicalPath, intro, sections }: PublicPageShellProps) {
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://ufsbd34.fr${canonicalPath}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://ufsbd34.fr${canonicalPath}`} />
      </Helmet>

      <div className="public-site internal-page">
        <SiteHeader />
        <main>
          <section className="internal-hero">
            <div className="site-container">
              <nav aria-label="Fil d’Ariane" className="breadcrumb">
                <Link to="/">Accueil</Link><span>/</span><span>{title}</span>
              </nav>
              <p className="eyebrow"><span />UFSBD Hérault</p>
              <h1>{title}</h1>
              <p>{intro}</p>
            </div>
          </section>

          <AutoScrollTape
            items={['Informer', 'Prévenir', 'Former', 'Accompagner', 'Agir au plus près des publics']}
            direction="right"
            tone="light"
            label="Les engagements de l’UFSBD Hérault"
          />

          <section className="internal-content section-pad overflow-hidden">
            <div className="site-container internal-content__grid">
              <FadeInView delay={0}>
                <aside className="sticky top-24">
                  <p className="eyebrow"><span />En bref</p>
                  <h2>Des repères clairs pour mieux agir.</h2>
                  <p>{description}</p>
                  <Link to="/contact" className="button button--navy transition-transform hover:scale-105">Parler à notre équipe <ArrowRight size={17} /></Link>
                </aside>
              </FadeInView>
              <FadeInView className="internal-sections">
                {sections.map((section, index) => (
                  <article key={section.heading} className="internal-section-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lg bg-white border border-transparent hover:border-slate-100 rounded-xl">
                    <span className="internal-section-card__number">0{index + 1}</span>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && (
                      <ul>{section.bullets.map((bullet) => (
                        <li key={bullet} className="transition-colors hover:text-slate-900 group">
                          <Check size={17} className="transition-transform group-hover:scale-125 text-blue-500" />
                          {bullet}
                        </li>
                      ))}</ul>
                    )}
                  </article>
                ))}
              </FadeInView>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
