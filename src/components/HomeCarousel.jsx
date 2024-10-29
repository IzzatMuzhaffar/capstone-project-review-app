import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel({ products }) {
    return (
        <Carousel>
            {products.map((product) => (
                <Carousel.Item interval={5000} key={product.id}>
                    <img alt={product.id}
                        src='https://picsum.photos/200/400?grayscale'
                        style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                    />
                    <Carousel.Caption>
                        <h3>{product.name}</h3>
                        <p>{product.tagline}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
