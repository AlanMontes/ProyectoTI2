import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';




//RUTA PARA REPORTAR BAÑOS
router.patch('/reporte', async (req, res) => {
    try{

    const idbaño = req.body.idbaño;
    const baño = req.body.baño;
    const genero = req.body.genero;
    const tiporeporte = req.body.tiporeporte;
    const idusuario = parseInt(req.body.idusuario);

            try {                                   
                if(tiporeporte === "jabon"){
                    const query1 = await itemsPool.query("call reportarBaño($4,$1,$2,'jabon',$3);",[baño,genero,idusuario,idbaño]);
                    res.status(200).json({"message":"Baño reportado exitosamente, gracias por contribuir"});
                }else if(tiporeporte === "papel"){
                    const query2 = await itemsPool.query("call reportarBaño($4,$1,$2,'papel',$3);",[baño,genero,idusuario,idbaño]);
                    res.status(200).json({"message":"Baño reportado exitosamente, gracias por contribuir"});
                }else{
                    res.status(200).json({"message":"Tipo de reporte no encontrado"});
                }
            } catch (error) {
                console.error('Error al reportar baño:', error);
                res.status(500).json({"message":"Error al reportar baño"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//RUTA PARA SURTIR BAÑOS
router.patch('/surtido', async (req, res) => {
    try{

    const id_baño = req.body.id_baño;
    const tiporeporte = req.body.tiporeporte;

            try {                                   
                if(tiporeporte === "jabon"){
                    const query1 = await itemsPool.query("UPDATE baños SET jabon = 1 WHERE id_baño = $1;",[id_baño]);
                    res.status(200).json({"message":"Baño notificado como surtido"});
                }else if(tiporeporte === "papel"){
                    const query2 = await itemsPool.query("UPDATE baños SET papel = 1 WHERE id_baño = $1;",[id_baño]);
                    res.status(200).json({"message":"Baño notificado como surtido"});
                }else{
                    res.status(200).json({"message":"Tipo de reporte no encontrado"});
                }
            } catch (error) {
                console.error('Error al surtir baño:', error);
                res.status(500).json({"message":"Error al surtir baño"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//RUTA PARA ACTUALIZAR ESTACIONAMIENTO
router.patch('/estacionamientos', async (req, res) => {
    try{

    const id_estacionamiento = req.body.id_estacionamiento;
    const cajones = req.body.cajones;

            try {           

                    const query1 = await itemsPool.query("UPDATE estacionamientos SET cajones = $1 where id_estacionamiento = $2",[cajones, id_estacionamiento]);
                    res.status(200).json({"message":"Estacionamiento actualizado"});
                
            } catch (error) {
                console.error('Error al actualizar:', error);
                res.status(500).json({"message":"Estacionamiento actualizado"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

export default router;
