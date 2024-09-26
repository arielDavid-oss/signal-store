import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { User } from '../../shared/interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../shared/data-access/storage.service';

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
  private storegeService = inject(StorageService);
  UserName = signal('');
  Password = signal('');
isAdmin = false;

  onAccess(){
    const access: User = {
      username: this.UserName(),
      password: this.Password()
    };
    this.http.getaccess(access).subscribe(
      () => {
        
        //console.log('accesos correcto:', response);
        localStorage.setItem('isAdmin', 'true');
        this.storegeService.loginAsAdmin();
        this.router.navigate(['/'], {
          replaceUrl: true,
        });
      },
      (error) => {
        console.error('Error al acceder:', error);
      }
    );
    }




}
