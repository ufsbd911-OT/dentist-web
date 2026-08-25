import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, Stethoscope, Briefcase, Handshake, Users, ClipboardList } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { FadeInView } from '@/components/FadeInView';
import { ScrollRevealText } from '@/components/ScrollRevealText';

export default function Interventions() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });

  const parallaxY = useTransform(smoothScroll, [0, 1], [0, -150]);
  const parallaxYReverse = useTransform(smoothScroll, [0, 1], [0, 150]);

  return (
    <>
      <Helmet>
        <title>Interventions et sensibilisation | UFSBD Hérault</title>
        <meta name="description" content="Interventions de l'UFSBD Hérault en milieu scolaire, associatif, médico-social et professionnel." />
        <link rel="canonical" href="https://ufsbd34.fr/interventions" />
      </Helmet>

      <div className="public-site">
        <SiteHeader />
        <main className="overflow-hidden">

          {/* Hero Section */}
          <section className="relative pt-40 pb-32 overflow-hidden bg-slate-900 text-white">
            <motion.div
              style={{ y: parallaxYReverse }}
              className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <div className="site-container relative z-10">
              <nav aria-label="Fil d’Ariane" className="breadcrumb breadcrumb--light mb-8">
                <Link to="/">Accueil</Link><span>/</span><span>Interventions</span>
              </nav>

              <div className="max-w-4xl">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="eyebrow eyebrow--light"
                >
                  <span />UFSBD Hérault
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.3, type: 'spring' }}
                  className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-tight"
                >
                  Des actions <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">sur le terrain</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl"
                >
                  L'UFSBD Hérault organise des interventions pour informer, sensibiliser et accompagner les structures qui souhaitent promouvoir la santé.
                </motion.p>
              </div>
            </div>
          </section>

          <AutoScrollTape
            items={['Écoles', 'EHPAD', 'Entreprises', 'Associations', 'Structures de soins']}
            direction="right"
            tone="dark"
            label="Nos lieux d'intervention"
          />

          {/* Section: Interventions sur le terrain */}
          <section className="py-32 relative bg-white">
            <div className="site-container">
              <FadeInView className="text-center max-w-3xl mx-auto mb-20">
                <ScrollRevealText
                  text="Là où les besoins se trouvent."
                  className="text-4xl md:text-5xl font-bold text-center justify-center mb-6 text-slate-900"
                />
                <p className="text-xl text-slate-600">
                  Nos actions peuvent être mises en place en lien avec des établissements, associations, collectivités et structures d'accompagnement.
                </p>
              </FadeInView>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { title: 'Milieu scolaire', icon: MapPin, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                  { title: 'Médico-social', icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { title: 'Santé publique', icon: Briefcase, color: 'text-sky-500', bg: 'bg-sky-50' }
                ].map((item, idx) => (
                  <FadeInView key={item.title} delay={idx * 200}>
                    <motion.div
                      whileHover={{ y: -15, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-center group cursor-default"
                    >
                      <div className={`w-32 h-32 mx-auto rounded-full ${item.bg} flex items-center justify-center mb-8 relative`}>
                        <div className={`absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />
                        <item.icon size={48} className={`${item.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-500 font-medium">Interventions adaptées aux publics cibles et aux enjeux locaux.</p>
                    </motion.div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Construire */}
          <section className="py-32 relative bg-slate-50 overflow-hidden">
            <motion.div
              style={{ y: parallaxY }}
              className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="site-container relative z-10">
              <div className="grid md:grid-cols-2 gap-20 items-center">

                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: Users, text: 'Définition du public et des priorités' },
                    { icon: ClipboardList, text: 'Organisation du format et des supports' },
                    { icon: Handshake, text: 'Mise en place sur le terrain' }
                  ].map((item, idx) => (
                    <FadeInView key={idx} delay={idx * 200}>
                      <motion.div
                        whileHover={{ scale: 1.05, x: 10 }}
                        className="flex items-center gap-6 p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 group cursor-default"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors text-slate-400">
                          <item.icon size={28} />
                        </div>
                        <p className="text-2xl font-bold text-slate-800">{item.text}</p>
                      </motion.div>
                    </FadeInView>
                  ))}
                </div>

                <FadeInView direction="right">
                  <h2 className="text-5xl font-black mb-8 leading-tight text-slate-900">Construire une action <br /> avec nous.</h2>
                  <p className="text-xl text-slate-600 leading-relaxed mb-10">
                    Chaque intervention est préparée en fonction des objectifs, du public et des contraintes de terrain pour garantir un contenu utile et lisible.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xl px-10 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] hover:shadow-[0_0_60px_-10px_rgba(34,211,238,1)] transition-all hover:scale-105">
                    Faire une demande
                    <ArrowRight size={24} />
                  </Link>
                </FadeInView>

              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
