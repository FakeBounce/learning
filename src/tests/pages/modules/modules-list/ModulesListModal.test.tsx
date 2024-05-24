import { cleanup, render, screen, act, fireEvent } from '@testProvider';
import ModulesListModal from '@src/pages/modules/modules-list/ModulesListModal';
import { moduleComposedViewer } from '@src/tests/pages/modules/defaultModule';

describe('ModulesListModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render ModulesListModal correctly', () => {
    const cancelModal = jest.fn();

    render(
      <ModulesListModal
        handleDeleteModule={jest.fn()}
        moduleSelected={moduleComposedViewer}
        isModalOpen={true}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(/Supprimer un module/i)).toBeInTheDocument();
    expect(screen.getByText(moduleComposedViewer.title)).toBeInTheDocument();
  });

  it('should delete the module and close the modal', () => {
    const handleDeleteModule = jest.fn();
    const cancelModal = jest.fn();

    render(
      <ModulesListModal
        handleDeleteModule={handleDeleteModule}
        moduleSelected={moduleComposedViewer}
        isModalOpen={true}
        cancelModal={cancelModal}
      />
    );

    const deleteBtn = screen.getByText(/Valider/i);

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(handleDeleteModule).toHaveBeenCalledTimes(1);
    expect(cancelModal).toHaveBeenCalledTimes(1);
  });

  it("shouldn't delete if the module is null", () => {
    const cancelModal = jest.fn();
    const handleDeleteModule = jest.fn();

    render(
      <ModulesListModal
        handleDeleteModule={handleDeleteModule}
        moduleSelected={null}
        isModalOpen={true}
        cancelModal={cancelModal}
      />
    );

    const deleteBtn = screen.getByText(/Valider/i);

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(handleDeleteModule).not.toHaveBeenCalled();
    expect(cancelModal).not.toHaveBeenCalled();
  });
});
