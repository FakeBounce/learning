import { Typography } from '@mui/material';
import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';

const convertFieldsToText = (field: string) => {
  switch (field) {
    case 'externalId':
      return <Trans key={field}>Identifiant externe</Trans>;
    case 'email':
      return <Trans key={field}>Email</Trans>;
    default:
      return null;
  }
};

const generateFieldsText = (fieldsUpdated: string[]) => {
  return (
    <>
      {fieldsUpdated.map((field, index) => {
        if (index === 0) {
          return convertFieldsToText(field);
        }
        return <>, {convertFieldsToText(field)}</>;
      })}
    </>
  );
};

interface ApplicantsUpdateModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  fieldsUpdated: string[];
}

export default function ApplicantsUpdateModal({
  isOpen,
  onClose,
  onConfirm,
  fieldsUpdated
}: ApplicantsUpdateModalProps) {
  return (
    <LMSModal
      title={<Trans>Modification du profil</Trans>}
      open={isOpen}
      onClose={onClose}
      validateAction={onConfirm}
      cancelAction={onClose}
    >
      <Typography>
        <Trans>Vous avez modifier les champs suivants :</Trans> {generateFieldsText(fieldsUpdated)}
      </Typography>
      <Typography>
        <Trans>Ces champs sont utiles lors de la connexion.</Trans>{' '}
      </Typography>
      <Typography>
        <Trans>Êtes-vous sûrs de vouloir les modifier ?</Trans>{' '}
      </Typography>
    </LMSModal>
  );
}
