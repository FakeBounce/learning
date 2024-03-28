import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import RolesListHeader from '@src/pages/roles/roles-list/RolesListHeader';
import FullTable from '@src/components/table/FullTable';

import Pagination from '@src/components/table/Pagination';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  rolesTableHeaderRenderer,
  rolesTableRowsRenderer,
  OrderBy,
  rolesColumns
} from '@src/pages/roles/roles-list/RolesColumns';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Role } from '@services/roles/interfaces';
import LMSPopover from '@src/components/lms/LMSPopover';
import RolesListPopperContent from '@src/pages/roles/roles-list/RolesListPopperContent';
import { getRolesList } from '@redux/reducers/rolesReducer';
import RolesListModal from '@src/pages/roles/roles-list/RolesListModal';

export default function RolesList() {
  const dispatch = useAppDispatch();

  const { rolesListData, rolesListLoading, rolesListTotalCount } =
    useAppSelector((state) => state.roles.rolesList);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [roleSelected, setRoleSelected] = useState<Role | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const defaultRoleListRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    };

    const rolesRequestConfig =
      orderBy === null
        ? { ...defaultRoleListRequestConfig }
        : {
          ...defaultRoleListRequestConfig,
          sort: { field: orderBy.id, direction: orderBy.direction }
        };

    dispatch(getRolesList(rolesRequestConfig));
  }, [currentPage, rowsPerPage, orderBy]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleSort = (id: 'name' | 'description') => {
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
  const handleClick = (newRole: Role) => (event: MouseEvent<HTMLElement>) => {
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
    <Box p={[0, 2]} display="flex" width="100%" boxSizing="border-box">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <RolesListHeader />

        <FullTable
          headerRenderer={rolesTableHeaderRenderer(handleSort, orderBy)}
          bodyRenderer={rolesTableRowsRenderer(rolesListData, handleClick)}
          isLoading={rolesListLoading}
          rowsNum={rowsPerPage}
          colsNum={rolesColumns.length}
        />
        <Pagination
          totalCount={rolesListTotalCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
    </Box>
  );
}