import { Box, Popper, TablePagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getOrganisationsList } from '@redux/reducers/organisationsReducer';
import { Organisation } from '@services/organisations/interfaces';
import { LMSCard } from '@src/components/lms';
import FullTable from '@src/components/table/FullTable';
import {
  OrderBy,
  organisationsColumns,
  organisationsTableHeaderRenderer,
  organisationsTableRowsRenderer
} from '@src/pages/organisations/organisations-list/OrganisationsColumns';
import OrganisationsListHeader from '@src/pages/organisations/organisations-list/OrganisationsListHeader';
import OrganisationsListPopperContent from '@src/pages/organisations/organisations-list/OrganisationsListPopperContent';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';

export default function OrganisationsList() {
  const dispatch = useAppDispatch();

  const { organisationListData, organisationListLoading, organisationListTotalCount } =
    useAppSelector((state) => state.organisations.organisationList);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [organisationSelected, setOrganisationSelected] = useState<Organisation | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const defaultOrganisationListRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    };

    const organisationRequestConfig =
      orderBy === null
        ? { ...defaultOrganisationListRequestConfig }
        : {
            ...defaultOrganisationListRequestConfig,
            sort: { field: orderBy.id, direction: orderBy.direction }
          };

    dispatch(getOrganisationsList(organisationRequestConfig));
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
  const handleClick = (newOrganisation: Organisation) => (event: MouseEvent<HTMLElement>) => {
    if (newOrganisation.id === organisationSelected?.id) {
      setOrganisationSelected(null);
      setAnchorEl(null);
      return;
    }
    setOrganisationSelected(newOrganisation);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box px={[0, 2]} width="100%" sx={{ overflowX: 'hidden' }}>
      <LMSCard isPageCard>
        <OrganisationsListHeader />
        <Box
          sx={{
            maxWidth: '100%',
            maxHeight: '68vh',
            padding: 0,
            position: 'relative',
            overflowX: ['hidden', 'scroll']
          }}
        >
          <FullTable
            headerRenderer={organisationsTableHeaderRenderer(handleSort, orderBy)}
            bodyRenderer={organisationsTableRowsRenderer(organisationListData, handleClick)}
            isLoading={organisationListLoading}
            rowsNum={rowsPerPage}
            colsNum={organisationsColumns.length}
          />
          <TablePagination
            sx={{ height: '6vh', position: 'sticky', right: 0, bottom: 0 }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={organisationListTotalCount || 0}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </LMSCard>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="top-end">
        <OrganisationsListPopperContent
          setAnchorEl={setAnchorEl}
          setOrganisationSelected={setOrganisationSelected}
          organisationSelected={organisationSelected}
        />
      </Popper>
    </Box>
  );
}
