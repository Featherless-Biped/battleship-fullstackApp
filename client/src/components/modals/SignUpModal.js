import React from "react";
import { Modal } from "react-bootstrap";
import SignUpForm from "../forms/SignUpForm";
// import { useState } from "react";

function SignUpModal({ visible, onClose, setToken, setUserId }) {
    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                <SignUpForm onClose={onClose} setToken={setToken} setUserId={setUserId} />
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal;