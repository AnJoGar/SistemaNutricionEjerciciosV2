
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosEjeService } from '../../../app/servicios/servicios-eje.service';

import { Ejercicio } from '../../../app/interfaces/ejercicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../app/interfaces/usuario';

import {MatSnackBar} from '@angular/material/snack-bar';

//import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
//import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { provideHttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {  ReactiveFormsModule } from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { ResponseApi } from 'src/app/interfaces/response-api';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


//angular material
import { MatCardModule } from '@angular/material/card';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser'
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import {CommonModule} from '@angular/common'
import { MatListModule } from '@angular/material/list';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-ingresar-ejercicio',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatDividerModule, MatIconModule,
    HttpClientModule,MatAutocompleteTrigger,ReactiveFormsModule,MatAutocompleteModule,MatOptionModule,MatSelectModule,
    CommonModule




  ],
  templateUrl: './ingresar-ejercicio.component.html',
  styleUrl: './ingresar-ejercicio.component.css',
  providers: [MatAutocompleteTrigger] 
})
export class IngresarEjercicioComponent {
  filteredEjericio!: Ejercicio[];
  formGroup: FormGroup;
  options2: Ejercicio[] = [];
  agregarEjercicio!: Ejercicio;
  constructor(private router: Router,

    private fb: FormBuilder,
    private serviciosEjeService: ServiciosEjeService,
    private http: HttpClient
  ) { 

    this.formGroup = this.fb.group({
      ejercicio: ['', Validators.required],

    })



    this.formGroup.get('ejercicio')?.valueChanges.subscribe(value => {
      this.filteredEjericio = this._filterServicio(value)
    })

    this.serviciosEjeService.ObtenerUsuarios().subscribe({
      next: (data) => {
        if (data.status)
          this.options2 = data.value;
      },
      error: (e) => {
      },
      complete: () => {

      }
    })






  }
  
  ngOnInit(): void {
    this.serviciosEjeService.ObtenerUsuarios().subscribe({
      next: (data) => {
        console.log("adsadas",data)
        if (data.status)
          this.options2 = data.value;
       
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }

  private _filterServicio(value: any): Ejercicio[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.nombreServicio.toLowerCase();
    return this.options2.filter(option => option.nombre.toLowerCase().includes(filterValue));

  }

  displayEjercicio(servicio: Ejercicio): string {
    console.log(servicio.nombre);
    return servicio.nombre;
    
  }
  ejercicioSeleccionado(event: any) {
    this.agregarEjercicio = event.option.value;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
