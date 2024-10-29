import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { BASE_URL } from './BaseUrl'

export default function NewProductModal({ show, handleClose }) {
    const [productName, setProductName] = useState("")
    const [productImage, setProductImage] = useState(null)
    const [productSpecs, setProductSpecs] = useState("")
    const [productPros, setProductPros] = useState("")
    const [productCons, setProductCons] = useState("")
    const [productLink, setProductLink] = useState("")
    const [productVideo, setProductVideo] = useState("")
    const [productTagline, setProductTagline] = useState("")

    const handleSave = async () => {
        const token = localStorage.getItem("authToken")
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.user_id
        try {
            // upload image to firebase storage and return url
            let imageUrl = ""
            console.log(productImage)
            if (productImage !== null) {
                const imageRef = ref(storage, `productImages/${productImage.name}`)
                const response = await uploadBytes(imageRef, productImage)
                imageUrl = await getDownloadURL(response.ref)
            }
            console.log(imageUrl)

            const data = {
                name: productName,
                image_url: imageUrl,
                specification: productSpecs,
                pros: productPros,
                cons: productCons,
                referral_link: productLink,
                video_url: productVideo,
                tagline: productTagline,
                created_by: userId,
                created_at: new Date().toISOString(),
            };
            console.log(data)

            // create new product
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
                <Modal.Header closeButton><strong>Add a new product, please fill in the details.</strong></Modal.Header>
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
                                placeholder="Enter product tagline"
                                onChange={(e) => setProductTagline(e.target.value)}
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
                        variant="secondary"
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
