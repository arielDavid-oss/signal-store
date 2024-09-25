import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { User } from '../../shared/interfaces/product.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent {
  private http = inject(BaseHttpService);
  private router = inject(Router);
  UserName = signal('');
  Password = signal('');


  onAccess(){
    const access: User = {
      username: this.UserName(),
      password: this.Password()
    };
    this.http.getaccess(access).subscribe(
      (response) => {
        
        console.log('accesos correcto:', response);

        // Mostrar la alerta
       // this.showAlert = true;

        // Ocultar la alerta después de 3 segundos (3000 milisegundos)
        // setTimeout(() => {
        //   this.showAlert = false;
        // }, 3000);

        this.router.navigate(['/newproduct'], {
          replaceUrl: true,
        });
      },
      (error) => {
        console.error('Error al agregar producto:', error);
        // Manejar errores si es necesario
      }
    );
    }




}
