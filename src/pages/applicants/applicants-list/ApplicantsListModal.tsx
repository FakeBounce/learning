import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { toggleApplicantBlock } from '@redux/actions/applicantsActions';
import { Applicant } from '@services/applicants/interfaces';
import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';

const titleToDisplay = (applicantSelected: Applicant) => {
  if (!applicantSelected.isActive) {
    return <Trans>Débloquer un étudiant</Trans>;
  }
  return <Trans>Bloquer un étudiant</Trans>;
};

const textToDisplay = (applicantSelected: Applicant) => {
  if (!applicantSelected.isActive) {
    return (
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir débloquer l’étudiant{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {applicantSelected.lastname}
          </Box>{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium
            }}
          >
            {applicantSelected.firstname}
          </Box>{' '}
          dans{' '}
          <Box component={'span'} sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}>
            toutes les organisations
          </Box>{' '}
          ?
        </Trans>
      </Typography>
    );
  }

  return (
    <>
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir bloquer l’étudiant{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {applicantSelected.lastname}
          </Box>{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium
            }}
          >
            {applicantSelected.firstname}
          </Box>{' '}
          dans{' '}
          <Box component={'span'} sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}>
            toutes les organisations
          </Box>{' '}
          ?
        </Trans>
      </Typography>
      <Typography>
        <Trans>
          Il ne pourra plus avoir accès aux parcours et modules mais aura accès à son historique.
        </Trans>
      </Typography>
    </>
  );
};

interface ApplicantsListModalProps {
  applicantSelected: Applicant;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  cancelModal: () => void;
}

export default function ApplicantsListModal({
  applicantSelected,
  isModalOpen,
  setIsModalOpen,
  cancelModal
}: ApplicantsListModalProps) {
  const dispatch = useAppDispatch();

  const toggleBlock = () => {
    if (applicantSelected !== null) {
      dispatch(
        toggleApplicantBlock({
          setActive: !applicantSelected.isActive,
          applicantId: applicantSelected.id
        })
      ).then(() => {
        // Reset the popper
        cancelModal();
      });
    }
  };

  return (
    <LMSModal
      title={titleToDisplay(applicantSelected)}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={toggleBlock}
      cancelAction={cancelModal}
    >
      {textToDisplay(applicantSelected)}
    </LMSModal>
  );
}
