import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NewProductModal from '../components/NewProductModal'

export default function AdminPage() {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <Container>
            <Row>
                <Col
                    md={2}
                    className='d-flex flex-column justify-content-start align-items-start bg-light vh-100'
                >
                    <h4>Admin Sidebar</h4>
                    <Button variant='primary' style={{ width: "100%", borderRadius: "10px" }} onClick={handleShow}>+</Button>
                </Col>
                <Col md={5}>
                    <p>show recent products</p>
                </Col>
                <Col md={5}>
                    <p>show recent reviews</p>
                </Col>
            </Row>

            <NewProductModal show={show} handleClose={handleClose} />
        </Container>
    )
}
