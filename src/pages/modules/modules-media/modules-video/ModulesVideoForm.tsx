import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import ActionButton from '@src/components/lms/ActionButton';
import IframeDisplayer from '@src/components/iframe/IframeDisplayer';

interface ModulesVideoFormProps {
  isEditing: boolean;
  videoUrl: string;
  fetchVideo: () => void;
}

export default function ModulesVideoForm({
  isEditing,
  videoUrl,
  fetchVideo
}: ModulesVideoFormProps) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <IframeDisplayer iframeUrl={videoUrl} />

      <Box display="flex" gap={2}>
        <RHFTextField name="url" required disabled={!isEditing} />
        <ActionButton actionType="update" onClick={fetchVideo}>
          <Trans>Ok</Trans>
        </ActionButton>
      </Box>

      <RHFTextField
        label={<Trans>Nom de la vidéo</Trans>}
        name="name"
        required
        disabled={!isEditing}
      />
    </Box>
  );
}
