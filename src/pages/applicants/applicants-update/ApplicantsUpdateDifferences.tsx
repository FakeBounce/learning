import { alpha } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import ActionButton from '@src/components/lms/ActionButton';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { ApplicantNotifications } from '@services/applicants/interfaces';

export default function ApplicantsUpdateDifferences({
  fieldName,
  value
}: {
  fieldName: string;
  value: string | ApplicantNotifications;
}) {
  const [isUpdated, setIsUpdated] = useState(false);
  const { setValue } = useFormContext();

  const getNotificationsKeys = (value: ApplicantNotifications) => {
    //get the keys of the object
    const keys = Object.keys(value);
    //return the joined keys with a comma
    return keys.join(', ');
  };

  const updateValues = () => {
    if (typeof value === 'string') {
      setValue(fieldName, value, { shouldDirty: true });
    }

    if (fieldName === 'birthDate') {
      setValue(fieldName, new Date(value as string), { shouldDirty: true });
    } else if (typeof value === 'object') {
      const notificationsToUpdate = getNotificationsKeys(value);
      const notificationTypes: (keyof ApplicantNotifications)[] = ['email', 'sms', 'app'];

      notificationTypes.forEach((type: keyof ApplicantNotifications) => {
        if (notificationsToUpdate.includes(type)) {
          setValue(`notifications[${type}]`, value[type], { shouldDirty: true });
        }
      });
    }

    setIsUpdated(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.1),
        color: (theme) => theme.palette.warning.main,
        border: 1,
        borderColor: (theme) => theme.palette.warning.main,
        borderRadius: (theme) => theme.shape.customBorderRadius.small
      }}
    >
      <Trans>
        Nouvelle donnée renseignée :{' '}
        {typeof value === 'string' ? value : getNotificationsKeys(value)}
      </Trans>
      {!isUpdated && (
        <ActionButton
          onClick={updateValues}
          actionType={'warning'}
          sx={{
            padding: 0
          }}
        >
          <Trans>Mettre à jour</Trans>
        </ActionButton>
      )}
    </Box>
  );
}
