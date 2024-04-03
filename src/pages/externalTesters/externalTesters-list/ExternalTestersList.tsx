import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getApplicantsList } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import FullTable from '@src/components/table/FullTable';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import Pagination from '@src/components/table/Pagination';
import LMSPopover from '@src/components/lms/LMSPopover';
import { Applicant, ApplicantType } from '@services/applicants/interfaces';
import {
  externalTestersTableHeaderRenderer,
  externalTestersTableRowsRenderer,
  OrderBy,
  externalTestersColumns
} from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListColumns';
import ExternalTestersListHeader from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListHeader';
import ExternalTestersListModal from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListModal';
import ExternalTestersListPopperContent from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListPopperContent';

export default function ApplicantsList() {
  const dispatch = useAppDispatch();

  const { applicantListData, applicantListLoading, applicantListTotalCount } = useAppSelector(
    (state) => state.applicants.applicantList
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [applicantSelected, setApplicantSelected] = useState<Applicant | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const defaultApplicantListRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage,
      type: ApplicantType.TESTER
    };

    const applicantRequestConfig =
      orderBy === null
        ? { ...defaultApplicantListRequestConfig }
        : {
            ...defaultApplicantListRequestConfig,
            sort: { field: orderBy.id, direction: orderBy.direction }
          };

    dispatch(getApplicantsList(applicantRequestConfig));
  }, [currentPage, rowsPerPage, orderBy]);

  const handleSort = (
    id: 'id' | 'externalId' | 'email' | 'lastname' | 'firstname' | 'phone' | 'isActive'
  ) => {
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

  const cancelModal = () => {
    // Reset the popper
    setAnchorEl(null);
    setApplicantSelected(null);
    setIsModalOpen(false);
  };

  // Popper handlers
  const handleClick = (newApplicant: Applicant) => (event: MouseEvent<HTMLElement>) => {
    if (newApplicant.id === applicantSelected?.id) {
      setApplicantSelected(null);
      setAnchorEl(null);
      return;
    }
    setApplicantSelected(newApplicant);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box p={[0, 2]} display="flex" width="100%" boxSizing="border-box">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <ExternalTestersListHeader />

        <FullTable
          headerRenderer={externalTestersTableHeaderRenderer(handleSort, orderBy)}
          bodyRenderer={externalTestersTableRowsRenderer(applicantListData, handleClick)}
          isLoading={applicantListLoading}
          rowsNum={rowsPerPage}
          colsNum={externalTestersColumns.length}
        />
        <Pagination
          totalCount={applicantListTotalCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} placement="top-end">
        <ExternalTestersListPopperContent
          handleToggleBlock={() => setIsModalOpen(true)}
          applicantSelected={applicantSelected}
        />
      </LMSPopover>
      {applicantSelected && (
        <ExternalTestersListModal
          applicantSelected={applicantSelected}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </Box>
  );
}
