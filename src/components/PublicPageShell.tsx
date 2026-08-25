import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
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
          <FadeInView delay={0}>
            <section className="internal-hero">
              <div className="site-container">
                <nav aria-label="Fil d’Ariane" className="breadcrumb">
                  <Link to="/">Accueil</Link><span>/</span><span>{title}</span>
                </nav>
                <p className="eyebrow"><span />UFSBD Hérault</p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {title}
                </motion.h1>
                <p>{intro}</p>
              </div>
            </section>
          </FadeInView>

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
              <div className="internal-sections">
                {sections.map((section, index) => (
                  <FadeInView key={section.heading} delay={index * 150}>
                    <motion.article 
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="internal-section-card p-10 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl border border-slate-100/50 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden group cursor-default"
                    >
                      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      <h2 className="text-3xl font-bold text-slate-800 mb-6">{section.heading}</h2>
                      
                      <div className="space-y-4 mb-8">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-slate-600 text-lg leading-relaxed">{paragraph}</p>
                        ))}
                      </div>
                      
                      {section.bullets && (
                        <ul className="space-y-3">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start transition-colors hover:text-slate-900 group/bullet text-slate-700">
                              <span className="mt-1 mr-3 bg-cyan-100 p-1 rounded-full group-hover/bullet:bg-cyan-200 transition-colors">
                                <Check size={14} className="text-cyan-700" />
                              </span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.article>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
