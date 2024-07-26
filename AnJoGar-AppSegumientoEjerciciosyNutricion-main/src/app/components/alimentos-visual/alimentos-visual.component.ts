import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlimentosService } from '../../../app/servicios/alimentos.service';
import { Alimento } from '../../../app/interfaces/alimentos';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import * as FileSaver from 'file-saver';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { SharedService } from '../../../app/servicios/shared-service.service';
//import { saveAs } from 'file-saver';
import { AlimentoDialogComponent } from '../alimento-dialog/alimento-dialog.component';
import { AlimentosGuardadosDialogComponent } from '../alimentos-guardados-dialog/alimentos-guardados-dialog.component';

@Component({
  selector: 'app-alimentos-visual',
  standalone: true,
  imports: [ CommonModule,MatTableModule,
    MatInputModule, FormsModule,
    MatButtonModule, MatDialogModule,
    MatFormFieldModule, ReactiveFormsModule, ],
  templateUrl: './alimentos-visual.component.html',
  styleUrls: ['./alimentos-visual.component.css']
})
export class AlimentosVisualComponent {
  alimentos: Alimento[] = [];
  filteredAlimentos: Alimento[] = [];
  searchQuery: string = '';
  selectedAlimentos: Alimento[] = [];
  displayedColumns: string[] = ['nombre', 'calorias', 'carbohidratos', 'grasas', 'proteinas', 'sodio', 'azucar'];

  @Output() alimentosSeleccionados = new EventEmitter<Alimento[]>();

  constructor(private alimentosService: AlimentosService, public dialog: MatDialog, public dialogRef: MatDialogRef<AlimentosVisualComponent>) {}

  ngOnInit(): void {
    this.loadAlimentos();
  }

  loadAlimentos(): void {
    this.alimentosService.getAlimento().subscribe(data => {
      this.alimentos = data;
      this.filteredAlimentos = data;
    });
  }

  openDialog(alimento: Alimento): void {
    const dialogRef = this.dialog.open(AlimentoDialogComponent, {
      width: '300px',
      data: alimento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.porcion > 0 && result.gramos > 0) {
        this.selectedAlimentos.push(result);
      }
    });

    
  }

  onCloseDialog(): void {
    this.dialogRef.close(this.selectedAlimentos); // Cierra todos los diálogos abiertos, o puedes usar dialogRef.close() si solo quieres cerrar el diálogo actual
  }

  filterTable(): void {
    this.filteredAlimentos = this.alimentos.filter(alimento =>
      alimento.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  trackByFn(index: number, item: Alimento): number {
    return item.id;
  }
}