import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  School,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
} from 'lucide-react';
import preventionCareImage from '@/assets/prevention-care.jpg';
import schoolWorkshopImage from '@/assets/school-workshop.jpg';
import professionalTrainingImage from '@/assets/professional-training.jpg';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { FadeInView } from '@/components/FadeInView';
import { ScrollRevealText } from '@/components/ScrollRevealText';

const MotionLink = motion(Link);

const pathways = [
  {
    title: 'Prévenir à chaque âge',
    copy: 'Des repères simples et fiables pour faire de la santé bucco-dentaire un réflexe quotidien.',
    path: '/prevention',
    image: preventionCareImage,
    icon: ShieldCheck,
  },
  {
    title: 'Agir sur le terrain',
    copy: 'Écoles, établissements et entreprises : nous allons à la rencontre de tous les publics.',
    path: '/interventions',
    image: schoolWorkshopImage,
    icon: HeartHandshake,
  },
  {
    title: 'Former les professionnels',
    copy: 'Des programmes concrets pour transmettre les bonnes pratiques et renforcer les compétences.',
    path: '/formation',
    image: professionalTrainingImage,
    icon: GraduationCap,
  },
];

const commitments = [
  { icon: School, title: 'Dès le plus jeune âge', copy: 'Des actions pédagogiques adaptées aux enfants et aux équipes éducatives.' },
  { icon: Building2, title: 'Dans les lieux de vie', copy: 'Des interventions pensées pour les entreprises, structures et établissements.' },
  { icon: Stethoscope, title: 'Avec les professionnels', copy: 'Un réseau mobilisé autour de recommandations claires et actualisées.' },
  { icon: UsersRound, title: 'Pour tous les publics', copy: 'Une attention particulière portée aux personnes les plus vulnérables.' },
  { icon: Sparkles, title: 'Par la prévention', copy: 'Donner à chacun les moyens d’agir avant que les problèmes ne s’installent.' },
  { icon: ShieldCheck, title: 'Avec une parole fiable', copy: 'Une information de santé accessible, indépendante et directement utile.' },
];

