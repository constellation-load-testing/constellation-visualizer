import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HelpModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{height: "38px", backgroundColor: "#002e79", borderColor: "#002e79"}}>
        Help
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#002e79"}}>Constellation Help</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#002e79" }}>
          <ul>
            <li>Click on the legend to hide/show the data for that region</li>
            <li>Hover over the data points to see the exact time and latency</li>
            <li>Select what regions you would like to see by using the dropdown labeled "Regions"</li>
            <li>Select at what time interval you would like the data aggregated. Using the dropdown labeled "Aggregate Line Graph"</li>
            <li>The first 2% of all data points are removed from the line graph to account for the initial high latency spike. Click "Exclude First 2%" to toggle</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default HelpModal;
