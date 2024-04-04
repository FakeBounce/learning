import { Trans } from '@lingui/macro';
import CardHeader from '@src/components/cards/CardHeader';

export default function ApplicantsBulkHeader() {
  return <CardHeader headerText={<Trans>Ajouter des étudiants en masse</Trans>} />;
}
