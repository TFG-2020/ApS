var TUsuario =require("./TUsuario");
class TEntidad extends TUsuario{
  
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,sector,nombre_entidad){
        super(id,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
        this.sector=sector;
        this.nombre_entidad=nombre_entidad;
        this.rol = "ROL_ENTIDAD";
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
   
    getSector(){
        return this.sector;
    }

    setSector(sector){
        this.sector=sector;
    }

    getNombreEntidad(){
        return this.nombre_entidad;
    }

    setNombreEntidad(nombre_entidad){
        this.nombre_entidad=nombre_entidad;
    }
}


module.exports= TEntidad;