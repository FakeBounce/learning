import { Trans } from '@lingui/macro';
import { LMSCard } from '@src/components/lms';
import CardHeader from '@src/components/cards/CardHeader';
import { useTheme } from '@mui/material/styles';
import ModulesMediaCreateFooter from '@src/pages/modules/modules-media/ModulesMediaCreateFooter';
import RHFEditor from '@src/components/hook-form/RHFEditor';

export default function ModulesQuestionExplanation() {
  const theme = useTheme();
  return (
    <LMSCard
      isPageCard
      header={
        <CardHeader
          headerColor={theme.palette.secondary.main}
          headerText={<Trans>Texte de correction</Trans>}
        />
      }
      footer={<ModulesMediaCreateFooter />}
    >
      <RHFEditor name="explanation" />
    </LMSCard>
  );
}
