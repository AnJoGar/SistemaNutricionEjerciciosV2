import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  [x: string]: any;
  private caloriasEstimadas: number = 0;
  private carbohidratosEstimados: number = 0;
  private grasasEstimadas: number = 0;
  private proteinasEstimadas: number = 0;

  setCalculo(calorias: number, carbohidratos: number, grasas: number, proteinas: number) {
    this.caloriasEstimadas = calorias;
    this.carbohidratosEstimados = carbohidratos;
    this.grasasEstimadas = grasas;
    this.proteinasEstimadas = proteinas;
  }
  setCalculo2(calorias: number) {
    this.caloriasEstimadas = calorias;
  }

  getCalculo() {
    return {
      caloriasEstimadas: this.caloriasEstimadas,
      carbohidratosEstimados: this.carbohidratosEstimados,
      grasasEstimadas: this.grasasEstimadas,
      proteinasEstimadas: this.proteinasEstimadas
    };
  }
  getCalculo2() {
    return {
      caloriasEstimadas: this.caloriasEstimadas,
    };
  }
}
