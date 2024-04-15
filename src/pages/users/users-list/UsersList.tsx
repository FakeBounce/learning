import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import UsersListHeader from '@src/pages/users/users-list/UsersListHeader';
import { usersColumns } from '@src/pages/users/users-list/UsersColumns';
import { useState, MouseEvent } from 'react';
import { User } from '@services/users/interfaces';
import { getUsersList } from '@redux/actions/usersActions';
import UsersListPopperContent from '@src/pages/users/users-list/UsersListPopperContent';
import LMSPopover from '@src/components/lms/LMSPopover';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';
import UsersListModal from '@src/pages/users/users-list/UsersListModal';

export default function UsersList() {
  const dispatch = useAppDispatch();

  const { usersListData, usersListLoading, usersListTotalCount } = useAppSelector(
    (state) => state.users.usersList
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTableChange = (userRequestConfig: TableRequestConfig) => {
    dispatch(getUsersList(userRequestConfig));
  };

  const cancelModal = () => {
    // Reset the popper
    setAnchorEl(null);
    setUserSelected(null);
    setIsModalOpen(false);
  };

  const handleClick = (newUser: User) => (event: MouseEvent<HTMLElement>) => {
    if (newUser.id === userSelected?.id) {
      setUserSelected(null);
      setAnchorEl(null);
      return;
    }
    setUserSelected(newUser);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper-users' : undefined;

  return (
    <>
      <LMSCard isPageCard contentPadding={0} header={<UsersListHeader />}>
        <TableWithSortAndFilter
          columns={usersColumns(handleClick)}
          rows={usersListData}
          loading={usersListLoading}
          rowCount={usersListTotalCount}
          onChange={handleTableChange}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl}>
        <UsersListPopperContent
          handleToggleBlock={() => setIsModalOpen(true)}
          userSelected={userSelected}
        />
      </LMSPopover>
      {userSelected && (
        <UsersListModal
          userSelected={userSelected}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </>
  );
}
