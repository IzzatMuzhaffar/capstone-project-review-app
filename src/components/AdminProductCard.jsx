import { useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import UpdateProductModal from './UpdateProductModal'
import DeleteProductModal from './DeleteProductModal'

export default function AdminProductCard({ product }) {
    const { id: productId, name, image_url: image, specification, pros, cons, referral_link: link, video_url: video, tagline } = product

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const handleShowUpdateModal = () => setShowUpdateModal(true)
    const handleCloseUpdateModal = () => setShowUpdateModal(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleCloseDeleteModal = () => setShowDeleteModal(false)

    return (
        <Card className='d-flex flex-column me-2 my-2' style={{ width: "300px" }}>
            <Image src={image} />
            <div className='px-2 py-2'>
                <div>{name}</div>
                <div className='d-flex flex-row'>
                    <i className="bi bi-pencil-square me-2" onClick={handleShowUpdateModal}></i>
                    <i className="bi bi-trash3 me-2" onClick={handleShowDeleteModal}></i>
                </div>
                <UpdateProductModal
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    productId={productId}
                    originalName={name}
                    originalImage={image}
                    originalSpecs={specification}
                    originalPros={pros}
                    originalCons={cons}
                    originalLink={link}
                    originalVideo={video}
                    originalTagline={tagline}
                />
                <DeleteProductModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    productId={productId}
                />
            </div>
        </Card>
    )
}
