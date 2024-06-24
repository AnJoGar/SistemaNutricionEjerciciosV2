import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ingresar-ejercicio-fuerza',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './ingresar-ejercicio-fuerza.component.html',
  styleUrl: './ingresar-ejercicio-fuerza.component.css'
})
export class IngresarEjercicioFuerzaComponent {
  constructor(private router: Router) { }
  Ingresar(){

    this.router.navigate(['/Ejercicio']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
}
