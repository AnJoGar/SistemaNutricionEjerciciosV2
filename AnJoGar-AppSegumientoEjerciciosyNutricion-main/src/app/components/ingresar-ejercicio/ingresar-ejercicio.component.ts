
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosEjeService } from '../../../app/servicios/servicios-eje.service';
import { RegitrarEjercicioService } from '../../../app/servicios/regitrar-ejercicio.service';
import { UsuarioService } from '../../../app/servicios/usuario.service';
import { Ejercicio } from '../../../app/interfaces/ejercicio';
import { RegistrarEjercicio } from '../../../app/interfaces/registrar-ejercicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../app/interfaces/usuario';

import {MatSnackBar} from '@angular/material/snack-bar';

//import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AfterViewInit, Component, ViewChild,OnInit, Inject} from '@angular/core';
//import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { provideHttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {  ReactiveFormsModule } from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { ResponseApi } from 'src/app/interfaces/response-api';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//angular material
import { MatCardModule } from '@angular/material/card';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser'
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import {CommonModule} from '@angular/common'
import { MatListModule } from '@angular/material/list';


import { MatTooltipModule } from '@angular/material/tooltip';

import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-ingresar-ejercicio',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatDividerModule, MatIconModule,
    HttpClientModule,MatAutocompleteTrigger,ReactiveFormsModule,MatAutocompleteModule,MatOptionModule,MatSelectModule,
    CommonModule, FormsModule




  ],
  templateUrl: './ingresar-ejercicio.component.html',
  styleUrl: './ingresar-ejercicio.component.css',
  providers: [MatAutocompleteTrigger] 
})
export class IngresarEjercicioComponent {
  agregarRegistro!: RegistrarEjercicio;
  registrarEjercicio: RegistrarEjercicio;
  selectedEjercicio: any; 
  TotalCaloriasQuemas:any;
  CalQ:any;
  selectedEjercicioID: any; 
  filteredEjericio!: Ejercicio[];
  filteredReEjericio!: RegistrarEjercicio[];
  formRejercicio: FormGroup;
  caloriasQuemadas: number;
  options2: Ejercicio[] = [];
  options3: RegistrarEjercicio[] = [];
  agregarEjercicio!: Ejercicio;
  agregarUsuario!: Usuario;
  userId: number;
  constructor(private router: Router,
 //   @Inject(MAT_DIALOG_DATA) public usuarioEditar: Usuario,
    private fb: FormBuilder,
    private serviciosEjeService: ServiciosEjeService,
    private RegEjeService: RegitrarEjercicioService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private  usuarioService:UsuarioService,
    
  ) { 

    this.formRejercicio = this.fb.group({
      tiempoEnMinutos: ['', Validators.required],
      ejercicio:['', Validators.required],
      caloriasQuemadas:['', Validators.required]

    })



    this.formRejercicio.get('ejercicio')?.valueChanges.subscribe(value => {
      this.filteredEjericio = this._filterServicio(value)
    })

    this.serviciosEjeService.ObtenerUsuarios().subscribe({
      next: (data) => {
        if (data.status)
          this.options2 = data.value;
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
    this.RegEjeService.ObtenerUsuarios().subscribe({
      next: (data) => {
        console.log("adsadas",data)
        if (data.status)
          this.options3 = data.value;
       
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  
  
  }
  
  ngOnInit(): void {
    this.serviciosEjeService.ObtenerUsuarios().subscribe({
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

    this.RegEjeService.ObtenerUsuarios().subscribe({
      next: (data) => {
        console.log("adsadas",data)
        if (data.status){
          this.options3 = data.value;

          console.log("RegistrarEjercicio:", data); 
          if (Array.isArray(data.value) && data.value.length > 0) {
            const firstValue = data.value[0];
            this.caloriasQuemadas = firstValue.caloriasQuemadas || 0;
            console.log("Calorias Quemadas Inicializadas:", this.caloriasQuemadas);
          }

        }
      },
      error: (e) => {
      },
      complete: () => {

      }
    })


    
    const session = this.usuarioService.obtenerSession();
   this.usuarioService.obtenerSession();
    console.log('ID del usuario logueado:', session.id);


  }

  private _filterServicio(value: any): Ejercicio[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : (value.nombre|| '').toLowerCase();
    return this.options2.filter(option => option.nombre.toLowerCase().includes(filterValue));

  }
  private _filterServicioR(value: any): RegistrarEjercicio[] {
    const filterValue = typeof value === "number" ? value : (value.caloriasQuemadas || '');
    return this.options3.filter(option => option.caloriasQuemadas.toString().includes(filterValue.toString()));
  }

  displayEjercicio(servicio: Ejercicio): string {
    console.log(servicio.nombre);
    return servicio.nombre;
    
  }
  displayEjercicio1(servicio: RegistrarEjercicio): number {
    console.log(servicio.caloriasQuemadas);
    return servicio ? servicio.caloriasQuemadas : 0;
    
  }

  ejercicioSeleccionado(event: any) {
    this.agregarEjercicio = event.option.value;
   // this.selectedEjercicio = event.option.value;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  seleccionarEjercicio(ejercicio: any): void {
    // Maneja la selección del ejercicio de la lista
    //this.selectedEjercicio = ejercicio;
    console.log('Ejercicio seleccionado:', ejercicio);
    this.formRejercicio.get('ejercicio').setValue(ejercicio);
    // Realiza cualquier otra acción necesaria con el ejercicio seleccionado
  }
  get ejercicioSeleccionado1(): string {
    return this.formRejercicio.get('ejercicio').value;
  }
  mostrarEjercicioSeleccionado() {
    const ejercicioSeleccionado = this.formRejercicio.get('ejercicio').value;
    this.selectedEjercicio = ejercicioSeleccionado.nombre; 
    console.log( ejercicioSeleccionado.caloriasQuemadas)// Asegúrate de ajustar esto según la estructura de tu objeto de ejercicio
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

MostrarC(){
  const tiempoEnMinutos = this.formRejercicio.value.tiempoEnMinutos;
  const ejercicioSeleccionado = this.formRejercicio.get('ejercicio').value;
  this.selectedEjercicio = ejercicioSeleccionado.nombre; 
  this.selectedEjercicioID=ejercicioSeleccionado.id;
  this.CalQ =tiempoEnMinutos*ejercicioSeleccionado.caloriasQuemadas;
  console.log("Calorias quemadas", this.CalQ);

}


  Registrar(){
    const session = this.usuarioService.obtenerSession();
  
    const tiempoEnMinutos = this.formRejercicio.value.tiempoEnMinutos;
    const ejercicio = this.formRejercicio.get('ejercicio').value;
    const ejercicioSeleccionado = this.formRejercicio.get('ejercicio').value;
    this.selectedEjercicio = ejercicioSeleccionado.nombre; 
    this.selectedEjercicioID=ejercicioSeleccionado.id;

    const CalQ =tiempoEnMinutos*ejercicioSeleccionado.caloriasQuemadas;
    console.log("Tiempo en minutos ingresado:", tiempoEnMinutos);
    console.log("id:", this.selectedEjercicioID);
    console.log("Tiempo en minutos ingresado:", ejercicio);
    

const _usuario: RegistrarEjercicio = {
  id: this.agregarRegistro == null ? 0 : this.agregarRegistro.id,
      usuarioId: session.id,//this.usuarioService.getUserId(),
      ejercicioId: this.selectedEjercicioID,
      usuarioDescripcion: "",
      ejercicioDescripcion : "",
      tiempoEnMinutos: tiempoEnMinutos,
     
      
      caloriasQuemadas: CalQ
    }
  //  console.log("Tiempo en minutos ingresado:", this.usuarioService.getUserId());
    console.log("caloriasQ",this.caloriasQuemadas)
    console.log("kjkkkkkk",this.formRejercicio.value.tiempoEnMinutos)
    if (this.agregarRegistro==null) {
      this.RegEjeService.guardarOdontologo(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.mostrarAlerta("El ejercicio fue registrado", "Exito");

            this.RegEjeService.ObtenerOdontologoId(data.value.id).subscribe({
              next: (ejercicio) => {
                console.log("Detalles del ejercicio registrado:", ejercicio.caloriasQuemadas);
                _usuario.caloriasQuemadas = ejercicio.caloriasQuemadas;
                 this.TotalCaloriasQuemas = ejercicio.caloriasQuemadas
                
                console.log("Ejercicio registrado con calorias quemadas:",this.TotalCaloriasQuemas);
              },
              error: (e) => {
                console.error(e);
              },
              complete: () => {
                console.log('Detalles del ejercicio obtenidos');
              }
            });
           
          } else {
            this.mostrarAlerta("No se pudo registrar el ejercicio", "Error");
          }
        },
        error: (e) => {
        },
        complete: () => {
        }
      })
    } 








  }


}
