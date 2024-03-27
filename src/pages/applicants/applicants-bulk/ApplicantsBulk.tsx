import { Box, Typography } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import ApplicantsCreateHeader from '@src/pages/applicants/applicants-create/ApplicantsCreateHeader';
import ApplicantsCreateFooter from '@src/pages/applicants/applicants-create/ApplicantsCreateFooter';
import UploadBox from '@src/components/lms/UploadBox';
import { Trans } from '@lingui/macro';
import Iconify from '@src/components/iconify/Iconify';
import { useCallback, useState } from 'react';
import { extractApplicantsFromCsv } from '@utils/helpers/csvExtractor';

export default function ApplicantsBulk() {
  const [error, setError] = useState<string>('');

  const handleDropAvatar = useCallback(async (acceptedFiles: any) => {
    setError('');
    console.log('acceptedFiles', acceptedFiles[0]);
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
      const { validRows, faultyRows } = extractApplicantsFromCsv(_data);
      console.log('Valid Rows:', validRows);
      console.log('Faulty Rows:', faultyRows);
    } catch (error: any) {
      console.log('error', error);
      console.error('Error while extracting applicants from csv', error);
      setError(error?.message);
    }
  }, []);

  return (
    <Box px={[0, 2]} display="flex" flex="1 1 0">
      <LMSCard isPageCard header={<ApplicantsCreateHeader />} footer={<ApplicantsCreateFooter />}>
        <Box display="flex" px={2}>
          <UploadBox
            onDrop={handleDropAvatar}
            sx={{ display: 'flex', flex: '1 1 0', minWidth: 240 }}
            placeholder={
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Iconify icon="eva:cloud-upload-fill" width={28} />
                <Typography variant="body2">
                  <Trans>Sélectionnez un fichier</Trans>
                </Typography>
                <Typography variant="body2">
                  <Trans>Fichier .csv / Max : 3 Mo</Trans>
                </Typography>
              </Box>
            }
          />
        </Box>
        <Box display="flex" p={2}>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </LMSCard>
    </Box>
  );
}
