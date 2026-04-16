import { PublicPageShell } from '@/components/PublicPageShell';

export default function Prevention() {
  return (
    <PublicPageShell
      title="Prevention bucco-dentaire"
      metaTitle="Prevention bucco-dentaire | UFSBD Herault"
      description="Actions de prevention bucco-dentaire de l'UFSBD Herault a destination des enfants, adultes, seniors et publics vulnerables."
      canonicalPath="/prevention"
      intro="L'UFSBD Herault accompagne les publics de tous ages avec des actions concretes de prevention, d'information et d'education a la sante bucco-dentaire."
      sections={[
        {
          heading: 'Nos actions de prevention',
          paragraphs: [
            "Nous intervenons pour sensibiliser a l'hygiene bucco-dentaire, aux facteurs de risque et aux bons gestes du quotidien.",
            "Notre objectif est de rendre les messages de prevention accessibles, pratiques et adaptes aux besoins de chaque public.",
          ],
          bullets: [
            'Information sur le brossage, la fluoruration et les habitudes de vie favorables.',
            'Actions de sensibilisation en milieu scolaire, associatif et institutionnel.',
            'Accompagnement des structures qui souhaitent mettre en place des temps de prevention.',
          ],
        },
        {
          heading: 'Publics concernes',
          paragraphs: [
            "Nos actions s'adressent aux enfants, aux familles, aux adultes, aux seniors ainsi qu'aux personnes en situation de vulnerabilite.",
          ],
          bullets: [
            'Ecoles et etablissements educatifs',
            'Structures medico-sociales et associations',
            'Entreprises, collectivites et partenaires locaux',
          ],
        },
      ]}
    />
  );
}
