
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

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
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
    MatGridListModule

  ],
  templateUrl: './ejercicio.component.html',
  styleUrl: './ejercicio.component.css', providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EjercicioComponent  implements AfterViewInit, OnInit{

  ngOnInit(): void {




  }
  displayedColumns: string[] = [ 'Nombre', 'Minutos', 'Caloriasw'];
  displayedColumns1: string[] = [ 'Nombre', 'peso','series', 'repeticiones'];
  
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA2);
  totalMinutos: number = 0;
  totalCaloriasw: number = 0;
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }



  @ViewChild (MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
  }


  getTotalMinutes(): number {
    // Suma de minutos
    return this.dataSource.data.map(element => element.Minutos).reduce((acc, value) => acc + value, 0);
    //return this.dataSource.data.map(element => element.Minutos).reduce((acc, value) => acc + value, 0);
  }
  
  getTotalCalories(): number {
    // Suma de calorías
    return this.dataSource.data.map(element => element.Caloriasw).reduce((acc, value) => acc + value, 0);
  }



  Ingresar(){

    this.router.navigate(['/IngresarE']);
  }
  IngresarEF(){

    this.router.navigate(['/IngresarEF']);
  }

}

export interface PeriodicElement {
  Nombre: string;
  Caloriasw: number;
  Minutos: number;

}

export interface PeriodicElement1 {
  Nombre: string;
  Series: number;
  Peso: number;
  Repeticiones:number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { Nombre: 'Correr', Minutos: 1, Caloriasw:1},
  { Nombre: 'Saltar la cuerda', Minutos: 4, Caloriasw:1},
  { Nombre: 'Trotar', Minutos: 6, Caloriasw:1},
  
 
];
const ELEMENT_DATA2: PeriodicElement1[] = [
  { Nombre: 'Pesas', Series: 1, Peso:1, Repeticiones:2},
  { Nombre: 'Dominadas', Series: 4, Peso:1,Repeticiones:4},
  { Nombre: 'Flexiones de pecho', Series: 6, Peso:1,Repeticiones:3}
 
];
