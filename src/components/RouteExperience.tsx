import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const accountRoutes = [
  '/auth',
  '/reset-password',
  '/otp-reset-password',
  '/simple-otp-reset',
  '/reset-password-email',
  '/verify-otp',
  '/reset-password-new',
];

export function RouteExperience() {
  const { pathname } = useLocation();
  const isAccountSurface = accountRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const isAdmin = pathname.startsWith('/admin');
    const isEditor = pathname === '/submit' || pathname === '/write-blog' || pathname.startsWith('/edit/');
    document.body.dataset.surface = isAdmin ? 'admin' : isEditor ? 'editor' : isAccountSurface ? 'account' : 'public';

    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'auto' });

    const root = document.getElementById('root');
    root?.classList.remove('route-is-ready');
    const readyFrame = window.requestAnimationFrame(() => root?.classList.add('route-is-ready'));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selectors = [
      'main section',
      'main article',
      '.internal-section-card',
      '.pathway-card',
      '.process-card',
      '.commitment-card',
      '.admin-shell main > div > *',
      '[data-reveal]',
    ].join(',');
    const registered = new Set<HTMLElement>();
    let revealIndex = 0;
    let observer: IntersectionObserver | undefined;

    if (!reducedMotion) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    }

    const registerElement = (element: HTMLElement) => {
      if (registered.has(element)) return;
      registered.add(element);
      element.classList.add('reveal-item');
      if (reducedMotion) {
        element.classList.add('is-visible');
        return;
      }
      element.style.setProperty('--reveal-delay', `${Math.min(revealIndex % 4, 3) * 55}ms`);
      revealIndex += 1;
      observer?.observe(element);
    };

    const registerScope = (scope: ParentNode) => {
      if (scope instanceof HTMLElement && scope.matches(selectors)) registerElement(scope);
      scope.querySelectorAll<HTMLElement>(selectors).forEach(registerElement);
    };

    registerScope(document);
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) registerScope(node);
        });
      });
    });
    if (root) mutationObserver.observe(root, { childList: true, subtree: true });

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      document.documentElement.style.setProperty('--page-progress', `${progress}`);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.cancelAnimationFrame(readyFrame);
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
      registered.forEach((element) => element.style.removeProperty('--reveal-delay'));
    };
  }, [isAccountSurface, pathname]);

  return (
    <>
      <div className="global-scroll-progress" aria-hidden="true" />
      {isAccountSurface && <Link to="/" className="account-home-link"><ArrowLeft size={16} />Retour au site</Link>}
    </>
  );
}
