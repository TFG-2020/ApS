import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ROL_ENTIDAD, ROL_PROFESOR, ROL_ESTUDIANTE } from './../../../../server/models/rol.model';
import { UsuarioService } from '../../services/usuario.service';
import { HomeService } from "../../services/home.service";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SobreApsUnedContactaComponent } from 'src/app/pages/sobre-aps-uned-contacta/sobre-aps-uned-contacta.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  public formSubmitted = false;
  public codeList: any ;
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private registerService: HomeService, private router: Router) { 
    
  }

  public registerForm = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    rol: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*<>()-])(?=.*[0-9])(?=.*[a-z]).{8,15}$")
    ]),
    password_2: new FormControl('',
      Validators.required
    ),

    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    universidad: new FormControl(''),
    titulacion: new FormControl(''),
    sector: new FormControl(''),
    nombreEntidad: new FormControl(''),
    terminos_aceptados: new FormControl(false, Validators.requiredTrue),

  }, {
    validators: [
      this.validarUniversidad(),
      this.validarTitulacion(),
      this.validarSector(),
      this.validarNombreEntidad(),
      this.match('password', 'password_2', 'password-mismatch'),
    ]
  });


  ngOnInit(): void {
    this.obtenerUniversidades();
  }


  async  obtenerUniversidades() {
     return this.registerService.obtenerUniversidades()
        .subscribe( (resp: any) => {
          console.log(resp)
          this.codeList =resp.codeList
          return this.codeList;
        });
  }

  get primEmail() {
    return this.registerForm.get('email')
  }

  get GetPassword() {
    return this.registerForm.get('password')
  }

  get GetPasswordConfirm() {
    return this.registerForm.get('password_2')
  }
  get getUniveridad() {
    return this.registerForm.get('universidad')
  }
  get getSector() {
    return this.registerForm.get('sector')
  }
  get getNombreEntidad() {
    return this.registerForm.get('nombreEntidad')
  }

  get getTitulacion() {
    return this.registerForm.get('titulacion')
  }
  get getNombre() {
    return this.registerForm.get('nombre')
  }
  get getApellidos() {
    return this.registerForm.get('apellidos')
  }
  public roles = this.getRoles();
  

  register(): void {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService
      .crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigate(['/']);
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  getRoles() {
    return [
      { id: ROL_ENTIDAD, name: 'Entidad' },
      { id: ROL_PROFESOR, name: 'Profesor' },
      { id: ROL_ESTUDIANTE, name: 'Estudiante' },
    ];
  }

  match(firstControlName: string | (string | number)[], secondControlName: string | (string | number)[], customError = 'mismatch') {
    return (fg: FormGroup) => {
      console.log(fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true });
      
      return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true };
    };

  }

   noListMatch() {
    let accept=true;
          for (let v of this.codeList) {
            if (v.nombre === this.registerForm.get('universidad').value || this.registerForm.get('universidad').value === '')
              accept = false;
          }
          return accept;

  } 

  passwordsNoCoinciden(): Boolean {
    return this.formSubmitted && (this.registerForm.get('password').value !== this.registerForm.get('password_2').value);
  }

  validacionPasswordsNoCoinciden() {
    return (formGroup: FormGroup) => {
      if (this.passwordsNoCoinciden()) {
        formGroup.get('password').setErrors({ required: true });
      } else {
        formGroup.get('password').setErrors(null);
      }
    }
  }

  passwordsVacias(): Boolean {
    return this.formSubmitted && (this.registerForm.get('password').value === '');
  }

  validacionPasswordsVacias() {
    return (formGroup: FormGroup) => {
      if (this.passwordsVacias()) {
        formGroup.get('password_2').setErrors({ required: true });
      } else {
        formGroup.get('password_2').setErrors(null);
      }
    }
  }

  validarCampoSegunPerfil(campo: string | (string | number)[], roles: string | any[]) {
    return (formGroup: FormGroup) => {
      const control_rol = formGroup.get('rol');
      const campo_bajo_validacion = formGroup.get(campo);

      if (campo_bajo_validacion.value === '' && roles.includes(control_rol.value)) {
        campo_bajo_validacion.setErrors({ required: true });
      } else {
        campo_bajo_validacion.setErrors(null);
      }
    }
  }

  validarUniversidad() {
    return this.validarCampoSegunPerfil('universidad', [ROL_ESTUDIANTE, ROL_PROFESOR]);
  }

  validarTitulacion() {
    return this.validarCampoSegunPerfil('titulacion', [ROL_ESTUDIANTE, ROL_PROFESOR]);
  }

  validarSector() {
    return this.validarCampoSegunPerfil('sector', [ROL_ENTIDAD]);
  }

  validarNombreEntidad() {
    return this.validarCampoSegunPerfil('nombreEntidad', [ROL_ENTIDAD]);
  }
}
