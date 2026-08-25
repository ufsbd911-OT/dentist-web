import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { FadeInView } from '@/components/FadeInView';
import { ScrollRevealText } from '@/components/ScrollRevealText';

export default function Contact() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  const parallaxYReverse = useTransform(smoothScroll, [0, 1], [0, 150]);

  // Spotlight effect for the form panel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <Helmet>
        <title>Contact | UFSBD Hérault</title>
        <meta name="description" content="Contactez l’équipe UFSBD Hérault pour une action de prévention, une formation ou une demande d’information." />
        <link rel="canonical" href="https://ufsbd34.fr/contact" />
      </Helmet>
      
      <div className="public-site">
        <SiteHeader />
        <main className="overflow-hidden">
          
          {/* Hero Section */}
          <section className="relative pt-40 pb-32 overflow-hidden bg-slate-900 text-white">
            <motion.div 
              style={{ y: parallaxYReverse }} 
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" 
            />
            
            <div className="site-container relative z-10">
              <nav aria-label="Fil d’Ariane" className="breadcrumb breadcrumb--light mb-8">
                <Link to="/">Accueil</Link><span>/</span><span>Contact</span>
              </nav>
              
              <div className="grid md:grid-cols-2 gap-12 items-end">
                <div className="max-w-3xl">
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="eyebrow eyebrow--light"
                  >
                    <span />Parlons de votre projet
                  </motion.p>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.3, type: 'spring' }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight"
                  >
                    Une question, <br/> un public, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">une action à construire.</span>
                  </motion.h1>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-2xl text-slate-300 font-medium leading-relaxed pb-4"
                >
                  Notre équipe vous aide à imaginer le format le plus utile pour votre établissement, votre entreprise ou votre public.
                </motion.p>
              </div>
            </div>
          </section>

          <AutoScrollTape 
            items={['Prévention', 'Formation', 'Écoles', 'Entreprises', 'Établissements médico-sociaux', 'Conseils']} 
            tone="light" 
            direction="left"
            label="Motifs de contact" 
          />

          <section className="py-32 relative bg-slate-50">
            <div className="site-container">
              <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
                
                <FadeInView direction="left">
                  <aside className="sticky top-32">
                    <p className="eyebrow"><span />UFSBD Hérault</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Nous sommes à votre écoute.</h2>
                    <p className="text-xl text-slate-600 leading-relaxed mb-12">
                      Décrivez-nous votre besoin. Nous reviendrons vers vous avec une réponse claire et adaptée à votre contexte.
                    </p>
                    
                    <div className="space-y-4 mb-12">
                      {[
                        { icon: Mail, label: 'Email', value: 'ufsbd34@ufsbd.fr', href: 'mailto:ufsbd34@ufsbd.fr' },
                        { icon: Phone, label: 'Téléphone', value: '06 86 30 62 04', href: 'tel:+33686306204' },
                        { icon: MapPin, label: 'Adresse', value: '285 rue Alfred Nobel\n34200 Montpellier' },
                        { icon: Clock3, label: 'Réponse', value: 'Dans les meilleurs délais' },
                      ].map((item, idx) => (
                        <motion.div 
                          key={item.label}
                          whileHover={{ x: 10 }}
                          className="group block"
                        >
                          {item.href ? (
                            <a href={item.href} className="flex items-start gap-5 p-4 -ml-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all">
                              <span className="mt-1 bg-cyan-100 text-cyan-600 p-3 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                <item.icon size={24} />
                              </span>
                              <div>
                                <small className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.label}</small>
                                <strong className="block text-lg text-slate-800">{item.value}</strong>
                              </div>
                            </a>
                          ) : (
                            <div className="flex items-start gap-5 p-4 -ml-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all">
                              <span className="mt-1 bg-slate-200 text-slate-500 p-3 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                <item.icon size={24} />
                              </span>
                              <div>
                                <small className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.label}</small>
                                <strong className="block text-lg text-slate-800 whitespace-pre-line">{item.value}</strong>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://www.instagram.com/ufsbd34?igsh=NzR5YWduOHdqazUw" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Instagram size={24} />
                      Suivre @ufsbd34
                    </motion.a>
                  </aside>
                </FadeInView>

                <FadeInView delay={200} direction="up">
                  <div 
                    onMouseMove={handleMouseMove}
                    className="bg-white rounded-4xl p-10 md:p-14 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(34, 211, 238, 0.05),
                            transparent 80%
                          )
                        `,
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="mb-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-cyan-100 text-cyan-700 font-bold text-sm mb-4">
                          Votre demande
                        </span>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                          Quelques informations suffisent pour commencer.
                        </h3>
                      </div>
                      
                      <ContactForm title="Formulaire de contact" />
                    </div>
                  </div>
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
