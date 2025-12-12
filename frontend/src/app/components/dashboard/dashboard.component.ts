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
      <div class="header glass-panel mb-3">
        <h1>Dashboard</h1>
        <div class="nav-controls">
           <a routerLink="/profile" class="btn-outline">Profile</a>
           <button (click)="logout()" class="btn-warning" style="margin-left: 10px;">Logout</button>
        </div>
      </div>
    
      <div class="main-content">
        <!-- Accounts List -->
        <div class="accounts-section glass-panel">
          <div class="section-header mb-3">
            <h2 style="color: var(--info-color);">Your Accounts</h2>
            <button (click)="showCreateAccount = !showCreateAccount" class="btn-success">+ Open Account</button>
          </div>
          
          <div *ngIf="showCreateAccount" class="create-account-form fade-in mb-3 glass-panel" style="padding: 20px; background: rgba(0,0,0,0.3);">
              <h3 class="mb-3">Create New Account</h3>
              <div class="form-row d-flex gap-3">
                 <select [(ngModel)]="newAccountType" style="flex: 1;">
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Loan">Loan</option>
                </select>
                <button (click)="createAccount()" class="btn-primary">Create</button>
              </div>
          </div>

          <div class="account-list">
              <div *ngFor="let acc of accounts" class="account-card mb-3" [class.selected]="selectedAccount?._id === acc._id" (click)="selectAccount(acc)">
                  <div class="acc-info">
                    <div class="acc-type">{{acc.accountType}}</div>
                    <div class="acc-num">**** {{acc.accountNumber | slice:-4}}</div>
                  </div>
                  <div class="acc-bal">{{acc.balance | currency}}</div>
              </div>
          </div>
        </div>

        <!-- Actions Panel -->
        <div class="actions-section glass-panel" *ngIf="selectedAccount">
          <h2 class="mb-3">Manage Account <span class="highlight">#{{selectedAccount.accountNumber}}</span></h2>
          
          <div class="action-grid">
              <!-- Deposit: Green Theme -->
              <div class="action-card deposit-card">
                  <h3>Deposit</h3>
                  <input type="number" [(ngModel)]="depositAmount" placeholder="Amount" class="mb-3">
                  <button (click)="deposit()" class="btn-success w-100">Deposit Funds</button>
              </div>
              
              <!-- Withdraw: Warning/Orange Theme -->
              <div class="action-card withdraw-card">
                  <h3>Withdraw</h3>
                  <input type="number" [(ngModel)]="withdrawAmount" placeholder="Amount" class="mb-3">
                  <button (click)="withdraw()" class="btn-warning w-100">Withdraw Funds</button>
              </div>

              <!-- Transfer: Info/Blue Theme -->
              <div class="action-card transfer-card">
                  <h3>Transfer</h3>
                  <input type="text" [(ngModel)]="transferTo" placeholder="To Account Number" class="mb-3">
                  <input type="number" [(ngModel)]="transferAmount" placeholder="Amount" class="mb-3">
                  <button (click)="transfer()" class="btn-primary w-100">Transfer Funds</button>
              </div>

               <div class="action-card wide cards-section">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                      <h3>Cards</h3>
                      <div class="card-actions">
                        <button (click)="requestCard('Debit')" class="btn-outline" style="margin-right: 10px; font-size: 0.8rem;">Req. Debit</button>
                        <button (click)="requestCard('Credit')" class="btn-outline" style="font-size: 0.8rem;">Req. Credit</button>
                    </div>
                  </div>
                  
                  <div class="card-list d-flex gap-3" style="flex-wrap: wrap;">
                      <div *ngFor="let card of selectedAccount.cards" class="bank-card" [class.inactive]="card.status !== 'Active'">
                          <div class="card-top">{{card.cardType}}</div>
                          <div class="card-mid">{{card.cardNumber}}</div>
                          <div class="card-bot">
                              <span [style.color]="card.status === 'Active' ? 'var(--success-color)' : 'var(--secondary-color)'">{{card.status}}</span>
                              <button *ngIf="card.status !== 'Active'" (click)="toggleCard(card, 'Active')" class="btn-xs btn-success">Activate</button>
                              <button *ngIf="card.status === 'Active'" (click)="toggleCard(card, 'Blocked')" class="btn-xs warn">Block</button>
                          </div>
                      </div>
                      <div *ngIf="selectedAccount.cards.length === 0" style="color: #aaa; font-style: italic;">No cards available.</div>
                  </div>
              </div>

               <div class="action-card cheque-card">
                  <h3>Cheque Books</h3>
                  <ul class="cheque-list mb-3">
                      <li *ngFor="let cb of selectedAccount.chequeBooks">
                          {{cb.requestDate | date}} - <span [class.pending]="cb.status==='Pending'" [class.approved]="cb.status==='Issued'">{{cb.status}}</span>
                      </li>
                      <li *ngIf="selectedAccount.chequeBooks.length === 0">No recent requests.</li>
                  </ul>
                  <button (click)="requestChequeBook()" class="btn-outline w-100">Request New</button>
              </div>
          </div>
        </div>
         <div *ngIf="!selectedAccount && accounts.length > 0" class="actions-section glass-panel centered-msg">
             <p>Select an account from the left to view actions.</p>
         </div>
         <div *ngIf="accounts.length === 0" class="actions-section glass-panel centered-msg">
            <p>You have no accounts yet. Open one to get started!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { 
        padding: 40px; 
        max-width: 1400px; 
        margin: 0 auto; 
        color: white;
        background: url('/assets/images/dashboard_bg.png') no-repeat center center/cover;
        background-attachment: fixed; 
        min-height: 100vh;
        position: relative;
    }
    .dashboard-container::before {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(10, 10, 20, 0.85); /* Darker overlay */
        z-index: 0; pointer-events: none;
    }

    .header, .main-content { position: relative; z-index: 1; }
    
    .header { padding: 25px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .nav-controls { display: flex; align-items: center; }
    
    .main-content { display: flex; gap: 30px; flex-wrap: wrap; align-items: flex-start; }
    .accounts-section { flex: 1; min-width: 350px; padding: 25px; height: fit-content; }
    .actions-section { flex: 2; min-width: 500px; padding: 25px; }
    
    .section-header { display: flex; justify-content: space-between; align-items: center; }
    
    .account-list { display: flex; flex-direction: column; gap: 15px; }
    .account-card { 
        padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; cursor: pointer; transition: 0.3s; border: 1px solid rgba(255,255,255,0.05); 
        display: flex; justify-content: space-between; align-items: center;
    }
    .account-card:hover { background: rgba(255,255,255,0.08); transform: translateX(5px); border-color: var(--primary-color); }
    .account-card.selected { border-color: var(--success-color); background: rgba(0, 255, 148, 0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .acc-type { font-weight: 600; color: #eee; font-size: 1.1rem; }
    .acc-num { color: #888; font-size: 0.9rem; font-family: monospace; letter-spacing: 1px; }
    .acc-bal { font-size: 1.3rem; color: var(--success-color); font-weight: 700; }

    .action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 25px; }
    
    .action-card { 
      background: rgba(0,0,0,0.4); 
      padding: 25px; 
      border-radius: 12px; 
      border: 1px solid rgba(255,255,255,0.05);
      transition: 0.3s;
    }
    .action-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }

    /* Color Themes for Cards */
    .deposit-card { border-top: 3px solid var(--success-color); }
    .withdraw-card { border-top: 3px solid var(--warning-color); }
    .transfer-card { border-top: 3px solid var(--primary-color); }
    .cheque-card { border-top: 3px solid var(--info-color); }

    .action-card h3 { margin-bottom: 20px; color: white; font-size: 1.2rem; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
    
    .wide { grid-column: span 2; }
    @media(max-width: 900px) { .wide { grid-column: span 1; } }

    .btn-xs { padding: 4px 10px; font-size: 0.75rem; margin-left: auto; border: none; border-radius: 4px; cursor: pointer; }
    .warn { background: var(--danger-color); color: white; }
    
    .highlight { color: var(--info-color); }
    
    /* Bank Card Styling */
    .bank-card { 
      background: linear-gradient(135deg, #222, #000); 
      padding: 15px; 
      border-radius: 10px; 
      border: 1px solid #444; 
      width: 200px; 
      flex-shrink: 0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
    .bank-card.inactive { opacity: 0.6; filter: grayscale(1); }
    .card-top { font-size: 0.8rem; color: #aaa; text-transform: uppercase; margin-bottom: 15px; }
    .card-mid { font-family: monospace; font-size: 1.2rem; color: white; letter-spacing: 2px; margin-bottom: 15px; text-shadow: 0 0 5px rgba(255,255,255,0.5); }
    .card-bot { display: flex; align-items: center; font-size: 0.8rem; gap: 10px; }
    
    .cheque-list { list-style: none; padding: 0; font-size: 0.95rem; color: #bbb; max-height: 150px; overflow-y: auto; }
    .cheque-list li { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .pending { color: var(--warning-color); }
    .approved { color: var(--success-color); }

    .centered-msg { display: flex; justify-content: center; align-items: center; min-height: 200px; color: #999; font-size: 1.1rem; }
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
    logout() {
      this.api.logout();
      window.location.href = '/login';
    }
  }
