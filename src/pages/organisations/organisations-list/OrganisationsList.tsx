import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getOrganisationsList } from '@redux/actions/organisationsActions';
import { Organisation } from '@services/organisations/interfaces';
import { LMSCard } from '@src/components/lms';
import FullTable from '@src/components/table/FullTable';
import {
  OrderBy,
  organisationsListColumns,
  organisationsTableHeaderRenderer,
  organisationsTableRowsRenderer
} from '@src/pages/organisations/organisations-list/OrganisationsListColumns';
import OrganisationsListHeader from '@src/pages/organisations/organisations-list/OrganisationsListHeader';
import OrganisationsListPopperContent from '@src/pages/organisations/organisations-list/OrganisationsListPopperContent';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import Pagination from '@src/components/table/Pagination';
import LMSPopover from '@src/components/lms/LMSPopover';

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
      handlePopperClose();
      return;
    }
    setOrganisationSelected(newOrganisation);
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
    setOrganisationSelected(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box p={[0, 2]} display="flex" width="100%" boxSizing="border-box">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <OrganisationsListHeader />

        <FullTable
          headerRenderer={organisationsTableHeaderRenderer(handleSort, orderBy)}
          bodyRenderer={organisationsTableRowsRenderer(organisationListData, handleClick)}
          isLoading={organisationListLoading}
          rowsNum={rowsPerPage}
          colsNum={organisationsListColumns.length}
        />
        <Pagination
          totalCount={organisationListTotalCount || 0}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} placement="top-end">
        <OrganisationsListPopperContent
          onClose={handlePopperClose}
          setOrganisationSelected={setOrganisationSelected}
          organisationSelected={organisationSelected}
        />
      </LMSPopover>
    </Box>
  );
}
