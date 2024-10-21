import Table from 'react-bootstrap/Table';

export default function ProductTable() {
    return (
        <>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Product Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Product Image</td>
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
                        <td>PRODUCT SHOWCASE</td>
                        <td>Youtube External API</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
