import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal } from 'react-bootstrap';

class Modal extends Component {
  render(){
    return(
      <Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Modal body text goes here.</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary">Close</Button>
    <Button variant="primary">Save changes</Button>
  </Modal.Footer>
</Modal.Dialog>;
    )
  }
}

export default Modal;
