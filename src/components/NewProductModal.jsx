import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { BASE_URL } from './BaseUrl'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function NewProductModal({ show, handleClose }) {
    const [productName, setProductName] = useState("")
    // const [productImage, setProductImage] = useState("")
    const [productImage, setProductImage] = useState(null)
    const [productSpecs, setProductSpecs] = useState("")
    const [productPros, setProductPros] = useState("")
    const [productCons, setProductCons] = useState("")
    const [productLink, setProductLink] = useState("")
    const [productVideo, setProductVideo] = useState("")

    const handleSave = async () => {
        try {
            // function for image storage
            let imageUrl = ""
            console.log(productImage)
            if (productImage !== null) {
                const imageRef = ref(storage, `productImages/${productImage.name}`)
                const response = await uploadBytes(imageRef, productImage)
                imageUrl = await getDownloadURL(response.ref)
            }
            console.log(imageUrl)

            // prepare data for post request
            const data = {
                name: productName,
                image_url: imageUrl,
                specification: productSpecs,
                pros: productPros,
                cons: productCons,
                referral_link: productLink,
                video_url: productVideo,
                created_at: new Date().toISOString(),
            };
            console.log(data)

            // post request to add product
            axios
                .post(`${BASE_URL}/products`, data)
                .then((response) => {
                    console.log("Success:", response.data)
                    handleClose()
                })
                .catch((error) => {
                    console.error("Error", error)
                })
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const handleFileChange = (e) => { setProductImage(e.target.files[0]) }

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
                                onChange={handleFileChange}
                                className='mb-2'
                                required
                                type='file'
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
