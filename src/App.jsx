/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from 'react';
import HotelTable from './components/HotelTable';
import HotelFormModal from './components/HotelFormModal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from './components/Toast';
import './App.css';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("info");

  const [modalShow, setModalShow] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${apiUrl}/hotel`);
      setHotels(response.data);
    } catch (error) {
      toast('Error fetching hotels: ' + error, 'danger');
      console.error('Error fetching hotels:', error);
    }
  };

  useLayoutEffect(() => {
    fetchHotels();
  }, []);

  const handleEdit = hotel => {
    setSelectedHotel(hotel);
    setModalShow(true);
  };

  const handleDelete = async hotelId => {
    try {
      await axios.delete(`${apiUrl}/hotel/${hotelId}`);
      toast('Delete hotel', 'success');
      fetchHotels();
    } catch (error) {
      toast('Error deleting hotel: ' + error, 'danger');
      console.error('Error deleting hotel:', error);
    }
  };

  const handleSave = async hotelData => {
    try {
      if (hotelData.id) {
        await axios.put(`${apiUrl}/hotel/${hotelData.id}`, hotelData);
      } else {
        await axios.post(`${apiUrl}/hotel`, hotelData); 
      }
      toast('Saving hotel', 'success');
      fetchHotels();
    } catch (error) {
      toast('Error saving hotel: ' + error, 'danger');
      console.error('Error saving hotel:', error);
    }
  };


  const toast = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
    }, "4000");
  }

  return (
    <div className="App">
      {alertShow &&
        <Toast message={alertMessage} variant={alertVariant} />
      }
      <h1>Hotel Management App</h1>
      <button className="btn btn-success mt-5" onClick={() => { setSelectedHotel(null); setModalShow(true); }}>Add Hotel</button>
      <HotelTable hotels={hotels} onEdit={handleEdit} onDelete={handleDelete} />
      <HotelFormModal show={modalShow} onHide={() => setModalShow(false)} onSave={handleSave} hotel={selectedHotel}/>
    </div>
  );
}

export default App;
