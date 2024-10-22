import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { BASE_URL } from './BaseUrl'

export default function NewProductModal({ show, handleClose }) {
    const [productName, setProductName] = useState("")
    // const [productImage, setProductImage] = useState(null)
    const [productImage, setProductImage] = useState("")
    const [productSpecs, setProductSpecs] = useState("")
    const [productPros, setProductPros] = useState("")
    const [productCons, setProductCons] = useState("")
    const [productLink, setProductLink] = useState("")
    const [productVideo, setProductVideo] = useState("")

    // to create function for image storage
    const handleSave = () => {
        const data = {
            name: productName,
            image_url: productImage,
            specification: productSpecs,
            pros: productPros,
            cons: productCons,
            referral_link: productLink,
            video_url: productVideo,
            created_at: new Date().toISOString(),
        };

        axios
            .post(`${BASE_URL}/products`, data)
            .then((response) => {
                console.log("Success:", response.data)
                handleClose()
            })
            .catch((error) => {
                console.error("Error", error)
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>Add a new product, please fill in the details.</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                placeholder="Enter product name"
                                onChange={(e) => setProductName(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                placeholder="Upload product image"
                                onChange={(e) => setProductImage(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                placeholder="Enter product specification"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setProductSpecs(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                placeholder="Enter product pros"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setProductPros(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                placeholder="Enter product cons"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setProductCons(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                placeholder="Enter product referral link"
                                onChange={(e) => setProductLink(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                placeholder="Enter product video url"
                                onChange={(e) => setProductVideo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleSave}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
