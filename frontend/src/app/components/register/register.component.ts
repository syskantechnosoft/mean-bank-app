import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-wrapper">
      <div class="register-card glass-panel">
        <h2>Create Account</h2>
        <p class="subtitle">Join NeoBank today</p>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-row">
             <div class="form-group">
                <label>Name</label>
                <input type="text" [(ngModel)]="data.name" name="name" required placeholder="John Doe">
             </div>
             <div class="form-group">
                <label>Phone</label>
                <input type="text" [(ngModel)]="data.phone" name="phone" placeholder="123 456 7890">
             </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="data.email" name="email" required placeholder="john@example.com">
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="data.password" name="password" required placeholder="••••••••">
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea [(ngModel)]="data.address" name="address" rows="2" placeholder="Street, City, Country"></textarea>
          </div>

          <button type="submit" class="btn-primary w-100">Sign Up</button>
        </form>
        
        <div class="footer-links">
          <p>Already have an account? <a routerLink="/login" class="link-highlight">Login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
      padding: 20px;
      background: url('/assets/images/register_bg.png') no-repeat center center/cover;
      position: relative;
    }

    .register-wrapper::before {
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

    .register-card {
      width: 100%;
      max-width: 500px;
      padding: 40px;
      color: white;
      position: relative;
      z-index: 2;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255,255,255,0.2);
    }

    h2 { text-align: center; margin-bottom: 10px; font-size: 2rem; }
    .subtitle { text-align: center; color: #aaa; margin-bottom: 30px; }

    .form-group { margin-bottom: 20px; }
    .form-row { display: flex; gap: 20px; }
    .form-row .form-group { flex: 1; }

    label { display: block; margin-bottom: 8px; color: #ccc; font-size: 0.9rem; }
    .w-100 { width: 100%; margin-top: 20px; }

    .footer-links { margin-top: 20px; text-align: center; color: #aaa; font-size: 0.9rem; }
    .link-highlight { color: var(--primary-color); font-weight: 500; cursor: pointer; }
    .link-highlight:hover { text-decoration: underline; }
    
    @media (max-width: 500px) {
        .form-row { flex-direction: column; gap: 0; }
    }
  `]
})
export class RegisterComponent {
  data = { name: '', email: '', password: '', phone: '', address: '' };

  constructor(private api: ApiService, private router: Router) { }

  onSubmit() {
    this.api.register(this.data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert(err.error.msg || 'Registration Failed')
    });
  }
}
