import { environment } from '../../environments/environment';

const base_url = environment.base_url;


export class Usuario {

    constructor(
        public uid: string,
        public rol: string,
        public email: string,
        public nombre: string,
        public apellidos: string,
        public origin_login: string,
        public origin_img?: string,
        public universidad?: string,
        public titulacion?: string,
        public sector?: string,
        public nombreEntidad?:String,
        public terminos_aceptados?: boolean,
    ) {}

    get imagenUrl() {

        if(!this.origin_img) {
            return `${ base_url }/upload/default/avatar`;
        }

        if(this.origin_img.includes('https')) {
            return this.origin_img;
        }

        return `${ base_url }/upload/${ this.origin_img }/avatar`;
    }

    get additionalInfoArray() {

        let info = [];

        if(['ROL_ESTUDIANTE', 'ROL_PROFESOR', 'ROL_GESTOR'].includes(this.rol)) {
            if(this.universidad && this.universidad !== '') { info.push(this.universidad); }
            if(this.titulacion && this.titulacion !== '') { info.push(this.titulacion); }
        }

        if(['ROL_ENTIDAD', 'ROL_GESTOR'].includes(this.rol)) {
            if(this.sector && this.sector !== '') { info.push(this.sector); }
            if(this.nombreEntidad && this.nombreEntidad !== '') { info.push(this.nombreEntidad); }
        }

        return info;
    }


    get additionalInfo() {
        return this.additionalInfoArray.join('<br>');
    }

    get additionalInfoPlain() {
        return this.additionalInfoArray.join(' ');
    }

    get displayRol() {
        switch (this.rol) {
            case 'ROL_ESTUDIANTE':
                return 'Estudiante';
                break;

            case 'ROL_PROFESOR':
                return 'Profesor';
                break;

            case 'ROL_ENTIDAD':
                return 'Entidad';
                break;

            case 'ROL_GESTOR':
                return 'Gestor';
                break;

            default:
                console.log('Usuario - Rol no definido', this);
                throw "Rol no definido";
                break;
        }
    }

    get esGestor() {
        return ['ROL_GESTOR'].includes(this.rol);
    }

    get esEstudiante() {
        return ['ROL_ESTUDIANTE'].includes(this.rol);
    }

    get esProfesor() {
        return ['ROL_PROFESOR'].includes(this.rol);
    }

    get esEntidad() {
        return ['ROL_ENTIDAD'].includes(this.rol);
    }
}
