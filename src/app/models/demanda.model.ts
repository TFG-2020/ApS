import { environment } from '../../environments/environment';
import { Usuario } from './usuario.model';
import { Upload } from './upload.model';
import * as moment from 'moment';

const base_url = environment.base_url;

export class Demanda {

    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public imagen: string,
        public ciudad: string,
        public finalidad: string,
        public areaServicio: string[],
        public periodoDefinicionIni: string,
        public periodoDefinicionFin: string,
        public periodoEjecucionIni: string,
        public periodoEjecucionFin: string,
        public fechaFin: string,
        public observacionesTemporales: string,
        public necesidadSocial: string[],
        public titulacionLocal: string[],
        public creador: Usuario,
        public comunidadBeneficiaria: string,
        public createdAt: string,
        public updatedAt:string,

    ) {}

    get parsedCreatedAt() {
        return moment(this.createdAt).format('DD-MM-YYYY');
    }


    get imagenUrl() {

        if(!this.imagen) {
            return `${ base_url }/upload/default/iniciativa`;
        }

        if(this.imagen.includes('https')) {
            return this.imagen;
        }

        return `${ base_url }/upload/${ this.imagen }/iniciativa`;
    }
    get displayProponedorTableInfo() {

        if(!this.creador) {
            return '';
        }

        let info = [];
        if(this.creador.nombre) { info.push(this.creador.nombre); }
        if(this.creador.sector) { info.push(this.creador.sector); }

        return info.join(' ');
    }

    displayUsuarioRol(user: Usuario) {

        if(!user) {
            return '';
        }
        switch (user.rol) {
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
                console.log('oferta - Rol no definido', user);
                throw "Rol no definido";
                break;
        }
    }
}