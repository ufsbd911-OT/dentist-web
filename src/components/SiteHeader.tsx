import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, UserRound, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { checkAdminAccess, hasAdminRole } from '@/utils/adminAccess';

interface SiteHeaderProps {
  overlay?: boolean;
}

const navItems = [
  { label: 'Prévention', path: '/prevention' },
  { label: 'Formation', path: '/formation' },
  { label: 'Interventions', path: '/interventions' },
  { label: 'Actualités', path: '/blog' },
  { label: 'Organisation', path: '/organigramme' },
  { label: 'Contact', path: '/contact' },
];

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { pathname } = useLocation();
  const { user, userRole, signOut } = useAuth();
  const isTransparent = overlay && !scrolled && !menuOpen;
  const canManage = userRole === 'admin' || hasAdminRole(userRole) || checkAdminAccess(user?.email);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      
      if (currentScrollY > lastScrollY && currentScrollY > 92) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 1160) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <header 
        className={`site-header ${isTransparent ? 'site-header--overlay' : 'site-header--solid'}`}
        style={{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)' }}
      >
      <div className="site-container site-header__inner">
        <Link to="/" className="site-brand" aria-label="UFSBD Hérault — Accueil">
          <img className="site-brand__logo" src="/ufsbd-logo-new.jpg" alt="UFSBD Hérault 34" />
        </Link>

        <nav className="site-header__nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`gold-underline ${pathname === item.path || pathname.startsWith(`${item.path}/`) ? 'is-active' : ''}`}
              aria-current={pathname === item.path || pathname.startsWith(`${item.path}/`) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          {user ? (
            <>
              {canManage && <Link to="/admin" className="header-account">Admin</Link>}
              <button className="header-icon" onClick={signOut} aria-label="Se déconnecter">
                <LogOut size={19} />
              </button>
            </>
          ) : (
            <Link to="/auth" className="header-icon" aria-label="Se connecter">
              <UserRound size={20} />
            </Link>
          )}
          <button
            className="header-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>

    {menuOpen && (
        <div className="mobile-nav-wrap">
          <button className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu" />
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Navigation mobile">
            <p className="mobile-nav__eyebrow">Explorer l’UFSBD Hérault</p>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            {(userRole === 'admin' || userRole === 'author') && <Link to="/submit">Écrire un article</Link>}
            <div className="mobile-nav__actions">
              {user ? (
                <button className="button button--outline-light" onClick={signOut}>Déconnexion</button>
              ) : (
                <Link to="/auth" className="button button--outline-light">Connexion</Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
