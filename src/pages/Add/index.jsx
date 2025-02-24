import React, { useState } from "react"; //Manejar estado de componentes
import Home from "../Home"; //Componente de la página principal
import { createOrder } from "../../services/api"; //Función del servicio API para agregar una orden
import {TextField, IconButton, Autocomplete, Container, Grid2} from "@mui/material"; //Componentes de Material UI para construir la UI
import SaveIcon from "@mui/icons-material/Save"; //Ícono para botón de guardar
import CloseIcon from "@mui/icons-material/Close"; //Ícono para botón de cancelar

//Componente AddForm, permite agregar nuevas órdenes
function AddForm() {
  //Controlar si se muestra la pantalla principal "Home"
  const [showMain, setShowMain] = useState(false);
  //Estados que almacenan los valores de los campos del formulario
  const [orden, setOrder] = useState("");
  const [tipo, setType] = useState("");
  const [cuenta_contrato, setContractAccount] = useState("");
  const [medidor, setMeter] = useState("");
  const [estado, setState] = useState("");
  const [nombres, setNames] = useState("");
  const [observaciones, setObservation] = useState("");
  //Opciones para el campo de "Tipo"
  const tipos = [
    {label:"Corte"},
    {label:"Reconexión"},
  ];
  //Opciones para el campo de "Estado"
  const estados = [
    {label: "Ejecutada"},
    {label: "En Ejecución"},
    {label: "No Ejecutada"},
  ];

  //Actualiza el estado 'orden' con el valor de campo de entrada
  function handleOrderChange(event) {
    setOrder(event.target.value);
  }

  //Actualiza el estado 'tipo' con el valor seleccionado del campo de selección
  function handleTypeChange(event, newValue) {
    setType( newValue ? newValue.label :""); //Guarda solo el texto seleccionado
  }

  //Cambia el estado de 'showMain para volver a la pantalla principal
  function regresar() {
    setShowMain(true);
  }

  //Actualiza el estado 'cuenta_contrato' con el valor de campo de entrada
  function handleContractAccountChange(event) {
    setContractAccount(event.target.value);
  }

  //Actualiza el estado 'nombres' con el valor de campo de entrada
  function handleNamesChange(event) {
    setNames(event.target.value);
  }

  //Actualiza el estado 'medidor' con el valor de campo de entrada
  function handleMeterChange(event) {
    setMeter(event.target.value);
  }

  //Actualiza el estado 'observaciones' con el valor de campo de entrada
  function handleObservationChange(event) {
    setObservation(event.target.value);
  }

  //Actualiza el estado 'estado' con el valor seleccionado del campo de selección
  function handleStateChange(event, newValue) {
    setState( newValue ? newValue.label :""); //Guarda solo el texto seleccionado
  }

  //Envía los datos del formulario a la API
  async function handleSubmit(event) {
    event.preventDefault();

    const orderData = {
      orden,
      tipo,
      cuenta_contrato,
      medidor,
      estado,
      nombres,
      observaciones,
    };

    try {
      await createOrder(orderData);
      // Limpiar los campos después de agregar el usuario
      setOrder("");
      setType("");
      setContractAccount("");
      setMeter("");
      setState("");
      setNames("");
      setObservation("");
    } catch (error) {
      console.error(error);
      // Manejar el error de manera adecuada, como mostrar un mensaje de error al usuario
    }
    setShowMain(true);
  }

  return (
    <div>
      {showMain ? (
        <Home /> //Si showMain es true, muestra el componente Home
      ) : ( //Si showMain es false, muestra el formulario de creación de usuario dentro de un Container
        <Container id="add-container">
          <h2>Agregar Usuario</h2>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
              {/* Campo de entrada para orden */}
              <Grid2 size={5}>
                <TextField fullWidth
                required
                id="order"
                label="Orden"
                value={orden}
                onChange={handleOrderChange}
                margin="dense"
                />
              </Grid2>
              {/* Selector para tipo */}
              <Grid2 size={3}>
                <Autocomplete
                  options={tipos}
                  value={tipo ? {label:tipo}:null} //Convierte string a objeto
                  onChange={handleTypeChange}
                  renderInput={(params) => (
                    <TextField 
                    fullWidth
                    {...params}
                    label="Tipo"
                    required
                    margin="dense"
                    />
                  )}
                />
              </Grid2>
              {/* Campo de entrada para cuenta contrato */}
              <Grid2 size={4}>
                <TextField fullWidth
                required
                id="contractAccount"
                label="Cuenta Contrato"
                value={cuenta_contrato}
                onChange={handleContractAccountChange}
                margin="dense"
                />
              </Grid2>
              {/* Campo de entrada para nombres */}
              <Grid2 size={5}>
                <TextField fullWidth
                required
                id="names"
                label="Nombres"
                value={nombres}
                onChange={handleNamesChange}
                margin="dense"
                />
              </Grid2>
              {/* Campo de entrada para medidor */}
              <Grid2 size={4}>
                <TextField fullWidth
                required
                id="meter"
                label="Medidor"
                value={medidor}
                onChange={handleMeterChange}
                margin="dense"
                />
              </Grid2>
              {/* Selector para estado */}
              <Grid2 size={3}>
                <Autocomplete 
                  options={estados}
                  value={estado ? {label:estado}:null} //Convierte string a objeto
                  onChange={handleStateChange}
                  renderInput={(params) => (
                    <TextField 
                    fullWidth
                    {...params}
                    label="Estado"
                    required
                    margin="dense"
                    />
                  )}
                />
              </Grid2>
              {/* Campo de entrada para observación */}
              <Grid2 size={4}>
                <TextField fullWidth
                required
                id="observation"
                label="Observaciones"
                value={observaciones}
                onChange={handleObservationChange}
                margin="dense"
                />
              </Grid2>
            </Grid2>
            <div>
              {/* Botón de guardar */}
              <IconButton
                id="botonPrimario"
                color="primary"
                type="submit">
                  <SaveIcon/>
              </IconButton>
              {/* Botón de cancelar */}
              <IconButton
                id="botonSecundario"
                onClick={regresar}
                color="error">
                  <CloseIcon/>
              </IconButton>
            </div>
          </form>
        </Container>
      )}
    </div>
  );
}

export default AddForm;