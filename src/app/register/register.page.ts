import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private api: GameApiService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  // Validaciones de los campos
  usuarioInvalid(form: NgForm): boolean {
    return form.controls['username']?.invalid && form.controls['username']?.touched;
  }

  correoInvalid(form: NgForm): boolean {
    return form.controls['email']?.invalid && form.controls['email']?.touched;
  }

  passwordInvalid(form: NgForm): boolean {
    return form.controls['password']?.invalid && form.controls['password']?.touched;
  }

  // Manejo del registro
  async onClickRegistrar(form: NgForm) {
    if (form.invalid) {
      return; // Si el formulario es inválido, no hacer nada
    }

    try {
      await this.api.register(this.correo, this.usuario, this.password);
      await this.presentToast('Registro exitoso, por favor inicia sesión.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast('Error al registrar, intenta nuevamente.', 'danger');
    }
  }

  // Función para mostrar mensajes emergentes (toast)
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
