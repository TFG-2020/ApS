var TProfesor=require("./TProfesor");
class TProfesorInterno extends TProfesor{

    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados){
        super(id,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
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
}

module.exports= TProfesorInterno;