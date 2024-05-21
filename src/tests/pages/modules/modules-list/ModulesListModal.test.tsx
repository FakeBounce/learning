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
        moduleSelected={moduleComposedViewer}
        isModalOpen={true}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(/Supprimer un module/i)).toBeInTheDocument();
    expect(screen.getByText(moduleComposedViewer.title)).toBeInTheDocument();
  });

  it('should delete the module and close the modal', () => {
    const cancelModal = jest.fn();

    render(
      <ModulesListModal
        moduleSelected={moduleComposedViewer}
        isModalOpen={true}
        cancelModal={cancelModal}
      />
    );

    const deleteBtn = screen.getByText(/Valider/i);

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(cancelModal).toHaveBeenCalledTimes(1);
  });

  it("shouldn't delete if the module is null", () => {
    const cancelModal = jest.fn();

    render(<ModulesListModal moduleSelected={null} isModalOpen={true} cancelModal={cancelModal} />);

    const deleteBtn = screen.getByText(/Valider/i);

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(cancelModal).not.toHaveBeenCalled();
  });
});
