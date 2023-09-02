/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import RoomTable from './RoomTable';
import RoomForm from './RoomForm';
import axios from 'axios';

const HotelFormModal = ({ show, onHide, onSave, hotel }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const [name, setName] = useState(hotel ? hotel.name : '');
    const [city_id, setCity] = useState(hotel ? hotel.city_id : '');
    const [address, setAddress] = useState(hotel ? hotel.address : '');
    const [nit, setNit] = useState(hotel ? hotel.nit : '');
    const [number_rooms, setNumRooms] = useState(hotel ? hotel.number_rooms : '');

    const handleSave = () => {
        onSave({ id: hotel ? hotel.id : null, name, address, city_id, nit, number_rooms });
        onHide();
    };

    /** section form Rooms */
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchRooms = async () => {
        try {
        const response = await axios.get(`${apiUrl}/roomByHotel/${hotel.id}`);
        setRooms(response.data);
        } catch (error) {
        console.error('Error fetching rooms:', error);
        }
    };

    const fetchCities = async () => {
        try {
        const response = await axios.get(`${apiUrl}/city`);
        setCities(response.data);
        } catch (error) {
        console.error('Error fetching cities:', error);
        }
    };

    useLayoutEffect(() => {
        fetchCities();
        if(hotel){
            setName(hotel.name);
            setCity(hotel.city_id);
            setAddress(hotel.address);
            setNit(hotel.nit);
            setNumRooms(hotel.number_rooms)
            fetchRooms();
        }else{
            setName("");
            setCity("");
            setAddress("");
            setNit("");
            setNumRooms("")
        }
    }, [hotel]);

    const handleEditRoom = room => {
        setSelectedRoom(room);
    };

    const handleDeleteRoom = async roomId => {
        try {
            await axios.delete(`${apiUrl}/room/${roomId}`);
            
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    const onSaveRoom = async roomData => {
        try {
            if (roomData.id) {
                await axios.put(`${apiUrl}/room/${roomData.id}`, roomData);
            } else {
                await axios.post(`${apiUrl}/room`, roomData); 
            }
            fetchRooms();
        } catch (error) {
            console.error('Error saving room:', error);
        }
    };


  return (
    <Modal show={show} fullscreen={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{hotel ? 'Edit Hotel' : 'Add Hotel'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
            <Form >
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control as="select" value={city_id} onChange={e => setCity(e.target.value)}>
                <option value="default">-- select option --</option>
                    {cities.map((city)=>{
                        return <option value={city.id}>{city.city}</option>
                    })};
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formNit">
                <Form.Label>Nit</Form.Label>
                <Form.Control required type="text" value={nit} onChange={e => setNit(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formNumRooms">
                <Form.Label>Number rooms</Form.Label>
                <Form.Control required type="text" value={number_rooms} onChange={e => setNumRooms(e.target.value)} />
            </Form.Group>
            </Form>
            {hotel && 
                <div>
                    <RoomForm onSaveRoom={onSaveRoom} room={selectedRoom} hotel={hotel} />
                    <RoomTable rooms={rooms} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />
                </div>
            }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HotelFormModal;
