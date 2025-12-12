import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="header glass-panel">
        <h1>Dashboard</h1>
        <div class="nav-controls">
           <a routerLink="/profile" class="btn-outline">Profile</a>
           <button (click)="logout()" class="btn-primary">Logout</button>
        </div>
      </div>
    
      <div class="main-content">
        <!-- Accounts List -->
        <div class="accounts-section glass-panel">
          <div class="section-header">
            <h2>Your Accounts</h2>
            <button (click)="showCreateAccount = !showCreateAccount" class="btn-sm btn-primary">+ Open Account</button>
          </div>
          
          <div *ngIf="showCreateAccount" class="create-account-form fade-in">
              <h3>Create New Account</h3>
              <div class="form-row">
                 <select [(ngModel)]="newAccountType">
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Loan">Loan</option>
                </select>
                <button (click)="createAccount()" class="btn-primary">Create</button>
              </div>
          </div>

          <div class="account-list">
              <div *ngFor="let acc of accounts" class="account-card" [class.selected]="selectedAccount?._id === acc._id" (click)="selectAccount(acc)">
                  <div class="acc-type">{{acc.accountType}}</div>
                  <div class="acc-num">**** {{acc.accountNumber | slice:-4}}</div>
                  <div class="acc-bal">{{acc.balance | currency}}</div>
              </div>
          </div>
        </div>

        <!-- Actions Panel -->
        <div class="actions-section glass-panel" *ngIf="selectedAccount">
          <h2>Manage Account <span class="highlight">#{{selectedAccount.accountNumber}}</span></h2>
          
          <div class="action-grid">
              <div class="action-card">
                  <h3>Deposit</h3>
                  <input type="number" [(ngModel)]="depositAmount" placeholder="Amount">
                  <button (click)="deposit()" class="btn-primary w-100">Deposit</button>
              </div>
              
              <div class="action-card">
                  <h3>Withdraw</h3>
                  <input type="number" [(ngModel)]="withdrawAmount" placeholder="Amount">
                  <button (click)="withdraw()" class="btn-primary w-100">Withdraw</button>
              </div>

              <div class="action-card">
                  <h3>Transfer</h3>
                  <input type="text" [(ngModel)]="transferTo" placeholder="To Account Number">
                  <input type="number" [(ngModel)]="transferAmount" placeholder="Amount" class="mt-2">
                  <button (click)="transfer()" class="btn-primary w-100 mt-2">Transfer</button>
              </div>

               <div class="action-card wide">
                  <h3>Cards</h3>
                  <div class="card-list">
                      <div *ngFor="let card of selectedAccount.cards" class="bank-card" [class.inactive]="card.status !== 'Active'">
                          <div class="card-top">{{card.cardType}}</div>
                          <div class="card-mid">{{card.cardNumber}}</div>
                          <div class="card-bot">
                              <span>{{card.status}}</span>
                              <button *ngIf="card.status !== 'Active'" (click)="toggleCard(card, 'Active')" class="btn-xs">Activate</button>
                              <button *ngIf="card.status === 'Active'" (click)="toggleCard(card, 'Blocked')" class="btn-xs warn">Block</button>
                          </div>
                      </div>
                  </div>
                  <div class="card-actions">
                      <button (click)="requestCard('Debit')" class="btn-outline">Req. Debit</button>
                      <button (click)="requestCard('Credit')" class="btn-outline">Req. Credit</button>
                  </div>
              </div>

               <div class="action-card">
                  <h3>Cheque Books</h3>
                  <ul class="cheque-list">
                      <li *ngFor="let cb of selectedAccount.chequeBooks">
                          {{cb.requestDate | date}} - <span [class.pending]="cb.status==='Pending'">{{cb.status}}</span>
                      </li>
                  </ul>
                  <button (click)="requestChequeBook()" class="btn-outline w-100">Request New</button>
              </div>
          </div>
        </div>
         <div *ngIf="!selectedAccount && accounts.length > 0" class="actions-section glass-panel centered-msg">
             <p>Select an account from the left to view actions.</p>
         </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { 
        padding: 20px; 
        max-width: 1400px; 
        margin: 0 auto; 
        color: white;
        background: url('/assets/images/dashboard_bg.png') no-repeat center center/cover;
        background-attachment: fixed; /* Parallax-like feel */
        min-height: 100vh;
        position: relative;
    }
    
    .dashboard-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7); /* Darker overlay for dashboard readability */
        z-index: 0;
        pointer-events: none;
    }

    .header, .main-content { position: relative; z-index: 1; }
    
    .header { padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .nav-controls { display: flex; gap: 10px; }
    
    .main-content { display: flex; gap: 20px; flex-wrap: wrap; }
    .accounts-section { flex: 1; min-width: 300px; padding: 20px; }
    .actions-section { flex: 2; min-width: 400px; padding: 20px; }
    
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    
    .account-list { display: flex; flex-direction: column; gap: 10px; }
    .account-card { 
        padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; cursor: pointer; transition: 0.2s; border: 1px solid transparent; 
        display: flex; justify-content: space-between; align-items: center;
    }
    .account-card:hover { background: rgba(255,255,255,0.1); }
    .account-card.selected { border-color: var(--primary-color); background: rgba(0, 123, 255, 0.1); }
    .acc-type { font-weight: bold; color: #ccc; }
    .acc-bal { font-size: 1.1rem; color: #4cd137; }

    .action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .action-card { background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; }
    .action-card h3 { margin-bottom: 15px; color: var(--accent-color); font-size: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; }
    
    .wide { grid-column: span 2; }
    @media(max-width: 800px) { .wide { grid-column: span 1; } }

    .btn-sm { padding: 5px 10px; font-size: 0.8rem; }
    .btn-xs { padding: 2px 8px; font-size: 0.7rem; margin-left: 5px; background: #555; border: none; color: white; border-radius: 4px; cursor: pointer; }
    .warn { background: #e84118; }
    
    .mt-2 { margin-top: 10px; }
    .highlight { color: var(--primary-color); }
    
    .bank-card { background: linear-gradient(135deg, #333, #111); padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #444; }
    .bank-card.inactive { opacity: 0.6; }
    .card-mid { font-family: monospace; font-size: 1.1rem; margin: 10px 0; letter-spacing: 2px; }
    .card-bot { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; }
    
    .cheque-list { list-style: none; padding: 0; font-size: 0.9rem; color: #aaa; margin-bottom: 10px; }
    .pending { color: #fbc531; }

    .centered-msg { display: flex; justify-content: center; align-items: center; min-height: 200px; color: #777; font-style: italic; }
  `]
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];
  selectedAccount: any = null;

  showCreateAccount = false;
  newAccountType = 'Savings';

  depositAmount: number | null = null;
  withdrawAmount: number | null = null;

  transferTo = '';
  transferAmount: number | null = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.refreshAccounts();
  }

  refreshAccounts() {
    this.api.getAccounts().subscribe(res => {
      this.accounts = res;
      if (this.selectedAccount) {
        this.selectedAccount = this.accounts.find(a => a._id === this.selectedAccount._id) || null;
      }
    });
  }

  createAccount() {
    this.api.createAccount({ accountType: this.newAccountType }).subscribe(() => {
      this.showCreateAccount = false;
      this.refreshAccounts();
    }, err => alert(err.error.msg));
  }

  selectAccount(acc: any) {
    this.selectedAccount = acc;
  }

  deposit() {
    if (!this.depositAmount) return;
    this.api.deposit({ accountId: this.selectedAccount._id, amount: this.depositAmount }).subscribe(() => {
      alert('Deposit Successful');
      this.depositAmount = null;
      this.refreshAccounts();
    }, err => alert(err.error.msg));
  }

  withdraw() {
    if (!this.withdrawAmount) return;
    this.api.withdraw({ accountId: this.selectedAccount._id, amount: this.withdrawAmount }).subscribe(() => {
      alert('Withdraw Successful');
      this.withdrawAmount = null;
      this.refreshAccounts();
    }, err => alert(err.error.msg));
  }

  transfer() {
    if (!this.transferAmount) return;
    this.api.transfer({ fromAccountId: this.selectedAccount._id, toAccountNumber: this.transferTo, amount: this.transferAmount }).subscribe(() => {
      alert('Transfer Successful');
      this.transferTo = '';
      this.transferAmount = null;
      this.refreshAccounts();
    }, err => alert(err.error.msg));
  }

  requestCard(type: string) {
    this.api.requestCard({ accountId: this.selectedAccount._id, cardType: type }).subscribe(() => {
      alert('Card Requested');
      this.refreshAccounts();
    });
  }

  toggleCard(card: any, status: string) {
    this.api.toggleCardStatus({ accountId: this.selectedAccount._id, cardId: card._id, status }).subscribe(() => {
      this.refreshAccounts();
    });
  }

  requestChequeBook() {
    this.api.requestChequeBook({ accountId: this.selectedAccount._id }).subscribe(() => {
      alert('Cheque Book Requested');
      this.refreshAccounts();
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
