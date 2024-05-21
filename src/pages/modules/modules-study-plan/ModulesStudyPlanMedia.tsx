import { useAppDispatch, useAppSelector } from '@redux/hooks';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Iconify from '@src/components/iconify/Iconify';
import { Theme } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { deleteMediaAction } from '@redux/actions/modulesActions';
import { MediaType, ModuleCompositionItemNested } from '@services/modules/interfaces';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';

interface ModulesStudyPlanSubjectProps extends DraggableProvided {
  media: ModuleCompositionItemNested;
  snapshotDraggable: DraggableStateSnapshot;
  innerRef: (_element?: HTMLElement | null | undefined) => void;
  canDelete?: boolean;
}

export default function ModulesStudyPlanMedia({
  media,
  snapshotDraggable,
  innerRef,
  canDelete = false,
  ...other
}: ModulesStudyPlanSubjectProps) {
  const { modulesLoading } = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const handleDeleteSubject = async () => {
    try {
      await dispatch(deleteMediaAction({ mediaId: media.id }));
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const handleNavigateToDetail = () => {
    switch (media.mediaType) {
      case MediaType.VIDEO:
        navigate(generatePath(PATH_MODULES.videoDetail, { moduleId, videoId: media.id }));
        break;
      case MediaType.IMAGE:
      case MediaType.GIF:
        navigate(generatePath(PATH_MODULES.imageDetail, { moduleId, imageId: media.id }));
        break;
      case MediaType.DOCUMENT:
        navigate(generatePath(PATH_MODULES.documentDetail, { moduleId, documentId: media.id }));
        break;
      case MediaType.AUDIO:
        navigate(generatePath(PATH_MODULES.audioDetail, { moduleId, audioId: media.id }));
        break;
      default:
        break;
    }
  };

  const iconToDisplay = () => {
    switch (media.mediaType) {
      case MediaType.VIDEO:
        return 'mdi:video';
      case MediaType.IMAGE:
        return 'carbon:image';
      case MediaType.GIF:
        return 'fluent:gif-20-filled';
      case MediaType.AUDIO:
        return 'f7:speaker-2-fill';
      default:
        return 'mdi:file-document-outline';
    }
  };

  return (
    <Box py={0.5} ref={innerRef} {...other.draggableProps} {...other.dragHandleProps}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        borderRadius={(theme) => theme.shape.customBorderRadius.extraSmall}
        bgcolor={(theme) =>
          snapshotDraggable.isDragging
            ? theme.palette.primary.lighter
            : theme.palette.secondary.lighter
        }
        borderLeft={(theme) => `4px solid ${theme.palette.secondary.main}`}
      >
        <Box display="flex" gap={1} alignItems="center" onClick={handleNavigateToDetail}>
          <Iconify
            icon={iconToDisplay()}
            width={20}
            sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
          />
          <Typography
            variant="body2"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: 100
            }}
          >
            {media.name}
          </Typography>
        </Box>
        {canDelete && (
          <IconButton onClick={handleDeleteSubject} sx={{ p: 0 }} disabled={modulesLoading}>
            <Iconify
              icon="material-symbols:close"
              sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
            />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
