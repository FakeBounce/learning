import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { MouseEvent, useState } from 'react';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';
import ModulesListHeader from '@src/pages/modules/modules-list/ModulesListHeader';
import { Module } from '@services/modules/interfaces';
import { modulesColumns } from '@src/pages/modules/modules-list/ModulesListColumns';
import { getModulesAction } from '@redux/actions/modulesActions';
import LMSPopover from '@src/components/lms/LMSPopover';
import ModulesListPopperContent from '@src/pages/modules/modules-list/ModulesListPopperContent';
import ModulesListModal from '@src/pages/modules/modules-list/ModulesListModal';

export default function RolesList() {
  const dispatch = useAppDispatch();

  const { modulesListData, modulesListLoading, modulesListTotalCount } = useAppSelector(
    (state) => state.modules.modulesList
  );

  const [moduleSelected, setModuleSelected] = useState<Module | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTableChange = (modulesRequestConfig: TableRequestConfig) => {
    dispatch(getModulesAction(modulesRequestConfig));
  };

  // Popper handlers
  const handleClick = (newModule: Module) => (event: MouseEvent<HTMLElement>) => {
    setModuleSelected(newModule);
    setAnchorEl(event.currentTarget);
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
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} onClose={cancelModal}>
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
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </>
  );
}
