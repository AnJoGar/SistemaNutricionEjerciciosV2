import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ingresar-ejercicio',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './ingresar-ejercicio.component.html',
  styleUrl: './ingresar-ejercicio.component.css'
})
export class IngresarEjercicioComponent {

  constructor(private router: Router) { }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
