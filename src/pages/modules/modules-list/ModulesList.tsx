import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { MouseEvent, useState } from 'react';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { defaultTableRequestConfig, TableRequestConfig } from '@services/interfaces';
import ModulesListHeader from '@src/pages/modules/modules-list/ModulesListHeader';
import { Module } from '@services/modules/interfaces';
import { modulesColumns } from '@src/pages/modules/modules-list/ModulesListColumns';
import { deleteModuleAction, getModulesAction } from '@redux/actions/modulesActions';
import LMSPopover from '@src/components/lms/LMSPopover';
import ModulesListPopperContent from '@src/pages/modules/modules-list/ModulesListPopperContent';
import ModulesListModal from '@src/pages/modules/modules-list/ModulesListModal';
import { enqueueSnackbar } from 'notistack';
import { resetModuleState } from '@redux/reducers/modulesReducer';

export default function ModulesList() {
  const dispatch = useAppDispatch();

  const { modulesListData, modulesListLoading, modulesListTotalCount } = useAppSelector(
    (state) => state.modules.modulesList
  );

  const [moduleSelected, setModuleSelected] = useState<Module | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moduleTableRequestConfig, setModuleTableRequestConfig] =
    useState<TableRequestConfig>(defaultTableRequestConfig);

  const handleTableChange = (modulesRequestConfig: TableRequestConfig) => {
    setModuleTableRequestConfig(modulesRequestConfig);
    dispatch(getModulesAction(modulesRequestConfig));
  };

  // Popper handlers
  const handleClick = (newModule: Module) => (event: MouseEvent<HTMLElement>) => {
    if (moduleSelected?.id === newModule.id) {
      setModuleSelected(null);
      setAnchorEl(null);
      return;
    }
    setModuleSelected(newModule);
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteModule = async () => {
    if (moduleSelected !== null) {
      try {
        await dispatch(deleteModuleAction({ moduleId: moduleSelected.id }));
        dispatch(getModulesAction(moduleTableRequestConfig));
      } catch (e) {
        dispatch(resetModuleState());
        enqueueSnackbar(e as string, { variant: 'error' });
      }
      // Reset the popper
      cancelModal();
    }
  };

  const cancelModal = () => {
    // Reset the popper
    setAnchorEl(null);
    setModuleSelected(null);
    setIsModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'modules-popper' : undefined;

  return (
    <>
      <LMSCard isPageCard contentPadding={0} header={<ModulesListHeader />}>
        <TableWithSortAndFilter
          columns={modulesColumns(handleClick)}
          rows={modulesListData}
          loading={modulesListLoading}
          rowCount={modulesListTotalCount}
          onChange={handleTableChange}
          rowHeight={80}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl}>
        <ModulesListPopperContent
          moduleSelected={moduleSelected}
          handleDelete={() => setIsModalOpen(true)}
          handleDuplicate={() => setIsModalOpen(true)}
        />
      </LMSPopover>
      {moduleSelected && (
        <ModulesListModal
          moduleSelected={moduleSelected}
          isModalOpen={isModalOpen}
          cancelModal={cancelModal}
          handleDeleteModule={handleDeleteModule}
        />
      )}
    </>
  );
}
