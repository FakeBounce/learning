import { MouseEvent, useContext } from 'react';
import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import GroupsListHeader from '@src/pages/groups/groups-list/GroupsListHeader';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { OrderBy } from '@src/pages/roles/roles-list/RolesColumns';
import FullTable from '@src/components/table/FullTable';
import {
  groupsColumns,
  groupsTableHeaderRenderer,
  groupsTableRowsRenderer
} from '@src/pages/groups/groups-list/GroupsColumns';
import { Group } from '@services/groups/interfaces';
import Pagination from '@src/components/table/Pagination';
import LMSPopover from '@src/components/lms/LMSPopover';
import GroupsListPopperContent from '@src/pages/groups/groups-list/GroupsListPopperContent';
import { getGroupsList } from '@redux/actions/groupsActions';
import GroupsListModal from '@src/pages/groups/groups-list/GroupsListModal';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

export default function GroupsList() {
  const dispatch= useAppDispatch();
  const { groupsListData, groupsListLoading, groupsListTotalCount } = useAppSelector((state) => state.groups.groupsList);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [groupSelected, setGroupSelected] = useState<Group | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canUpdateGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);
  const canDeleteGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.DELETE);

  useEffect(() => {
    const defaultRoleListRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    };

    const groupsRequestConfig =
      orderBy === null
        ? { ...defaultRoleListRequestConfig }
        : {
          ...defaultRoleListRequestConfig,
          sort: { field: orderBy.id, direction: orderBy.direction }
        };

    dispatch(getGroupsList(groupsRequestConfig));
  }, [currentPage, rowsPerPage, orderBy]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleSort = (id: 'name' | 'description' | 'nbUsers' | 'actions') => {
    if (orderBy?.id === id) {
      if (orderBy.direction === 'DESC') {
        setOrderBy(null);
        return;
      }
      setOrderBy({ id, direction: 'DESC' });
      return;
    } else {
      setOrderBy({ id, direction: 'ASC' });
    }
  };

  // Popper handlers
  const handleClick = (newGroup: Group) => (event: MouseEvent<HTMLElement>) => {
    setGroupSelected(newGroup);
    setAnchorEl(event.currentTarget);
  };

  const cancelModal = () => {
    // Reset the popper
    setAnchorEl(null);
    setGroupSelected(null);
    setIsModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'groups-popper' : undefined;

  return (
    <Box px={[0, 2]} display={"flex"} width={"100%"} boxSizing={"border-box"}>
      <LMSCard isPageCard cardCss={{ position: 'relative' }} >
        <GroupsListHeader />

        <FullTable
          headerRenderer={groupsTableHeaderRenderer(handleSort, orderBy, (canUpdateGroup || canDeleteGroup))}
          bodyRenderer={groupsTableRowsRenderer(groupsListData, handleClick)}
          isLoading={groupsListLoading}
          rowsNum={rowsPerPage}
          colsNum={groupsColumns.length}
        />
        <Pagination
          totalCount={groupsListTotalCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <GroupsListPopperContent
          groupSelected={groupSelected}
          handleDelete={() => setIsModalOpen(true)}
        />
      </LMSPopover>
      {groupSelected && (
        <GroupsListModal
          groupSelected={groupSelected}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </Box>
  )
}