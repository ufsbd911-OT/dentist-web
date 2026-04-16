import { PublicPageShell } from '@/components/PublicPageShell';

export default function PrivacyPolicy() {
  return (
    <PublicPageShell
      title="Politique de confidentialite"
      metaTitle="Politique de confidentialite | UFSBD Herault"
      description="Politique de confidentialite du site UFSBD Herault concernant les formulaires, les donnees de contact et les echanges effectues via le site."
      canonicalPath="/politique-confidentialite"
      intro="Cette politique de confidentialite presente les informations essentielles sur la collecte et le traitement des donnees personnelles transmises via le site UFSBD Herault."
      sections={[
        {
          heading: 'Donnees susceptibles d etre collectees',
          paragraphs: [
            'Lorsque vous utilisez les formulaires du site, certaines donnees de contact peuvent etre transmises pour permettre le traitement de votre demande.',
          ],
          bullets: [
            'Nom et coordonnees de contact communiquees volontairement',
            'Contenu du message transmis via les formulaires',
            'Informations techniques strictement necessaires au fonctionnement du service',
          ],
        },
        {
          heading: 'Finalites du traitement',
          paragraphs: [
            'Les donnees sont utilisees pour repondre aux demandes recues, assurer le suivi des echanges et gerer les services proposes via le site.',
          ],
          bullets: [
            'Reponse aux demandes d information',
            'Gestion des echanges avec les visiteurs et partenaires',
            'Administration technique et securite du site',
          ],
        },
        {
          heading: 'Cookies et mesure d audience',
          paragraphs: [
            "Le site peut utiliser des cookies ou technologies similaires pour assurer son bon fonctionnement, mesurer l'audience et comprendre l'utilisation generale des pages.",
            'Ces cookies peuvent etre utilises par le site lui-meme ainsi que par certains prestataires techniques intervenant pour la diffusion, la mesure ou la securite du service.',
          ],
          bullets: [
            'Cookies techniques necessaires au fonctionnement et a la securite',
            "Cookies de mesure d'audience et d'analyse statistique",
            'Cookies lies a la diffusion de contenus ou services tiers lorsque ceux-ci sont actives',
          ],
        },
        {
          heading: 'Publicite, Google AdSense et partenaires tiers',
          paragraphs: [
            "Le site peut utiliser Google AdSense ou d'autres technologies publicitaires afin d'afficher des annonces. Google et des fournisseurs tiers peuvent utiliser des cookies pour diffuser et personnaliser des annonces selon vos visites sur ce site et d'autres sites.",
            "Lorsque la personnalisation publicitaire est active, ces technologies peuvent servir a afficher des annonces plus pertinentes selon vos centres d'interet. Lorsque la personnalisation n'est pas active, des annonces non personnalisees peuvent tout de meme etre diffusees.",
          ],
          bullets: [
            'Google peut utiliser des cookies publicitaires pour diffuser des annonces',
            'Des fournisseurs tiers, y compris Google, peuvent diffuser des annonces sur ce site',
            "La diffusion d'annonces peut reposer sur des informations issues de vos visites precedentes",
          ],
        },
        {
          heading: 'Vos choix et possibilites d opposition',
          paragraphs: [
            "Vous pouvez limiter ou supprimer les cookies depuis les reglages de votre navigateur. Vous pouvez egalement consulter les outils d'information et d'opposition proposes par Google concernant la publicite personnalisee.",
          ],
          bullets: [
            'Reglages de votre navigateur pour bloquer ou supprimer les cookies',
            'Parametres Google Ads pour la personnalisation publicitaire',
            "Informations complementaires via www.aboutads.info et www.youronlinechoices.eu lorsqu'ils sont applicables",
          ],
        },
        {
          heading: 'Exercice de vos droits',
          paragraphs: [
            "Pour toute question relative a vos donnees personnelles ou pour exercer vos droits, vous pouvez contacter l'UFSBD Herault via la page Contact ou l'adresse email publiee sur le site.",
          ],
        },
      ]}
    />
  );
}
