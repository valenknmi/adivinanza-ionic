import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { GameApiService } from '../services/game-api.service'; 
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({ 
  selector: 'app-login', 
  templateUrl: './login.page.html', 
  styleUrls: ['./login.page.scss'], 
}) 
export class LoginPage implements OnInit { 
  usuario: string = ''; 
  password: string = ''; 
  isLoading: boolean = false; // Para mostrar un estado de carga mientras se procesa el login

  constructor( 
    private router: Router, 
    private api: GameApiService,
    private toastController: ToastController // Inyectar ToastController
  ) { } 

  ngOnInit() {} 

  async onClickIngresar(form: NgForm) { 
    // Validación de los campos
    if (form.invalid) { 
      await this.showToast('Por favor completa todos los campos.');
      return; 
    }

    this.isLoading = true; // Iniciar el estado de carga

    // Llamada al servicio para el login
    await this.api.login(this.usuario, this.password)
      .then(async () => {
        this.isLoading = false; // Finalizar el estado de carga
        await this.showToast('Inicio de sesión exitoso!');
        this.router.navigate(['/menu']);
      })
      .catch(async (error) => {
        this.isLoading = false; // Finalizar el estado de carga
        console.error('LOGIN ERROR:', error.error.message);
        await this.showToast('Error en el inicio de sesión: ' + error.error.message);
      }); 
  }

  // Método para mostrar mensajes de retroalimentación
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del mensaje en milisegundos
      position: 'bottom', // Posición del mensaje
    });
    toast.present();
  }
}
