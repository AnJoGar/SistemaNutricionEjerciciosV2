import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alimento } from '../interfaces/alimentos'; // Ajusta la ruta según la ubicación del componente
import { AlimentoConPorcionYGramos } from '../interfaces/alimentoConPorcionYGramos';


@Injectable({
  providedIn: 'root'
})
export class AlimetotalService {
  private totalesSubject = new BehaviorSubject({
    calorias: 0,
    carbohidratos: 0,
    grasas: 0,
    proteinas: 0,
    sodio: 0,
    azucar: 0
  });

  totales$ = this.totalesSubject.asObservable();
  
  constructor() { }

  // Actualiza los totales con los nuevos datos
  actualizarTotales(totales: { calorias: number; carbohidratos: number; grasas: number; proteinas: number; sodio: number; azucar: number; }) {
    const actuales = this.totalesSubject.value;

    const nuevosTotales = {
      calorias: actuales.calorias + totales.calorias,
      carbohidratos: actuales.carbohidratos + totales.carbohidratos,
      grasas: actuales.grasas + totales.grasas,
      proteinas: actuales.proteinas + totales.proteinas,
      sodio: actuales.sodio + totales.sodio,
      azucar: actuales.azucar + totales.azucar,
    };

    this.totalesSubject.next(nuevosTotales);
  }

  // Resetea los totales a cero
  resetearTotales() {
    this.totalesSubject.next({
      calorias: 0,
      carbohidratos: 0,
      grasas: 0,
      proteinas: 0,
      sodio: 0,
      azucar: 0
    });
  }

  // Obtiene los totales actuales
  getTotales() {
    return this.totalesSubject.value;
  }
}