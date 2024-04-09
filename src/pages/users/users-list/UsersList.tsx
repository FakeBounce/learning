import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import UsersListHeader from '@src/pages/users/users-list/UsersListHeader';
import { usersColumns } from '@src/pages/users/users-list/UsersColumns';
import { useState, MouseEvent } from 'react';
import { User } from '@services/users/interfaces';
import { getUsersList } from '@redux/reducers/usersReducer';
import UsersListPopperContent from '@src/pages/users/users-list/UsersListPopperContent';
import LMSPopover from '@src/components/lms/LMSPopover';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';

export default function UsersList() {
  const dispatch = useAppDispatch();

  const { usersListData, usersListLoading, usersListTotalCount } = useAppSelector(
    (state) => state.users.usersList
  );

  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTableChange = (userRequestConfig: TableRequestConfig) => {
    dispatch(getUsersList(userRequestConfig));
  };

  const handleClick = (newUser: User) => (event: MouseEvent<HTMLElement>) => {
    setUserSelected(newUser);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

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
      <LMSPopover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <UsersListPopperContent
          setAnchorEl={setAnchorEl}
          setUserSelected={setUserSelected}
          userSelected={userSelected}
        />
      </LMSPopover>
    </>
  );
}
