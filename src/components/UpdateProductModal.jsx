import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { BASE_URL } from './BaseUrl'

export default function UpdateProductModal({
    show,
    handleClose,
    productId,
    originalName,
    originalImage,
    originalSpecs,
    originalPros,
    originalCons,
    originalLink,
    originalVideo,
    originalTagline
}) {
    const [newProductName, setNewProductName] = useState(originalName)
    const [newProductImage, setNewProductImage] = useState(null)
    const [newProductSpecs, setNewProductSpecs] = useState(originalSpecs)
    const [newProductPros, setNewProductPros] = useState(originalPros)
    const [newProductCons, setNewProductCons] = useState(originalCons)
    const [newProductLink, setNewProductLink] = useState(originalLink)
    const [newProductVideo, setNewProductVideo] = useState(originalVideo)
    const [newProductTagline, setNewProductTagline] = useState(originalTagline)

    const handleUpdate = async () => {
        try {
            // upload image to firebase storage and return url
            let newImageUrl = ""
            console.log(newProductImage)
            if (newProductImage !== null) {
                const imageRef = ref(storage, `productImages/${newProductImage.name}`)
                const response = await uploadBytes(imageRef, newProductImage)
                newImageUrl = await getDownloadURL(response.ref)
            } else {
                newImageUrl = originalImage // if no change reuse original image url
            }
            console.log(newImageUrl)

            const updatedData = {
                name: newProductName,
                image_url: newImageUrl,
                specification: newProductSpecs,
                pros: newProductPros,
                cons: newProductCons,
                referral_link: newProductLink,
                video_url: newProductVideo,
                tagline: newProductTagline
            };
            console.log(updatedData)

            // update product
            axios
                .put(`${BASE_URL}/products/product/${productId}`, updatedData)
                .then((response) => {
                    console.log("Success:", response.updatedData)
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

    const handleFileChange = (e) => { setNewProductImage(e.target.files[0]) }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><strong>Update a product, please fill in the details.</strong></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                defaultValue={originalName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                defaultValue={originalTagline}
                                onChange={(e) => setNewProductTagline(e.target.value)}
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
                                defaultValue={originalSpecs}
                                as="textarea"
                                rows={3}
                                onChange={(e) => setNewProductSpecs(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                defaultValue={originalPros}
                                as="textarea"
                                rows={3}
                                onChange={(e) => setNewProductPros(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                defaultValue={originalCons}
                                as="textarea"
                                rows={3}
                                onChange={(e) => setNewProductCons(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                defaultValue={originalLink}
                                onChange={(e) => setNewProductLink(e.target.value)}
                                className='mb-2'
                                required
                            />
                            <Form.Control
                                defaultValue={originalVideo}
                                onChange={(e) => setNewProductVideo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="rounded-pill"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
