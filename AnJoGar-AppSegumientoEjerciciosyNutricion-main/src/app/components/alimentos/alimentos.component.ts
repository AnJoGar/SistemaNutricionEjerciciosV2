import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {MatSidenavModule} from '@angular/material/sidenav';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import { AlimentosAddComponent } from '../alimentos-add/alimentos-add.component';
import { Alimento } from '../alimentos-add/alimentos-add.component';
import { AlimentosTotalComponent } from '../alimentos-total/alimentos-total.component';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';


const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css'],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  AlimentosAddComponent, AlimentosTotalComponent],
})
export class AlimentosComponent implements OnInit {

  constructor(private router: Router) { }
  listaAlimentos: Alimento[] = [];
  
  ngOnInit(): void { }

  date = new FormControl(moment);

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}