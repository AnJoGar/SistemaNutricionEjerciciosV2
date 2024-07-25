import { Component, Inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alimento-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './alimento-dialog.component.html',
  styleUrls: ['./alimento-dialog.component.css']
})

  export class AlimentoDialogComponent {
    alimentoForm: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<AlimentoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
      this.alimentoForm = this.fb.group({
        porcion: [0, [Validators.required, Validators.min(1)]],
        gramos: [0, [Validators.required, Validators.min(1)]]
      });
    }
  
    onSave(): void {
      if (this.alimentoForm.valid) {
        const { porcion, gramos } = this.alimentoForm.value;
        this.dialogRef.close({ ...this.data, porcion, gramos });
      } else {
        this.alimentoForm.markAllAsTouched();
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  }