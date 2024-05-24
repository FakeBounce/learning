import RHFRadioGroup from '@src/pages/modules/modules-question/modules-question-true-false/RHFRadioGroup';
import { Trans } from '@lingui/macro';

export default function ModulesQuestionAnswersTrueFalse() {
  return (
    <>
      <RHFRadioGroup
        name="answers"
        label={<Trans>Cochez la bonne réponse.*</Trans>}
        options={[
          { label: 'Vrai', value: 'true' },
          { label: 'Faux', value: 'false' }
        ]}
      />
    </>
  );
}
