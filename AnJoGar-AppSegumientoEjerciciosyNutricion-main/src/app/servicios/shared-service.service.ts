import { Injectable } from '@angular/core';
import { Alimento } from '../interfaces/alimentos';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedAlimentos: { alimento: Alimento, porcion: number, gramos: number }[] = [];

  setSelectedAlimentos(alimentos: { alimento: Alimento, porcion: number, gramos: number }[]): void {
    this.selectedAlimentos = alimentos;
  }

  getSelectedAlimentos(): { alimento: Alimento, porcion: number, gramos: number }[] {
    return this.selectedAlimentos;
  }
}
