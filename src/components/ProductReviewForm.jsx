import axios from 'axios'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from './BaseUrl'

export default function ProductReviewForm({ id, name }) {
    const [yesIcon, setYesIcon] = useState("bi bi-hand-thumbs-up")
    const [noIcon, setNoIcon] = useState("bi bi-hand-thumbs-down")
    const [recommend, setRecommend] = useState(false)
    const [review, setReview] = useState("")

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

    // create review for this product
    const handlePost = () => {
        const token = localStorage.getItem("authToken")
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.user_id
        try {
            const data = {
                review: review,
                recommend: recommend,
                product_id: id,
                created_by: userId,
                created_at: new Date().toISOString(),
            }
            console.log(data)

            axios
                .post(`${BASE_URL}/reviews`, data)
                .then((response) => {
                    console.log("Success:", response.data)
                })
                .catch((error) => {
                    console.error("Error", error)
                })
            setReview("")
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const handleReviewChange = (e) => { setReview(e.target.value) }

    return (
        <div className='bg-light px-2 py-3 mb-3'>
            <Row>
                <h5>Write a review for {name}</h5>
                <p className='mb-0'>
                    Please describe what you liked or disliked about this product and whether you recommend it to others.
                </p>
                <p>Please remember to be polite and follow the <strong>Rules and Guidelines</strong>.</p>
            </Row>
            <Row>
                <Col xs={3} md={2} className='product-form-image'><i className="bi bi-person-square d-flex flex-column justify-content-start" style={{ fontSize: "90px" }}></i></Col>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                value={review}
                                as="textarea"
                                rows={5}
                                onChange={handleReviewChange}
                                className='mb-2'
                                required
                            />
                        </Form.Group>
                        <p className='mb-2'>Do you recommend this product?</p>
                        <div className='d-flex flex-row'>
                            <Col className='d-flex flex-row'>
                                <Button className='d-flex flex-row px-4 me-2' onClick={handleYesClick} variant='secondary'>
                                    <i className={`${yesIcon} my-1`} style={{ fontSize: "16px" }}></i>
                                    <p className='ms-2 my-1' style={{ fontSize: "16px" }}>Yes</p>
                                </Button>
                                <Button className='d-flex flex-row px-4' onClick={handleNoClick} variant='secondary'>
                                    <i className={`${noIcon} my-1`} style={{ fontSize: "16px" }}></i>
                                    <p className='ms-2 my-1' style={{ fontSize: "16px" }}>No</p>
                                </Button>
                            </Col>
                            <Col className='d-flex flex-row justify-content-end'>
                                <Button className='d-flex flex-row px-3' onClick={handlePost} variant='danger'>
                                    <p className='ms-2 my-1'>Post review</p>
                                </Button>
                            </Col>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
