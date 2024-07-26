import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { Login } from '../../interfaces/login';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule,
    FormsModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  constructor(private router: Router,
    private _rolUsuario:UsuarioService
  ) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }


  userIMC!: number;
  userGrasa!: number;
  imcCategoria!: string;
  grasaCategoria!: string;

  generoActual: string = '';
  pesoActual!: number;
  alturaActual!: number;
  edadActual!: number;
  Usuario:string="";
  correoUsuario:string="";
  //Variables para el cálculo calórico y de macros
  tasaMetabolicaBasal!: number;
  caloriasEstimadas!: number;
  carbohidratosEstimados!: number;
  grasasEstimadas!: number;
  proteinasEstimadas!: number;

  objetivoActual!: string;
  ritmoActual!: string;

  toggleCaderaInput(genero: string): void {
    const caderaDiv = document.getElementById('caderaDiv');
    if (caderaDiv) {
      caderaDiv.style.display = genero === 'Femenino' ? 'block' : 'none';
    }
  }

  // Llama a esta función cada vez que cambie la selección de género
  onGeneroChange(): void {
    const generoSelect = document.getElementById('genero') as HTMLSelectElement;
    if (generoSelect) {
      this.toggleCaderaInput(generoSelect.value);
    }
  }

  validateQuestionnaireForm(): boolean {
    const form = document.getElementById('questionnaireForm');
    if (form) {
      const questions = form.querySelectorAll('.question');
  
      for (let i = 0; i < questions.length; i++) {
        const radios = questions[i].querySelectorAll('input[type="radio"]');
        let isChecked = false;
  
        radios.forEach((radio) => {
          if ((radio as HTMLInputElement).checked) {
            isChecked = true;
          }
        });
  
        if (!isChecked) {
          alert(`Por favor, selecciona una respuesta para la pregunta ${i + 1}.`);
          return false;
        }
      }
  
      return true;
    } else {
      console.error('El formulario no se encontró en el DOM.');
      return false;
    }
  }
  ngOnInit(): void {

  
    const usuario =this._rolUsuario.obtenerSession();
    if(usuario!=null){
      this.correoUsuario=usuario.correo;

    }
  }



  validatePersonalDataForm(): boolean {
    const generoSelect = document.getElementById('genero') as HTMLSelectElement;
    const genero = generoSelect ? generoSelect.value : '';
  
    const inputs = document.querySelectorAll('#personalDataForm .question input');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;
      // Si el género es 'Masculino' y el campo es 'cadera', no validar este campo
      if (genero === 'Masculino' && input.name === 'cadera') {
        continue;
      }
      if (!input.value) {
        alert(`Por favor, completa el campo de ${input.name}.`);
        return false;
      }
    }
    return true;
  }

  compareWeightGoal(pesoDeseado: number, objetivo: string): boolean {
    if (objetivo === 'perderPeso' && pesoDeseado > this.pesoActual) {
      alert('El peso deseado no debe ser mayor al peso actual para perder peso.');
      return false;
    } else if (objetivo === 'ganarMasa' && pesoDeseado < this.pesoActual) {
      alert('El peso deseado no debe ser menor al peso actual para ganar masa corporal.');
      return false;
    }
    return true;
  }

  validateGoalsForm(): boolean {

    const objetivoRadios = document.querySelectorAll('input[name="objetivo"]');
    let objetivoIsChecked = false;
    objetivoRadios.forEach((radio) => {
      if ((radio as HTMLInputElement).checked) {
        objetivoIsChecked = true;
      }
    });
  
    if (!objetivoIsChecked) {
      alert('Por favor, selecciona tu objetivo.');
      return false;
    }

    const pesoDeseadoInput = document.getElementById('objetivoPeso') as HTMLInputElement;
    if (!pesoDeseadoInput.value) {
      alert('Por favor, ingresa tu peso deseado.');
      return false;
    }
  
    const ritmoRadios = document.querySelectorAll('input[name="ritmo"]');
    let ritmoIsChecked = false;
    ritmoRadios.forEach((radio) => {
      if ((radio as HTMLInputElement).checked) {
        ritmoIsChecked = true;
      }
    });
  
    if (!ritmoIsChecked) {
      alert('Por favor, selecciona el ritmo de cambio de peso.');
      return false;
    }

    const pesoDeseadoInput2 = document.getElementById('objetivoPeso') as HTMLInputElement;
    const objetivoInput = document.querySelector('input[name="objetivo"]:checked') as HTMLInputElement;

    if (pesoDeseadoInput2 && objetivoInput) {
      const pesoDeseado = parseFloat(pesoDeseadoInput.value);
      const objetivo = objetivoInput.value;
  
      // Llamar a compareWeightGoal para realizar la comparación
      return this.compareWeightGoal(pesoDeseado, objetivo);
    }
  
    return true;
  }

  showNextCard(cardNumber: number) {
    if (this.validateQuestionnaireForm()) {
      // Solo avanza a la siguiente tarjeta si todas las preguntas están respondidas
      const previousCard = document.getElementById('card' + (cardNumber - 1));
      const nextCard = document.getElementById('card' + cardNumber);
      if (previousCard && nextCard) {
        previousCard.style.display = 'none';
        nextCard.style.display = 'block';
      }
    }
  }
  
  calculateIMC(): void {
    // Aquí adaptamos la función calculateIMC a TypeScript
    const alturaInput = document.getElementById('altura') as HTMLInputElement;
    const pesoInput = document.getElementById('peso') as HTMLInputElement;
    const cuelloInput = document.getElementById('cuello') as HTMLInputElement;
    const cinturaInput = document.getElementById('cintura') as HTMLInputElement;
    const caderaInput = document.getElementById('cadera') as HTMLInputElement;
    const genero = (document.getElementById('genero') as HTMLSelectElement).value;

    //Para el cálculo basal
    const edadInput = document.getElementById('edad') as HTMLInputElement;

    if(this.validatePersonalDataForm()){
      if (!alturaInput.value || !pesoInput.value || !cuelloInput.value || !cinturaInput.value || (genero === 'Femenino' && !caderaInput.value)) {
        alert('Por favor, completa todos los campos requeridos.');
        //Agregada para ver lo del peso comparativo
        return;
      }
  
      //Para variables globales
      this.generoActual = genero;
      console.log(this.generoActual);
      this.pesoActual = parseFloat(pesoInput.value);
      this.alturaActual = parseFloat(alturaInput.value);
      this.edadActual = parseFloat(edadInput.value);

      //Para el propio método
      const altura = parseFloat(alturaInput.value) / 100;
      const peso = parseFloat(pesoInput.value);
      const cuello = parseFloat(cuelloInput.value);
      const cintura = parseFloat(cinturaInput.value);
      let cadera = genero === 'Femenino' ? parseFloat(caderaInput.value) : 0;
  
      const imc = peso / (altura * altura);
      let porcentajeGrasa: number;
  
      if (genero === 'Masculino') {
        porcentajeGrasa = 495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura * 100)) - 450;
      } else {
        porcentajeGrasa = 495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.22100 * Math.log10(altura * 100)) - 450;
      }
  
      if (isFinite(imc) && isFinite(porcentajeGrasa)) {
        this.userIMC = parseFloat(imc.toFixed(2));
        this.userGrasa = parseFloat(porcentajeGrasa.toFixed(2));
        const nextCardButton = document.getElementById('nextCardButton');
  if (nextCardButton) {
    nextCardButton.style.display = 'block';
  } else {
    console.error('El botón para la siguiente tarjeta no se encontró en el DOM.');
  }
      } else {
        alert('Hubo un error al calcular el IMC y el porcentaje de grasa. Por favor, revisa tus entradas.');
      }
      
    }

    // Determinar la categoría del IMC
    if (this.userIMC < 18.5) {
      this.imcCategoria = 'bajo peso';
    } else if (this.userIMC >= 18.5 && this.userIMC <= 24.9) {
      this.imcCategoria = 'peso normal';
    } else if (this.userIMC >= 25 && this.userIMC <= 29.9) {
      this.imcCategoria = 'sobrepeso';
    } else {
      this.imcCategoria = 'obesidad';
    }

    // Determinar la categoría del porcentaje de grasa
    // Nota: Rangos estandarizados
    if (this.userGrasa < 20) {
      this.grasaCategoria = 'Atleta';
    } else if (this.userGrasa >= 20 && this.userGrasa <= 24) {
      this.grasaCategoria = 'normal';
    } else {
      this.grasaCategoria = 'alto';
    }

    // Mostrar la tercera tarjeta con los resultados
    // this.showNextCard(3);
  }

  //Lógica para el cálculo estimado
  calcularTMB(genero: string, peso: number, altura: number, edad: number): number {
    if (genero === 'Masculino') {
      return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else {
      return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    }
  }

  calcularConsumoEstimado(objetivo: string, ritmo: string): void {
    
    // this.tasaMetabolicaBasal = this.calcularTMB(/* genero, peso, altura, edad */);
    this.tasaMetabolicaBasal = this.calcularTMB(this.generoActual, this.pesoActual, this.alturaActual, this.edadActual);

    // Ajustar las calorías según el objetivo y el ritmo de cambio de peso
    const ajusteCalorico = ritmo === '0.25' ? 250 : 500; // Ajuste para 0.25kg o 0.50kg a la semana
    if (objetivo === 'perderPeso') {
      this.caloriasEstimadas = this.tasaMetabolicaBasal - ajusteCalorico;
    } else {
      this.caloriasEstimadas = this.tasaMetabolicaBasal + ajusteCalorico;
    }

    // Calcular macronutrientes (valores estimados generalizados)
    this.caloriasEstimadas = parseFloat(this.caloriasEstimadas.toFixed(0));
    this.carbohidratosEstimados = (this.caloriasEstimadas * 0.50) / 4; // 50% de las calorías de carbohidratos
    this.grasasEstimadas = (this.caloriasEstimadas * 0.25) / 9; // 25% de las calorías de grasas
    this.proteinasEstimadas = (this.caloriasEstimadas * 0.25) / 4; // 25% de las calorías de proteínas
    console.log(this.caloriasEstimadas);

    // Actualizar la interfaz con las calorías estimadas
    const caloriasNumeroDiv = document.querySelector('.calorias-numero');
    if (caloriasNumeroDiv) {
      caloriasNumeroDiv.textContent = this.caloriasEstimadas.toString();
      console.log(this.caloriasEstimadas.toString());
    }

    const ObjetivoNumeroDiv = document.querySelector('.item-nombre__');
    if (ObjetivoNumeroDiv) {
      ObjetivoNumeroDiv.textContent = this.caloriasEstimadas.toString();
      console.log(this.caloriasEstimadas.toString());
    }

  }

  showMainInterface(): void {
    // const objetivoActual = document.getElementById('objetivo') as HTMLInputElement;
    // const ritmoActual = document.getElementById('ritmo') as HTMLInputElement;
    
    if (this.validateGoalsForm()){
      
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.style.display = 'none';
      } else {
        console.error('El overlay no se encontró en el DOM.');
      }
          // this.calcularConsumoEstimado(this.objetivoActual, ritmoActual);

          // Llamar a calcularConsumoEstimado con las propiedades vinculadas
          this.calcularConsumoEstimado(this.objetivoActual, this.ritmoActual);

    }

    // Obtener los valores seleccionados por el usuario
    // const objetivoActual = (document.getElementById('objetivo') as HTMLInputElement).value;
    // console.log(objetivoActual);
    // const ritmoActual = (document.getElementById('ritmo') as HTMLInputElement).value;
    // console.log(ritmoActual);

    // Llamar a calcularConsumoEstimado con los valores obtenidos
    // this.calcularConsumoEstimado(objetivoActual, ritmoActual);
    
  }
  Ingresar(){

    this.router.navigate(['/Ejercicio']);
  }

  Alimento(){

    this.router.navigate(['/Alimentos']);
  }

  cerrarSesion(){


    this._rolUsuario.eliminarSession()

  this.router.navigate(['login']);


  }




}
