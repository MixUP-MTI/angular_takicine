import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private readonly UserService = inject(UserService);
  user: User | null = null;
  email: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'email à partir des queryParams de l'URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.getUserByEmail();
    });

    // Vérifier si l'utilisateur est déjà dans localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Récupérer l'utilisateur depuis le localStorage
    }
  }

  getUserByEmail(): void {
    if (this.email) {
      this.UserService.userByEmail(this.email).subscribe(
        (user: User) => {
          this.user = user;
          // Sauvegarder l'utilisateur dans localStorage
          localStorage.setItem('user', JSON.stringify(user));
        },
        (error) => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  logout(): void {
    this.user = null;
    this.email = '';
    localStorage.removeItem('user'); // Supprimer l'utilisateur du localStorage lors de la déconnexion
  }
}
