import Form from '../components/Form'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'

const Contact = () => {
  const [show, setShow] = useState(false)
  const [stateFromChild, setStateFromChild] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

    console.log('state from child', stateFromChild)

  return (
    <>
      <h3>This is contact {stateFromChild} </h3>
      <Button variant="primary" onClick={handleShow}>
        Contact us
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form setShow={setShow} setStateFromChild={setStateFromChild} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Contact