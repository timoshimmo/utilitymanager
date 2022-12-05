import Modal from "./modal";
import { MODAL_VIEWS, useModalAction, useModalState } from "./modal.context";
import UpdateStatusView from "../../messages/update-status-view";
import AddEquipmentForm from "../forms/add-equipment-form";

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case "UPDATE_STATUS":
      return <UpdateStatusView />;
    case "ADD_EQUIPMENT":
      return <AddEquipmentForm />;
    default:
      return null;
  }
}

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  );
};

export default ManagedModal;
