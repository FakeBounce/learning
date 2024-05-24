import { useAppSelector } from '@redux/hooks';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Iconify from '@src/components/iconify/Iconify';
import { Theme } from '@mui/material/styles';

interface ModulesStudyPlanSubjectItemProps {
  name: string;
  isDragging: boolean;
  onDelete: () => void;
  canEdit?: boolean;
}

export default function ModulesStudyPlanSubjectItem({
  name,
  isDragging,
  onDelete,
  canEdit = false
}: ModulesStudyPlanSubjectItemProps) {
  const { modulesLoading } = useAppSelector((state) => state.modules);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      my={0.5}
      borderRadius={(theme) => theme.shape.customBorderRadius.extraSmall}
      bgcolor={(theme) =>
        isDragging ? theme.palette.primary.lighter : theme.palette.secondary.lighter
      }
      borderLeft={(theme) => `4px solid ${theme.palette.secondary.main}`}
    >
      <Box display="flex" gap={1}>
        <Iconify
          icon="material-symbols:folder"
          width={20}
          sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
        />
        <Typography
          variant="body2"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: 100,
            '&::before': {
              content: 'attr(title)'
            }
          }}
          title={name}
        />
      </Box>
      {canEdit && (
        <IconButton onClick={onDelete} sx={{ p: 0 }} disabled={modulesLoading}>
          <Iconify
            icon="material-symbols:close"
            sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
          />
        </IconButton>
      )}
    </Box>
  );
}
