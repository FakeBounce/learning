import { render, screen, fireEvent, act, renderHook, waitFor } from '@testProvider';
import { FormProvider, useForm } from 'react-hook-form';
import ModulesForm from '@src/pages/modules/modules-form/ModulesForm';

describe('ModulesForm', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'dummy-preview-url');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ModulesForm correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;

    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <ModulesForm />
          </form>
        </FormProvider>
      );
    });

    expect(screen.getByLabelText(/Affichage des réponses/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recommencer/i)).toBeInTheDocument();
    expect(screen.getByTestId('mce-editor-description')).toBeInTheDocument();
  });

  it('uploads a file, and then deletes it correctly', async () => {
    const methods = renderHook(() =>
      useForm({
        defaultValues: {
          media: null // Ensure the default value for media is null
        }
      })
    ).result.current;

    render(
      <FormProvider {...methods}>
        <form>
          <ModulesForm />
        </form>
      </FormProvider>
    );

    const uploadInput = screen.getByTestId('illustration-upload-box').querySelector('input');
    const file = new File(['content'], 'test.png', { type: 'image/png' });

    // Simulate file drop
    await act(async () => {
      fireEvent.drop(uploadInput as Node, { dataTransfer: { files: [file], types: ['Files'] } });
    });

    await waitFor(() => {
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
      expect(methods.getValues('media')).toEqual(
        expect.objectContaining({
          path: 'test.png',
          preview: 'dummy-preview-url'
        })
      );
    });

    // Simulate hover to show remove button
    const illustrationBox = screen.getByTestId('illustration-upload-box');
    fireEvent.mouseEnter(illustrationBox);

    const removeButton = screen.getByTestId('illustration-upload-box-remove');

    // Simulate removal of the file
    await act(async () => {
      fireEvent.click(removeButton);
    });

    await waitFor(() => {
      expect(methods.getValues('media')).toBeNull();
    });
  });

  it('should be disabled', async () => {
    const methods = renderHook(() =>
      useForm({
        defaultValues: {
          media: null // Ensure the default value for media is null
        }
      })
    ).result.current;

    render(
      <FormProvider {...methods}>
        <form>
          <ModulesForm disabled />
        </form>
      </FormProvider>
    );

    expect(screen.getByTestId('illustration-upload-box').querySelector('input')).toBeDisabled();
    expect(screen.getByRole('textbox', { name: /Nom du module/i })).toBeDisabled();
    expect(screen.getByLabelText(/Langue/i)).toBeDisabled();
    expect(screen.getByTestId('mce-editor-description')).toBeDisabled();
  });
});
