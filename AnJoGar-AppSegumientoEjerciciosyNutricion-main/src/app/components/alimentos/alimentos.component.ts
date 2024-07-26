import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common'; 
import {MatSidenavModule} from '@angular/material/sidenav';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'; 
import { AlimentosVisualComponent } from '../alimentos-visual/alimentos-visual.component';
import { AlimentosAddComponent } from '../alimentos-add/alimentos-add.component';
import { Alimento } from '../../../app/interfaces/alimentos'; // Importación correcta
import { AlimentosTotalComponent } from '../alimentos-total/alimentos-total.component';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { AlimentosService } from 'src/app/servicios/alimentos.service';
import { AlimetotalService } from 'src/app/servicios/alimetotal.service';
import	{ CalculoService } from 'src/app/servicios/calculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css'],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatCardModule,
    MatDatepickerModule, CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlimentosAddComponent, AlimentosTotalComponent, AlimentosVisualComponent],
})
export class  AlimentosComponent implements OnInit {
  
  totals = {
    calorias: 0,
    carbohidratos: 0,
    grasas: 0,
    proteinas: 0,
    sodio: 0,
    azucar: 0
  };

  selectedDate = new Date(); // Fecha seleccionada para mostrar en la notificación
  waterIntake: number = 0;
   // Definir la fecha máxima como la fecha actual usando JavaScript Date
   maxDate = new Date();

   // Crear un FormControl con la fecha máxima como validador
   date = new FormControl(new Date(), {
     validators: [this.dateValidator.bind(this)]
   });
  constructor(private alimetotalService: AlimetotalService, private router: Router,  private snackBar: MatSnackBar, private calculoService: CalculoService) {}

  ngOnInit() {
    this.loadTotals();
  }

  loadTotals() {
    this.alimetotalService.totales$.subscribe(totales => {
      this.totals = totales;
    });
  }

  actualizarTotales(totales: { calorias: number; carbohidratos: number; grasas: number; proteinas: number; sodio: number; azucar: number; }) {
    this.alimetotalService.actualizarTotales(totales);
  }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  // Validar si la fecha es posterior a la fecha máxima
  dateValidator(control: FormControl) {
    if (control.value && control.value > this.maxDate) {
      return { maxDate: true };
    }
    return null;
  }
  registrarAlimentos() {
    this.openSnackBar();
  }

  openSnackBar() {
    const date = this.date.value;
    const dateFormatted = this.formatDate(date);
    const message = `
      Fecha: ${dateFormatted}\n
      Totales:\n
      Calorías: ${this.totals.calorias.toFixed(3)}\n
      Carbohidratos: ${this.totals.carbohidratos.toFixed(3)}\n
      Grasas: ${this.totals.grasas.toFixed(3)}\n
      Proteínas: ${this.totals.proteinas.toFixed(3)}\n
      Sodio: ${this.totals.sodio.toFixed(3)}\n
      Azúcar: ${this.totals.azucar.toFixed(3)}\n
      Consumo de agua: ${this.waterIntake} vasos
    `;
    this.snackBar.open(message, 'Cerrar', {
      duration: 10000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}