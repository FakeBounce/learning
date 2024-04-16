import { MouseEvent, useContext } from 'react';
import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import GroupsListHeader from '@src/pages/groups/groups-list/GroupsListHeader';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { groupsColumns } from '@src/pages/groups/groups-list/GroupsColumns';
import { Group } from '@services/groups/interfaces';
import LMSPopover from '@src/components/lms/LMSPopover';
import GroupsListPopperContent from '@src/pages/groups/groups-list/GroupsListPopperContent';
import { deleteGroup, getGroupsList } from '@redux/actions/groupsActions';
import GroupsListModal from '@src/pages/groups/groups-list/GroupsListModal';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { defaultTableRequestConfig, TableRequestConfig } from '@services/interfaces';
import { enqueueSnackbar } from 'notistack';
import { resetGroupsState } from '@redux/reducers/groupsReducer';

export default function GroupsList() {
  const dispatch = useAppDispatch();
  const { groupsListData, groupsListLoading, groupsListTotalCount } = useAppSelector(
    (state) => state.groups.groupsList
  );

  const [groupSelected, setGroupSelected] = useState<Group | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupTableRequestConfig, setGroupTableRequestConfig] =
    useState<TableRequestConfig>(defaultTableRequestConfig);

  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canUpdateGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);
  const canDeleteGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.DELETE);

  const handleTableChange = (groupRequestConfig: TableRequestConfig) => {
    setGroupTableRequestConfig(groupRequestConfig);
    dispatch(getGroupsList(groupRequestConfig));
  };

  const handleDeleteGroup = async () => {
    if (groupSelected !== null) {
      try {
        await dispatch(deleteGroup({ groupId: groupSelected.id }));
        dispatch(getGroupsList(groupTableRequestConfig));
      } catch (e) {
        dispatch(resetGroupsState());
        enqueueSnackbar(e as string, { variant: 'error' });
      }
      // Reset the popper
      cancelModal();
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
    <Box px={[0, 2]} display={'flex'} width={'100%'} boxSizing={'border-box'}>
      <LMSCard isPageCard contentPadding={0} header={<GroupsListHeader />}>
        <TableWithSortAndFilter
          rows={groupsListData}
          columns={groupsColumns(handleClick, canUpdateGroup || canDeleteGroup)}
          loading={groupsListLoading}
          rowCount={groupsListTotalCount}
          onChange={handleTableChange}
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
          handleDeleteGroup={handleDeleteGroup}
        />
      )}
    </Box>
  );
}
