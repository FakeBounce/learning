import * as Yup from 'yup';
import { t } from '@lingui/macro';
import { UseFormSetError } from 'react-hook-form';

export const fileValidator = Yup.mixed<File | string>()
  // .test('fileRequired', t`La photo de profil est requise`, (value) => {
  //   return !!value; // File or empty string, validation passes
  // })
  .test('fileSize', t`Le fichier est trop volumineux`, (value: File | string | undefined) => {
    if (!value) return true; // No file uploaded, validation fails
    if (typeof value === 'string' && !value.trim()) return false; // Empty string, validation fails
    if (value instanceof File) {
      return value.size <= 200000; // Adjust file size limit as needed (200000 bytes = 200kb)
    }
    return true; // Non-empty string (filename), validation passes
  })
  .test('fileType', t`Le type de fichier est invalide`, (value: File | string | undefined) => {
    if (!value) return false; // No file uploaded, validation fails
    if (typeof value === 'string' && !value.trim()) return false; // Empty string, validation fails
    if (value instanceof File) {
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }
    return true; // Non-empty string (filename), validation passes
  });

export const verifyFileForUpload = async (
  file: File | string | undefined,
  setError: UseFormSetError<any>
) => {
  let isValid = false;
  await fileValidator
    .validate(file)
    .then(() => {
      isValid = true;
    })
    .catch((e) => {
      setError('profilePicture', {
        type: 'manual',
        message: e.message
      });
    });

  return isValid;
};
