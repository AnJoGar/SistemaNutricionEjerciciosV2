
import { MatDialog } from '@angular/material/dialog';
import { ServiciosEjeService } from '../../../app/servicios/servicios-eje.service';
import { RegitrarEjercicioService } from '../../../app/servicios/regitrar-ejercicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ejercicio } from '../../../app/interfaces/ejercicio';

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
 
  constructor(private router: Router,
    private serviciosEjeService: RegitrarEjercicioService,
    private http: HttpClient,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
   
    
   
  ) {  console.log('ServiciosEjeService inyectado:', this.serviciosEjeService);

    this.formGroup = this.fb.group({

      fechaRegistro: ['', Validators.required]
    })



  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.serviciosEjeService.ObtenerUsuarios().subscribe(
      (response: ResponseApi) => {
        console.log('Respuesta de la API:', response);
      },
      (error) => {
        console.error('Error al llamar a la API:', error);
      }
    );
    this.mostrarEjercicios();
    this.mostrarEjercicios1();


    this.serviciosEjeService.ObtenerUsuarios2().subscribe({
      next: (data) => {
        console.log("adsadas",data)
        if (data.status){
          this.options4 = data.value;

          console.log("RegistrarEjercicio:", data); 
          if (Array.isArray(data.value) && data.value.length > 0) {
            const firstValue = data.value[2];
            this.fechaFin2 = firstValue.fechaRegistro;  // Updated to use fechaReserva
            console.log("FechaReserva:",  this.fechaFin2);
          }
         
         

        }
      },
      error: (e) => {
      },
      complete: () => {

      }
    })

    this.fechainicio2 ="12/07/2024";
    const _fechaInicio= this.fechainicio2;
    this.serviciosEjeService.reporteEjercicio(
      this.fechainicio2,
      ).subscribe({
        next: (data) => {
          if (data.status) {
            this.ELEMENT_DATA = data.value;
            this.dataSource.data = data.value;
            console.log("fcehasencotradas",data)
          }
          else {
            this.ELEMENT_DATA = [];
            this.dataSource.data = [];
            this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
          } 
        },
        error: (e) => {
        },
        complete: () => {
        }
      })
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }





  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
  }


  getTotalMinutes(): number {
    // Suma de minutos
   // return this.dataSource.data.map(element => element.Minutos).reduce((acc, value) => acc + value, 0);
    //return this.dataSource.data.map(element => element.Minutos).reduce((acc, value) => acc + value, 0);
  return 1;
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
        console.log("gec",data);
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
  
  getTotalCalories(): number {
    // Suma de calorías
   // return this.dataSource.data.map(element => element.Caloriasw).reduce((acc, value) => acc + value, 0);
  return 3;
  }

 

  Ingresar(){

    this.router.navigate(['/IngresarE']);
  }
  IngresarEF(){

    this.router.navigate(['/IngresarEF']);
  }




  onSubmitForm() {
   
    this.fechainicio2 ="12/07/2024";
    //const _fechaInicio= this.fechainicio2;
    const _fechaInicio: any = moment(this.formGroup.value.fechainicio2).format('DD/MM/YYYY')
  
    if (_fechaInicio === "Invalid date" ) {
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
        error: (e) => {},
        complete: () => {}
      });
      return;
    }

    this.serviciosEjeService.reporteEjercicio(
      _fechaInicio,
    ).subscribe({
      next: (data) => {
        console.log("fcehasencotradas",data)
        if (data.status) {
          this.ELEMENT_DATA = data.value;
          this.dataSource.data = data.value;
       
        }
        else {
          this.ELEMENT_DATA = [];
          this.dataSource.data = [];
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
        } 
      },
      error: (e) => {
      },
      complete: () => {
      }
      
    })
  }





}

