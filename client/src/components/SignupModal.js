import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import handleSubmit from './Join.js';
import CopyToClipboard from 'react-copy-to-clipboard';



function SignupModal(props) {

    const ValidGuest = props.ValidGuest;
    const ValidPassword = props.ValidPassword;
    const ValidUsername = props.ValidUsername;


    if(ValidGuest){
    return(
        <>
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl" >
            <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Enter a guest name or make sure the guest name is 15 characters or less
            </Modal.Body>
            <Modal.Footer>
            <Button  onClick={props.onHide}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </> 
    )
    }
    else if(!ValidPassword || !ValidUsername) {
        return(
            <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter"
            centered
            size="xl" >
                <Modal.Header closeButton>
                <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Invalid Login/Password
                </Modal.Body>
                <Modal.Footer>
                <Button  onClick={props.onHide}>
                    close
                </Button>
                </Modal.Footer>
            </Modal>
            </> 
        )
        }
}





export default SignupModal;