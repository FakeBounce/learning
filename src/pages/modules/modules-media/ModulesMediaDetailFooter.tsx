import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_MODULES } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';
import { useAppSelector } from '@redux/hooks';

export default function ModulesMediaDetailFooter({
  isEditing,
  onCancelEdit,
  onTriggerEdit
}: {
  isEditing: boolean;
  onCancelEdit: () => void;
  onTriggerEdit: () => void;
}) {
  const navigate = useNavigate();
  const { modulesLoading } = useAppSelector((state) => state.modules);
  const { moduleId } = useParams();

  if (isEditing) {
    return <CardFooter isLoading={modulesLoading} cancelAction={onCancelEdit} />;
  }

  return (
    <Box display="flex" gap={2}>
      <ActionButton
        actionType="update"
        loading={modulesLoading}
        onClick={() => {
          navigate(generatePath(PATH_MODULES.profile, { moduleId }));
        }}
      >
        <Trans>Retour</Trans>
      </ActionButton>
      <ActionButton loading={modulesLoading} onClick={onTriggerEdit}>
        <Trans>Modifier</Trans>
      </ActionButton>
    </Box>
  );
}
