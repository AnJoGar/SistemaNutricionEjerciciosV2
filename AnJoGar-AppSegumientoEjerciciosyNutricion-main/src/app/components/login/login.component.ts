import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalUsuarioComponent } from '../modales/modal-usuario/modal-usuario.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { Login } from '../../interfaces/login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [UsuarioService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  hidePassword = true;
  loading = false;
  options2: Login[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

    this._usuarioServicio.ObtenerUsuarios().subscribe({
      next: (data) => {
        console.log("adsadas",data)
        if (data.status)
          this.options2 = data.value;
       
      },
      error: (e) => {
      },
      complete: () => {

      }
    })


  }

  onLogin() {
    this.loading = true;

    const correo = this.formLogin.value.email;
    const clave = this.formLogin.value.password;
    if (correo === "1" && clave === "1") {
      // Credenciales válidas, realizar el inicio de sesión
       this.router.navigate(['PaginaPrincipal']); 
      //this.router.navigate(['pages/odontologo']); 
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      this.mostrarAlerta("Credenciales inválidas", "Error");
      this.loading = false;
    }
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  agregarUsuario() {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "agregado") {
        //this.agregarUsuario();
      }
    });
  }

  agregar() {
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: {
        // Pasar los datos necesarios al componente ModalUsuarioComponent
      }
    });

    dialogRef.componentInstance.agregarEditarUsuario();
  }

  mostrarUsuarios() {
    this._usuarioServicio.ObtenerUsuarios();
  }

  onLogin2() {
   
      this.loading = true;
      const request: Login = {
        correo: this.formLogin.value.email,
        clave: this.formLogin.value.password
      };

      this._usuarioServicio.ObtenerIniciarSesion(request).subscribe({
        next: (data) => {
          if (data.status) {
            this._usuarioServicio.guardarSesionUsuario(data.value);
            console.log("usuario logeado",this._usuarioServicio.guardarSesionUsuario(data.value))
            this.router.navigate(['PaginaPrincipal'])
          } else {
            this._snackBar.open("No se encontraron coincidencias", 'Oops!', { duration: 3000 });
          }
        },
        error: (e) => {
          this._snackBar.open("Hubo un error", 'Oops!', { duration: 3000 });
        },
        complete: () => {
          this.loading = false;
        }
      });
    } 
  }
