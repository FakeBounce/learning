import { Trans } from '@lingui/macro';
import CardHeader from '@src/components/cards/CardHeader';

export default function ApplicantsCreateHeader() {
  return <CardHeader headerText={<Trans>Ajouter un étudiant</Trans>} />;
}
