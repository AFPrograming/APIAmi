import axios from 'axios'; //Librería para hacer solicitudes HTTP

const API_BASE_URL = 'http://localhost:8000'; //URL base de la API

//Realizar solicitud GET (obtiene lista de órdenes desde la API)
export const getOrders = () => {
  return axios.get(`${API_BASE_URL}/order`);
};

//Realiza una solicitud POST para crear una nueva orden
export const createOrder = (orderData) => {
  return axios.post(`${API_BASE_URL}/order`, orderData);
};

//Realiza una solicitud PUT para actualizar una orden específica
export const updateOrder = (orderId, orderData) => {
  return axios.put(`${API_BASE_URL}/order/${orderId}`, orderData);
};

//Realiza una solicitud DELETE
export const deleteOrder = (orderId) => {
  return axios.delete(`${API_BASE_URL}/order/${orderId}`);
};