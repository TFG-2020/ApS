var TProfesor=require("./TProfesor");
class TProfesorExterno extends TProfesor{

    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,iduniversidad,nombreUniversidad, provinciaUniversidad){
        super(id,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
        this.universidad=iduniversidad;
        this.nombreUniversidad=nombreUniversidad;
        this.provinciaUniversidad=provinciaUniversidad;
        this.rol = "ROL_PROFESOR";
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
        return this.universidad;
    }

    setUniversidad(universidad){
        this.universidad=universidad;
    }
}
module.exports= TProfesorExterno;