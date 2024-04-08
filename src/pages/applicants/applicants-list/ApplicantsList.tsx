import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getApplicantsList } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import {
  applicantsColumns,
  applicantsTableHeaderRenderer,
  applicantsTableRowsRenderer
} from './ApplicantsListColumns';
import ApplicantsListHeader from './ApplicantsListHeader';
import ApplicantsListPopperContent from './ApplicantsListPopperContent';
import { MouseEvent, useState } from 'react';
import LMSPopover from '@src/components/lms/LMSPopover';
import { Applicant, ApplicantType } from '@services/applicants/interfaces';
import ApplicantsListModal from '@src/pages/applicants/applicants-list/ApplicantsListModal';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';

export default function ApplicantsList() {
  const dispatch = useAppDispatch();

  const { applicantListData, applicantListLoading, applicantListTotalCount } = useAppSelector(
    (state) => state.applicants.applicantList
  );

  const [applicantSelected, setApplicantSelected] = useState<Applicant | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTableChange = (applicantRequestConfig: TableRequestConfig) => {
    dispatch(getApplicantsList({ ...applicantRequestConfig, type: ApplicantType.STUDENT }));
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
      <LMSCard isPageCard contentPadding={0} header={<ApplicantsListHeader />}>
        <TableWithSortAndFilter
          headerRenderer={applicantsTableHeaderRenderer}
          rowsRenderer={applicantsTableRowsRenderer(applicantListData, handleClick)}
          totalRows={applicantListTotalCount}
          onChange={handleTableChange}
          isTableLoading={applicantListLoading}
          skeletonCols={applicantsColumns.length}
        />
      </LMSCard>
      <LMSPopover id={id} open={open} anchorEl={anchorEl} placement="top-end">
        <ApplicantsListPopperContent
          handleToggleBlock={() => setIsModalOpen(true)}
          applicantSelected={applicantSelected}
        />
      </LMSPopover>
      {applicantSelected && (
        <ApplicantsListModal
          applicantSelected={applicantSelected}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cancelModal={cancelModal}
        />
      )}
    </>
  );
}
