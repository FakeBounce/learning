import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getOrganizationsList } from '@redux/actions/organizationsActions';
import { Organization } from '@services/organizations/interfaces';
import { LMSCard } from '@src/components/lms';
import {
  organizationsListColumns,
  organizationsTableHeaderRenderer,
  organizationsTableRowsRenderer
} from '@src/pages/organizations/organizations-list/OrganizationsListColumns';
import OrganizationsListHeader from '@src/pages/organizations/organizations-list/OrganizationsListHeader';
import OrganizationsListPopperContent from '@src/pages/organizations/organizations-list/OrganizationsListPopperContent';
import { useState, MouseEvent } from 'react';
import LMSPopover from '@src/components/lms/LMSPopover';
import OrganizationsListModal from '@src/pages/organizations/organizations-list/OrganizationsListModal';
import { selectOrganizationsList } from '@redux/reducers/organizationsReducer';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';

export default function OrganizationsList() {
  const dispatch = useAppDispatch();

  const { organizationListData, organizationListLoading, organizationListTotalCount } =
    useAppSelector(selectOrganizationsList);
  const [organizationSelected, setOrganizationSelected] = useState<Organization | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTableChange = (organizationRequestConfig: TableRequestConfig) => {
    dispatch(getOrganizationsList(organizationRequestConfig));
  };

  // Popper handlers
  const handleClick = (newOrganization: Organization) => (event: MouseEvent<HTMLElement>) => {
    if (newOrganization.id === organizationSelected?.id) {
      setOrganizationSelected(null);
      setAnchorEl(null);
      return;
    }
    setOrganizationSelected(newOrganization);
    setAnchorEl(event.currentTarget);
  };

  const cancelModal = () => {
    // Reset the popper
    setAnchorEl(null);
    setOrganizationSelected(null);
    setIsModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <LMSCard isPageCard contentPadding={0} header={<OrganizationsListHeader />}>
        <TableWithSortAndFilter
          headerRenderer={organizationsTableHeaderRenderer}
          skeletonCols={organizationsListColumns.length}
          onChange={handleTableChange}
          rowsRenderer={organizationsTableRowsRenderer(organizationListData, handleClick)}
          isTableLoading={organizationListLoading}
          totalRows={organizationListTotalCount}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} placement="top-end">
        <OrganizationsListPopperContent
          handleToggleBlock={() => setIsModalOpen(true)}
          organizationSelected={organizationSelected}
        />
      </LMSPopover>
      {organizationSelected && (
        <OrganizationsListModal
          organizationSelected={organizationSelected}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </>
  );
}
