import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    points: 0,
  }

  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  private readonly toastr = inject(ToastrService);

  addUser(): void {
    if (!this.user.firstName) {
      this.toastr.error("Le firstName ne doit pas être vide")
      return
    }

    if (!this.user.lastName) {
      this.toastr.error("Le lastName ne doit pas être vide")
      return
    }

    if (!this.user.age && this.user.age >= 10) {
      this.toastr.error("L'age doit être supérieur a 10")
      return
    }    

    var regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
    if (!this.user.email || !regex.test(this.user.email)) {
      this.toastr.error("Le mail est invalide")
      return
    }

    this.userService.addUser(this.user).subscribe(
      () => {
        this.toastr.success("Nouvel utilisateur créé !")
        this.router.navigate(['/profile'], {
          queryParams: { email: this.user.email } // Envoie l'email
        });
      },
      (error) => {
        console.error('Erreur lors de l’ajout de l’utilisateur :', error);
        alert("Une erreur s'est produite lors de l'inscription. Vérifiez que votre email n'est pas déjà utilisé.");
      }
    );
  }
}
