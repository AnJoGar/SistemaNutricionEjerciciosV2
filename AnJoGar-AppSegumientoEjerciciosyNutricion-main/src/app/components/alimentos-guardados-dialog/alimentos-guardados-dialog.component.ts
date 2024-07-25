import { Component,Inject, NgModule   } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alimentos-guardados-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './alimentos-guardados-dialog.component.html',
  styleUrl: './alimentos-guardados-dialog.component.css'
})
export class AlimentosGuardadosDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
