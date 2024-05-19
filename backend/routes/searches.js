import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';


//BUSCAR DISPONIBILIDAD DEL REPORTE
router.post('/bitacoraFecha', async (req, res) => {
    try{

    const date = req.body.date;

        try {                                   
            const query1 = await itemsPool.query("select baños.baño, baños.genero , tiporegistro, fecha_hora, usuarios_tec.nocontrol as numeroControl from registro_reportes INNER JOIN usuarios_tec ON registro_reportes.fk_id_usuario = usuarios_tec.id_usuario INNER JOIN baños ON registro_reportes.fk_id_baño = baños.id_baño  WHERE DATE_TRUNC('day', fecha_hora) = $1;",[date]);
            res.status(200).json(query1.rows);
        } catch (error) {
            console.error('Error al obtener los registros:', error);
            res.status(500).json({"message":"Error al obtener los registros"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//BUSCAR DISPONIBILIDAD DEL REPORTE
router.post('/reporte', async (req, res) => {
    try{

    const baño = req.body.baño;

            try {                                   
                const query1 = await itemsPool.query("select id_baño, baño, genero, jabon, papel from baños where baño = $1;",[baño]);
                res.status(200).json(query1.rows);
            } catch (error) {
                console.error('Error al obtener los registros:', error);
                res.status(500).json({"message":"Error al obtener los registros"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//BAÑOS CON REPORTE
router.get('/pendientes', async (req, res) => {
    try{
            try {                                   
                const query1 = await itemsPool.query("select id_baño, baño, genero, edificios_tec.edificio,  jabon, papel  from baños INNER JOIN edificios_tec ON baños.fk_id_edificiotec = edificios_tec.id_edificio where jabon = 0 OR papel = 0;");
                res.status(200).json(query1.rows);
            } catch (error) {
                console.error('Error al obtener los registros:', error);
                res.status(500).json({"message":"Error al obtener los registros"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});




//REGISTRO DE PETICIONES
router.get('/bitacora', async (req, res) => {
    try{
            try {                                   
                const query1 = await itemsPool.query("select baños.baño, baños.genero , tiporegistro, fecha_hora, usuarios_tec.nocontrol as numeroControl from registro_reportes INNER JOIN usuarios_tec ON registro_reportes.fk_id_usuario = usuarios_tec.id_usuario INNER JOIN baños ON registro_reportes.fk_id_baño = baños.id_baño;");
                res.status(200).json(query1.rows);
            } catch (error) {
                console.error('Error al obtener los registros:', error);
                res.status(500).json({"message":"Error al obtener los registros"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//REGISTRO DE ESTACIONAMIENTOS
router.post('/estacionamiento', async (req, res) => {
    try{
    const idestacionamiento = req.body.idestacionamiento;
            try {                                   
                const query1 = await itemsPool.query("select nombreestacionamiento, cajones from estacionamientos where id_estacionamiento = $1;",[idestacionamiento]);
                res.status(200).json(query1.rows);
            } catch (error) {
                console.error('Error al obtener los registros:', error);
                res.status(500).json({"message":"Error al obtener los registros"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//VALIDAR USUARIO
router.post('/login', async (req, res) => {
    const nocontrol = req.body.nocontrol;
    const pass = req.body.pass;
  
    try {
      const result = await itemsPool.query('SELECT * FROM usuarios_tec WHERE nocontrol = $1', [nocontrol]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      const user = result.rows[0];
      
      if (pass !== user.pass) {
        return res.status(401).json({ message: 'Su contraseña es incorrecta' });
      }
  
        res.json({ message: 'Inicio de sesión exitoso', idusuario: user.id_usuario, tipo:user.tipousuario});
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor al iniciar sesión' });
    }
  });


export default router;
