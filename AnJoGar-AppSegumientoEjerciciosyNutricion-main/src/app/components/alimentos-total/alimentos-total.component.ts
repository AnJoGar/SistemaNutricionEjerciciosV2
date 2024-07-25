import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-alimentos-total',
  templateUrl: './alimentos-total.component.html',
  styleUrls: ['./alimentos-total.component.css'],
  standalone: true,
  imports: [
    
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class AlimentosTotalComponent {
  @Input() totals: {
    calorias: number;
    carbohidratos: number;
    grasas: number;
    proteinas: number;
    sodio: number;
    azucar: number;
  } = { calorias: 0, carbohidratos: 0, grasas: 0, proteinas: 0, sodio: 0, azucar: 0 };

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
