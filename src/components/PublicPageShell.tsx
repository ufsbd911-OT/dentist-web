import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { checkAdminAccess, hasAdminRole } from '@/utils/adminAccess';

interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface PublicPageShellProps {
  title: string;
  metaTitle: string;
  description: string;
  canonicalPath: string;
  intro: string;
  sections: Section[];
}

export function PublicPageShell({
  title,
  metaTitle,
  description,
  canonicalPath,
  intro,
  sections,
}: PublicPageShellProps) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { user, userRole, signOut } = useAuth();

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://ufsbd34.fr${canonicalPath}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://ufsbd34.fr${canonicalPath}`} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src="/ufsbd-logo-new.jpg"
                    alt="UFSBD Logo"
                    className="h-12 md:h-16 w-auto hover:scale-105 transition-transform cursor-pointer"
                  />
                </Link>
              </div>

              <nav className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                  <Link to="/">Accueil</Link>
                </Button>
                <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                  <Link to="/blog">Actualites</Link>
                </Button>
                <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                  <Link to="/organigramme">Organisation</Link>
                </Button>
                <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                  <Link to="/contact">Contact</Link>
                </Button>
                {user ? (
                  <div className="hidden md:flex items-center space-x-4">
                    {(userRole === 'admin' || userRole === 'author') && (
                      <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                        <Link to="/submit">Ecrire un article</Link>
                      </Button>
                    )}
                    {(userRole === 'admin' || hasAdminRole(userRole) || checkAdminAccess(user?.email)) && (
                      <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                        <Link to="/admin">Admin</Link>
                      </Button>
                    )}
                    <span className="text-sm text-muted-foreground">Bonjour {user.email}</span>
                    <Button variant="outline" onClick={signOut} className="hover:bg-primary hover:text-white transition-colors">
                      Deconnexion
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="btn-primary hidden md:inline-flex">
                    <Link to="/auth">Connexion</Link>
                  </Button>
                )}
              </nav>

              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setShowMobileNav(!showMobileNav)}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>

            {showMobileNav && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3 pt-4">
                  <Button variant="ghost" asChild className="justify-start hover:text-primary transition-colors">
                    <Link to="/" onClick={() => setShowMobileNav(false)}>Accueil</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start hover:text-primary transition-colors">
                    <Link to="/blog" onClick={() => setShowMobileNav(false)}>Actualites</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start hover:text-primary transition-colors">
                    <Link to="/organigramme" onClick={() => setShowMobileNav(false)}>Organisation</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start hover:text-primary transition-colors">
                    <Link to="/contact" onClick={() => setShowMobileNav(false)}>Contact</Link>
                  </Button>
                  {user ? (
                    <>
                      {(userRole === 'admin' || userRole === 'author') && (
                        <Button variant="ghost" asChild className="justify-start hover:text-primary transition-colors">
                          <Link to="/submit" onClick={() => setShowMobileNav(false)}>Ecrire un article</Link>
                        </Button>
                      )}
                      {(userRole === 'admin' || hasAdminRole(userRole) || checkAdminAccess(user?.email)) && (
                        <Button variant="ghost" asChild className="justify-start hover:text-primary transition-colors">
                          <Link to="/admin" onClick={() => setShowMobileNav(false)}>Admin</Link>
                        </Button>
                      )}
                      <div className="px-3 py-2 text-sm text-muted-foreground border-t">
                        Bonjour {user.email}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          signOut();
                          setShowMobileNav(false);
                        }}
                        className="mx-3"
                      >
                        Deconnexion
                      </Button>
                    </>
                  ) : (
                    <Button asChild className="btn-primary mx-3">
                      <Link to="/auth" onClick={() => setShowMobileNav(false)}>Connexion</Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <nav className="flex justify-center mb-6">
            <ol className="flex items-center space-x-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-primary font-medium">{title}</li>
            </ol>
          </nav>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{intro}</p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <Card key={section.heading} className="shadow-sm">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-semibold">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