export default function Index() {
  const [showFullMission, setShowFullMission] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  
  const schemaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: schemaProgress } = useScroll({
    target: schemaRef,
    offset: ["start center", "end center"]
  });
  const schemaLineScale = useSpring(schemaProgress, { stiffness: 100, damping: 30 });
  
  const parallaxY = useTransform(smoothScroll, [0, 1], [0, -150]);
  const parallaxYReverse = useTransform(smoothScroll, [0, 1], [0, 150]);
  const opacityFade = useTransform(smoothScroll, [0, 0.2], [1, 0]);
  
  const testimonials = [
    { text: "Une équipe à l'écoute", author: "Directrice d'école" },
    { text: "Des actions concrètes", author: "Médecin du travail" },
    { text: "Impact réel sur le terrain", author: "Partenaire local" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(current => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>UFSBD Hérault — La prévention bucco-dentaire en action</title>
        <meta name="description" content="L’UFSBD Hérault agit pour la prévention, la formation et la santé bucco-dentaire de tous les publics." />
        <link rel="canonical" href="https://ufsbd34.fr/" />
        <meta property="og:title" content="UFSBD Hérault — La prévention bucco-dentaire en action" />
        <meta property="og:description" content="Prévention, formation et interventions de terrain pour une meilleure santé bucco-dentaire." />
        <meta property="og:url" content="https://ufsbd34.fr/" />
      </Helmet>

      <div className="public-site">
        <SiteHeader overlay />
        <main>
          <section className="home-hero">
            <video 
              className="home-hero__video home-hero__video--desktop" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/hero-desktop.mp4" type="video/mp4" />
            </video>
            <video 
              className="home-hero__video home-hero__video--mobile" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/hero-mobile.mp4" type="video/mp4" />
            </video>
            <div className="home-hero__scrim" />
            <div className="site-container home-hero__content">
              <FadeInView className="home-hero__copy" delay={150} staggerChildren={150}>
                <motion.p className="eyebrow eyebrow--light"><span />UFSBD Hérault · Prévention & santé</motion.p>
                <motion.h1 className="leading-tight">La santé bucco-dentaire, <em className="text-cyan-300 drop-shadow-sm">pour tous</em> et à chaque âge.</motion.h1>
                <motion.p className="home-hero__lead opacity-90 font-medium">
                  Depuis plus de 50 ans, nous transformons la prévention en actions concrètes,
                  au plus près des habitants de l’Hérault.
                </motion.p>
                <motion.div className="hero-actions pt-4">
                  <Link to="/prevention" className="button button--cyan shadow-lg shadow-cyan-900/30 hover:scale-105 transition-transform">Découvrir nos actions <ArrowRight size={18} /></Link>
                  <ContactForm
                    isModal
                    trigger={<button className="button button--outline-light hover:bg-white hover:text-slate-900 transition-colors">Nous contacter</button>}
                  />
                </motion.div>
              </FadeInView>

              <motion.div 
                className="absolute z-50 flex flex-col gap-4 max-w-[280px] hidden lg:flex right-8 xl:right-16" 
                style={{ bottom: '160px', perspective: 1000 }} 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.8 } }
                }}
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.4, y: 40, rotateX: -20, filter: 'blur(10px)' },
                    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 400, damping: 18, mass: 0.8 } }
                  }}
                  whileHover={{ scale: 1.05, y: -5, rotateY: -5, boxShadow: "0 20px 40px -10px rgba(8, 145, 178, 0.3)" }}
                  className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/10 transition-colors cursor-pointer group"
                >
                  <strong className="text-cyan-300 block text-4xl font-black mb-1 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">50+</strong>
                  <span className="text-white text-sm leading-snug block font-medium">ans d'engagement<br />pour la prévention</span>
                </motion.div>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.4, y: 40, rotateX: -20, filter: 'blur(10px)' },
                    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 400, damping: 18, mass: 0.8 } }
                  }}
                  whileHover={{ scale: 1.05, y: -5, rotateY: -5, boxShadow: "0 20px 40px -10px rgba(8, 145, 178, 0.3)" }}
                  className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/10 transition-colors cursor-pointer group"
                >
                  <strong className="text-cyan-300 block text-4xl font-black mb-1 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">34</strong>
                  <span className="text-white text-sm leading-snug block font-medium">une section locale<br />ancrée dans l'Hérault</span>
                </motion.div>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.4, y: 40, rotateX: -20, filter: 'blur(10px)' },
                    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 400, damping: 18, mass: 0.8 } }
                  }}
                  whileHover={{ scale: 1.05, y: -5, rotateY: -5, boxShadow: "0 20px 40px -10px rgba(8, 145, 178, 0.3)" }}
                  className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-cyan-500/30 transition-colors cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <strong className="text-cyan-300 italic block text-[1.15rem] leading-tight mb-2 relative z-10">"{testimonials[testimonialIndex].text}"</strong>
                  <span className="text-white block opacity-80 text-xs font-medium relative z-10">– {testimonials[testimonialIndex].author}</span>
                </motion.div>
              </motion.div>
            </div>

            <motion.div 
              className="hero-rail relative z-40"
              style={{ perspective: 1200 }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.1 } }
              }}
            >
              <div className="site-container hero-rail__inner">
                {pathways.map((item) => (
                  <MotionLink 
                    key={item.path} 
                    to={item.path} 
                    className="group relative overflow-hidden"
                    variants={{
                      hidden: { opacity: 0, y: 60, rotateX: -40, scale: 0.9, filter: 'blur(10px)' },
                      visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', transition: { type: "spring", stiffness: 350, damping: 20, mass: 1 } }
                    }}
                    whileHover={{ y: -8, scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <strong className="group-hover:text-cyan-300 transition-colors drop-shadow-sm">{item.title}</strong>
                      <small className="opacity-80 group-hover:opacity-100 transition-opacity">{item.copy}</small>
                    </div>
                    <ArrowRight size={18} className="text-cyan-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all relative z-10" />
                  </MotionLink>
                ))}
              </div>
            </motion.div>
          </section>

          <AutoScrollTape
            items={['Prévention au quotidien', 'Actions en milieu scolaire', 'Formation des professionnels', 'Interventions en entreprise', 'Santé bucco-dentaire pour tous']}
            label="Les actions de l’UFSBD Hérault"
          />

          <section className="intro-section section-pad overflow-hidden">
            <FadeInView className="site-container intro-grid">
              <p className="eyebrow"><span />Notre raison d’être</p>
              <div>
                <h2>Faire de la prévention un geste simple, <span className="blue-underline">partagé par tous.</span></h2>
                <p>Nous réunissons professionnels de santé, acteurs de terrain et publics autour d’une même ambition : permettre à chacun de préserver durablement sa santé bucco-dentaire.</p>
              </div>
            </FadeInView>
          </section>

          <section className="pathways-section section-pad overflow-hidden">
            <div className="site-container">
              <FadeInView className="section-heading">
                <div><p className="eyebrow"><span />Nos champs d’action</p><h2>Présents là où la prévention prend vie.</h2></div>
                <Link to="/contact" className="text-link">Construire une action avec nous <ArrowRight size={17} /></Link>
              </FadeInView>
              <FadeInView className="pathways-grid mt-10" staggerChildren={150}>
                {pathways.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link to={item.path} key={item.path}>
                      <motion.div 
                        whileHover={{ y: -15, scale: 1.02 }} 
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="h-full group block rounded-3xl overflow-hidden shadow-xl border-2 border-transparent hover:border-cyan-400 relative"
                      >
                        <motion.img 
                          whileHover={{ scale: 1.15 }} 
                          transition={{ duration: 0.8 }} 
                          src={item.image} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover z-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-20 flex flex-col justify-end h-full min-h-[400px] p-8">
                          <div className="flex items-center justify-end mb-4">
                            <motion.div 
                              whileHover={{ rotate: 15, scale: 1.2 }}
                              className="bg-cyan-500/20 p-3 rounded-full backdrop-blur-md"
                            >
                              <Icon size={24} className="text-cyan-300" />
                            </motion.div>
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{item.title}</h3>
                          <p className="text-slate-300 mb-6 font-medium text-lg">{item.copy}</p>
                          <span className="inline-flex items-center text-cyan-300 font-bold group-hover:text-white transition-colors bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                            En savoir plus <ArrowRight size={17} className="ml-2 group-hover:translate-x-2 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </FadeInView>
            </div>
          </section>

          <section className="mission-section overflow-hidden relative" onMouseMove={handleMouseMove}>
            <div className="absolute inset-0 bg-[#062645] pointer-events-none z-0" />
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-50 hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    800px circle at ${mouseX}px ${mouseY}px,
                    rgba(34, 211, 238, 0.12),
                    transparent 80%
                  )
                `,
              }}
            />
            
            <motion.div style={{ y: parallaxYReverse }} className="absolute -left-32 top-32 w-96 h-96 bg-cyan-400 rounded-full blur-[120px] opacity-10 pointer-events-none" />
            
            <FadeInView className="site-container mission-grid relative z-10" direction="left" delay={200}>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="mission-stat relative group cursor-default"
              >
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <span className="relative z-10 text-cyan-300 font-bold text-xl block mb-2 tracking-widest uppercase">Depuis</span>
                <motion.strong 
                  style={{ y: parallaxY }}
                  className="relative z-10 text-8xl md:text-[140px] font-black text-white drop-shadow-2xl tracking-tighter group-hover:text-cyan-50 transition-colors block leading-none mb-4"
                >
                  1966
                </motion.strong>
                <p className="relative z-10 text-blue-100 mt-6 text-xl max-w-[240px] font-medium leading-relaxed">Une association reconnue d’utilité publique, engagée dans la durée.</p>
              </motion.div>
              <div className="mission-copy pt-10">
                <p className="eyebrow eyebrow--light"><span />Notre mission</p>
                <ScrollRevealText 
                  text="Informer, former et aller vers celles et ceux qui en ont le plus besoin." 
                  className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-8" 
                />
                <FadeInView delay={400} direction="up" className="mt-8">
                  <p className="text-blue-50/90 text-2xl leading-relaxed font-medium">
                    L’UFSBD fédère les professionnels autour d’une conviction forte : les inégalités de santé
                    se réduisent par une prévention accessible et des actions menées au bon endroit, au bon moment.
                  </p>
                  <motion.div
                    initial={false}
                    animate={{ height: showFullMission ? 'auto' : 0, opacity: showFullMission ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-blue-50/90 text-xl leading-relaxed mt-4 font-medium">
                      Dans l’Hérault, notre équipe développe des projets adaptés aux écoles, entreprises, établissements médico-sociaux et institutions, avec la même exigence de proximité et d’impact.
                    </p>
                  </motion.div>
                  <button className="mission-more mt-8 hover:text-cyan-300 transition-colors text-lg font-bold flex items-center" onClick={() => setShowFullMission((value) => !value)} aria-expanded={showFullMission}>
                    {showFullMission ? 'Réduire' : 'Lire notre engagement'} 
                    <motion.div animate={{ rotate: showFullMission ? 180 : 0 }} className="ml-2">
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                </FadeInView>
              </div>
            </FadeInView>
          </section>

          <section className="process-section section-pad overflow-hidden relative">
            <motion.div style={{ y: parallaxY }} className="absolute right-0 top-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-10 pointer-events-none" />
            <div className="site-container relative z-10">
              <FadeInView className="section-heading section-heading--center relative z-20">
                <div><p className="eyebrow"><span />Agir ensemble</p><h2>Une idée, un public, une action utile.</h2></div>
              </FadeInView>
              
              <div ref={schemaRef} className="relative mt-24 max-w-5xl mx-auto">
                {/* Vertical Connecting schema line */}
                <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1.5 -translate-x-1/2 bg-slate-100 rounded-full z-0 overflow-hidden">
                   <motion.div 
                     style={{ scaleY: schemaLineScale, transformOrigin: "top" }}
                     className="w-full h-full bg-gradient-to-b from-blue-300 via-cyan-400 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                   />
                </div>
                
                <div className="flex flex-col gap-12 md:gap-24 relative z-10 py-10">
                  {[
                    ['Échangeons', 'Vous nous partagez votre contexte, vos publics et vos objectifs.', 'from-blue-50 to-white'],
                    ['Construisons', 'Nous imaginons un format pédagogique adapté à votre réalité.', 'from-cyan-50 to-white'],
                    ['Agissons', 'Nos professionnels interviennent et vous accompagnent sur le terrain.', 'from-indigo-50 to-white'],
                  ].map(([title, copy, bgClass], idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={title} className={`relative flex items-center md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''} group`}>
                        
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white bg-slate-200 z-20 shadow-lg overflow-hidden flex items-center justify-center">
                           <motion.div 
                             initial={{ scale: 0 }}
                             whileInView={{ scale: 1 }}
                             viewport={{ once: false, margin: "-40% 0px" }}
                             transition={{ type: "spring", stiffness: 300, damping: 20 }}
                             className="w-full h-full bg-cyan-400"
                           />
                        </div>

                        {/* Card */}
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: false, margin: "-20% 0px" }}
                          transition={{ duration: 0.7, type: "spring" }}
                          className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}
                        >
                          <motion.article 
                            whileHover={{ scale: 1.05, y: -10 }} 
                            className={`shadow-2xl rounded-3xl p-8 md:p-12 border border-slate-100/50 bg-gradient-to-b ${bgClass} relative overflow-hidden cursor-pointer`}
                          >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-3xl font-bold text-slate-800 mb-4">{title}</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">{copy}</p>
                          </motion.article>
                        </motion.div>
                        
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="commitments-section section-pad overflow-hidden">
            <div className="site-container commitments-grid">
              <FadeInView className="commitments-intro">
                <p className="eyebrow"><span />Notre approche</p>
                <h2>Une prévention humaine, concrète et exigeante.</h2>
                <p className="text-xl mt-4 text-slate-600">Nos actions sont conçues pour être comprises, retenues et appliquées dans la vraie vie.</p>
                <Link to="/organigramme" className="button button--navy mt-8 hover:scale-105 transition-transform shadow-xl shadow-blue-900/20">Découvrir notre organisation <ArrowRight size={18} /></Link>
              </FadeInView>
              <div className="commitment-cards grid gap-6">
                {commitments.map(({ icon: Icon, title, copy }, idx) => (
                  <FadeInView key={title} delay={idx * 100} direction="up">
                    <motion.article 
                      whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} 
                      className="h-full bg-white rounded-2xl p-8 relative overflow-hidden group cursor-pointer border border-slate-100 shadow-sm"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 group-hover:scale-150 transition-all duration-700 pointer-events-none">
                        <Icon size={120} />
                      </div>
                      <span className="inline-flex p-4 bg-blue-50/50 rounded-2xl mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                        <Icon size={32} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </span>
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
                      <p className="text-slate-600 font-medium leading-relaxed">{copy}</p>
                    </motion.article>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>

          <section className="final-cta relative overflow-hidden py-32 bg-slate-900 mt-20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 z-0" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[50%] -left-[10%] w-[80%] h-[200%] rounded-full bg-cyan-900/30 blur-3xl mix-blend-screen" 
              />
            </div>
            <FadeInView className="site-container final-cta__inner relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <p className="eyebrow eyebrow--light"><span />Un projet dans l’Hérault ?</p>
                <motion.h2 
                  whileHover={{ scale: 1.02 }}
                  className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg leading-tight"
                >
                  Faisons avancer la prévention, <span className="text-cyan-300 block">ensemble.</span>
                </motion.h2>
              </div>
              <div className="flex-1 md:text-right">
                <p className="text-xl text-blue-50 mb-8 max-w-lg ml-auto leading-relaxed">Parlez-nous de votre public et de vos objectifs. Notre équipe vous répond avec une proposition claire et adaptée.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link to="/contact" className="button button--light shadow-xl shadow-white/10 px-10 py-5 text-lg font-bold text-blue-900 hover:bg-cyan-50">
                    Échanger avec l’équipe <ArrowRight size={20} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </FadeInView>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
