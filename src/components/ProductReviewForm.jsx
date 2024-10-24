import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function ProductReviewForm() {
    const [recommend, setRecommend] = useState(false)
    const [yesIcon, setYesIcon] = useState("bi bi-hand-thumbs-up")
    const [noIcon, setNoIcon] = useState("bi bi-hand-thumbs-down")

    // review form button interaction
    const handleYesClick = () => {
        setRecommend(true)
        setNoIcon("bi bi-hand-thumbs-down")
        setYesIcon("bi bi-hand-thumbs-up-fill")
    }
    const handleNoClick = () => {
        setRecommend(false)
        setYesIcon("bi bi-hand-thumbs-up")
        setNoIcon("bi bi-hand-thumbs-down-fill")
    }


    return (
        <div className='bg-light px-3 py-3'>
            <Row>
                <h5>Write a review for Product Name</h5>
                <p className='mb-0'>
                    Please describe what you liked or disliked about this product and whether you recommend it to others.
                </p>
                <p>Please remember to be polite and follow the <strong>Rules and Guidelines</strong>.</p>
            </Row>
            <Row>
                <Col md={2}><i className="bi bi-person-square d-flex flex-column justify-content-start" style={{ fontSize: "100px" }}></i></Col>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                onChange=""
                                className='mb-2'
                                required
                            />
                        </Form.Group>
                        <p className='mb-2'>Do you recommend this product?</p>
                        <div className='d-flex flex-row'>
                            <Col className='d-flex flex-row'>
                                <Button className='d-flex flex-row px-4 me-2' >
                                    <i className={`${yesIcon} my-1`} style={{ fontSize: "16px" }} onClick={handleYesClick}></i>
                                    <p className='ms-2 my-1' style={{ fontSize: "16px" }}>Yes</p>
                                </Button>
                                <Button className='d-flex flex-row px-4'>
                                    <i className={`${noIcon} my-1`} style={{ fontSize: "16px" }} onClick={handleNoClick}></i>
                                    <p className='ms-2 my-1' style={{ fontSize: "16px" }}>No</p>
                                </Button>
                            </Col>
                            <Col className='d-flex flex-row justify-content-end'>
                                <Button className='d-flex flex-row px-4'>
                                    <p className='ms-2 my-1' style={{ fontSize: "16px" }}>Post review</p>
                                </Button>
                            </Col>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
