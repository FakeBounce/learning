import { Trans } from '@lingui/macro';
import RHFRadioGroupEditable from '@src/pages/modules/modules-question/modules-question-unique/RHFRadioGroupEditable';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';

export default function ModulesQuestionAnswersUnique() {
  return (
    <>
      <RHFRadioGroupEditable name="answers" label={<Trans>Cochez la bonne réponse.*</Trans>} />
      <RHFSwitch name="answersRandomOrder" label={<Trans>Ordre aléatoire des réponses</Trans>} />
    </>
  );
}
