import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import{EjercicioComponent} from './components/ejercicio/ejercicio.component';
import{IngresarEjercicioComponent} from './components/ingresar-ejercicio/ingresar-ejercicio.component';
import{IngresarEjercicioFuerzaComponent} from './components/ingresar-ejercicio-fuerza/ingresar-ejercicio-fuerza.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { AlimentosAddComponent } from './components/alimentos-add/alimentos-add.component';


export const routes: Routes = [
    {path:'', redirectTo: 'PaginaPrincipal', pathMatch: 'full'},
    { path: 'PaginaPrincipal', component: PrincipalComponent },
    { path: 'Ejercicio', component: EjercicioComponent },
    { path: 'IngresarE', component: IngresarEjercicioComponent },
    { path: 'IngresarEF', component: IngresarEjercicioFuerzaComponent },
    { path: 'Alimentos', component: AlimentosComponent },
    { path: 'AlimentosAdd', component: AlimentosAddComponent},
    { path: 'AlimentosTotal', component: AlimentosAddComponent}
    
];


