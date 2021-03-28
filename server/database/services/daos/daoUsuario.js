const knex = require("../../config");
const mysql = require("mysql");
var TAdmin = require("../transfers/TAdmin");
var TEntidad = require("../transfers/TEntidad");
var TUsuario = require("../transfers/TUsuario");
var TProfesor = require("../transfers/TProfesor");
var TOficinaAps = require("../transfers/TOficinaAps");
var TEstudiante = require("../transfers/TEstudiante");
var TProfesorExterno = require("../transfers/TProfesorExterno");
var TProfesorInterno = require("../transfers/TProfesorInterno");
var TEstudianteExterno = require("../transfers/TEstudianteExterno");
var TEstudianteInterno = require("../transfers/TEstudianteInterno");

//INSERTAR------------------------------------------------------------------------------------------------

//Inserta en la base de datos un nuevo usuario
function insertarUsuario(usuario) {
  return knex("usuario")
    .insert({
      origin_login: usuario.getOriginLogin(),
      origin_img: usuario.getOriginImg(),
      createdAt: usuario.getCreatedAt(),
      updatedAt: usuario.getUpdatedAt(),
      terminos_aceptados: usuario.getTermAcept(),
    })
    .select("id")
    .then(function (result) {
      return result;
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

//Inserta en la base de datos un nuevo admin
function insertarAdmin(usuario) {
  return insertarUsuario(usuario).then(function (idF) {
    return knex("datos_personales_interno")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("admin")
          .insert({
            id: idF[0],
            datos_personales_Id: result[0],
          })
          .then(function (resultF) {
            return idF[0];
          })
          .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error");
            borrarUsuario(idF[0]);
            borrarDatosPersonalesInternos(result[0]);
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario(idF[0]);
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

//Inserta en la base de datos una nueva oficinaAPS
function insertarOficinaAps(usuario) {
  return insertarUsuario(usuario).then(function (idF) {
    return knex("datos_personales_interno")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("oficinaaps")
          .insert({ id: idF[0], datos_personales_Id: result[0] })
          .then(function () {
            return idF[0];
          })
          .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error");
            borrarUsuario(idF[0]);
            borrarDatosPersonalesInternos(result[0]);
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario(idF[0]);
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

//Inserta en la base de datos un nuevo estudiante
function insertarEstudiante(usuario) {
  return insertarUsuario(usuario).then(function (idF) {
    return knex("estudiante")
      .insert({ id: idF[0] })
      .then(function () {
        return idF[0];
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario(idF[0]);
      });
  });
}

//Inserta en la base de datos un nuevo estudiante interno
function insertarEstudianteInterno(usuario) {
  return insertarEstudiante(usuario).then(function (idF) {
    return knex("datos_personales_interno")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("estudiante_interno")
          .insert({
            id: idF,
            titulacion_local: usuario.getTitulacionLocal(),
            datos_personales_Id: result[0],
          })
          .then(function () {
            return idF;
          })
          .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error");
            borrarUsuario(idF);
            borrarDatosPersonalesInternos(result[0]);
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario(idF);
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

//Inserta en la base de datos un nuevo profesor
function insertarProfesor(usuario) {
  return insertarUsuario(usuario).then(function (id) {
    return knex("profesor")
      .insert({ id: id[0] })
      .select("id")
      .then(function () {
        return id;
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario[id[0]];
      });
  });
}

function insertarEntidad(usuario) {
  return insertarUsuario(usuario).then(function (idF) {
    return knex("datos_personales_externo")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("entidad")
          .insert({
            id: idF[0],
            sector: usuario.getSector(),
            nombre_entidad: usuario.getNombreEntidad(),
            datos_personales_Id: result[0],
          })
          .then(function () {
            return idF[0];
          })
          .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error");
            borrarUsuario(idF[0]);
            borrarDatosPersonalesExternos(result[0]);
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        borrarUsuario(idF[0]);
        console.log(err);
        console.log("Se ha producido un error");
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

function insertarProfesorInterno(usuario) {
  return insertarProfesor(usuario).then(function (idF) {
    return knex("datos_personales_interno")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("profesor_interno")
          .insert({ id: idF[0], datos_personales_Id: result[0] })
          .then(function () {
            let idTitulaciones = usuario.getTitulacionLocal();
            const fieldsToInsert = idTitulaciones.map((field) => ({
              id_titulacion: field,
              id_profesor: idF[0],
            }));
            return knex("titulacionlocal_profesor")
              .insert(fieldsToInsert)
              .then(function () {
                let idAreasC = usuario.getAreaConocimiento();
                const fieldsToInsertArea = idAreasC.map((field) => ({
                  id_area: field,
                  id_profesor: idF[0],
                }));
                return knex("areaconocimiento_profesor")
                  .insert(fieldsToInsertArea)
                  .then(function () {
                    return idF[0];
                  })
                  .catch((err) => {
                    borrarUsuario(idF[0]);
                    borrarDatosPersonalesInternos(result[0]);
                    console.log(err);
                    console.log("Se ha producido un error");
                  })
                  .finally(() => {
                    knex.destroy();
                  });
              })
              .catch((err) => {
                borrarUsuario(idF[0]);
                borrarDatosPersonalesInternos(result[0]);
                console.log(err);
                console.log("Se ha producido un error");
              })
              .finally(() => {
                knex.destroy();
              });
          })
          .catch((err) => {
            borrarUsuario(idF[0]);
            borrarDatosPersonalesInternos(result[0]);
            console.log(err);
            console.log("Se ha producido un error");
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        borrarUsuario(idF[0]);
        console.log(err);
        console.log("Se ha producido un error");
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

function insertarEstudianteExterno(usuario) {
  return insertarEstudiante(usuario).then(function (idF) {
    return knex("datos_personales_externo")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("estudiante_externo")
          .insert({
            id: idF,
            universidad: usuario.getUniversidad(),
            titulacion: usuario.getTitulacion(),
            datos_personales_Id: result[0],
          })
          .then(function () {
            return idF;
          })
          .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error");
            borrarUsuario(idF);
            borrarDatosPersonalesInternos(result[0]);
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario(idF);
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

function insertarProfesorExterno(usuario) {
  return insertarProfesor(usuario).then(function (idF) {
    return knex("datos_personales_externo")
      .insert({
        correo: usuario.getCorreo(),
        password: usuario.getPassword(),
        apellidos: usuario.getApellidos(),
        nombre: usuario.getNombre(),
      })
      .select("id")
      .then(function (result) {
        return knex("profesor_externo")
          .insert({
            id: idF[0],
            universidad: usuario.getUniversidad(),
            datos_personales_Id: result[0],
          })
          .then(function () {
            return idF[0];
          })
          .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error");
            borrarUsuario(idF[0]);
            borrarDatosPersonalesExternos(result[0]);
          })
          .finally(() => {
            knex.destroy();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
        borrarUsuario(idF[0]);
      })
      .finally(() => {
        knex.destroy();
      });
  });
}

//ELIMINAR UNO---------------------------------------------------------------------------------------------------

function borrarDatosPersonalesInternos(id) {
  return knex("datos_personales_interno")
    .del()
    .where({ id: id })
    .then(function (result) {
      return id;
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarDatosPersonalesExternos(id) {
  return knex("datos_personales_externo")
    .del()
    .where({ id: id })
    .then(function (result) {
      return id;
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarUsuario(id) {
  return knex("usuario")
    .del()
    .where({ id: id })
    .then(function (result) {
      return id;
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarEstudianteInterno(id) {
  return obtenerEstudianteInterno(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function (res2) {
          return knex("datos_personales_interno")
            .del()
            .where({ correo: correoU })
            .then(function (res3) {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarEstudianteExterno(id) {
  return obtenerEstudianteExterno(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function () {
          return knex("datos_personales_externo")
            .del()
            .where({ correo: correoU })
            .then(function () {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarProfesorExterno(id) {
  return obtenerProfesorExterno(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function (res2) {
          return knex("datos_personales_externo")
            .del()
            .where({ correo: correoU })
            .then(function (res3) {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarProfesorInterno(id) {
  return obtenerProfesorInterno(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function (res2) {
          return knex("datos_personales_interno")
            .del()
            .where({ correo: correoU })
            .then(function (res3) {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarAdmin(id) {
  return obtenerAdmin(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function (res2) {
          return knex("datos_personales_interno")
            .del()
            .where({ correo: correoU })
            .then(function (res3) {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarOficinaAPS(id) {
  return obtenerOficinaAps(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function (res2) {
          return knex("datos_personales_interno")
            .del()
            .where({ correo: correoU })
            .then(function (res3) {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function borrarEntidad(id) {
  return obtenerEntidad(id)
    .then(function (res) {
      const correoU = res["correo"];
      return borrarUsuario(id)
        .then(function (res2) {
          return knex("datos_personales_externo")
            .del()
            .where({ correo: correoU })
            .then(function (res3) {
              return id;
            })
            .catch((err) => {
              console.log(err);
              console.log("Se ha producido un error");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Se ha producido un error");
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

//LEER UNO----------------------------------------------------------------------------------------------------

function obtenerUsuario(id) {
  return knex("usuario")
    .where({ id: id })
    .select("*")
    .then(function (response) {
      return response[0];
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerDatosPersonalesInterno(id) {
  return knex("datos_personales_interno")
    .where({ id: id })
    .select("*")
    .then(function (response) {
      return response[0];
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}
function obtenerDatosPersonalesExterno(id) {
  return knex("datos_personales_externo")
    .where({ id: id })
    .select("*")
    .then(function (response) {
      return response[0];
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerAdmin(id) {
  return obtenerUsuario(id).then(function (usuario) {
    return knex("admin")
      .where({ id: id })
      .select("*")
      .then(function (admin) {
        return obtenerDatosPersonalesInterno(
          admin[0]["datos_personales_Id"]
        ).then(function (datos) {
          return new TAdmin(
            usuario["id"],
            datos["correo"],
            datos["nombre"],
            datos["apellidos"],
            datos["password"],
            usuario["origin_login"],
            usuario["origin_img"],
            usuario["createdAt"],
            usuario["updatedAt"],
            usuario["terminos_aceptados"]
          );
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error");
      });
  });
}

function obtenerOficinaAps(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return knex("oficinaaps")
        .where({ id: id })
        .select("*")
        .then(function (admin) {
          return obtenerDatosPersonalesInterno(
            admin[0]["datos_personales_Id"]
          ).then(function (datos) {
            return new TOficinaAps(
              usuario["id"],
              datos["correo"],
              datos["nombre"],
              datos["apellidos"],
              datos["password"],
              usuario["origin_login"],
              usuario["origin_img"],
              usuario["createdAt"],
              usuario["updatedAt"],
              usuario["terminos_aceptados"]
            );
          });
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerEntidad(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return knex("entidad")
        .where({ id: id })
        .select("*")
        .then(function (entidad) {
          return obtenerDatosPersonalesExterno(
            entidad[0]["datos_personales_Id"]
          ).then(function (datos) {
            return new TEntidad(
              usuario["id"],
              datos["correo"],
              datos["nombre"],
              datos["apellidos"],
              datos["password"],
              usuario["origin_login"],
              usuario["origin_img"],
              usuario["createdAt"],
              usuario["updatedAt"],
              usuario["terminos_aceptados"],
              entidad[0]["sector"],
              entidad[0]["nombre_entidad"]
            );
          });
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerProfesor(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return knex("profesor")
        .where({ id: id })
        .select("*")
        .then(function (profesor) {
          return profesor[0];
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerProfesorInterno(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return obtenerProfesor(id).then(function (profesor) {
        return knex("profesor_interno")
          .where({ id: id })
          .select("*")
          .then(function (profesorInterno) {
            return obtenerDatosPersonalesInterno(
              profesorInterno[0]["datos_personales_Id"]
            ).then(function (datos) {
              return knex("areaconocimiento_profesor")
                .where({ id_profesor: id })
                .select("id_area")
                .then((id_areas) => {
                  id_areas_array = [];
                  for (id_area of id_areas) {
                    id_areas_array.push(id_area["id_area"]);
                  }
                  return knex
                    .select("nombre")
                    .from("area_conocimiento")
                    .whereIn("id", id_areas_array)
                    .then((areas_conocim) => {
                      areas = [];
                      for (area of areas_conocim) {
                        areas.push(area["nombre"]);
                      }
                      return knex("titulacionlocal_profesor")
                        .where({ id_profesor: id })
                        .select("id_titulacion")
                        .then((id_titulaciones) => {
                          id_titulaciones_array = [];
                          for (id_tit of id_titulaciones) {
                            id_titulaciones_array.push(id_tit["id_titulacion"]);
                          }
                          return knex
                            .select("nombre")
                            .from("titulacion_local")
                            .whereIn("id", id_titulaciones_array)
                            .then((titulaciones_locales) => {
                              titulac = [];
                              for (tit of titulaciones_locales) {
                                titulac.push(tit["nombre"]);
                              }
                              return new TProfesorInterno(
                                usuario["id"],
                                datos["correo"],
                                datos["nombre"],
                                datos["apellidos"],
                                datos["password"],
                                usuario["origin_login"],
                                usuario["origin_img"],
                                usuario["createdAt"],
                                usuario["updatedAt"],
                                usuario["terminos_aceptados"],
                                areas,
                                titulac
                              );
                            });
                        });
                    });
                });
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerProfesorExterno(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return obtenerProfesor(id).then(function (profesor) {
        return knex("profesor_externo")
          .where({ id: id })
          .select("*")
          .then(function (profesorExterno) {
            return obtenerDatosPersonalesExterno(
              profesorExterno[0]["datos_personales_Id"]
            ).then(function (datos) {
              return knex("universidad")
                .where({ id: profesorExterno[0]["universidad"] })
                .select("*")
                .then(function (uni) {
                  return new TProfesorExterno(
                    usuario["id"],
                    datos["correo"],
                    datos["nombre"],
                    datos["apellidos"],
                    datos["password"],
                    usuario["origin_login"],
                    usuario["origin_img"],
                    usuario["createdAt"],
                    usuario["updatedAt"],
                    usuario["terminos_aceptados"],
                    uni[0]["id"],
                    uni[0]["nombre"],
                    uni[0]["provincia"]
                  );
                });
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerEstudiante(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return knex("estudiante")
        .where({ id: id })
        .select("*")
        .then(function (estudiante) {
          return estudiante[0];
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerEstudianteInterno(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return obtenerEstudiante(id).then(function (profesor) {
        return knex("estudiante_interno")
          .where({ id: id })
          .select("*")
          .then(function (estudianteInterno) {
            return obtenerDatosPersonalesInterno(
              estudianteInterno[0]["datos_personales_Id"]
            ).then(function (datos) {
              return knex("titulacion_local")
                .where({ id: estudianteInterno[0]["titulacion_local"] })
                .select("*")
                .then(function (tit) {
                  return new TEstudianteInterno(
                    usuario["id"],
                    datos["correo"],
                    datos["nombre"],
                    datos["apellidos"],
                    datos["password"],
                    usuario["origin_login"],
                    usuario["origin_img"],
                    usuario["createdAt"],
                    usuario["updatedAt"],
                    usuario["terminos_aceptados"],
                    tit[0]["id"]
                  );
                });
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

function obtenerEstudianteExterno(id) {
  return obtenerUsuario(id)
    .then(function (usuario) {
      return obtenerEstudiante(id).then(function (profesor) {
        return knex("estudiante_externo")
          .where({ id: id })
          .select("*")
          .then(function (estudianteExterno) {
            return obtenerDatosPersonalesExterno(
              estudianteExterno[0]["datos_personales_Id"]
            ).then(function (datos) {
              return knex("universidad")
                .where({ id: estudianteExterno[0]["universidad"] })
                .select("*")
                .then(function (uni) {
                  return new TEstudianteExterno(
                    usuario["id"],
                    datos["correo"],
                    datos["nombre"],
                    datos["apellidos"],
                    datos["password"],
                    usuario["origin_login"],
                    usuario["origin_img"],
                    usuario["createdAt"],
                    usuario["updatedAt"],
                    usuario["terminos_aceptados"],
                    uni[0]["id"],
                    estudianteExterno[0]["titulacion"],
                    uni[0]["nombre"],
                    uni[0]["provincia"]
                  );
                });
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error");
    });
}

//ACTUALIZAR--------------------------------------------------------------------------------------------------

function actualizarUsuario(usuario) {
  return knex("usuario")
    .where("id", usuario.getId())
    .update({
      origin_login: usuario.getOriginLogin(),
      origin_img: usuario.getOriginImg(),
      createdAt: usuario.getCreatedAt(),
      updatedAt: usuario.getUpdatedAt(),
      terminos_aceptados: usuario.getTermAcept(),
    })
    .then(() => {
      return usuario.getId();
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

function actualizarAdmin(usuario) {
  return obtenerAdmin(usuario.getId())
    .then(function (ruser) {
      if (ruser["correo"] === usuario.getCorreo()) {
        return actualizarUsuario(usuario).then(function (res) {
          if (res > 0) {
            return knex("datos_personales_interno")
              .where("correo", ruser["correo"])
              .update({
                nombre: usuario.getNombre(),
                apellidos: usuario.getApellidos(),
                password: usuario.getPassword(),
              })
              .then((rel) => {
                if (rel > 0) {
                  return usuario.getId();
                } else {
                  actualizarUsuario(ruser);
                }
              })
              .catch((err) => {
                console.log(err);
                console.log(
                  "Se ha producido un error al intentar actualizar el usuario"
                );
              });
          } else {
            console.log("Se ha producido un error");
          }
        });
      } else {
        console.log("Los correos no son iguales");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

function actualizarOficinaAPS(usuario) {
  return obtenerOficinaAps(usuario.getId())
    .then(function (ruser) {
      if (ruser["correo"] === usuario.getCorreo()) {
        return actualizarUsuario(usuario).then(function (res) {
          if (res > 0) {
            return knex("datos_personales_interno")
              .where("correo", ruser["correo"])
              .update({
                nombre: usuario.getNombre(),
                apellidos: usuario.getApellidos(),
                password: usuario.getPassword(),
              })
              .then((rel) => {
                if (rel > 0) {
                  return usuario.getId();
                } else {
                  actualizarUsuario(ruser);
                }
              })
              .catch((err) => {
                console.log(err);
                console.log(
                  "Se ha producido un error al intentar actualizar el usuario"
                );
              });
          } else {
            console.log("Se ha producido un error");
          }
        });
      } else {
        console.log("Los correos no son iguales");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

function actualizarEntidad(usuario) {
  return obtenerEntidad(usuario.getId())
    .then(function (ruser) {
      if (ruser["correo"] === usuario.getCorreo()) {
        return actualizarUsuario(usuario).then(function (res) {
          if (res > 0) {
            return knex("datos_personales_externo")
              .where("correo", ruser["correo"])
              .update({
                nombre: usuario.getNombre(),
                apellidos: usuario.getApellidos(),
                password: usuario.getPassword(),
              })
              .then((rel) => {
                if (rel > 0) {
                  return knex("entidad")
                    .where("id", usuario.getId())
                    .update({
                      sector: usuario.getSector(),
                      nombre_entidad: usuario.getNombreEntidad(),
                    })
                    .then((rel2) => {
                      if (rel2 > 0) {
                        return usuario.getId();
                      } else {
                        actualizarUsuario(ruser);
                        knex("datos_personales_externo")
                          .where("correo", ruser["correo"])
                          .update({
                            nombre: usuario.getNombre(),
                            apellidos: usuario.getApellidos(),
                            password: usuario.getPassword(),
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      console.log(
                        "Se ha producido un error al intentar actualizar el usuario"
                      );
                    });
                } else {
                  actualizarUsuario(ruser);
                }
              })
              .catch((err) => {
                console.log(err);
                console.log(
                  "Se ha producido un error al intentar actualizar el usuario"
                );
              });
          } else {
            console.log("Se ha producido un error");
          }
        });
      } else {
        console.log("Los correos no son iguales");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

function actualizarEstudiante(usuario) {
  return actualizarUsuario(usuario).then(function () {
    return knex("estudiante")
      .where("id", usuario.getId())
      .update({})
      .then(() => {
        return usuario.getId();
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar actualizar el usuario"
        );
      });
  });
}

function actualizarProfesor(usuario) {
  return actualizarUsuario(usuario).then(function () {
    return knex("profesor")
      .where("id", usuario.getId())
      .update({})
      .then(() => {
        return usuario.getId();
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar actualizar el usuario"
        );
      });
  });
}

function actualizarEstudianteExterno(usuario) {
  return obtenerEstudianteExterno(usuario.getId())
    .then(function (ruser) {
      if (ruser["correo"] === usuario.getCorreo()) {
        return actualizarUsuario(usuario).then(function (res) {
          if (res > 0) {
            return knex("datos_personales_externo")
              .where("correo", ruser["correo"])
              .update({
                nombre: usuario.getNombre(),
                apellidos: usuario.getApellidos(),
                password: usuario.getPassword(),
              })
              .then((rel) => {
                if (rel > 0) {
                  return knex("estudiante_externo")
                    .where("id", usuario.getId())
                    .update({
                      titulacion: usuario.getTitulacion(),
                      universidad: usuario.getUniversidad(),
                    })
                    .then((rel2) => {
                      if (rel2 > 0) {
                        return usuario.getId();
                      } else {
                        actualizarUsuario(ruser);
                        knex("datos_personales_externo")
                          .where("correo", ruser["correo"])
                          .update({
                            nombre: usuario.getNombre(),
                            apellidos: usuario.getApellidos(),
                            password: usuario.getPassword(),
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      console.log(
                        "Se ha producido un error al intentar actualizar el usuario"
                      );
                    });
                } else {
                  actualizarUsuario(ruser);
                }
              })
              .catch((err) => {
                console.log(err);
                console.log(
                  "Se ha producido un error al intentar actualizar el usuario"
                );
              });
          } else {
            console.log("Se ha producido un error");
          }
        });
      } else {
        console.log("Los correos no son iguales");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

function actualizarProfesorExterno(usuario) {
  return obtenerProfesorExterno(usuario.getId())
    .then(function (ruser) {
      if (ruser["correo"] === usuario.getCorreo()) {
        return actualizarUsuario(usuario).then(function (res) {
          if (res > 0) {
            return knex("datos_personales_externo")
              .where("correo", ruser["correo"])
              .update({
                nombre: usuario.getNombre(),
                apellidos: usuario.getApellidos(),
                password: usuario.getPassword(),
              })
              .then((rel) => {
                if (rel > 0) {
                  return knex("profesor_externo")
                    .where("id", usuario.getId())
                    .update({
                      universidad: usuario.getUniversidad(),
                    })
                    .then((rel2) => {
                      if (rel2 > 0) {
                        return usuario.getId();
                      } else {
                        actualizarUsuario(ruser);
                        knex("datos_personales_externo")
                          .where("correo", ruser["correo"])
                          .update({
                            nombre: usuario.getNombre(),
                            apellidos: usuario.getApellidos(),
                            password: usuario.getPassword(),
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      console.log(
                        "Se ha producido un error al intentar actualizar el usuario"
                      );
                    });
                } else {
                  actualizarUsuario(ruser);
                }
              })
              .catch((err) => {
                console.log(err);
                console.log(
                  "Se ha producido un error al intentar actualizar el usuario"
                );
              });
          } else {
            console.log("Se ha producido un error");
          }
        });
      } else {
        console.log("Los correos no son iguales");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

function actualizarProfesorInterno(usuario, areas, titulaciones) {
  return actualizarUsuario(usuario).then(function () {
    return knex("datos_personales_interno")
      .where("correo", usuario.getCorreo())
      .update({
        nombre: usuario.getNombre(),
        apellidos: usuario.getApellidos(),
        password: usuario.getPassword(),
      })
      .then(() => {
        console.log("entra1");
        return knex("areaconocimiento_profesor")
          .where("id_profesor", usuario.getId())
          .del()
          .then(() => {
            console.log("entra2");
            let areasconocimiento = areas;
            const fieldsToInsert = areasconocimiento.map((area) => ({
              id_area: area,
              id_profesor: usuario.getId(),
            }));
            console.log(fieldsToInsert);
            return knex("areaconocimiento_profesor")
              .insert(fieldsToInsert)
              .then(() => {
                return knex("titulacionlocal_profesor")
                  .where("id_profesor", usuario.getId())
                  .del()
                  .then(() => {
                    let titlocal = titulaciones;
                    const fieldsToInsertT = titlocal.map((loc) => ({
                      id_titulacion: loc,
                      id_profesor: usuario.getId(),
                    }));
                    return knex("titulacionlocal_profesor")
                      .insert(fieldsToInsertT)
                      .then(() => {
                        return usuario.getId();
                      });
                  });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar actualizar el usuario"
        );
      });
  });
}

function actualizarEstudianteInterno(usuario) {
  return obtenerEstudianteInterno(usuario.getId())
    .then(function (ruser) {
      if (ruser["correo"] === usuario.getCorreo()) {
        return actualizarUsuario(usuario).then(function (res) {
          if (res > 0) {
            return knex("datos_personales_interno")
              .where("correo", ruser["correo"])
              .update({
                nombre: usuario.getNombre(),
                apellidos: usuario.getApellidos(),
                password: usuario.getPassword(),
              })
              .then((rel) => {
                if (rel > 0) {
                  return knex("estudiante_interno")
                    .where("id", usuario.getId())
                    .update({
                      titulacion_local: usuario.getTitulacionLocal(),
                    })
                    .then((rel2) => {
                      if (rel2 > 0) {
                        return usuario.getId();
                      } else {
                        actualizarUsuario(ruser);
                        knex("datos_personales_interno")
                          .where("correo", ruser["correo"])
                          .update({
                            nombre: usuario.getNombre(),
                            apellidos: usuario.getApellidos(),
                            password: usuario.getPassword(),
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      console.log(
                        "Se ha producido un error al intentar actualizar el usuario"
                      );
                    });
                } else {
                  actualizarUsuario(ruser);
                }
              })
              .catch((err) => {
                console.log(err);
                console.log(
                  "Se ha producido un error al intentar actualizar el usuario"
                );
              });
          } else {
            console.log("Se ha producido un error");
          }
        });
      } else {
        console.log("Los correos no son iguales");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Se ha producido un error al intentar actualizar el usuario");
    });
}

//AUXILIARES----------------------------------------------------------------------------------------------------

function obtenerProfesoresInternos(arrayProfesores) {
  return knex
    .raw(
      "select usuario.id,datos_personales_interno.correo,datos_personales_interno.apellidos,datos_personales_interno.nombre, datos_personales_interno.password, usuario.origin_login,usuario.origin_img,usuario.createdAt,usuario.updatedAt,usuario.terminos_aceptados,area_conocimiento.nombre as area,titulacion_local.nombre as titulacion from usuario,profesor,profesor_interno,datos_personales_interno,area_conocimiento,areaconocimiento_profesor,titulacion_local,titulacionlocal_profesor where usuario.id = profesor.id AND usuario.id=profesor_interno.id AND profesor_interno.datos_personales_Id=datos_personales_interno.id AND usuario.id =areaconocimiento_profesor.id_profesor AND titulacionlocal_profesor.id_profesor=usuario.id AND titulacionlocal_profesor.id_titulacion=titulacion_local.id AND area_conocimiento.id = areaconocimiento_profesor.id_area AND usuario.id in (" +
        arrayProfesores.map((_) => "?").join(",") +
        ")",
      [...arrayProfesores]
    )
    .then(function (result) {
      let resultadoF = [],
        aux;
      let setF = new Set();
      result[0].forEach((element) => {
        let conocimientos = new Set(),
          titulaciones = new Set();
        result[0].forEach((element2) => {
          if (element.id === element2.id) {
            conocimientos.add(element2.area);
            titulaciones.add(element2.titulacion);
          }
        });
        if (!setF.has(element.id)) {
          setF.add(element.id);
          aux = {
            id: element["id"],
            correo: element["correo"],
            apellidos: element["apellidos"],
            nombre: element["nombre"],
            password: element["password"],
            origin_login: element["origin_login"],
            origin_img: element["origin_img"],
            createdAt: element["createdAt"],
            updatedAt: element["updatedAt"],
            terminos_aceptados: element["terminos_aceptados"],
            area_conocimiento: conocimientos,
            titulacion_local: titulaciones,
          };
          resultadoF.push(aux);
        }
      });
      return resultadoF;
    });
}

function obtenerTitulacionesProfesorInterno(id){
  return knex("titulacionlocal_profesor")
    .join("titulacion_local", "titulacionlocal_profesor.id_titulacion", "=", "titulacion_local.id")
    .where({id_profesor : id})
    .select(
      "titulacion_local.nombre"
    )
    .then((titulaciones) =>{
      var nombres_titulaciones = [];
      titulaciones.forEach(titulacion => {
        nombres_titulaciones.push(titulacion['nombre']);
      });
      return nombres_titulaciones;
    })
    .catch((err) => {
      console.log(err);
      console.log(
        "Se ha producido un error al intentar obtener las titulaciones del profesor ", id
      );
    });
}
module.exports = {
  obtenerUsuario,
  obtenerEstudianteExterno,
  obtenerProfesorExterno,
  obtenerEstudianteInterno,
  obtenerTitulacionesProfesorInterno,
  obtenerAdmin,
  insertarProfesorExterno,
  insertarEstudianteExterno,
  insertarProfesorInterno,
  insertarEntidad,
  insertarProfesor,
  insertarEstudiante,
  insertarEstudianteInterno,
  insertarOficinaAps,
  insertarUsuario,
  borrarUsuario,
  obtenerProfesoresInternos,
  obtenerOficinaAps,
  obtenerProfesor,
  obtenerEntidad,
  obtenerAdmin,
  actualizarAdmin,
  actualizarEntidad,
  actualizarEstudiante,
  actualizarEstudianteExterno,
  actualizarEstudianteInterno,
  actualizarOficinaAPS,
  actualizarProfesor,
  actualizarProfesorExterno,
  actualizarProfesorInterno,
  insertarAdmin,
  obtenerProfesorInterno,
  borrarEstudianteInterno,
  borrarProfesorInterno,
  borrarAdmin,
  borrarEntidad,
  borrarOficinaAPS,
  borrarProfesorExterno,
  borrarEstudianteExterno,
  borrarUsuario,
  actualizarUsuario,
  knex,
};
