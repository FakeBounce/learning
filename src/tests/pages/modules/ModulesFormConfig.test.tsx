import { render, screen, fireEvent, act, renderHook } from '@testProvider';
import { FormProvider, useForm } from 'react-hook-form';
import ModulesFormConfig from '@src/pages/modules/ModulesFormConfig';
import { answersOptions } from '@src/pages/modules/modules-create/ModulesCreateSchema';

describe('ModulesFormConfig', () => {
  it('renders ModulesFormConfig correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;

    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <ModulesFormConfig />
          </form>
        </FormProvider>
      );
    });

    expect(screen.getByLabelText(/Affichage des réponses/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recommencer/i)).toBeInTheDocument();
  });

  it('respect regex inputs', async () => {
    const methods = renderHook(() =>
      useForm({
        defaultValues: {
          timer: '00:00',
          successRate: '',
          nbAttempts: '',
          isLocked: false,
          isPublic: false,
          displayAnswers: answersOptions[0].value
        }
      })
    ).result.current;

    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <ModulesFormConfig />
          </form>
        </FormProvider>
      );
    });

    const regexInput = screen.getByLabelText(/Recommencer/i);

    fireEvent.change(regexInput, { target: { value: '20' } });

    expect(regexInput).toHaveValue('20');

    await act(async () => {
      fireEvent.input(regexInput, { target: { value: 'test' } });
    });

    expect(regexInput).toHaveValue('20');

    const regexInput2 = screen.getByLabelText(/Validation du module/i);

    await act(async () => {
      fireEvent.input(regexInput2, { target: { value: '20' } });
    });

    expect(regexInput2).toHaveValue('20');

    await act(async () => {
      fireEvent.input(regexInput2, { target: { value: 'test' } });
    });

    expect(regexInput2).toHaveValue('20');
  });
});
