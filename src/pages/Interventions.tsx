import { PublicPageShell } from '@/components/PublicPageShell';

export default function Interventions() {
  return (
    <PublicPageShell
      title="Interventions"
      metaTitle="Interventions et sensibilisation | UFSBD Herault"
      description="Interventions de l'UFSBD Herault en milieu scolaire, associatif, medico-social et professionnel pour promouvoir la sante bucco-dentaire."
      canonicalPath="/interventions"
      intro="L'UFSBD Herault organise des interventions de terrain pour informer, sensibiliser et accompagner les structures qui souhaitent promouvoir la sante bucco-dentaire."
      sections={[
        {
          heading: 'Interventions sur le terrain',
          paragraphs: [
            'Nos actions peuvent etre mises en place en lien avec des etablissements, associations, collectivites et structures de soins ou d accompagnement.',
          ],
          bullets: [
            'Interventions en milieu scolaire',
            'Sensibilisation dans les structures sociales et medico-sociales',
            'Actions d information dans le cadre de projets de sante publique',
          ],
        },
        {
          heading: 'Construire une action avec nous',
          paragraphs: [
            "Chaque intervention est preparee en fonction des objectifs, du public et des contraintes de terrain pour garantir un contenu utile et lisible.",
          ],
          bullets: [
            'Definition du public et des priorites de sensibilisation',
            'Organisation du format et des supports adaptes',
            'Orientation vers le formulaire de contact pour toute demande',
          ],
        },
      ]}
    />
  );
}
