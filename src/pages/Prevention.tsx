import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Check, HeartPulse, ShieldCheck, Smile } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { FadeInView } from '@/components/FadeInView';
import { ScrollRevealText } from '@/components/ScrollRevealText';

export default function Prevention() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  
  const parallaxY = useTransform(smoothScroll, [0, 1], [0, -150]);
  const parallaxYReverse = useTransform(smoothScroll, [0, 1], [0, 150]);

  return (
    <>
      <Helmet>
        <title>Prévention bucco-dentaire | UFSBD Hérault</title>
        <meta name="description" content="Actions de prévention bucco-dentaire de l'UFSBD Hérault à destination des enfants, adultes, seniors et publics vulnérables." />
        <link rel="canonical" href="https://ufsbd34.fr/prevention" />
      </Helmet>

      <div className="public-site">
        <SiteHeader />
        <main className="overflow-hidden">
          
          {/* Hero Section */}
          <section className="relative pt-40 pb-32 overflow-hidden bg-slate-50">
            <motion.div 
              style={{ y: parallaxYReverse }} 
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-200/40 via-blue-200/20 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" 
            />
            
            <div className="site-container relative z-10">
              <nav aria-label="Fil d’Ariane" className="breadcrumb mb-8">
                <Link to="/">Accueil</Link><span>/</span><span>Prévention</span>
              </nav>
              
              <div className="max-w-4xl">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="eyebrow"
                >
                  <span />UFSBD Hérault
                </motion.p>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.3, type: 'spring' }}
                  className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-tight"
                >
                  Prévention <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">bucco-dentaire</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl"
                >
                  L'UFSBD Hérault accompagne les publics de tous âges avec des actions concrètes de prévention, d'information et d'éducation à la santé.
                </motion.p>
              </div>
            </div>
          </section>

          <AutoScrollTape
            items={['Informer', 'Prévenir', 'Former', 'Accompagner', 'Agir au plus près des publics']}
            direction="right"
            tone="light"
            label="Les engagements de l’UFSBD Hérault"
          />

          {/* Section: Nos Actions */}
          <section className="py-32 relative bg-white">
            <div className="site-container">
              <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                
                <div className="relative">
                   <motion.div 
                     animate={{ y: [0, -20, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"
                   />
                   <FadeInView direction="left">
                     <div className="bg-slate-900 text-white rounded-4xl p-12 md:p-16 relative overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full" />
                       <HeartPulse size={48} className="text-cyan-400 mb-8" />
                       <h2 className="text-4xl font-bold mb-6">Nos actions de prévention</h2>
                       <p className="text-xl text-blue-100/90 leading-relaxed mb-8">
                         Nous intervenons pour sensibiliser à l'hygiène bucco-dentaire, aux facteurs de risque et aux bons gestes du quotidien.
                       </p>
                       <p className="text-lg text-blue-200/80 leading-relaxed">
                         Notre objectif est de rendre les messages de prévention accessibles, pratiques et adaptés aux besoins de chaque public.
                       </p>
                     </div>
                   </FadeInView>
                </div>

                <div className="space-y-6">
                  {[
                    'Information sur le brossage, la fluoruration et les habitudes de vie favorables.',
                    'Actions de sensibilisation en milieu scolaire, associatif et institutionnel.',
                    'Accompagnement des structures qui souhaitent mettre en place des temps de prévention.'
                  ].map((bullet, idx) => (
                    <FadeInView key={idx} delay={idx * 200} direction="up">
                      <motion.div 
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors text-cyan-600">
                          <Check size={24} />
                        </div>
                        <p className="text-lg font-medium text-slate-700">{bullet}</p>
                      </motion.div>
                    </FadeInView>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Section: Publics Concernés */}
          <section className="py-32 relative bg-slate-900 overflow-hidden">
            <motion.div style={{ y: parallaxY }} className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 pointer-events-none" />
            
            <div className="site-container relative z-10">
              <FadeInView className="text-center max-w-3xl mx-auto mb-20">
                <p className="eyebrow eyebrow--light justify-center"><span />Pour qui ?</p>
                <ScrollRevealText 
                  text="Des actions qui s'adressent à tous les publics." 
                  className="text-4xl md:text-5xl font-bold text-center justify-center mb-6" 
                />
                <p className="text-xl text-blue-100/80">
                  Nos actions s'adressent aux enfants, aux familles, aux adultes, aux seniors ainsi qu'aux personnes en situation de vulnérabilité.
                </p>
              </FadeInView>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Écoles & Éducatif', icon: Smile, color: 'from-blue-500 to-cyan-400' },
                  { title: 'Médico-social & Assos', icon: ShieldCheck, color: 'from-cyan-500 to-blue-400' },
                  { title: 'Entreprises & Collectivités', icon: HeartPulse, color: 'from-blue-400 to-cyan-500' }
                ].map((item, idx) => (
                  <FadeInView key={item.title} delay={idx * 200}>
                    <motion.div
                      whileHover={{ y: -15, scale: 1.05 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden group cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <item.icon size={36} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    </motion.div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-32 bg-white text-center">
            <FadeInView>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Prêt à construire une action de prévention ?</h2>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xl px-10 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] hover:shadow-[0_0_60px_-10px_rgba(34,211,238,1)] transition-all hover:scale-105">
                Parler à notre équipe
                <ArrowRight size={24} />
              </Link>
            </FadeInView>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
