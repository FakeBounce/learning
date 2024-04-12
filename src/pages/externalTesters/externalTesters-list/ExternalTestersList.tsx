import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getApplicantsList } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import { MouseEvent, useState } from 'react';
import LMSPopover from '@src/components/lms/LMSPopover';
import { Applicant, ApplicantType } from '@services/applicants/interfaces';
import { externalTestersColumns } from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListColumns';
import ExternalTestersListHeader from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListHeader';
import ExternalTestersListModal from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListModal';
import ExternalTestersListPopperContent from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListPopperContent';
import { TableRequestConfig } from '@services/interfaces';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';

export default function ApplicantsList() {
  const dispatch = useAppDispatch();

  const { applicantListData, applicantListLoading, applicantListTotalCount } = useAppSelector(
    (state) => state.applicants.applicantList
  );

  const [applicantSelected, setApplicantSelected] = useState<Applicant | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTableChange = (applicantRequestConfig: TableRequestConfig) => {
    dispatch(getApplicantsList({ ...applicantRequestConfig, type: ApplicantType.TESTER }));
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
    <>
      <LMSCard isPageCard contentPadding={0} header={<ExternalTestersListHeader />}>
        <TableWithSortAndFilter
          columns={externalTestersColumns(handleClick)}
          rows={applicantListData}
          loading={applicantListLoading}
          rowCount={applicantListTotalCount}
          onChange={handleTableChange}
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
    </>
  );
}
