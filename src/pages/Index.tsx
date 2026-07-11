import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

const pathways = [
  {
    number: '01',
    title: 'Prévenir à chaque âge',
    copy: 'Des repères simples et fiables pour faire de la santé bucco-dentaire un réflexe quotidien.',
    path: '/prevention',
    image: preventionCareImage,
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Agir sur le terrain',
    copy: 'Écoles, établissements et entreprises : nous allons à la rencontre de tous les publics.',
    path: '/interventions',
    image: schoolWorkshopImage,
    icon: HeartHandshake,
  },
  {
    number: '03',
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
              <div className="home-hero__copy">
                <p className="eyebrow eyebrow--light"><span />UFSBD Hérault · Prévention & santé</p>
                <h1>La santé bucco-dentaire, <em>pour tous</em> et à chaque âge.</h1>
                <p className="home-hero__lead">
                  Depuis plus de 50 ans, nous transformons la prévention en actions concrètes,
                  au plus près des habitants de l’Hérault.
                </p>
                <div className="hero-actions">
                  <Link to="/prevention" className="button button--cyan">Découvrir nos actions <ArrowRight size={18} /></Link>
                  <ContactForm
                    isModal
                    trigger={<button className="button button--outline-light">Nous contacter</button>}
                  />
                </div>
              </div>

              <aside className="hero-proof" aria-label="Chiffres clés">
                <div className="hero-proof__item">
                  <strong>50+</strong>
                  <span>ans d’engagement<br />pour la prévention</span>
                </div>
                <div className="hero-proof__item">
                  <strong>34</strong>
                  <span>une section locale<br />ancrée dans l’Hérault</span>
                </div>
              </aside>
            </div>

            <div className="hero-rail">
              <div className="site-container hero-rail__inner">
                {pathways.map((item) => (
                  <Link to={item.path} key={item.path}>
                    <span>{item.number}</span>
                    <div><strong>{item.title}</strong><small>{item.copy}</small></div>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
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
              <FadeInView className="pathways-grid">
                {pathways.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link to={item.path} key={item.path} className="pathway-card h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group block">
                      <img src={item.image} alt="" className="transition-transform duration-700 group-hover:scale-105" />
                      <div className="pathway-card__scrim" />
                      <div className="pathway-card__content">
                        <div className="pathway-card__meta"><span>{item.number}</span><Icon size={22} /></div>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                        <span className="pathway-card__link">En savoir plus <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </Link>
                  );
                })}
              </FadeInView>
            </div>
          </section>

          <section className="mission-section overflow-hidden">
            <FadeInView className="site-container mission-grid">
              <div className="mission-stat">
                <span>Depuis</span>
                <strong>1966</strong>
                <p>Une association reconnue d’utilité publique, engagée dans la durée.</p>
              </div>
              <div className="mission-copy">
                <p className="eyebrow eyebrow--light"><span />Notre mission</p>
                <h2>Informer, former et aller vers celles et ceux qui en ont le plus besoin.</h2>
                <p>
                  L’UFSBD fédère les professionnels autour d’une conviction forte : les inégalités de santé
                  se réduisent par une prévention accessible et des actions menées au bon endroit, au bon moment.
                  {showFullMission && ' Dans l’Hérault, notre équipe développe des projets adaptés aux écoles, entreprises, établissements médico-sociaux et institutions, avec la même exigence de proximité et d’impact.'}
                </p>
                <button className="mission-more" onClick={() => setShowFullMission((value) => !value)} aria-expanded={showFullMission}>
                  {showFullMission ? 'Réduire' : 'Lire notre engagement'} <ChevronDown className={showFullMission ? 'is-open' : ''} size={18} />
                </button>
              </div>
            </FadeInView>
          </section>

          <section className="process-section section-pad overflow-hidden">
            <div className="site-container">
              <FadeInView className="section-heading section-heading--center">
                <div><p className="eyebrow"><span />Agir ensemble</p><h2>Une idée, un public, une action utile.</h2></div>
              </FadeInView>
              <FadeInView className="process-grid">
                {[
                  ['01', 'Échangeons', 'Vous nous partagez votre contexte, vos publics et vos objectifs.'],
                  ['02', 'Construisons', 'Nous imaginons un format pédagogique adapté à votre réalité.'],
                  ['03', 'Agissons', 'Nos professionnels interviennent et vous accompagnent sur le terrain.'],
                ].map(([number, title, copy]) => (
                  <article key={number} className="process-card h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-transparent hover:border-blue-100 bg-white">
                    <span>{number}</span><h3>{title}</h3><p>{copy}</p>
                  </article>
                ))}
              </FadeInView>
            </div>
          </section>

          <section className="commitments-section section-pad overflow-hidden">
            <div className="site-container commitments-grid">
              <FadeInView className="commitments-intro">
                <p className="eyebrow"><span />Notre approche</p>
                <h2>Une prévention humaine, concrète et exigeante.</h2>
                <p>Nos actions sont conçues pour être comprises, retenues et appliquées dans la vraie vie.</p>
                <Link to="/organigramme" className="button button--navy">Découvrir notre organisation <ArrowRight size={18} /></Link>
              </FadeInView>
              <FadeInView className="commitment-cards">
                {commitments.map(({ icon: Icon, title, copy }) => (
                  <article key={title} className="commitment-card h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-md bg-white">
                    <span><Icon size={22} className="text-blue-600" /></span><h3>{title}</h3><p>{copy}</p>
                  </article>
                ))}
              </FadeInView>
            </div>
          </section>

          <section className="final-cta">
            <div className="site-container final-cta__inner">
              <div><p className="eyebrow eyebrow--light"><span />Un projet dans l’Hérault ?</p><h2>Faisons avancer la prévention, ensemble.</h2></div>
              <div><p>Parlez-nous de votre public et de vos objectifs. Notre équipe vous répond avec une proposition claire et adaptée.</p><Link to="/contact" className="button button--light">Échanger avec l’équipe <ArrowRight size={18} /></Link></div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
