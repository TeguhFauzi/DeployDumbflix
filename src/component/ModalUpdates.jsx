import { Modal } from "react-bootstrap";
import Update from "./ModalUpdate";

export default function ModalUpdates(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} handleSuccess={props.handleSuccess} centered>
                <Modal.Body className="bg-dark rounded border-0">
                    <Update onHide={props.onHide} handleSuccess={props.handleSuccess}/>
                </Modal.Body>
            </Modal>
        </>
    )
}