import { PublicPageShell } from '@/components/PublicPageShell';

export default function Formation() {
  return (
    <PublicPageShell
      title="Formation"
      metaTitle="Formation en sante bucco-dentaire | UFSBD Herault"
      description="Formations et actions de sensibilisation de l'UFSBD Herault autour de la sante bucco-dentaire, de la prevention et des bonnes pratiques."
      canonicalPath="/formation"
      intro="L'UFSBD Herault propose des temps de formation et de sensibilisation pour aider les professionnels, structures et relais de terrain a mieux transmettre les bons reflexes de sante bucco-dentaire."
      sections={[
        {
          heading: 'Objectifs de formation',
          paragraphs: [
            'Nos interventions visent a diffuser des connaissances claires, utiles et directement applicables sur la prevention bucco-dentaire.',
          ],
          bullets: [
            'Comprendre les enjeux de la prevention et du depistage.',
            'Mieux relayer les messages d hygiene et de sante orale.',
            'Identifier les situations qui necessitent une orientation vers un professionnel de sante.',
          ],
        },
        {
          heading: 'Formats possibles',
          paragraphs: [
            'Les formats sont adaptes au contexte et au public concerne afin de favoriser une appropriation concrete des messages.',
          ],
          bullets: [
            'Sessions d information pour equipes et encadrants',
            'Ateliers pedagogiques et supports de sensibilisation',
            'Interventions ponctuelles ou programmes construits avec les partenaires',
          ],
        },
      ]}
    />
  );
}
