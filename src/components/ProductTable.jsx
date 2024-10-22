import { Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default function ProductTable() {
    const pic = "https://picsum.photos/600/200"

    return (
        <>
            <Table bordered>
                <thead>
                    <tr>
                        <h4>Product Name</h4>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "14px" }}>
                    <tr>
                        <td colSpan={5}><Image src={pic} /></td>
                    </tr>
                    <tr>
                        <td><strong>SPECIFICATIONS</strong></td>
                        <td><strong>SPECS: </strong>Description 1</td>
                        <td><strong>SPECS: </strong>Description 2</td>
                        <td><strong>SPECS: </strong>Description 3</td>
                        <td><strong>SPECS: </strong>Description 4</td>
                    </tr>
                    <tr>
                        <td><strong>REASONS TO BUY</strong></td>
                        <td>+ Pros 1</td>
                        <td>+ Pros 2</td>
                        <td>+ Pros 3</td>
                    </tr>
                    <tr>
                        <td><strong>REASONS TO AVOID</strong></td>
                        <td>- Cons 1</td>
                        <td>- Cons 2</td>
                    </tr>
                    <tr>
                        <td>PRODUCT LINK</td>
                        <td colSpan={4}>
                            <a href="">Product external link</a>
                        </td>
                    </tr>
                    <tr>
                        <td>PRODUCT SHOWCASE</td>
                        <td colSpan={4}>Youtube external API</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
