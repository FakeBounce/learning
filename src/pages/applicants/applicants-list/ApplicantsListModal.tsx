import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { toggleApplicantBlock } from '@redux/actions/applicantsActions';
import { Applicant } from '@services/applicants/interfaces';
import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';

interface ApplicantsListModalProps {
  applicantSelected: Applicant | null;
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
          setActive: !applicantSelected.is_active,
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
      title={<Trans>Bloquer un étudiant</Trans>}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={toggleBlock}
      cancelAction={cancelModal}
    >
      <Typography>
        <Trans>Êtes-vous sûr de vouloir bloquer l’étudiant</Trans>{' '}
        <Box
          component={'span'}
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            textTransform: 'uppercase'
          }}
        >
          {applicantSelected?.lastname}
        </Box>{' '}
        <Box
          component={'span'}
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium
          }}
        >
          {applicantSelected?.firstname}
        </Box>{' '}
        <Trans>dans</Trans>{' '}
        <Box component={'span'} sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}>
          <Trans>toutes les organisations</Trans>
        </Box>{' '}
        ?
      </Typography>
      <Typography>
        <Trans>
          Il ne pourra plus avoir accès aux parcours et modules mais aura accès à son historique.
        </Trans>
      </Typography>
    </LMSModal>
  );
}
