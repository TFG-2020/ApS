require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { dbConnection } = require("./database/config");

// Creo app express
const app = express();

// configurar CORS
app.use(cors());

// lectura y parsear json
app.use( express.json());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/mails", require("./routes/mails"));

app.use("/api/home", require("./routes/home"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/iniciativas", require("./routes/iniciativas"));
app.use("/api/partenariados", require("./routes/partenariados"));
app.use("/api/proyectos", require("./routes/proyectos"));

app.use("/api/upload", require("./routes/uploads"));

// cuando la peticion no es para el backend, servimos el frontend
app.use(express.static(__dirname + "/../dist/portal-aps"));

app.listen(process.env.PORT || 8080, () => {
  console.info("Servidor escuchando en puerto " + process.env.PORT || 8080);
});

// Pruebas DAO Usuario
const dao_usuario = require("./database/services/daos/daoUsuario");
const dao_proyecto = require("./database/services/daos/daoColaboracion");
const tNotas = require("./database/services/transfers/TNotas");
const tProyecto =require("./database/services/transfers/TProyecto");
const tUsuario = require("./database/services/transfers/TUsuario");
const tAdmin = require("./database/services/transfers/TAdmin");
const tOficinaAps = require("./database/services/transfers/TOficinaAps");
const TEstudiante = require("./database/services/transfers/TEstudiante");
const tEstInterno = require("./database/services/transfers/TEstudianteInterno");
const tProfesor = require("./database/services/transfers/TProfesor");
const tEntidad = require("./database/services/transfers/TEntidad");
const tProfesorInterno = require("./database/services/transfers/TProfesorInterno");
const tEstudianteExterno = require("./database/services/transfers/TEstudianteExterno");
const tProfesorExterno = require("./database/services/transfers/TProfesorExterno");
const matching = require("./controllers/matching");

//OJOOOOOO METED VOSOTROS LOS DATOS CORRESPONDIENTES( ID, ATRIBUTOS...)

//DAO PROYECTO---------------------------------------------------------------------------------------------------------------------------

//Crear proyecto y notas------------------------------------------------------------------------------------------------------------------

/* let proyecto1 = new tProyecto(null,"hola","hehe",1,105,[107],1,1,[112])
dao_proyecto.crearProyecto(proyecto1) */

/* let nota1 = new tNotas(null,112,9,20);
dao_proyecto.crearNota(nota1) */

//Obtener proyecto y nota

/* dao_proyecto.obtenerProyecto(20) */
// dao_proyecto.obtenerNota(1)

//Actualizar 

/* let proyecto1 = new tProyecto(20,"nono","hehe",1,105,[107],1,1,[112])
dao_proyecto.actualizarProyecto(proyecto1)  */
/* 
let nota1 = new tNotas(1,112,7,20);
dao_proyecto.actualizarNota(nota1) */

//Borrar

/* dao_proyecto.eliminarNota(1) */

// dao_proyecto.eliminarProyecto(10)









//DAO USUARIO--------------------------------------------------------------------------------------------------------------------

//BORRAR-------------------------------------------------------------------------------------------------------------------------------------------------------------------
// dao_usuario.borrarUsuario(140);
// dao_usuario.borrarEstudianteInterno(101);
// dao_usuario.borrarProfesorInterno(136);
// dao_usuario.borrarOficinaAPS(123);
//dao_usuario.borrarAdmin(107);
//dao_usuario.borrarEntidad();
//dao_usuario.borrarProfesorExterno(122)
//dao_usuario.borrarProfesorInterno(123)

//INSERTAR-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//nuevo estudiante interno
/* let idtitulacion_local=48;
let estudinateInterno1 = new tEstInterno(
  null,
  "correoestuuu@ucm.es",
  "ad",
  "min",
  "1234",
  "origen",
  "imag",
  "creado",
  "actualizado",
  1,
  idtitulacion_local
);
dao_usuario.insertarEstudianteInterno(estudinateInterno1);  */

//Insertar entidad
/* let entidad1 = new tEntidad(
  null,
  "nuevaentidad2@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  "a",
  "b"
);
dao_usuario.insertarEntidad(entidad1); */

/* //Insertar admin
let admin1 = new tAdmin(
  null,
  "adminnuevo@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarAdmin(admin1); */

/* let area_conocimiento = [4, 5];
let titulacion_local = [48, 49];
let profesorInterno = new tProfesorInterno(
  null,
  "profesorInterno.com",
  "nombre",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  null,
  null
);
dao_usuario.insertarProfesorInterno(
  profesorInterno,
  titulacion_local,
  area_conocimiento
);
 */
/* //Insertar estudiante Externo
let estudianteExterno = new tEstudianteExterno(
  null,
  "estudianteExterno1.com",
  "nombre",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  "titulacion",
  null,
  null
);
dao_usuario.insertarEstudianteExterno(estudianteExterno); */

/* //Insertar profesor externo
let profesorExterno = new tProfesorExterno(
  null,
  "profesorExterno1.com",
  "nombre",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  null,
  null
);
dao_usuario.insertarProfesorExterno(profesorExterno); */

/* let usuario1 = new tUsuario(
  null,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarUsuario(usuario1);


let oficinaAPS = new tOficinaAps(
  null,
  "aps1@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarOficinaAps(oficinaAPS);

let estudiante1 = new TEstudiante(
  null,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarEstudiante(estudiante1);
let estudinateInterno1 = new tEstInterno(
  null,
  "esta4@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  48
);
dao_usuario.insertarEstudianteInterno(estudinateInterno1);
let profesor1 = new tProfesor(
  null,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarProfesor(profesor1);

//OBTENER-------------------------------------------------------------------------------------------------------------------------------------------------------------------

dao_usuario.obtenerEstudianteExterno(87);
dao_usuario.obtenerAdmin(107);
dao_usuario.obtenerOficinaAps(108);
dao_usuario.obtenerEntidad(120);
dao_usuario.obtenerEstudianteExterno(133);
dao_usuario.obtenerEstudianteInterno(117);
dao_usuario.obtenerProfesorExterno(134);
dao_usuario.obtenerProfesorInterno(140);
dao_usuario.obtenerEstudianteInterno(100);


*/

//ACTUALIZAR----------------------------------------------------------------------------------------------------------------------------------------------------------------
/* let usuario1 = new tUsuario(
  555,
  "nuevo",
  "nuevo",
  "nuevocreatedAt",
  "nuevoupdatedAt",
  1
);
dao_usuario.actualizarUsuario(usuario1); */

/* 
let estudiante1 = new TEstudiante(
  116,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.actualizarEstudiante(estudiante1); */


/* let admin1 = new tAdmin(
  124,
  "admin3@ucm.es",
  "gudaielaaajgu",
  "minnn",
  "1234",
  "nuevorigin_login",
  "fff",
  "sss",
  "bvx",
  1
);
dao_usuario.actualizarAdmin(admin1); */

/*  let entidad1 = new tEntidad(
  105,
  "nuevaentidad2@ucm.es",
  "asdf",
  "min",
  "1234",
  "nuevorigin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  "a",
  "b"
);
dao_usuario.actualizarEntidad(entidad1);  */

/* let oficinaAPS = new tOficinaAps(
 125,
 "aps1@ucm.es",
 "aholad",
 "min",
 "1234",
 "fidus",
 "123",
 "23",
 "updatedAt",
 1
);
dao_usuario.actualizarOficinaAPS(oficinaAPS);  */

/* let idtitulacion_local = 48;
let estudinateInterno1 = new tEstInterno(
  127,
  "prueba1@ucm.es",
  "denuevo",
  "min",
  "1234",
  "origenblablabla",
  "imag",
  "creado",
  "actualizado",
  1,
  idtitulacion_local
);
dao_usuario.actualizarEstudianteInterno(estudinateInterno1); */

/*  let estudianteExterno = new tEstudianteExterno(
  128,
  "estudianteExterno7.com",
  "otro",
  "apellidos",
  "password",
  "ihaaa",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  "titulacion",
  null,
  null
);
dao_usuario.actualizarEstudianteExterno(estudianteExterno);  */

/* 
let profesorExterno = new tProfesorExterno(
  130,
  "profesorExterno9.com",
  "hola",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  null,
  null
);
dao_usuario.actualizarProfesorExterno(profesorExterno); */

/* let area_conocimiento = [4, 5];
let titulacion_local = [48, 49];
let profesorInterno = new tProfesorInterno(
  134,
  "holaaa94.com",
  "nonono",
  "apellidos",
  "password",
  "pipa",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  null,
  null
);
dao_usuario.actualizarProfesorInterno(
  profesorInterno,
  area_conocimiento,
  titulacion_local

); */

// dao_usuario.obtenerUsuarioSinRol("oficinaapp").then((datos) => {
//   console.log(datos);
// })
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// dao_usuario.obtenerUsuarioSinRolPorId(113).then((result) =>{
//   console.log(result);
// });
// PRUEBAS DAO TENTATIVA
const dao_tentativa = require('./database/services/daos/daoTentativa');
const TOfertaServicio = require('./database/services/transfers/TOfertaServicio');
const TDemandaServicio = require('./database/services/transfers/TDemandaServicio');
const TIniciativa = require('./database/services/transfers/TIniciativa');

// OFERTAS-----------------------------------------------------------------------
// let titulo = "Anuncio 9";
// let descripcion = "Prueba 9";
// let imagen = "Prueba, aquí va la dirección de la imagen";
// let asignatura = ["Ampliación de Matemáticas", "Matemáticas"]; 
// let cuatrimestre = 1;
// let anio = 2020;
// let fecha_limite = new Date (2021, 10, 04);
// let observaciones = "URGENTE";
// let creador = 120;
// let area = [7,5,35,37,36,29];
// let profesores = [120];

// let oferta1 = new TOfertaServicio(null, titulo, descripcion, imagen, "", "", 0.9, asignatura,
//     cuatrimestre, anio, fecha_limite, observaciones, creador, area, profesores); 
// dao_tentativa.crearOferta(oferta1);
// dao_tentativa.obtenerOfertaServicio(57).then(function(oferta){console.log(oferta);});
// anio = 2022;

// asignatura = ["Ampliación de Matemáticas"]; 
// oferta1 = new TOfertaServicio(69, titulo, descripcion, imagen, "", "", 0.9, asignatura,
//     cuatrimestre, anio, fecha_limite, observaciones, creador, area,profesores);
// dao_tentativa.actualizarOfertaServicio(oferta1).then(function(oferta){});
// dao_tentativa.obtenerTodasOfertasServicio().then(function(oferta){console.log(oferta);});
//  dao_tentativa.limpiarAnuncioServicios(); //Elimina todos los elementos de la tabla
// dao_tentativa.crearAnuncio(titulo, descripcion, imagen);
// dao_tentativa.eliminarOferta(60);


// DEMANDAS----------------------------------------------------------------------------------------
// let titulo = "Anuncio casa";
// let descripcion = "Construir una casa";
// let imagen = "Prueba, aquí va la dirección de la imagen";
// let ciudad = "Madrid"; 
// let finalidad = "Construir una casa";
// let periodo_definicion_ini = new Date (2020, 5, 04);
// let periodo_definicion_fin  = new Date (2020, 6, 04);
// let periodo_ejecucion_ini = new Date (2020, 6, 05);
// let periodo_ejecucion_fin = new Date (2021, 2, 11);
// let fecha_fin  = new Date (2021, 7, 01);
// let observaciones_temporales = "NADA";
// let necesidad_social = 18;
// let titulacionlocal_demandada = [1, 2];
// let area_servicio = [7,5,35,37,36,29];
// let creador = 119;
// let demanda = new TDemandaServicio(null, titulo, descripcion, imagen, "", "", 0.9,
//     creador, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
//     periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal_demandada,
//     area_servicio);
// dao_tentativa.crearDemanda(demanda);
// dao_tentativa.obtenerDemandaServicio(62).then(function(oferta){console.log(oferta);});
// ciudad = "Barcelona"; 
// area_servicio = [2];
// titulacionlocal_demandada = [1, 3];
// demanda = new TDemandaServicio(54, titulo, descripcion, imagen, "", "", 0.9,
//     7, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
//     periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal_demandada,
//     area_servicio);
// dao_tentativa.obtenerTodasDemandasServicio().then((datos) => {
//     console.log(datos);
// })
// dao_tentativa.actualizarDemanda(demanda);
// dao_tentativa.eliminarDemanda(62);

//INICIATIVAS
// let titulo = "Iniciativa 1 editada";
// let descripcion = "Descripción de la iniciativa número 1 editada";
// let necesidad_social = 1;
// let area_servicio = [2];
// let estudiante = 8;
// let iniciativa = new TIniciativa(6, titulo, descripcion, necesidad_social, 52, area_servicio, estudiante);
// dao_tentativa.crearIniciativa(iniciativa);
// dao_tentativa.obtenerIniciativa(6).then((datos) => {
//     console.log(datos);
// })
// dao_tentativa.eliminarIniciativa(6);
// dao_tentativa.obtenerTodasIniciativas().then((datos) =>{
//     console.log(datos);
// })
// dao_tentativa.actualizarIniciativa(iniciativa).then((datos) => {
//     console.log("Se ha actualizado la iniciativa número ", datos);
// });

//--------------------------------------Pruebas del DAO comunicacion
// const dao_comunicacion = require('./database/services/daos/daoComunicacion');
// const TUpload = require('./database/services/transfers/TUpload');
// const TMensajes = require('./database/services/transfers/TMensajes');
// const TMail = require('./database/services/transfers/TMail');
// const TNewsletter = require('./database/services/transfers/TNewsletter');
// const dao_colaboracion = require('./database/services/daos/daoColaboracion');
// const TColaboracion = require('./database/services/transfers/TColaboracion');
// const TPartenariado = require('./database/services/transfers/TPartenariado');
// const { date } = require('faker');

// let texto = "texto de prueba para mensaje de colaboracion";
// let fecha = new Date(2021, 2, 16);//pone horas minutos y segundos todo a ceros, arreglar
// let usuario = 5;
//dao_comunicacion.crearMensajeAnuncio(texto, fecha, usuario, 34);
//dao_comunicacion.crearMensajeColab(texto, fecha, usuario, 1);
//dao_comunicacion.obtenerMensajes(6).then(function(mensaje){console.log(mensaje);});
//dao_comunicacion.obtenerMensajesAnuncio(34).then(function(resultado){console.log(resultado);});

// let almacenamiento = "almacenamiento de prueba";
// let campo = "campo de prueba"; 
// let tipo = "prueba"; 
// let tipo_id = "tipo_id prueba"; 
// let camino = "probando probando"; 
// let client_name = "Juan el pruebas"; 
// let nombre = "La prueba";  
// let createdAt = new Date(); 
// let updatedAt = new Date();
// let _v = 0.5; 
// prueba = new transferUpload(2, almacenamiento, campo, tipo, tipo_id, camino, client_name, nombre, createdAt, updatedAt, _v);
// dao_comunicacion.ActualizarUpload(prueba).then(function(upload){});
// dao_comunicacion.crearUploadAnuncio(almacenamiento, campo, tipo, tipo_id, camino, client_name, nombre, 5, createdAt, updatedAt, _v, 54);
//dao_comunicacion.crearUploadColab(almacenamiento, campo, tipo, tipo_id, camino, client_name, nombre, creador, createdAt, updatedAt, _v, 1)
//dao_comunicacion.obtenerUploads(6).then(function(upload){console.log(upload);});
//dao_comunicacion.eliminarUpload(6).then();
//dao_comunicacion.obtenerUploadsAnuncio(9).then(function(upload){console.log(upload);});

// PRUEBAS DAO COLABORACIÓN----------------------------------------------------------------------------------------
// titulo  = "Partenariado 1 editado";
// descripcion = "Descripción partenariado 1";
// admite_externos = 1;
// responsable = 105;
// profesores =[105, 107, 109];
// id_demanda = 52;
// id_oferta = 50;
// estado = 1;
// _v = 11;
// let partenariado = new TPartenariado(null, titulo, descripcion, admite_externos, responsable, profesores, id_demanda, id_oferta, estado, _v);
// dao_colaboracion.crearPartenariado(partenariado);
// return dao_colaboracion.obtenerPartenariado(4).then((datos) =>{
//   console.log(datos);
// })
// dao_colaboracion.eliminarPartenariado(2);
// dao_colaboracion.actualizarPartenariado(partenariado);
// dao_colaboracion.obtenerTodosPartenariados().then((datos) =>{
//   console.log(datos);
// })
// pesoFechas=0.2;
// pesoTitulaciones=0.3;
// pesoAreaServicio=0.1;
// pesoDescripcion=0.2;
// pesoTemp=0.2;

// fs = require('fs')
//  dao_tentativa.obtenerDemandaServicio(69).then(function(demanda){
//    dao_tentativa.obtenerOfertaServicio(67).then(function(oferta){
// //     //console.log(demanda);
// //     //console.log(oferta);
//     var path  = "/configuracion.txt";
//      matching.hacerMatch(__dirname + path, oferta, demanda).then(function(res){
//        console.log("comprobado si son match");
//      });
//    });
//  });