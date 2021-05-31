class TAnuncioServicio {
    id;
    titulo;
    descripcion;
    imagen;
    created_at;
    updated_at;
    _v;
    area_servicio;
    constructor(id, titulo, descripcion, imagen, created_at, updated_at, _v, area_servicio) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen ;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this._v = _v;
        this.area_servicio = area_servicio;
    }

    getId() {
        return this.id;
    }

    setId(id_anuncio) {
        return this.id = id_anuncio;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getImagen() {
        return this.imagen;
    }

    setImagen(imagen) {
        this.imagen = imagen;
    }

    getCreated_at() {
        return this.created_at;
    }

    setCreated_at(created_at) {
        this.created_at = created_at;
    }

    getUpdated_at() {
        return this.updated_at;
    }

    setUpdated_at(updated_at) {
        this.updated_at = updated_at;
    }

    get_v() {
        return this._v;
    }

    set_v(_v) {
        this._v = _v;
    }
    getArea_servicio() {
        return this.area_servicio;
    }

    setArea_servicio(area_servicio) {
        this.area_servicio = area_servicio;
    }

}
module.exports = TAnuncioServicio;