import { Box, Popper, TablePagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getOrganizationsList } from '@redux/reducers/organizationsReducer';
import { Organization } from '@services/organizations/interfaces';
import { LMSCard } from '@src/components/lms';
import FullTable from '@src/components/table/FullTable';
import {
  OrderBy,
  organizationsColumns,
  organizationsTableHeaderRenderer,
  organizationsTableRowsRenderer
} from '@src/pages/organizations/organizations-list/OrganizationsColumns';
import OrganizationsListHeader from '@src/pages/organizations/organizations-list/OrganizationsListHeader';
import OrganizationsListPopperContent from '@src/pages/organizations/organizations-list/OrganizationsListPopperContent';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';

export default function OrganizationsList() {
  const dispatch = useAppDispatch();

  const { organizationListData, organizationListLoading, organizationListTotalCount } =
    useAppSelector((state) => state.organizations.organizationList);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [organizationSelected, setOrganizationSelected] = useState<Organization | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const defaultOrganizationListRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    };

    const organizationRequestConfig =
      orderBy === null
        ? { ...defaultOrganizationListRequestConfig }
        : {
            ...defaultOrganizationListRequestConfig,
            sort: { field: orderBy.id, direction: orderBy.direction }
          };

    dispatch(getOrganizationsList(organizationRequestConfig));
  }, [currentPage, rowsPerPage, orderBy]);

  const handleSort = (id: 'name' | 'city' | 'is_active') => {
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
  const handleClick = (newOrganization: Organization) => (event: MouseEvent<HTMLElement>) => {
    if (newOrganization.id === organizationSelected?.id) {
      setOrganizationSelected(null);
      setAnchorEl(null);
      return;
    }
    setOrganizationSelected(newOrganization);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box px={[0, 2]} display="flex" width="100%" boxSizing="border-box">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <OrganizationsListHeader />
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
            headerRenderer={organizationsTableHeaderRenderer(handleSort, orderBy)}
            bodyRenderer={organizationsTableRowsRenderer(organizationListData, handleClick)}
            isLoading={organizationListLoading}
            rowsNum={rowsPerPage}
            colsNum={organizationsColumns.length}
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
            count={organizationListTotalCount || 0}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </LMSCard>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="top-end" sx={{ zIndex: 9 }}>
        <OrganizationsListPopperContent
          setAnchorEl={setAnchorEl}
          setOrganizationSelected={setOrganizationSelected}
          organizationSelected={organizationSelected}
        />
      </Popper>
    </Box>
  );
}
