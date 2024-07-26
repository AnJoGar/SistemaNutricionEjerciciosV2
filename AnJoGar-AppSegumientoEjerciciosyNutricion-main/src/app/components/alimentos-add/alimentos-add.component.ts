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
import { AlimetotalService } from '../../../app/servicios/alimetotal.service';
import { MatDialog } from '@angular/material/dialog';
import { AlimentosVisualComponent } from '../alimentos-visual/alimentos-visual.component';
// Importa Alimento desde el archivo de interfaces
import { Alimento } from 'src/app/interfaces/alimentos';
import { CommonModule } from '@angular/common';



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

  @Output() totalesActualizados = new EventEmitter<{ calorias: number; carbohidratos: number; grasas: number; proteinas: number; sodio: number; azucar: number; }>();

  constructor(public dialog: MatDialog, private alimentosService: AlimentosService, private alimetotalService: AlimetotalService) {}

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
    const alimentosConPorcionYGramos: AlimentoConPorcionYGramos[] = selectedAlimentos.map(alimento => ({
      ...alimento,
     // Ejemplo para Angular con TypeScript

porcion: alimento.porcion,  // Usa el valor ingresado en el diálogo
gramos: alimento.gramos,    // Usa el valor ingresado en el diálogo
calorias: (alimento.calorias * (alimento.porcion / alimento.gramos))*1000,
carbohidratos: (alimento.carbohidratos / 100) * alimento.gramos,
grasas: (alimento.grasas / 100) * alimento.gramos,
proteinas: (alimento.proteinas / 100) * alimento.gramos,
sodio: (alimento.sodio / 100) * alimento.gramos,
azucar: (alimento.azucar / 100) * alimento.gramos,

    }));

    this.dataToDisplay = [...this.dataToDisplay, ...alimentosConPorcionYGramos];
    this.updateTotals(); // Recalcular y actualizar totales
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.updateTotals(); // Recalcular y actualizar totales
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
    const totals = this.calculateTotals();
    this.alimetotalService.resetearTotales(); // Resetea los totales antes de aplicar los nuevos
    this.alimetotalService.actualizarTotales(totals); // Actualiza los totales con los nuevos valores
    this.totalesActualizados.emit(totals); 
    localStorage.setItem('totals', JSON.stringify(totals));
  }

}