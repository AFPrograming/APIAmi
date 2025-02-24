import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid2, TextField, useMediaQuery, useTheme } from "@mui/material";

export default function OrderDetailsDialog({ open, handleClose, selectedRow }) {
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md')); //Verifica si la pantalla
    
    if (!selectedRow) return null; // Evita errores si no hay datos

    return (
    <Dialog 
    fullScreen={fullScreen}
    open={open} 
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"  
    >
        <DialogTitle id="responsive-dialog-title">
            Detalles de la Orden N°{selectedRow?.orden}
        </DialogTitle>
        <DialogContent>
            <Grid2 container spacing={2}>
                <Grid2 item size={6} marginTop={1}>
                    <TextField label="Orden" value={selectedRow?.orden} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6} marginTop={1}>
                    <TextField label="Tipo" value={selectedRow?.tipo} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6}>
                    <TextField label="Hora de Ejecución" value={selectedRow?.hora_ejecucion} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6}>
                    <TextField label="Cuenta Contrato" value={selectedRow?.cuenta_contrato} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6}>
                    <TextField label="Medidor" value={selectedRow?.medidor} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6}>
                    <TextField label="Estado" value={selectedRow?.estado} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={12}>
                    <TextField label="Nombres" value={selectedRow?.nombres} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={12}>
                    <TextField label="Observaciones" value={selectedRow?.observaciones} fullWidth multiline rows={3} variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6}>
                    <TextField label="Hora Inicio" value={selectedRow?.hora_inicio} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
                <Grid2 item size={6}>
                    <TextField label="Hora Fin" value={selectedRow?.hora_fin} fullWidth variant="outlined" slotProps={{ input: {readOnly: true,}, }} />
                </Grid2>
            </Grid2>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} autoFocus>Cerrar</Button>
        </DialogActions>
    </Dialog>
    );
}