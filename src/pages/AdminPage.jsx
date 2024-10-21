import { Col, Container, Row } from 'react-bootstrap'

export default function AdminPage() {
    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col>left column</Col>
                <Col md={6}>
                    Add product modal
                </Col>
                <Col>right column</Col>
            </Row>
        </Container>
    )
}
