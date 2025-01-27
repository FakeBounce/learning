import { LMSCard } from '@src/components/lms';
import RolesListHeader from '@src/pages/roles/roles-list/RolesListHeader';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { rolesColumns } from '@src/pages/roles/roles-list/RolesColumns';
import { MouseEvent, useContext, useState } from 'react';
import { Role } from '@services/roles/interfaces';
import LMSPopover from '@src/components/lms/LMSPopover';
import RolesListPopperContent from '@src/pages/roles/roles-list/RolesListPopperContent';
import RolesListModal from '@src/pages/roles/roles-list/RolesListModal';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { getRolesList } from '@redux/actions/rolesActions';

export default function RolesList() {
  const dispatch = useAppDispatch();

  const { rolesListData, rolesListLoading, rolesListTotalCount } = useAppSelector(
    (state) => state.roles.rolesList
  );

  const [roleSelected, setRoleSelected] = useState<Role | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canSeeOptions =
    isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE) ||
    isAuthorizedByPermissionsTo(pageType, PermissionEnum.DELETE);

  const handleTableChange = (rolesRequestConfig: TableRequestConfig) => {
    dispatch(getRolesList(rolesRequestConfig));
  };

  // Popper handlers
  const handleClick = (newRole: Role) => (event: MouseEvent<HTMLElement>) => {
    if (newRole.id === roleSelected?.id) {
      setRoleSelected(null);
      setAnchorEl(null);
      return;
    }
    setRoleSelected(newRole);
    setAnchorEl(event.currentTarget);
  };

  const cancelModal = () => {
    // Reset the popper
    setAnchorEl(null);
    setRoleSelected(null);
    setIsModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'roles-popper' : undefined;

  return (
    <>
      <LMSCard isPageCard contentPadding={0} header={<RolesListHeader />}>
        <TableWithSortAndFilter
          columns={rolesColumns(handleClick, canSeeOptions)}
          rows={rolesListData}
          loading={rolesListLoading}
          rowCount={rolesListTotalCount}
          onChange={handleTableChange}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <RolesListPopperContent
          roleSelected={roleSelected}
          handleDelete={() => setIsModalOpen(true)}
        />
      </LMSPopover>
      {roleSelected && (
        <RolesListModal
          roleSelected={roleSelected}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </>
  );
}
