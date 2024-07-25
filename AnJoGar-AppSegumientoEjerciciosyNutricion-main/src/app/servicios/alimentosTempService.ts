import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlimentosTempService {
  private tempSelectedData: string | null = null;

  setTempSelectedData(data: string) {
    this.tempSelectedData = data;
  }

  getTempSelectedData(): string | null {
    return this.tempSelectedData;
  }

  clearTempSelectedData() {
    this.tempSelectedData = null;
  }
}
