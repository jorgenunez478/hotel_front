import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const HotelFormModal = ({ onSaveRoom, room, hotel }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [count, setCount] = useState(room ? room.count : '');
  const [room_type_id, setType] = useState(room ? room.room_type_id  : '');
  const [accommodation_id, setAccommodation] = useState(room ? room.accommodation_id  : '');
  const [types, setTypes] = useState([]);
  const [accommodations, setAccommodations] = useState([]);

  const handleSaveRoom = () => {
    onSaveRoom({ id: room ? room.id : null, hotel_id:hotel.id, count, room_type_id, accommodation_id });
    handleCancel();
  };

  useLayoutEffect(() => {
    fetchAccommodations();
    fetchTypes();
    console.log(accommodations, types);
    if(room){
      setCount(room.count);
      setType(room.room_type_id);
      setAccommodation(room.accommodation_id);
    }else{
      handleCancel();
    }
  }, [room]); 

    const handleCancel = () => {
      setCount("");
      setType("");
      setAccommodation("");
    };

    const fetchTypes= async () => {
        try {
          const response = await axios.get(`${apiUrl}/roomType`);
          setTypes(response.data);
        } catch (error) {
          console.error('Error fetching room types:', error);
        }
    };

    const fetchAccommodations= async () => {
      try {
        const response = await axios.get(`${apiUrl}/accommodation`);
        setAccommodations(response.data);
      } catch (error) {
        console.error('Error fetching accomodation:', error);
      }
  };
  
  return (
    <Form className='container mt-3 mb-3 border p-3'>
        <h4>Rooms</h4>
        <Form.Group controlId="formCount">
        <Form.Label>Count</Form.Label>
        <Form.Control type="text" value={count} onChange={e => setCount(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Room type</Form.Label>
          <Form.Control as="select" value={room_type_id} onChange={e => setType(e.target.value)}>
            <option value="default">-- select option --</option>
              {types.map((type)=>{
                  return <option value={type.id}>{type.type}</option>
              })};
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAccommodation">
          <Form.Label>Accommodation type</Form.Label>
          <Form.Control as="select" value={accommodation_id} onChange={e => setAccommodation(e.target.value)}>
            <option value="default">-- select option --</option>
              {accommodations.map((accommodation)=>{
                  return <option value={accommodation.id}>{accommodation.accommodation}</option>
              })};
          </Form.Control>
        </Form.Group>
        <Button className='mt-3 me-2' variant="success" onClick={handleCancel}>Cancel</Button>
        <Button className='mt-3' variant="primary" onClick={handleSaveRoom}>Save</Button>
    </Form>        
  );
};

export default HotelFormModal;
