import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const footerGroups = [
  {
    title: 'Nos actions',
    links: [
      ['Prévention', '/prevention'],
      ['Formation', '/formation'],
      ['Interventions', '/interventions'],
      ['Demande d’avis', '/demande-avis'],
    ],
  },
  {
    title: 'L’association',
    links: [
      ['Organisation', '/organigramme'],
      ['Actualités', '/blog'],
      ['Nous contacter', '/contact'],
      ['Espace membre', '/auth'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="site-brand site-brand--footer" aria-label="UFSBD Hérault — Accueil">
              <img className="site-brand__logo site-brand__logo--footer" src="/ufsbd-logo-new.jpg" alt="UFSBD Hérault 34" />
            </Link>
            <p>Agir aujourd’hui pour préserver durablement la santé bucco-dentaire de tous.</p>
            <a href="https://www.ufsbd.fr" target="_blank" rel="noopener noreferrer" className="footer-external">
              Site national UFSBD <ArrowUpRight size={16} />
            </a>
          </div>

          {footerGroups.map((group) => (
            <div className="site-footer__column" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, path]) => <Link to={path} key={path}>{label}</Link>)}
            </div>
          ))}

          <div className="site-footer__column site-footer__contact">
            <h3>Nous joindre</h3>
            <a href="mailto:ufsbd34@ufsbd.fr"><Mail size={17} />ufsbd34@ufsbd.fr</a>
            <a href="tel:+33686306204"><Phone size={17} />06 86 30 62 04</a>
            <p><MapPin size={17} />285 rue Alfred Nobel<br />34200 Montpellier</p>
            <a href="https://www.instagram.com/ufsbd34?igsh=NzR5YWduOHdqazUw" target="_blank" rel="noopener noreferrer"><Instagram size={17} />Instagram</a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} UFSBD Section Hérault</p>
          <div><Link to="/politique-confidentialite">Confidentialité</Link><Link to="/mentions-legales">Mentions légales</Link></div>
        </div>
      </div>
    </footer>
  );
}
