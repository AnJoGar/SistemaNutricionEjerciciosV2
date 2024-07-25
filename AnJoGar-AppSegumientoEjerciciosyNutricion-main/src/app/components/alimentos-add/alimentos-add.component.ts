import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlimentosService } from '../../../app/servicios/alimentos.service';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { AlimentosVisualComponent } from '../alimentos-visual/alimentos-visual.component';
// Importa Alimento desde el archivo de interfaces
import { Alimento } from 'src/app/interfaces/alimentos';



const moment = _rollupMoment || _moment;

interface AlimentoConPorcionYGramos extends Alimento {
  porcion: number;
  gramos: number;
}
@Component({
  selector: 'app-alimentos-add',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './alimentos-add.component.html',
  styleUrls: ['./alimentos-add.component.css'],
})
export class AlimentosAddComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'porcion', 'gramos', 'calorias', 'carbohidratos', 'grasas', 'proteinas', 'sodio', 'azucar'];
  dataToDisplay: AlimentoConPorcionYGramos[] = [];
  totals = this.calculateTotals();

  @Output() alimentosActualizados = new EventEmitter<AlimentoConPorcionYGramos[]>();

  constructor(public dialog: MatDialog, private alimentosService: AlimentosService) {}

  ngOnInit(): void {
    this.updateTotals();
  }

  addData() {
    const dialogRef = this.dialog.open(AlimentosVisualComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleSelectedAlimentos(result);
      }
    });
  }

  handleSelectedAlimentos(selectedAlimentos: any[]): void {
    console.log('Selected Alimentos:', selectedAlimentos); // Verifica los datos seleccionados

    // Aquí asumimos que cada elemento de selectedAlimentos ya contiene las propiedades de porcion y gramos
    const alimentosConPorcionYGramos: AlimentoConPorcionYGramos[] = selectedAlimentos.map(alimento => ({
      ...alimento,
      porcion: alimento.porcion,  // Usa el valor ingresado en el diálogo
      gramos: alimento.gramos,    // Usa el valor ingresado en el diálogo
      calorias: alimento.calorias * (alimento.porcion / alimento.gramos),
      carbohidratos: alimento.carbohidratos * (alimento.porcion / alimento.gramos),
      grasas: alimento.grasas * (alimento.porcion / alimento.gramos),
      proteinas: alimento.proteinas * (alimento.porcion / alimento.gramos),
      sodio: alimento.sodio * (alimento.porcion / alimento.gramos),
      azucar: alimento.azucar * (alimento.porcion / alimento.gramos),
    }));
  
    console.log('Alimentos Con Porción y Gramos:', alimentosConPorcionYGramos); // Verifica los datos procesados
    this.dataToDisplay = [...this.dataToDisplay, ...alimentosConPorcionYGramos];
    this.totals = this.calculateTotals(); // Recalcular totales
    this.emitirAlimentosActualizados();
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.totals = this.calculateTotals(); // Recalcular totales
    this.emitirAlimentosActualizados();
  }

  calculateTotals() {
    return this.dataToDisplay.reduce((totals, item) => {
      totals.calorias += item.calorias;
      totals.carbohidratos += item.carbohidratos;
      totals.grasas += item.grasas;
      totals.proteinas += item.proteinas;
      totals.sodio += item.sodio;
      totals.azucar += item.azucar;
      return totals;
    }, { calorias: 0, carbohidratos: 0, grasas: 0, proteinas: 0, sodio: 0, azucar: 0 });
  }
  
  updateTotals() {
    this.totals = this.calculateTotals();
    localStorage.setItem('totals', JSON.stringify(this.totals));
  }

  private emitirAlimentosActualizados() {
    this.alimentosActualizados.emit(this.dataToDisplay);
  }
}