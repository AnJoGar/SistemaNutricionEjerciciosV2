import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AlimetotalService } from 'src/app/servicios/alimetotal.service';
import { CalculoService } from 'src/app/servicios/calculo.service';

@Component({
  selector: 'app-alimentos-total',
  templateUrl: './alimentos-total.component.html',
  styleUrls: ['./alimentos-total.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class AlimentosTotalComponent implements OnInit{
  caloriasEstimadas: number = 0;
  carbohidratosEstimados: number = 0;
  grasasEstimadas: number = 0;
  proteinasEstimadas: number = 0;
  @Input() totals: {
    calorias: number;
    carbohidratos: number;
    grasas: number;
    proteinas: number;
    sodio: number;
    azucar: number;
  } = { calorias: 0, carbohidratos: 0, grasas: 0, proteinas: 0, sodio: 0, azucar: 0 };

  constructor(private _snackBar: MatSnackBar, private alimetotalService: AlimetotalService, private calculoService: CalculoService) {}
  ngOnInit(): void {
    this.alimetotalService.totales$.subscribe(totales => {
      this.totals = totales;
    });
    const datosCalculo = this.calculoService.getCalculo();
    const datosCalculocal = this.calculoService.getCalculo2();
    this.caloriasEstimadas = datosCalculocal.caloriasEstimadas;
    this.carbohidratosEstimados = datosCalculo.carbohidratosEstimados;
    this.grasasEstimadas = datosCalculo.grasasEstimadas;
    this.proteinasEstimadas = datosCalculo.proteinasEstimadas;
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}