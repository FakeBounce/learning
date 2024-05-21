import { t } from '@lingui/macro';
import * as Yup from 'yup';
import { fileValidator } from '@utils/helpers/validators';

export const modulesMediaVideoFormSchema = Yup.object().shape({
  url: Yup.string()
    .url(t`Le lien est invalide`)
    .required(t`L'url de la vidéo est requise`),
  name: Yup.string().required(t`Le nom de la vidéo est requis`)
});

export interface ModulesVideoDetailForm {
  url: string;
  name: string;
}

export interface ModulesAudioDetailForm extends ModulesVideoDetailForm {}

export const modulesMediaImageFormSchema = Yup.object().shape({
  file: fileValidator.required(t`Le fichier est requis`),
  name: Yup.string().required(t`Le nom de l'image est requis`)
});

export interface ModulesImageDetailForm {
  file: File | string;
  name: string;
}

export const modulesMediaDocumentFormSchema = Yup.object().shape({
  file: Yup.mixed<File | string>()
    .test('fileSize', t`Le fichier est trop volumineux`, (value: File | string | undefined) => {
      if (!value) {
        return true;
      } // No file uploaded, validation fails
      if (typeof value === 'string' && !value.trim()) {
        return false;
      } // Empty string, validation fails
      if (value instanceof File) {
        return value.size <= 200000; // Adjust file size limit as needed (200000 bytes = 200kb)
      }
      return true; // Non-empty string (filename), validation passes
    })
    .test('fileType', t`Le type de fichier est invalide`, (value: File | string | undefined) => {
      if (!value) {
        return false;
      } // No file uploaded, validation fails
      if (typeof value === 'string' && !value.trim()) {
        return false;
      } // Empty string, validation fails
      if (value instanceof File) {
        return ['application/pdf'].includes(value.type);
      }
      return true; // Non-empty string (filename), validation passes
    })
    .required(t`Le fichier est requis`),
  name: Yup.string().required(t`Le nom de l'image est requis`)
});

export const modulesMediaAudioFormSchema = Yup.object().shape({
  url: Yup.string()
    .url(t`Le lien est invalide`)
    .required(t`L'url de la vidéo est requise`),
  name: Yup.string().required(t`Le nom de la vidéo est requis`)
});
