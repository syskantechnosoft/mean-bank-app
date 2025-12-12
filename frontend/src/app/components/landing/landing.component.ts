import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="landing-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            The Future of <br>
            <span class="gradient-text">Digital Banking</span>
          </h1>
          <p class="hero-subtitle">
            Experience seamless transactions, state-of-the-art security, and AI-driven insights. 
            Join the revolution today.
          </p>
          <div class="cta-group">
            <a routerLink="/register" class="btn-primary">Get Started</a>
            <a routerLink="/login" class="btn-outline">Login</a>
          </div>
        </div>
        <div class="hero-visual">
          <!-- Abstract Circle / Globe from CSS -->
          <div class="glowing-circle"></div>
        </div>
      </section>

      <!-- Feature 1: Security -->
      <section class="feature-section left">
        <div class="feature-text">
          <h2>Unbreakable Security</h2>
          <p>Your assets are protected by our quantum-resistant vaults. 
             We monitor threats in real-time so you don't have to.</p>
        </div>
        <div class="feature-image-container parallax-card">
          <img src="assets/images/vault.png" alt="Secure Vault" class="feature-img">
        </div>
      </section>

      <!-- Feature 2: Global -->
      <section class="feature-section right">
        <div class="feature-image-container parallax-card">
          <img src="assets/images/global.png" alt="Global Payments" class="feature-img">
        </div>
        <div class="feature-text">
          <h2>Boundless Transactions</h2>
          <p>Send money anywhere in the universe instantly. 
             Low fees, zero latency, maximum reliability.</p>
        </div>
      </section>

      <!-- Feature 3: Growth -->
      <section class="feature-section left">
        <div class="feature-text">
          <h2>Exponential Growth</h2>
          <p>Track your net worth with our AI-powered dashboard.
             Visualize trends and optimize your portfolio.</p>
        </div>
        <div class="feature-image-container parallax-card">
          <img src="assets/images/growth.png" alt="Financial Growth" class="feature-img">
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>&copy; 2024 NeoBank. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .landing-container {
      width: 100%;
      overflow-x: hidden;
      color: white;
    }

    /* Hero */
    .hero {
      height: 90vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10%;
      position: relative;
    }

    .hero-content {
      max-width: 600px;
      z-index: 2;
      animation: slideRight 1s ease-out;
    }

    .hero-title {
      font-size: 4rem;
      line-height: 1.1;
      margin-bottom: 20px;
      font-weight: 800;
    }

    .gradient-text {
      background: var(--gradient-2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--secondary-color);
      margin-bottom: 40px;
    }

    .cta-group {
      display: flex;
      gap: 20px;
    }

    .hero-visual {
      position: absolute;
      right: 5%;
      top: 20%;
      width: 500px;
      height: 500px;
      z-index: 1;
    }

    .glowing-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,124,240,0.5) 0%, rgba(0,0,0,0) 70%);
      filter: blur(60px);
      animation: pulse 4s infinite alternate;
    }

    /* Features */
    .feature-section {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 50px;
      padding: 50px 10%;
    }

    .feature-text {
      flex: 1;
      max-width: 500px;
    }

    .feature-text h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      background: linear-gradient(to right, #fff, #aaa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .feature-text p {
      font-size: 1.1rem;
      color: #ccc;
      line-height: 1.6;
    }

    .feature-image-container {
      flex: 1;
      display: flex;
      justify-content: center;
      perspective: 1000px;
    }

    .feature-img {
      width: 100%;
      max-width: 500px;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.1);
      transition: transform 0.5s ease;
    }

    .feature-img:hover {
      transform: rotateY(-5deg) rotateX(5deg) scale(1.02);
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 40px;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: var(--secondary-color);
    }

    /* Keyframes */
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes pulse {
      0% { transform: scale(0.8); opacity: 0.5; }
      100% { transform: scale(1.2); opacity: 0.8; }
    }

    /* Mobile */
    @media (max-width: 768px) {
      .hero { flex-direction: column; justify-content: center; text-align: center; height: auto; padding-top: 150px; }
      .hero-title { font-size: 2.5rem; }
      .cta-group { justify-content: center; }
      .feature-section { flex-direction: column; text-align: center; }
      .feature-section.right { flex-direction: column-reverse; }
    }
  `]
})
export class LandingComponent { }
