import { Link } from 'react-router-dom';
import { Clock3, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { AutoScrollTape } from '@/components/AutoScrollTape';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { FadeInView } from '@/components/FadeInView';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | UFSBD Hérault</title>
        <meta name="description" content="Contactez l’équipe UFSBD Hérault pour une action de prévention, une formation ou une demande d’information." />
        <link rel="canonical" href="https://ufsbd34.fr/contact" />
        <meta property="og:title" content="Contact | UFSBD Hérault" />
        <meta property="og:description" content="Échangez avec l’équipe UFSBD Hérault au sujet de vos besoins de prévention et de formation." />
        <meta property="og:url" content="https://ufsbd34.fr/contact" />
      </Helmet>
      <div className="public-site internal-page contact-page">
        <SiteHeader />
        <main>
          <section className="contact-editorial-hero">
            <div className="site-container">
              <nav className="breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span>/</span><span>Contact</span></nav>
              <div className="contact-editorial-hero__grid">
                <div><p className="eyebrow"><span />Parlons de votre projet</p><h1>Une question, un public, <em>une action à construire.</em></h1></div>
                <p>Notre équipe vous aide à imaginer le format le plus utile pour votre établissement, votre entreprise ou votre public.</p>
              </div>
            </div>
          </section>

          <AutoScrollTape items={['Prévention', 'Formation', 'Écoles', 'Entreprises', 'Établissements médico-sociaux', 'Conseils']} tone="yellow" label="Motifs de contact" />

          <section className="contact-workspace section-pad overflow-hidden">
            <div className="site-container contact-workspace__grid">
              <FadeInView delay={0}>
                <aside className="contact-details">
                  <p className="eyebrow"><span />UFSBD Hérault</p>
                  <h2>Nous sommes à votre écoute.</h2>
                  <p>Décrivez-nous votre besoin. Nous reviendrons vers vous avec une réponse claire et adaptée à votre contexte.</p>
                  <div className="contact-detail-list">
                    <a href="mailto:ufsbd34@ufsbd.fr" className="transition-all hover:bg-slate-50 hover:scale-[1.02] hover:shadow-sm rounded-lg p-2 -ml-2"><span><Mail size={20} /></span><div><small>Email</small><strong>ufsbd34@ufsbd.fr</strong></div></a>
                    <a href="tel:+33686306204" className="transition-all hover:bg-slate-50 hover:scale-[1.02] hover:shadow-sm rounded-lg p-2 -ml-2"><span><Phone size={20} /></span><div><small>Téléphone</small><strong>06 86 30 62 04</strong></div></a>
                    <div className="p-2 -ml-2"><span><MapPin size={20} /></span><div><small>Adresse</small><strong>285 rue Alfred Nobel<br />34200 Montpellier</strong></div></div>
                    <div className="p-2 -ml-2"><span><Clock3 size={20} /></span><div><small>Réponse</small><strong>Dans les meilleurs délais</strong></div></div>
                  </div>
                  <a className="contact-instagram transition-transform hover:scale-105" href="https://www.instagram.com/ufsbd34?igsh=NzR5YWduOHdqazUw" target="_blank" rel="noopener noreferrer"><Instagram size={18} />Suivre @ufsbd34</a>
                </aside>
              </FadeInView>
              <FadeInView delay={150}>
                <div className="contact-form-panel hover:shadow-xl transition-shadow duration-500">
                  <div className="contact-form-panel__heading"><span>Votre demande</span><strong>Quelques informations suffisent pour commencer.</strong></div>
                  <ContactForm title="Formulaire de contact" />
                </div>
              </FadeInView>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
