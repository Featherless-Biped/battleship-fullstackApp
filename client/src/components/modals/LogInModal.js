import React from "react";
import { Modal } from "react-bootstrap";
import LogInForm from "../forms/LogInForm";
// import { useState } from "react";

function LogInModal({ visible, onClose, setToken, setUserId }) {
    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                <LogInForm onClose={onClose} setToken={setToken} setUserId={setUserId} />
            </Modal.Body>
        </Modal>
    )
}

export default LogInModal;