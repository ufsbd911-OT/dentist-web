import { PublicPageShell } from '@/components/PublicPageShell';

export default function DemandeAvis() {
  return (
    <PublicPageShell
      title="Demande d'avis"
      metaTitle="Demande d'avis et informations | UFSBD Herault"
      description="Informations pour adresser une demande d'avis ou d'orientation a l'UFSBD Herault concernant la sante bucco-dentaire."
      canonicalPath="/demande-avis"
      intro="Vous pouvez nous contacter pour demander des informations, etre oriente vers la bonne ressource ou presenter un besoin en lien avec la sante bucco-dentaire."
      sections={[
        {
          heading: 'Ce que nous pouvons faire',
          paragraphs: [
            "L'UFSBD Herault informe, sensibilise et oriente. Les demandes recues sont examinees afin de repondre de la maniere la plus utile possible selon leur nature.",
          ],
          bullets: [
            'Renseignements generaux sur la prevention bucco-dentaire',
            'Orientation vers le bon interlocuteur ou la bonne structure',
            'Echanges autour des projets de sensibilisation ou de partenariat',
          ],
        },
        {
          heading: 'Nous contacter',
          paragraphs: [
            "Pour toute demande, merci d'utiliser le formulaire de contact ou les coordonnees publiees sur le site afin que nous puissions revenir vers vous dans les meilleurs delais.",
          ],
          bullets: [
            'Formulaire de contact disponible sur la page Contact',
            'Email : ufsbd34@ufsbd.fr',
            'Telephone : 06 86 30 62 04',
          ],
        },
      ]}
    />
  );
}
