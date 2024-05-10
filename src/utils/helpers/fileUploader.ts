import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function uploader(
  e: ChangeEvent<HTMLInputElement>,
  setResult: Dispatch<SetStateAction<string | null>>
) {
  if (!e.target.files) {
    return;
  }
  const imageFile = e.target.files[0];

  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    if (!e.target) {
      return;
    }
    setResult(e.target.result as string);
  });

  reader.readAsDataURL(imageFile);
}
