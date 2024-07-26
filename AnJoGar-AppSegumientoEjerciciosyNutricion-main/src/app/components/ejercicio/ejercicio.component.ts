
import { MatDialog } from '@angular/material/dialog';
import { ServiciosEjeService } from '../../../app/servicios/servicios-eje.service';
import { RegitrarEjercicioService } from '../../../app/servicios/regitrar-ejercicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ejercicio } from '../../../app/interfaces/ejercicio';
import { UsuarioService } from '../../../app/servicios/usuario.service';

import { Usuario } from '../../../app/interfaces/usuario';
import { ConsultarFecha } from '../../../app/interfaces/consultar-fecha';

import {MatSnackBar} from '@angular/material/snack-bar';

//import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
//import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { provideHttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ResponseApi } from 'src/app/interfaces/response-api';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarEjercicio } from '../../../app/interfaces/registrar-ejercicio';
import moment from "moment";
import { ReactiveFormsModule } from '@angular/forms';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    dateTimeInput: 'DD/MM/YYYY HH:mm'
  },
};

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,MatTableModule, MatPaginatorModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule
  

  ],   
  templateUrl: './ejercicio.component.html',
  styleUrl: './ejercicio.component.css', providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EjercicioComponent  implements AfterViewInit, OnInit{
  formGroup: FormGroup;
  options3: RegistrarEjercicio[] = [];
  options4: ConsultarFecha[] = [];
  fechainicio2: string;
  ELEMENT_DATA: ConsultarFecha[] = [
  ];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['ejercicioDescripcion', 'tiempoEnMinutos', 'caloriasQuemadas'];

  displayedColumns1: string[] = [ 'Nombre', 'peso','series', 'repeticiones'];
  
 // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  totalMinutos: number = 0;
  totalCaloriasw: number = 0;
  fechaFin2:any;
  Usuario:string="";
  correoUsuario:string="";
 
  constructor(private router: Router,
    private serviciosEjeService: RegitrarEjercicioService,
    private http: HttpClient,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _rolUsuario:UsuarioService
   
    
   
  ) {  console.log('ServiciosEjeService inyectado:', this.serviciosEjeService);

    this.formGroup = this.fb.group({

      fechaRegistro: ['', Validators.required],
      fechainicio2:['', Validators.required]
    })



  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.serviciosEjeService.ObtenerUsuarios().subscribe(
      (response: ResponseApi) => {
       // console.log('Respuesta de la API:', response);
      },
      (error) => {
        //console.error('Error al llamar a la API:', error);
      }
    );
    //this.mostrarEjercicios();
   // this.mostrarEjercicios1();






    this.Ejercicio()
    //this.mostrarEjercicios1()

  }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }




  

  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
  }


  getTotalMinutes(): number {
    return this.dataSource.data
    .map(element => element.tiempoEnMinutos)
    .reduce((acc, value) => acc + value, 0);
  }

  mostrarEjercicios() {
    this.serviciosEjeService.ObtenerUsuarios2().subscribe({
      next: (data) => {
        if (data.status)
          this.dataSource.data = data.value;
        else
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
      },
      error: (e) => {
      },
      complete: () => {
      }
    })
  }
  
  mostrarEjercicios1() {
    this.serviciosEjeService.ObtenerUsuarios2().subscribe({
      next: (data) => {
      //  console.log("gec",data);
        if (data.status)
          this.dataSource.data = data.value;
       
        else
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
      },
      error: (e) => {
      },
      complete: () => {
      }
    })
  }



  Ejercicio() {
    const session = this._rolUsuario.obtenerSession();
    this.serviciosEjeService.ObtenerEjerciciosPorUsuario(session.id).subscribe({
      next: (data) => {
        console.log("datos", data); // Registra el objeto data completo para depuración
        this.ELEMENT_DATA = data.value;
        this.dataSource.data = this.ELEMENT_DATA;
        // Asegúrate de que el objeto data y data.value existen
      },
      error: (e) => {
        console.error("Error al obtener los datos:", e);
        this._snackBar.open("Error al obtener los datos", 'Error', { duration: 2000 });
      }
    });
  }


  
  getTotalCalories(): number {
    
    return this.dataSource.data
    .map(element => element.caloriasQuemadas)
    .reduce((acc, value) => acc + value, 0);
  }

 

  Ingresar(){

    this.router.navigate(['/IngresarE']);
  }
  IngresarEF(){

    this.router.navigate(['/IngresarEF']);
  }


  onDateChange(event: any) {
    const selectedDate = event.value;
    this.fechainicio2 = moment(selectedDate).format('DD/MM/YYYY');
    this.filterDataByDate(this.fechainicio2);
  }

  subscribeToDateChanges() {
    this.formGroup.get('fechaRegistro')?.valueChanges.subscribe(value => {
      this.fechainicio2 = moment(value).format('DD/MM/YYYY');
      this.filterDataByDate(this.fechainicio2);
    });
  }
  filterDataByDate(date: any) {
    const _fechaInicio = moment(this.formGroup.value.fechaRegistro, 'DD/MM/YYYY').format('DD/MM/YYYY');
    if (_fechaInicio === "Invalid date") {
      this._snackBar.open("Debe ingresar ambas fechas", 'Oops!', { duration: 2000 });
      this.serviciosEjeService.ObtenerUsuarios2().subscribe({
        next: (data) => {
          if (data.status) {
            this.ELEMENT_DATA = data.value;
            this.dataSource.data = data.value;
          } else {
            this.ELEMENT_DATA = [];
            this.dataSource.data = [];
          }
        },
        error: (e) => {
          console.error("Error obteniendo usuarios:", e);
        }
      });
      return;
    }

    this.serviciosEjeService.reporteEjercicio(_fechaInicio).subscribe({
      next: (data) => {
        if (data.status) {
          this.ELEMENT_DATA = data.value;
          this.dataSource.data = data.value;
        } else {
          this.ELEMENT_DATA = [];
          this.dataSource.data = [];
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
        }
       
       
      
      },
      error: (e) => {
        console.error("Error en reporteEjercicio:", e);
      }
    });
  }
mostrartodo(){

  this.mostrarEjercicios()
  
}

cerrarSesion(){


  this._rolUsuario.eliminarSession()

this.router.navigate(['login']);


}


}

