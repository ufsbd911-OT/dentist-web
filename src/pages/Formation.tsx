import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Brain, Lightbulb, Target, Users, Presentation, CalendarDays } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { FadeInView } from '@/components/FadeInView';
import { ScrollRevealText } from '@/components/ScrollRevealText';

export default function Formation() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  
  const parallaxY = useTransform(smoothScroll, [0, 1], [0, -150]);
  const parallaxYReverse = useTransform(smoothScroll, [0, 1], [0, 150]);

  return (
    <>
      <Helmet>
        <title>Formation en santé bucco-dentaire | UFSBD Hérault</title>
        <meta name="description" content="Formations et actions de sensibilisation de l'UFSBD Hérault autour de la santé bucco-dentaire." />
        <link rel="canonical" href="https://ufsbd34.fr/formation" />
      </Helmet>

      <div className="public-site">
        <SiteHeader />
        <main className="overflow-hidden">
          
          {/* Hero Section */}
          <section className="relative pt-40 pb-32 overflow-hidden bg-white">
            <motion.div 
              style={{ y: parallaxYReverse }} 
              className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/40 via-cyan-100/30 to-transparent rounded-full blur-[100px] -translate-y-1/3 -translate-x-1/3 pointer-events-none" 
            />
            
            <div className="site-container relative z-10">
              <nav aria-label="Fil d’Ariane" className="breadcrumb mb-8">
                <Link to="/">Accueil</Link><span>/</span><span>Formation</span>
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
                  Transmettre les <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">bons réflexes</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl"
                >
                  L'UFSBD Hérault propose des temps de formation et de sensibilisation pour aider les professionnels, structures et relais de terrain.
                </motion.p>
              </div>
            </div>
          </section>

          <AutoScrollTape
            items={['Sensibilisation', 'Pédagogie', 'Compétences', 'Savoir-faire', 'Accompagnement']}
            direction="left"
            tone="light"
            label="Nos formations"
          />

          {/* Section: Objectifs */}
          <section className="py-32 relative bg-slate-50">
            <div className="site-container">
              <FadeInView className="text-center max-w-3xl mx-auto mb-20">
                <ScrollRevealText 
                  text="Objectifs de la formation" 
                  className="text-4xl md:text-5xl font-bold text-center justify-center mb-6 text-slate-900" 
                />
                <p className="text-xl text-slate-600">
                  Nos interventions visent à diffuser des connaissances claires, utiles et directement applicables.
                </p>
              </FadeInView>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Comprendre', copy: 'Comprendre les enjeux de la prévention et du dépistage.', icon: Brain, color: 'from-blue-500 to-cyan-400' },
                  { title: 'Relayer', copy: 'Mieux relayer les messages d\'hygiène et de santé orale.', icon: Lightbulb, color: 'from-indigo-500 to-blue-400' },
                  { title: 'Orienter', copy: 'Identifier les situations nécessitant l\'intervention d\'un professionnel.', icon: Target, color: 'from-cyan-500 to-teal-400' }
                ].map((item, idx) => (
                  <FadeInView key={item.title} delay={idx * 200}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group h-full cursor-default"
                    >
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-8 shadow-lg`}>
                        <item.icon size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-600 text-lg leading-relaxed">{item.copy}</p>
                    </motion.div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Formats */}
          <section className="py-32 relative bg-slate-900 text-white overflow-hidden">
            <motion.div 
              style={{ y: parallaxY }} 
              className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" 
            />
            
            <div className="site-container relative z-10">
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <FadeInView direction="left">
                  <h2 className="text-5xl font-black mb-8 leading-tight">Des formats adaptés à votre réalité.</h2>
                  <p className="text-xl text-blue-100/80 leading-relaxed">
                    Les formats sont adaptés au contexte et au public concerné afin de favoriser une appropriation concrète des messages.
                  </p>
                </FadeInView>

                <div className="space-y-6">
                  {[
                    { icon: Users, text: 'Sessions d\'information pour équipes et encadrants' },
                    { icon: Presentation, text: 'Ateliers pédagogiques et supports de sensibilisation' },
                    { icon: CalendarDays, text: 'Interventions ponctuelles ou programmes sur-mesure' }
                  ].map((item, idx) => (
                    <FadeInView key={idx} delay={idx * 200} direction="up">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group cursor-default"
                      >
                        <div className="flex-shrink-0 p-4 rounded-xl bg-white/10 group-hover:bg-cyan-500 transition-colors text-cyan-300 group-hover:text-white">
                          <item.icon size={28} />
                        </div>
                        <p className="text-xl font-medium text-blue-50 group-hover:text-white transition-colors">{item.text}</p>
                      </motion.div>
                    </FadeInView>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-32 bg-white text-center">
            <FadeInView>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Un projet de formation ?</h2>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xl px-10 py-5 rounded-full shadow-xl transition-all hover:scale-105">
                Contactez-nous
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
