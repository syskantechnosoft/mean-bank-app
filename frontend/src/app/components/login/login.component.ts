import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-wrapper">
      <div class="login-card glass-panel">
        <h2>Welcome Back</h2>
        <p class="subtitle">Login to manage your finances</p>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group mb-3">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="name@example.com">
          </div>
          <div class="form-group mb-3">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••">
          </div>
          
          <button type="submit" class="btn-primary w-100 mt-3" style="font-size: 1.1rem; padding: 14px;">Login</button>
        </form>
        
        <div class="footer-links">
          <p>Don't have an account? <a routerLink="/register" class="link-highlight">Register</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px); /* Adjust for navbar */
      background: url('/assets/images/login_bg.png') no-repeat center center/cover;
      position: relative;
    }

    /* Overlay */
    .login-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      z-index: 1;
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 40px;
      color: white;
      position: relative;
      z-index: 2;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255,255,255,0.2);
    }

    h2 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 2rem;
    }

    .subtitle {
      text-align: center;
      color: #aaa;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #ccc;
      font-size: 0.9rem;
    }

    .w-100 {
      width: 100%;
      margin-top: 20px;
    }

    .footer-links {
      margin-top: 20px;
      text-align: center;
      color: #aaa;
      font-size: 0.9rem;
    }

    .link-highlight {
      color: var(--primary-color);
      font-weight: 500;
      cursor: pointer;
    }

    .link-highlight:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) { }

  onSubmit() {
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        // Token handled in service
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert(err.error.msg || 'Login Failed')
    });
  }
}
