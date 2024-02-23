import { Box, Popover, TablePagination } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import FullTable from '@src/components/table/FullTable';
import UsersListHeader from '@src/pages/users/users-list/UsersListHeader';
import {
  usersColumns,
  usersTableHeaderRender,
  usersTableRowsRender,
  OrderBy
} from '@src/pages/users/users-list/UsersColumns';
import { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { User } from '@services/connected-user/interfaces';
import { getUsersList } from '@redux/reducers/usersReducer';
import UsersListPopperContent from '@src/pages/users/users-list/UsersListPopperContent';

export default function UsersList() {
  const dispatch = useAppDispatch();

  const { usersListData, usersListLoading, usersListTotalCount } = useAppSelector(
    (state) => state.users.usersList
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const defaultUserListRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    };

    const userRequestConfig =
      orderBy === null
        ? { ...defaultUserListRequestConfig }
        : {
            ...defaultUserListRequestConfig,
            sort: { field: orderBy.id, direction: orderBy.direction }
          };

    dispatch(getUsersList(userRequestConfig));
  }, [currentPage, rowsPerPage, orderBy]);

  const handleSort = (id: 'lastname' | 'firstname' | 'email' | 'is_active') => {
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

  const handleClick = (newUser: User) => (event: MouseEvent<HTMLElement>) => {
    setUserSelected(newUser);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box px={[0, 2]} display="flex" width="100%" boxSizing="border-box">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <UsersListHeader />
        <Box
          sx={{
            maxWidth: '100%',
            maxHeight: '68vh',
            padding: 0,
            position: 'relative'
          }}
        >
          <FullTable
            maxHeigth={'62vh'}
            headerRenderer={usersTableHeaderRender(handleSort, orderBy)}
            bodyRenderer={usersTableRowsRender(usersListData, handleClick)}
            isLoading={usersListLoading}
            rowsNum={rowsPerPage}
            colsNum={usersColumns.length}
          />
        </Box>
        <Box
          sx={{
            minHeight: 46,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={usersListTotalCount || 0}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </LMSCard>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        sx={{ zIndex: 9 }}
      >
        <UsersListPopperContent
          setAnchorEl={setAnchorEl}
          setUserSelected={setUserSelected}
          userSelected={userSelected}
        />
      </Popover>
    </Box>
  );
}
