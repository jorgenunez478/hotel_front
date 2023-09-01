import { Table, Button } from 'react-bootstrap';

const RoomTable = ({ rooms, onEdit, onDelete }) => {

  return (
    <div className="table-responsive">
      <Table className='mt-5' striped bordered hover responsive="sm" >
        <thead>
          <tr>
            <th>Count</th>
            <th>Type</th>
            <th>Accommodation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.count }</td>
              <td>{room.room_type_id }</td>
              <td>{room.accommodation_id }</td>
              <td>
                <Button className='mr-1' variant="primary" onClick={() => onEdit(room)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(room.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoomTable;
