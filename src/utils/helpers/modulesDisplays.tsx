import { Module, ModuleStatusEnum } from '@services/modules/interfaces';
import { Trans } from '@lingui/macro';
import { Chip } from '@mui/material';

export const modulesStatusText = {
  [ModuleStatusEnum.DRAFT]: <Trans>Brouillon</Trans>,
  [ModuleStatusEnum.PUBLISHED]: <Trans>Publié</Trans>,
  [ModuleStatusEnum.ARCHIVED]: <Trans>Archivé</Trans>,
  [ModuleStatusEnum.IN_CORRECTION]: <Trans>En correction</Trans>
};

export const renderModuleStatus = (module: Module) => {
  const chipLabel = modulesStatusText[module.status as ModuleStatusEnum];
  switch (module.status) {
    case ModuleStatusEnum.DRAFT:
      return (
        <Chip
          sx={{
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            backgroundColor: (theme) => theme.palette.error.lighter,
            color: (theme) => theme.palette.error.dark
          }}
          label={chipLabel}
        />
      );
    case ModuleStatusEnum.PUBLISHED:
      return (
        <Chip
          sx={{
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            backgroundColor: (theme) => theme.palette.primary.lighter,
            color: (theme) => theme.palette.primary.dark
          }}
          label={chipLabel}
        />
      );
    case ModuleStatusEnum.ARCHIVED:
      return (
        <Chip
          sx={{
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            backgroundColor: (theme) => theme.palette.warning.lighter,
            color: (theme) => theme.palette.warning.dark
          }}
          label={chipLabel}
        />
      );
    case ModuleStatusEnum.IN_CORRECTION:
      return (
        <Chip
          sx={{
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            backgroundColor: (theme) => theme.palette.info.lighter,
            color: (theme) => theme.palette.info.dark
          }}
          label={chipLabel}
        />
      );
    default:
      return (
        <Chip
          sx={{
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            backgroundColor: (theme) => theme.palette.grey[300],
            color: (theme) => theme.palette.primary.dark
          }}
          label={<Trans>Unknown</Trans>}
        />
      );
  }
};
