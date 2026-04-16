export const staticRoutes = [
  {
    path: '/',
    title: 'UFSBD Hérault - Union Française pour la Santé Bucco-Dentaire',
    description:
      "Union Française pour la Santé Bucco-Dentaire - Section Hérault. Prévention, formation et sensibilisation à la santé bucco-dentaire pour tous.",
    canonical: 'https://ufsbd34.fr/',
    bodyClass: 'home',
    html: `
      <section class="boot-hero">
        <h1>Prévention, formation et sensibilisation à la santé bucco-dentaire</h1>
        <p>
          L'UFSBD Hérault agit pour informer le public, accompagner les structures partenaires
          et promouvoir les bons réflexes de santé bucco-dentaire auprès des enfants, adultes,
          seniors et publics vulnérables.
        </p>
      </section>
      <section class="boot-meta" aria-label="Informations essentielles">
        <article class="boot-card">
          <h2>Contact</h2>
          <p>Email : <a href="mailto:ufsbd34@ufsbd.fr">ufsbd34@ufsbd.fr</a></p>
          <p>Téléphone : <a href="tel:+33686306204">06 86 30 62 04</a></p>
          <p>Adresse : 285 rue Alfred Nobel, 34200 Montpellier</p>
        </article>
        <article class="boot-card">
          <h2>Pages utiles</h2>
          <ul>
            <li><a href="https://ufsbd34.fr/contact">Page contact</a></li>
            <li><a href="https://ufsbd34.fr/politique-confidentialite">Politique de confidentialité</a></li>
            <li><a href="https://ufsbd34.fr/mentions-legales">Mentions légales</a></li>
            <li><a href="https://ufsbd34.fr/ads.txt">ads.txt</a></li>
          </ul>
        </article>
      </section>
      <section class="boot-grid" aria-label="Actions de l'association">
        <article class="boot-card">
          <h2>Prévention</h2>
          <p>Actions d'information et de sensibilisation pour favoriser les bons gestes d'hygiène bucco-dentaire.</p>
          <a href="https://ufsbd34.fr/prevention">Découvrir la prévention</a>
        </article>
        <article class="boot-card">
          <h2>Formation</h2>
          <p>Temps de formation et accompagnement des partenaires qui relaient les messages de santé orale.</p>
          <a href="https://ufsbd34.fr/formation">Découvrir la formation</a>
        </article>
        <article class="boot-card">
          <h2>Interventions</h2>
          <p>Interventions en milieu scolaire, associatif, médico-social et professionnel selon les besoins du terrain.</p>
          <a href="https://ufsbd34.fr/interventions">Découvrir les interventions</a>
        </article>
      </section>
      <div class="boot-notice">
        Ce site publie également des actualités, des informations de contact et des pages d'organisation accessibles aux visiteurs et aux moteurs de recherche.
      </div>
    `,
  },
  {
    path: '/contact',
    title: 'Contact | UFSBD',
    description:
      "Contactez l'équipe UFSBD pour toute question ou demande d'information sur la santé dentaire.",
    canonical: 'https://ufsbd34.fr/contact',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Contactez-nous</h1>
        <p>N'hésitez pas à nous contacter pour toute question, demande d'information ou projet lié à la santé bucco-dentaire.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Coordonnées</h2>
          <p>Email : <a href="mailto:ufsbd34@ufsbd.fr">ufsbd34@ufsbd.fr</a></p>
          <p>Téléphone : <a href="tel:+33686306204">06 86 30 62 04</a></p>
          <p>Adresse : 285 rue Alfred Nobel, 34200 Montpellier</p>
        </article>
        <article class="boot-card">
          <h2>Liens utiles</h2>
          <ul>
            <li><a href="https://ufsbd34.fr/">Accueil</a></li>
            <li><a href="https://ufsbd34.fr/blog">Actualités</a></li>
            <li><a href="https://ufsbd34.fr/politique-confidentialite">Politique de confidentialité</a></li>
            <li><a href="https://ufsbd34.fr/mentions-legales">Mentions légales</a></li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/prevention',
    title: 'Prevention bucco-dentaire | UFSBD Herault',
    description:
      "Actions de prevention bucco-dentaire de l'UFSBD Herault a destination des enfants, adultes, seniors et publics vulnerables.",
    canonical: 'https://ufsbd34.fr/prevention',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Prévention bucco-dentaire</h1>
        <p>L'UFSBD Hérault accompagne les publics de tous âges avec des actions concrètes de prévention, d'information et d'éducation à la santé bucco-dentaire.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Nos actions</h2>
          <ul>
            <li>Information sur le brossage, la fluoruration et les habitudes de vie favorables.</li>
            <li>Actions de sensibilisation en milieu scolaire, associatif et institutionnel.</li>
            <li>Accompagnement des structures qui souhaitent mettre en place des temps de prévention.</li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Publics concernés</h2>
          <ul>
            <li>Écoles et établissements éducatifs</li>
            <li>Structures médico-sociales et associations</li>
            <li>Entreprises, collectivités et partenaires locaux</li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/formation',
    title: 'Formation en sante bucco-dentaire | UFSBD Herault',
    description:
      "Formations et actions de sensibilisation de l'UFSBD Herault autour de la sante bucco-dentaire, de la prevention et des bonnes pratiques.",
    canonical: 'https://ufsbd34.fr/formation',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Formation en santé bucco-dentaire</h1>
        <p>L'UFSBD Hérault propose des temps de formation et de sensibilisation pour aider les professionnels et relais de terrain à mieux transmettre les bons réflexes de santé bucco-dentaire.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Objectifs</h2>
          <ul>
            <li>Comprendre les enjeux de la prévention et du dépistage.</li>
            <li>Mieux relayer les messages d'hygiène et de santé orale.</li>
            <li>Identifier les situations qui nécessitent une orientation vers un professionnel de santé.</li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Formats</h2>
          <ul>
            <li>Sessions d'information pour équipes et encadrants</li>
            <li>Ateliers pédagogiques et supports de sensibilisation</li>
            <li>Interventions ponctuelles ou programmes construits avec les partenaires</li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/interventions',
    title: 'Interventions et sensibilisation | UFSBD Herault',
    description:
      "Interventions de l'UFSBD Herault en milieu scolaire, associatif, medico-social et professionnel pour promouvoir la sante bucco-dentaire.",
    canonical: 'https://ufsbd34.fr/interventions',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Interventions et sensibilisation</h1>
        <p>L'UFSBD Hérault organise des interventions de terrain pour informer, sensibiliser et accompagner les structures qui souhaitent promouvoir la santé bucco-dentaire.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Interventions</h2>
          <ul>
            <li>Interventions en milieu scolaire</li>
            <li>Sensibilisation dans les structures sociales et médico-sociales</li>
            <li>Actions d'information dans le cadre de projets de santé publique</li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Construire une action</h2>
          <ul>
            <li>Définition du public et des priorités de sensibilisation</li>
            <li>Organisation du format et des supports adaptés</li>
            <li>Orientation vers la page Contact pour toute demande</li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/demande-avis',
    title: "Demande d'avis et informations | UFSBD Herault",
    description:
      "Informations pour adresser une demande d'avis ou d'orientation a l'UFSBD Herault concernant la sante bucco-dentaire.",
    canonical: 'https://ufsbd34.fr/demande-avis',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Demande d'avis</h1>
        <p>Vous pouvez nous contacter pour demander des informations, être orienté vers la bonne ressource ou présenter un besoin en lien avec la santé bucco-dentaire.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Nous pouvons vous aider sur</h2>
          <ul>
            <li>Les renseignements généraux sur la prévention bucco-dentaire</li>
            <li>L'orientation vers le bon interlocuteur ou la bonne structure</li>
            <li>Les projets de sensibilisation ou de partenariat</li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Nous contacter</h2>
          <p>Formulaire de contact disponible sur la page dédiée.</p>
          <p>Email : <a href="mailto:ufsbd34@ufsbd.fr">ufsbd34@ufsbd.fr</a></p>
          <p>Téléphone : <a href="tel:+33686306204">06 86 30 62 04</a></p>
        </article>
      </section>
    `,
  },
  {
    path: '/organigramme',
    title: 'Organisation | UFSBD Herault',
    description:
      "Decouvrez l'organisation et les membres de l'UFSBD Herault ainsi que les principales responsabilites au sein de l'association.",
    canonical: 'https://ufsbd34.fr/organigramme',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Organisation de l'UFSBD Hérault</h1>
        <p>Cette page présente l'organisation générale de l'association et, une fois l'application chargée, l'organigramme détaillé des membres et responsabilités.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Ce que vous trouverez</h2>
          <ul>
            <li>La présentation de l'équipe et des fonctions principales</li>
            <li>La structure générale de gouvernance</li>
            <li>Un accès aux autres pages publiques et au contact</li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Accès rapide</h2>
          <ul>
            <li><a href="https://ufsbd34.fr/contact">Contacter l'association</a></li>
            <li><a href="https://ufsbd34.fr/blog">Lire les actualités</a></li>
            <li><a href="https://ufsbd34.fr/">Revenir à l'accueil</a></li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/blog',
    title: 'Blog | UFSBD',
    description:
      "Découvrez les derniers articles, conseils et actualités sur la santé dentaire par UFSBD.",
    canonical: 'https://ufsbd34.fr/blog',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Actualités et articles</h1>
        <p>Le blog UFSBD rassemble des articles, informations et contenus de sensibilisation autour de la santé bucco-dentaire.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Contenus publiés</h2>
          <p>Les articles approuvés sont affichés dans l'application et couvrent l'actualité, la prévention, la formation et les conseils pratiques.</p>
        </article>
        <article class="boot-card">
          <h2>Autres pages utiles</h2>
          <ul>
            <li><a href="https://ufsbd34.fr/prevention">Prévention</a></li>
            <li><a href="https://ufsbd34.fr/formation">Formation</a></li>
            <li><a href="https://ufsbd34.fr/contact">Contact</a></li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/politique-confidentialite',
    title: 'Politique de confidentialite | UFSBD Herault',
    description:
      "Politique de confidentialite du site UFSBD Herault concernant les formulaires, les donnees de contact, les cookies et la publicite.",
    canonical: 'https://ufsbd34.fr/politique-confidentialite',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Politique de confidentialité</h1>
        <p>Cette politique présente les informations essentielles sur la collecte des données, l'usage éventuel de cookies, la publicité et vos choix concernant la personnalisation des annonces.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Données et formulaires</h2>
          <ul>
            <li>Nom et coordonnées transmis volontairement</li>
            <li>Contenu des messages envoyés via les formulaires</li>
            <li>Informations techniques nécessaires au fonctionnement du service</li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Cookies et publicité</h2>
          <ul>
            <li>Cookies techniques et cookies de mesure d'audience</li>
            <li>Google et des fournisseurs tiers peuvent utiliser des cookies publicitaires</li>
            <li>Des annonces personnalisées ou non personnalisées peuvent être diffusées selon les réglages applicables</li>
            <li>Possibilité d'opposition via le navigateur, Google Ads Settings et youronlinechoices.eu</li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy policy | UFSBD Herault',
    description:
      "Privacy policy for the UFSBD Herault website regarding contact forms, cookies, advertising technologies and user choices.",
    canonical: 'https://ufsbd34.fr/politique-confidentialite',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Privacy policy</h1>
        <p>This route points to the public privacy information of the UFSBD Hérault website, including data processing, cookies and advertising disclosures.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Main information</h2>
          <ul>
            <li>Contact form and message data may be collected to answer requests</li>
            <li>Cookies and audience measurement tools may be used</li>
            <li>Google and third-party vendors may use cookies to serve ads</li>
            <li>The preferred canonical privacy URL is the French public route</li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/mentions-legales',
    title: 'Mentions legales | UFSBD Herault',
    description:
      "Mentions legales du site UFSBD Herault : editeur, publication, hebergement, responsabilite, propriete intellectuelle et droit applicable.",
    canonical: 'https://ufsbd34.fr/mentions-legales',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Mentions légales</h1>
        <p>Cette page regroupe les informations d'identification, de publication, d'hébergement technique et de responsabilité utiles au public.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Éditeur</h2>
          <ul>
            <li>UFSBD Hérault</li>
            <li>285 rue Alfred Nobel, 34200 Montpellier</li>
            <li><a href="mailto:ufsbd34@ufsbd.fr">ufsbd34@ufsbd.fr</a></li>
            <li><a href="tel:+33686306204">06 86 30 62 04</a></li>
          </ul>
        </article>
        <article class="boot-card">
          <h2>Publication et hébergement</h2>
          <ul>
            <li>Responsabilité de publication assurée par l'UFSBD Hérault ou son représentant habilité</li>
            <li>Diffusion technique via une infrastructure Cloudflare</li>
            <li>Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis</li>
          </ul>
        </article>
      </section>
    `,
  },
  {
    path: '/legal-notice',
    title: 'Legal notice | UFSBD Herault',
    description:
      "Legal notice for the UFSBD Herault website, including editor, publication responsibility and hosting references.",
    canonical: 'https://ufsbd34.fr/mentions-legales',
    bodyClass: 'public',
    html: `
      <section class="route-hero">
        <h1>Legal notice</h1>
        <p>This route points to the public legal notice of the website. The preferred canonical legal URL is the French public route.</p>
      </section>
      <section class="boot-grid">
        <article class="boot-card">
          <h2>Main information</h2>
          <ul>
            <li>Site editor: UFSBD Hérault</li>
            <li>Publication responsibility: UFSBD Hérault or its authorized representative</li>
            <li>Technical hosting references: Cloudflare infrastructure</li>
          </ul>
        </article>
      </section>
    `,
  },
];
