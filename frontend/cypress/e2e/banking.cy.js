describe('Banking App E2E', () => {
    it('Should register, login, and view dashboard', () => {
        // 1. Register
        cy.visit('/register');
        const randomId = Math.floor(Math.random() * 10000);
        const email = `testuser${randomId}@example.com`;

        cy.get('input[name="name"]').type('E2E User');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="phone"]').type('9999999999');
        cy.get('button[type="submit"]').click();

        // Should redirect to dashboard
        cy.url().should('include', '/dashboard');
        cy.contains('Banking Dashboard');

        // 2. Logout
        cy.contains('Logout').click();
        cy.url().should('include', '/login');

        // 3. Login
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard');
        cy.contains('Your Accounts');

        // 4. Create Account
        cy.contains('Open New Account').click();
        cy.get('select').select('Savings');
        cy.contains('Create').click();

        cy.contains('Savings');
    });
});
