import { t } from '@lingui/macro';
import { useCallback, useState } from 'react';
import { extractExternalTestersFromCsv } from '@utils/helpers/csvExtractor';
import { ApplicantForBulk, ApplicantType } from '@services/applicants/interfaces';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from '@redux/hooks';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { resetApplicantState } from '@redux/reducers/applicantsReducer';
import { createBulkApplicant } from '@redux/actions/applicantsActions';
import { enqueueSnackbar } from 'notistack';
import ExternalTestersBulkContent from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulkContent';

export default function ExternalTestersBulk() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [validRows, setValidRows] = useState<ApplicantForBulk[]>([]);
  const [faultyRows, setFaultyRows] = useState<ApplicantForBulk[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDropAvatar = useCallback(async (acceptedFiles: any) => {
    setFileError(null);
    const csvFile = acceptedFiles[0];

    // 1. create url from the file
    const fileUrl = URL.createObjectURL(csvFile);

    // 2. use fetch API to read the file
    const response = await fetch(fileUrl);

    // 3. get the text from the response
    const text = await response.text();

    // 4. split the text by newline
    const lines = text.split('\r\n');

    // 5. map through all the lines and split each line by comma.
    const _data = lines.map((line) => line.split(','));

    try {
      const { validRows, faultyRows } = extractExternalTestersFromCsv(_data);
      setValidRows(validRows);
      setFaultyRows(faultyRows);
      setFileUploaded(csvFile);
    } catch (error: any) {
      setFileError(error?.message);
    }
  }, []);

  const removeFile = () => {
    setFileUploaded(null);
    setValidRows([]);
    setFaultyRows([]);
  };

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    if (!fileUploaded) {
      setFileError(t`Veuillez sélectionner un fichier`);
      return;
    }
    if (validRows.length === 0) {
      setFileError(t`Aucun testeur valide à ajouter`);
      return;
    }
    const bulkApplicantRequest = validRows.map((applicantForBulk) => ({
      ...applicantForBulk,
      // @todo - Wait for API to accept regular phone numbers
      phone: applicantForBulk.phone === '' ? undefined : `+${applicantForBulk.phone}`
    }));

    try {
      await dispatch(
        createBulkApplicant({ applicantList: bulkApplicantRequest, type: ApplicantType.TESTER })
      );
      navigate(PATH_EXTERNAL_TESTERS.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetApplicantState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ExternalTestersBulkContent
          handleDropAvatar={handleDropAvatar}
          fileUploaded={fileUploaded}
          removeFile={removeFile}
          fileError={fileError}
          validRows={validRows}
          faultyRows={faultyRows}
        />
      </form>
    </FormProvider>
  );
}
