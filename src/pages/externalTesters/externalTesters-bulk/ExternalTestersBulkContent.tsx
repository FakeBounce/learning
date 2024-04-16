import { Box, Typography } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import UploadBox from '@src/components/lms/UploadBox';
import { Trans } from '@lingui/macro';
import Iconify from '@src/components/iconify/Iconify';
import ApplicantsBulkFooter from '@src/pages/applicants/applicants-bulk/ApplicantsBulkFooter';
import { ApplicantForBulk } from '@services/applicants/interfaces';
import SimpleTable from '@src/components/table/SimpleTable';
import ExternalTestersBulkHeader from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulkHeader';
import { externalTestersBulkColumns } from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulkColumns';

interface ExternalTestersBulkContentProps {
  handleDropAvatar: (acceptedFiles: any) => void;
  fileUploaded: File | null;
  removeFile: () => void;
  fileError: string | null;
  validRows: ApplicantForBulk[];
  faultyRows: ApplicantForBulk[];
}
export default function ExternalTestersBulkContent({
  handleDropAvatar,
  fileUploaded,
  removeFile,
  fileError,
  validRows,
  faultyRows
}: ExternalTestersBulkContentProps) {
  return (
    <Box px={[0, 2]} display="flex" mb={2}>
      <LMSCard
        isPageCard
        contentPadding={0}
        canExpand
        header={<ExternalTestersBulkHeader />}
        footer={<ApplicantsBulkFooter />}
      >
        <Box display="flex" px={4}>
          <UploadBox
            onDrop={handleDropAvatar}
            sx={{ display: 'flex', flex: '1 1 0', minWidth: 240 }}
            disabled={!!fileUploaded}
            file={fileUploaded}
            onDelete={removeFile}
            placeholder={
              fileUploaded ? (
                <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                  {fileUploaded.name}
                </Typography>
              ) : (
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
              )
            }
          />
        </Box>
        {fileError && (
          <Box display="flex" p={2}>
            <Typography variant="body2" color="error">
              {fileError}
            </Typography>
          </Box>
        )}

        {(validRows.length > 0 || faultyRows.length > 0) && (
          <Box display="flex" flexDirection="column" p={2} gap={2}>
            {validRows.length > 0 && (
              <Box display="flex" flexDirection="column" gap={2}>
                {faultyRows.length > 0 && (
                  <Typography variant="h6">
                    <Trans>Liste des testeurs valides</Trans>
                  </Typography>
                )}
                <LMSCard isPageCard contentPadding={0} canExpand cardCss={{ paddingTop: 2 }}>
                  <SimpleTable
                    columns={externalTestersBulkColumns}
                    getRowId={(row) => row.email}
                    rows={validRows}
                  />
                </LMSCard>
              </Box>
            )}

            {faultyRows.length > 0 && (
              <>
                <Typography variant="h6">
                  <Trans>Liste des testeurs invalides</Trans>
                </Typography>
                <LMSCard isPageCard contentPadding={0} canExpand cardCss={{ paddingTop: 2 }}>
                  <SimpleTable
                    columns={externalTestersBulkColumns}
                    getRowId={(row) => row.email}
                    rows={faultyRows}
                  />
                </LMSCard>
              </>
            )}
          </Box>
        )}
      </LMSCard>
    </Box>
  );
}
