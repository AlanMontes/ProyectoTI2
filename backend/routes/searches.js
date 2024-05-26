import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';
import moment from 'moment-timezone';

//BUSCAR DISPONIBILIDAD DEL REPORTE
router.post('/bitacoraFecha', async (req, res) => {
    try{

    const date = req.body.date;

        try {                                   
            const query1 = await itemsPool.query("select baños.baño, baños.genero , tiporegistro, fecha_hora, usuarios_tec.nocontrol as numeroControl from registro_reportes INNER JOIN usuarios_tec ON registro_reportes.fk_id_usuario = usuarios_tec.id_usuario INNER JOIN baños ON registro_reportes.fk_id_baño = baños.id_baño  WHERE DATE_TRUNC('day', fecha_hora) = $1;",[date]);
            
            query1.rows.forEach((row) => {
                const fechaUTC = moment.utc(row.fecha_hora);
                const fechaChihuahua = fechaUTC.clone().tz("America/Chihuahua");
                row.fecha_hora = fechaChihuahua.format("YYYY-MM-DD HH:mm:ss");
            });
            
            res.status(200).json(query1.rows);
        } catch (error) {
            console.error('Error al obtener los registros:', error);
            res.status(500).json({"message":"Error al obtener los registros"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//IRREGULARIDADES DE REPORTES
router.post('/bitacoraIrregulares', async (req, res) => {
    try{

    const date = req.body.date;

        try {                                   
            const query1 = await itemsPool.query("select baños.baño, baños.genero , tiporegistro, fecha_hora, usuarios_tec.nocontrol as numeroControl from registro_reportes INNER JOIN usuarios_tec ON registro_reportes.fk_id_usuario = usuarios_tec.id_usuario INNER JOIN baños ON registro_reportes.fk_id_baño = baños.id_baño  WHERE DATE_TRUNC('day', fecha_hora) = $1;",[date]);
            
            // const contadorFechas = {};

            query1.rows.forEach((row) => {
                const fechaUTC = moment.utc(row.fecha_hora);
                const fechaChihuahua = fechaUTC.clone().tz("America/Chihuahua");
                row.fecha_hora = fechaChihuahua.format("YYYY-MM-DD");
            });

            // Función para comparar dos objetos y determinar si son iguales solo en las propiedades específicas
            function sonIgualesEnPropiedades(obj1, obj2, propiedades) {
                for (const propiedad of propiedades) {
                if (obj1[propiedad] !== obj2[propiedad]) {
                    return false;
                }
                }
                return true;
            }
            
            // Función para contar las repeticiones de combinaciones específicas de propiedades
            function contarRepeticionesEspecificas(array, propiedades) {
                const recuento = {};
            
                array.forEach((objeto) => {
                const clave = JSON.stringify(propiedades.map(propiedad => objeto[propiedad]));
                recuento[clave] = (recuento[clave] || 0) + 1;
                });
                
                const combinacionesFiltradas = {};
                for (const clave in recuento) {
                  if (recuento[clave] >= 3) {
                    combinacionesFiltradas[clave] = recuento[clave];
                  }
                }
              
                return combinacionesFiltradas;
            }
            
            const propiedadesEspecificas = ["baño", "genero", "tiporegistro"];
            const repeticiones = contarRepeticionesEspecificas(query1.rows, propiedadesEspecificas);

            res.status(200).json(repeticiones);
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


//Reportar falso reporte
router.post('/FalsoReporte', async (req, res) => {
    try{

    const date = req.body.date;
    const baño = req.body.baño;
    const genero = req.body.genero;
    const reporte = req.body.reporte;
            try {                                   
                const query1 = await itemsPool.query("select usuarios_tec.nocontrol as numeroControl from registro_reportes INNER JOIN usuarios_tec ON registro_reportes.fk_id_usuario = usuarios_tec.id_usuario INNER JOIN baños ON registro_reportes.fk_id_baño = baños.id_baño  where date(fecha_hora) =  date($1) AND baño = $2 AND genero =$3  AND tiporegistro =$4 ORDER BY fecha_hora DESC LIMIT 1;",[date,baño,genero,reporte]);
                const query2 = await itemsPool.query("select id_usuario from usuarios_tec where nocontrol = $1",[query1.rows[0].numerocontrol])
                const query3 = await itemsPool.query("insert into falsos_reportes (fecha_hora,fk_id_usuario) values (date($1),$2);",[date,query2.rows[0].id_usuario])
                res.status(200).json({"message":"Usuario reportado con falso reporte"});
            } catch (error) {
                console.error('Error al obtener los registros:', error);
                res.status(500).json({"message":"Error al obtener los registros"});
            }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//Buscar falsos reportes
router.post('/buscarFalsos', async (req, res) => {
    try{

    const date = req.body.date;

        try {                                   
            const query1 = await itemsPool.query("select id_falsoreporte, fecha_hora, usuarios_tec.nocontrol as numeroControl from falsos_reportes INNER JOIN usuarios_tec ON falsos_reportes.fk_id_usuario = usuarios_tec.id_usuario where date(fecha_hora) =  date($1);",[date]);
            query1.rows.forEach((row) => {
                const fechaUTC = moment.utc(row.fecha_hora);
                const fechaChihuahua = fechaUTC.clone().tz("America/Chihuahua");
                row.fecha_hora = fechaChihuahua.format("YYYY-MM-DD HH:mm:ss");
            });
            
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

//REGISTRO ESTACIONAMIENTOS VACIOS
router.post('/dispestacionamiento', async (req, res) => {
    try{
    const idestacionamiento = req.body.idestacionamiento;
            try {                                   
                const query1 = await itemsPool.query("select cajones from estacionamientos where id_estacionamiento = $1;",[idestacionamiento]);                
                let array = (query1.rows[0].cajones);
                let disponibilidad;
                if(array.includes(0)){
                    disponibilidad = true;
                }else{
                    disponibilidad = false;
                }
                res.status(200).json(disponibilidad);
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
