import React, { useState, useEffect } from "react";
import Home from "../Home";
import { updateOrder } from "../../services/api";
import { Autocomplete, Container, Grid2, IconButton, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

function Update({ selectedRow }) {
  const [showMain, setShowMain] = useState(false); //Manejo de pantalla principal
  const [formData, setFormData] = useState({ //Almacena los datos del formulario, se inicializa vacío
    orden: "",
    tipo: "",
    cuenta_contrato: "",
    medidor: "",
    estado: "",
    nombres: "",
    observaciones: "",
  });
  const tipos = [ //Opciones disponibles para el campo tipo
    {label:"Corte"},
    {label:"Reconexión"},
  ];
  const estados = [ //Opciones disponibles para el campo estado
    {label: "Ejecutada"},
    {label: "En Ejecución"},
    {label: "No Ejecutada"},
  ]; 
  
  useEffect(()=>{ //Se ejecuta cuando cambia SelectedRow
    if(selectedRow){ //Si SelectRow tiene datos, carga los valores en formData
      setFormData({
        orden: selectedRow.orden,
        tipo: selectedRow.tipo,
        cuenta_contrato: selectedRow.cuenta_contrato,
        medidor: selectedRow.medidor,
        estado: selectedRow.estado,
        nombres: selectedRow.nombres,
        observaciones: selectedRow.observaciones,
      });
    }
  }, [selectedRow])
  
  function regresar() {
    setShowMain(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //Una vez actualizada la orden se regresa a la página principal
      await updateOrder(selectedRow.orden, formData);
      setShowMain(true);
    } catch (error) {
      // Manejo de error
      console.error("Error al actualizar la orden", error);
    }
  }

  return (
    <div>
      {/* Si showMain es true muestra la página principal */}
      {showMain ? (
        <Home />
      ) : (
        // Formulario de Actualizar
        <Container id="update-container">
          <h2>Actualizar usuario</h2>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
              {/* Campo de número de orden */}
              <Grid2 size={5}>
                <TextField fullWidth
                required
                label="Orden"
                value={formData.orden}
                // Copia el estado actual para no perder los datos previos, 
                // actualiza solo el campo orden con el nuevo valor ingresado, 
                // y luego actualiza el estado con el nuevo objeto
                onChange={(e) => setFormData({ ...formData, orden:e.target.value})}
                margin="dense"
                />
              </Grid2>
              <Grid2 size={3}>
                <Autocomplete
                  options={tipos}
                  //Almacena un string con el valor seleccionado en el estado,
                  //Convierte el string en un objeto,
                  //Si está vacío se asigna null
                  value={formData.tipo ? {label:formData.tipo}:null}
                  //Si value (objeto) existe toma el valor almacenado en value.label, si es null establece "".
                  //Actualiza solo tipo con el nuevo valor
                  onChange={(e,value) => setFormData({...formData, tipo:value ? value.label :""})}
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
              <Grid2 size={4}>
                <TextField fullWidth
                required
                id="contractAccount"
                label="Cuenta Contrato"
                value={formData.cuenta_contrato}
                // Copia el estado actual para no perder los datos previos, 
                // actualiza solo el campo cuenta_contrato con el nuevo valor ingresado, 
                // y luego actualiza el estado con el nuevo objeto
                onChange={(e) => setFormData({...formData, cuenta_contrato:e.target.value})}
                margin="dense"
                />
              </Grid2>
              <Grid2 size={5}>
                <TextField fullWidth
                required
                id="names"
                label="Nombres"
                value={formData.nombres}
                // Copia el estado actual para no perder los datos previos, 
                // actualiza solo el campo nombres con el nuevo valor ingresado, 
                // y luego actualiza el estado con el nuevo objeto
                onChange={(e) => setFormData({...formData, nombres:e.target.value})}
                margin="dense"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField fullWidth
                required
                id="meter"
                label="Medidor"
                value={formData.medidor}
                // Copia el estado actual para no perder los datos previos, 
                // actualiza solo el campo medidor con el nuevo valor ingresado, 
                // y luego actualiza el estado con el nuevo objeto
                onChange={(e) => setFormData({...formData, medidor:e.target.value})}
                margin="dense"
                />
              </Grid2>
              <Grid2 size={3}>
                <Autocomplete
                  options={estados}
                  //Almacena un string con el valor seleccionado en el estado,
                  //Convierte el string en un objeto,
                  //Si está vacío se asigna null
                  value={formData.estado ? {label:formData.estado}:null} //Convierte string a objeto
                  //Si value (objeto) existe toma el valor almacenado en value.label, si es null establece "".
                  //Actualiza solo estado con el nuevo valor
                  onChange={(e,value) => setFormData({...formData, estado:value ? value.label :""})}
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
              <Grid2 size={5}>
                <TextField fullWidth
                required
                id="observation"
                label="Observaciones"
                value={formData.observaciones}
                // Copia el estado actual para no perder los datos previos, 
                // actualiza solo el campo observaciones con el nuevo valor ingresado, 
                // y luego actualiza el estado con el nuevo objeto
                onChange={(e) => setFormData({...formData, observaciones:e.target.value})}
                margin="dense"
                />
              </Grid2>
            </Grid2> 
            <div className="form-buttons">
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

export default Update;