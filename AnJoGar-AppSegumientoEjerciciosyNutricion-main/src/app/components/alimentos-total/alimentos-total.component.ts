import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-alimentos-total',
  templateUrl: './alimentos-total.component.html',
  styleUrls: ['./alimentos-total.component.css'],
  standalone: true,
    imports: [MatCardModule,MatSidenavModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule,],
  
})
export class AlimentosTotalComponent {
  constructor(private _snackBar: MatSnackBar) {}
  showFiller = false;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    
  }
 }