import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="header">
        <h1>Profile</h1>
        <a routerLink="/dashboard">Back to Dashboard</a>
      </div>
      
      <div class="card">
        <h2>Personal Details</h2>
        <div class="form-group">
             <label>Name</label>
             <input [(ngModel)]="user.name">
        </div>
        <div class="form-group">
             <label>Email (Read only)</label>
             <input [(ngModel)]="user.email" disabled>
        </div>
        <div class="form-group">
             <label>Phone</label>
             <input [(ngModel)]="user.phone">
        </div>
        <div class="form-group">
             <label>Address</label>
             <textarea [(ngModel)]="user.address"></textarea>
        </div>
        <button (click)="updateProfile()">Update Profile</button>
      </div>

      <div class="card">
        <h2>Manage Payees</h2>
        <div class="add-payee">
            <input placeholder="Name" [(ngModel)]="newPayee.name">
            <input placeholder="Account Number" [(ngModel)]="newPayee.accountNumber">
            <input placeholder="Bank Name" [(ngModel)]="newPayee.bankName">
            <button (click)="addPayee()">Add Payee</button>
        </div>

        <ul class="payee-list">
            <li *ngFor="let payee of user.payees" class="payee-item">
                <span>{{payee.name}} - {{payee.accountNumber}} ({{payee.bankName}})</span>
                <button (click)="deletePayee(payee._id)" class="delete-btn">Delete</button>
            </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .container { 
        max-width: 800px; 
        margin: 20px auto; 
        padding: 40px; 
        background: url('/assets/images/profile_bg.png') no-repeat center center/cover;
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        color: white;
    }

    .container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(5px);
        z-index: 1;
    }

    .header, .card { position: relative; z-index: 2; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;}
    .card { border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
    .form-group { margin-bottom: 10px; }
    label { display: block; font-weight: bold; }
    input, textarea { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }
    .add-payee { display: flex; gap: 10px; margin-bottom: 15px; }
    .payee-list { list-style: none; padding: 0; }
    .payee-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
    .delete-btn { background: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; }
  `]
})
export class ProfileComponent implements OnInit {
  user: any = { payees: [] };
  newPayee = { name: '', accountNumber: '', bankName: '' };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProfile().subscribe(res => {
      this.user = res;
    });
  }

  updateProfile() {
    this.api.updateProfile(this.user).subscribe(res => {
      this.user = res;
      alert('Profile Updated');
    });
  }

  addPayee() {
    this.api.addPayee(this.newPayee).subscribe(res => {
      this.user.payees = res;
      this.newPayee = { name: '', accountNumber: '', bankName: '' };
      alert('Payee Added');
    });
  }

  deletePayee(id: string) {
    this.api.deletePayee(id).subscribe(res => {
      this.user.payees = res;
    });
  }
}
