import { Table, Button } from 'react-bootstrap';

const HotelTable = ({ hotels, onEdit, onDelete }) => {

return (
    <div className="table-responsive">
        <Table className='mt-5' striped bordered hover responsive="sm" >
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {hotels.map(hotel => (
                <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>
                    <Button className='mr-1' variant="primary" onClick={() => onEdit(hotel)}>Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(hotel.id)}>Delete</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
    </div>
);

};

export default HotelTable;
