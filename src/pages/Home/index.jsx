import React, { useState, useEffect, useMemo } from "react";
import AddForm from "../Add/index";
import UpdateForm from "../Update/index";
import {getOrders, updateOrder, deleteOrder} from "../../services/api";
import { Add, DeleteForever, Visibility } from "@mui/icons-material";
import { 
  TextField, MenuItem, Select, Box, InputLabel, FormControl, 
  Button, Paper, IconButton, Alert, Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; //Componente de tabla interactiva
import OrderDetailsDialog from "../Detail/orderDetailDialog";

function Home() {
  const [filter, setFilter] = useState(""); //Almacena el valor ingresado para filtrar por número de orden
  const [activeAction, setActiveAction] = useState(null); //Define la acción activa (add/edit)
  const [selectedRow, setSelectedRow] = useState(null); //Almacena la orden seleccionada
  const [filteredData, setFilteredData] = useState([]); //Contiene los datos filtrados según el número de orden y tipo
  const [filterType, setFilterType] = useState("todo"); //Almacena el tipo de orden seleccionado en el filtro
  const [errorMessage, setErrorMessage] = useState(""); //Mensaje de error cuando el filtro de orden no es válido
  const [openAlert, setOpenAlert] = useState(false); //Controla la visibilidad de la alerta emergente
  const [openDialog, setOpenDialog] = useState(false); //Estado para el pop-up

  //Columnas de la tabla
  const columns = [
    { field: "orden", headerName: "Orden", flex:2},
    { field: "tipo", headerName: "Tipo", flex:1},
    { field: "hora_ejecucion", headerName: "Hora Ejecución", flex:2},
    { field: "cuenta_contrato", headerName: "Cuenta Contrato", flex:1},
    { field: "medidor", headerName: "Medidor", flex:1 },
    { field: "estado", headerName: "Estado", flex:1},
  ];

  //Se usa useMemo para optimizar el rendimiento, recalcula solo cuando filteredData cambie
  const rows = useMemo(()=>filteredData.map((item)=>({
    id: item.orden, //se necesita un id único para DataGrid
    orden: item.orden,
    tipo: item.tipo,
    hora_ejecucion: item.hora_ejecucion,
    cuenta_contrato: item.cuenta_contrato,
    medidor: item.medidor,
    estado: item.estado,
  })),[filteredData]);

  //Paginación de la tabla
  const paginationModel = {page: 0, pageSize:5, };


  useEffect(() => {
    fetchData();
  }, [filter, filterType]);
  
 
  async function fetchData() {
    try {
      //Obtiene los datos de la API
      const response = await getOrders();
      const data = response.data ?? [];

      // Eliminar espacios en blanco
      const trimmedFilter = filter.trim();

      // Si el input está vacío, mostrar todos los datos sin error
      if (trimmedFilter === "") {
        const filteredByType = filterType ==="todo" ? data : data.filter((item) =>
        item.tipo === filterType);
        setFilteredData(filteredByType);
        setErrorMessage("");
        return;
      }

      // Verificar si el filtro contiene solo números
      if (!/^\d+$/.test(trimmedFilter)) {
        setFilteredData([]);
        setErrorMessage("Por favor, ingrese solo números.");
        setOpenAlert(true); //Abre la alerta emergente
        return;
      }else{
        setErrorMessage("");//Limpia el error si la entrada es válida
        setOpenAlert(false); //Cierra la alerta si la entrada es válida
      }

      // Filtrar datos que incluyan el número ingresado
      const filteredByOrder = data.filter((item) =>
        item.orden.toString().includes(trimmedFilter)
      );

      //Filtrar por tipo de orden si no es "todo"
      const finalFilteredData = filterType === "todo" ? filteredByOrder : filteredByOrder.filter((item) =>
      item.tipo === filterType);

      setFilteredData(finalFilteredData);
      setErrorMessage(""); // Limpiar mensaje de error si todo está bien
    } catch (error) {
      console.error(error);
    }
  }

  //Maneja la selección de filas en la tabla
  function handleRowSelected(selectionModel){
    if (selectionModel.length>0){
      const selectedOrder = selectionModel[0];
      setSelectedRow(filteredData.find((item)=>
        item.orden===selectedOrder)); //Guarda la fila seleccionada en SelectRow
    }else{
      setSelectedRow(null);
    }
  }

  //Activa el formulario de agregar (AddForm)
  function addRecord() {
    setActiveAction("add");
  }

  //Activa el formulario de editar (EditForm) si hay una orden seleccionada
  function editRecord() {
    if (selectedRow){
      setActiveAction("edit");
    }
  }

  //Elimina la orden seleccionada llamando a deleteOrder
  async function deleteRecord() {
    if (selectedRow){
      try {
        await deleteOrder(selectedRow.orden);
        fetchData(); // Actualizar los datos en la tabla llamando a fetchData
        setSelectedRow(null);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //Modifica una orden llamando a updateOrder
  async function updateOrderData(orderId, orderData) {
    try {
      await updateOrder(orderId, orderData);
      fetchData(); // Actualizar los datos en la tabla llamando a fetchData
      setActiveAction(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Si activeAction es add, se muestra el formulario AddForm */}
      {activeAction === "add" ? (
        <AddForm />
        // Si activeAction es edit, se muestra el formulario UpdateForm
      ) : activeAction === "edit" ? (
        <UpdateForm
          // Se pasa el usuario seleccionado como prop
          selectedRow={selectedRow} 
          // Se pasa la función updateUserData para actualizar la información de la orden
          updateOrder={updateOrderData}
        />
        //Si activeAction es null, muestra página principal
      ) : (
        <div>
          {/* Permite filtrar por número de orden */}
          <div className="filter-bar">
            <TextField fullWidth
              id="outlined-basic" 
              label="Número de orden" 
              variant="outlined" 
              value={filter}
              onChange={(e)=>setFilter(e.target.value)}
            />
            {/* Si ingresa valores no numéricos, se activa el sanackbar de error */}
            <Snackbar
              open={openAlert}
              autoHideDuration={3000} // Se cierra después de 3 segundos
              onClose={() => setOpenAlert(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posición
            >
              <Alert onClose={() => setOpenAlert(false)} severity="error" variant="filled">
                {errorMessage}
              </Alert>
            </Snackbar>
            {/* Dropdown */}
            <Box sx={{minWidth: 150}}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Tipo</InputLabel>
                {/* Filtra la tabla por: "Corte", "Reconexión" o "Todo". */}
                <Select labelId="simple-select-label" value={filterType} label="Tipo" onChange={(e) => setFilterType(e.target.value)}>
                  <MenuItem value="todo">Todo</MenuItem> 
                  <MenuItem value="Corte">Corte</MenuItem> 
                  <MenuItem value="Reconexión">Reconexión</MenuItem> 
                </Select>
              </FormControl>
            </Box>
            {/* Botón que restablece el filtro de búsqueda */}
            <Box sx={{'& button': { m: 1 }}}>
              <Button variant="contained" onClick={()=>setFilter("")}>Limpiar</Button>
            </Box>
          </div>
          {/* Botón para agregar usuario, cambia el estado de activeAction  */}
          <Button variant="contained" startIcon={<Add />} onClick={addRecord}>Agregar</Button>
          {/* Tabla */}
          <Paper sx={{ height: 400, width: "100%"}}> {/* Estilo */}
            <DataGrid
              rows={rows} // Se pasa la data para mostrar en la tabla
              columns={columns}
              initialState={{pagination: {paginationModel}}}
              pageSizeOptions={[5, 10]} //Cantidad de datos que se muestra en la tabla por página(5 o 10)
              onRowSelectionModelChange={(newSelection)=>handleRowSelected(newSelection)}
              sx={{ border: 0 }}
            />
          </Paper>
          {/* Si hay una fila seleccionada activa los botones de modificar y eliminar */}
          {selectedRow && (
            <Box sx={{'& button': { m: 1 }}}>
              {/* Botón de modificar */}
              <Button variant="contained" onClick={editRecord}>
                Modificar
              </Button>
              {/* Botón de eliminar */}
              <IconButton color="error" onClick={() => deleteRecord(selectedRow.orden)}>
                <DeleteForever />
              </IconButton>
              {/* Botón "Ver más" */}
              <Button variant="contained" startIcon={<Visibility />} onClick={handleOpenDialog}>
                Ver más
              </Button>
            </Box>
          )}
        </div>
      )}
      {/* Dialog para mostrar los detalles de la orden seleccionada */}
      <OrderDetailsDialog
      open={openDialog}
      handleClose={handleCloseDialog}
      selectedRow={selectedRow}
      />
    </div>
  );
}

export default Home;