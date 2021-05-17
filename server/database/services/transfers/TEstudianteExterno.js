const TEstudiante =require("./TEstudiante")
class TEstudianteExterno extends TEstudiante{
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,iduniversidad,titulacion,nombreUniversidad,provinciaUniversidad){
        super(id,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
        this.iduniversidad=iduniversidad;
        this.titulacion=titulacion;
        this.nombreUniversidad=nombreUniversidad;
        this.provinciaUniversidad=provinciaUniversidad;
        this.rol = "ROL_ESTUDIANTE";
    }
    getNombre(){
        return this.nombre;
     }
 
     setNombre(nombre){
         this.nombre=nombre;
     }
 
     getCorreo(){
         return this.correo;
      }
  
      setCorreo(correo){
          this.correo=correo;
      }
 
      getApellidos(){
         return this.apellidos;
      }
    
      setApellidos(apellidos){
          this.apellidos=apellidos;
      }
      getPassword(){
         return this.password;
      }
  
      setPassword(password){
          this.password=password;
      } 
    getUniversidad(){
        return this.iduniversidad;
    }

    setUniversidad(iduniversidad){
        this.iduniversidad=iduniversidad;
    }

    getTitulacion(){
        return this.titulacion;
    }

    setTitulacion(titulacion){
        this.titulacion=titulacion;
    }

    getnombreUniversidad(){
        return this.nombreUniversidad;
    }

    setnombreUniversidad(nombreUniversidad){
        this.nombreUniversidad=nombreUniversidad;
    }

    getprovinciaUniversidad(){
        return this.provinciaUniversidad;
    }

    setprovinciaUniversidad(provinciaUniversidad){
        this.provinciaUniversidad=provinciaUniversidad;
    }
}


module.exports= TEstudianteExterno;