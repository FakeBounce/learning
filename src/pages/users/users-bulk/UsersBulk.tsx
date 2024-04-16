import { t } from '@lingui/macro';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from '@redux/hooks';
import { PATH_USERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { UserForBulk } from '@services/users/interfaces';
import { createBulkUser } from '@redux/actions/usersActions';
import { resetUserState } from '@redux/reducers/usersReducer';
import UsersBulkContent from '@src/pages/users/users-bulk/UsersBulkContent';
import { extractUserFromCsv } from '@utils/helpers/csvUsersExtractor';

export default function UsersBulk() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [validRows, setValidRows] = useState<UserForBulk[]>([]);
  const [faultyRows, setFaultyRows] = useState<UserForBulk[]>([]);

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
      const { validRows, faultyRows } = extractUserFromCsv(_data);
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
      setFileError(t`Aucun utilisateur valide à ajouter`);
      return;
    }

    try {
      await dispatch(createBulkUser(validRows));
      navigate(PATH_USERS.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetUserState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <UsersBulkContent
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
