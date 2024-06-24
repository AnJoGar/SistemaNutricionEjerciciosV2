import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

export interface Alimento {
  name: string;
  portion: string;
  quantity: number;
  grams: number;
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  sodium: number;
  sugar: number;
}
const ELEMENT_DATA: Alimento[] = [
  {name: 'Manzana', portion: '1 unidad', quantity: 1, grams: 182, calories: 95, carbohydrates: 25, fats: 0.3, proteins: 0.5, sodium: 2, sugar: 19},
  {name: 'Plátano', portion: '1 unidad', quantity: 1, grams: 118, calories: 105, carbohydrates: 27, fats: 0.3, proteins: 1.3, sodium: 1, sugar: 14},
  {name: 'Arroz', portion: '1 taza', quantity: 1, grams: 158, calories: 206, carbohydrates: 45, fats: 0.4, proteins: 4.3, sodium: 1, sugar: 0},
  {name: 'Pollo', portion: '100 gramos', quantity: 1, grams: 100, calories: 165, carbohydrates: 0, fats: 3.6, proteins: 31, sodium: 74, sugar: 0},
  {name: 'Pan', portion: '1 rebanada', quantity: 1, grams: 28, calories: 79, carbohydrates: 15, fats: 1, proteins: 3, sodium: 146, sugar: 1.5},
  // Agrega más alimentos según sea necesario
];


@Component({
  selector: 'app-alimentos-add',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './alimentos-add.component.html',
  styleUrl: './alimentos-add.component.css',
  
})
export class AlimentosAddComponent implements OnInit {
  displayedColumns: string[] = ['name', 'portion', 'quantity', 'grams', 'calories', 'carbohydrates', 'fats', 'proteins', 'sodium', 'sugar'];
  dataToDisplay: Alimento[] = [];
  date = new FormControl(moment());
  dataSource = new ExampleDataSource(this.dataToDisplay);
  totals = this.calculateTotals();
  listaAlimentos: Alimento[] = [];

  @Output() alimentosActualizados = new EventEmitter<Alimento[]>();

  constructor() {}

  ngOnInit(): void {}

  onAlimentosActualizados(alimentos: Alimento[]) {
    this.listaAlimentos = alimentos;
    console.log('Lista de alimentos actualizada:', this.listaAlimentos);
  }
  addData() {
    if (this.dataToDisplay.length === 0) {
      this.dataToDisplay = [...ELEMENT_DATA];
      this.dataSource.setData(this.dataToDisplay);
      this.totals = this.calculateTotals(); // Recalcular totales
    } else {
      const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
      this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
      this.dataSource.setData(this.dataToDisplay);
      this.totals = this.calculateTotals(); // Recalcular totales
    }
    this.emitirAlimentosActualizados();
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
    this.totals = this.calculateTotals(); // Recalcular totales
    this.emitirAlimentosActualizados();
  }

  calculateTotals() {
    return this.dataToDisplay.reduce((totals, item) => {
      totals.calories += item.calories;
      totals.carbohydrates += item.carbohydrates;
      totals.fats += item.fats;
      totals.proteins += item.proteins;
      totals.sodium += item.sodium;
      totals.sugar += item.sugar;
      return totals;
    }, { calories: 0, carbohydrates: 0, fats: 0, proteins: 0, sodium: 0, sugar: 0 });
  }

  private emitirAlimentosActualizados() {
    this.alimentosActualizados.emit(this.dataToDisplay);
  }
}

class ExampleDataSource extends DataSource<Alimento> {
  private _dataStream = new ReplaySubject<Alimento[]>();

  constructor(initialData: Alimento[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Alimento[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Alimento[]) {
    this._dataStream.next(data);
  }
}
