import { PublicPageShell } from '@/components/PublicPageShell';

export default function LegalNotice() {
  return (
    <PublicPageShell
      title="Mentions legales"
      metaTitle="Mentions legales | UFSBD Herault"
      description="Mentions legales du site UFSBD Herault : informations d identification, contact et cadre general d utilisation du site."
      canonicalPath="/mentions-legales"
      intro="Cette page regroupe les informations generales d'identification et de contact utiles a l'utilisation du site UFSBD Herault."
      sections={[
        {
          heading: 'Editeur du site',
          paragraphs: [
            "Le site presente les activites et informations de l'UFSBD Herault, section locale de l'Union Francaise pour la Sante Bucco-Dentaire.",
          ],
          bullets: [
            'Nom : UFSBD Herault',
            'Adresse : 285 rue Alfred Nobel, 34200 Montpellier',
            'Email : ufsbd34@ufsbd.fr',
            'Telephone : 06 86 30 62 04',
          ],
        },
        {
          heading: 'Direction de la publication',
          paragraphs: [
            "La publication du site est assuree sous la responsabilite de l'UFSBD Herault ou de son representant habilite pour les contenus mis en ligne.",
          ],
        },
        {
          heading: 'Hebergement et diffusion technique',
          paragraphs: [
            "Le site est diffuse via une infrastructure de publication statique et de distribution web. Les elements techniques de deploiement de ce projet indiquent l'utilisation de services Cloudflare pour l'hebergement et la mise a disposition des fichiers du site.",
          ],
          bullets: [
            'Hebergeur technique : Cloudflare, Inc.',
            'Adresse : 101 Townsend Street, San Francisco, CA 94107, Etats-Unis',
            'Site web : https://www.cloudflare.com/',
          ],
        },
        {
          heading: 'Acces au site',
          paragraphs: [
            'Le site est accessible au public sous reserve des operations de maintenance, des contraintes techniques ou des interruptions exceptionnelles independantes de la volonte de son editeur.',
          ],
        },
        {
          heading: 'Contenus et responsabilite',
          paragraphs: [
            'Les informations publiees sur le site ont pour vocation de presenter les activites, actions et actualites de l association. Elles ne remplacent pas une consultation aupres d un professionnel de sante.',
          ],
        },
        {
          heading: 'Propriete intellectuelle',
          paragraphs: [
            "Les textes, elements graphiques, logos, illustrations, photographies et autres contenus du site sont proteges par les regles applicables en matiere de propriete intellectuelle, sauf mention contraire.",
            "Toute reproduction, representation, adaptation ou reutilisation, totale ou partielle, sans autorisation prealable appropriee, est susceptible d'etre interdite.",
          ],
        },
        {
          heading: 'Donnees personnelles',
          paragraphs: [
            "Les informations relatives au traitement des donnees personnelles et a l'utilisation eventuelle de cookies ou d'outils publicitaires sont precisees dans la politique de confidentialite du site.",
          ],
        },
        {
          heading: 'Droit applicable',
          paragraphs: [
            "Le site et son contenu relevent du droit francais. En cas de difficulte, une resolution amiable est a privilegier avant toute procedure contentieuse.",
          ],
        },
      ]}
    />
  );
}
