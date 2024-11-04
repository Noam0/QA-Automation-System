import userPage from '../../../support/selectors/usersPage';

describe('User Creation - Negative Tests', () => {
    beforeEach(() => {
        cy.loginAsAdmin();
        cy.get(userPage.usersNavItem).click();
        cy.get(userPage.addUserButton).click();
    });



    it('should not allow creating a user without an email', () => {
        cy.get(userPage.firstNameInput).type('testauto', { force: true });
        cy.get(userPage.lastNameInput).type('ben');
        cy.get(userPage.usernameInput).type('automateuser');
        cy.get(userPage.phoneCodeInput).type('972');
        cy.get(userPage.phoneCodeIsraelOption).click();
        cy.get(userPage.phoneNumberInput).type('123456789');
        cy.get(userPage.roleSelect).click();
        cy.get(userPage.roleProgrammerOption).click();
        cy.get(userPage.passwordInput).type('Password123!');
        cy.get(userPage.confirmPasswordInput).type('Password123!');
        cy.get(userPage.enable2FA).click(); // Toggle 2FA
        cy.get(userPage.saveButton).click();

        // Verify error message for missing email
        cy.get('#toast-container').should('be.visible').and('contain', 'Error');
    });

    it('should not allow creating a user without a password', () => {
        cy.get(userPage.firstNameInput).type('testauto', { force: true });
        cy.get(userPage.lastNameInput).type('ben');
        cy.get(userPage.emailInput).type('user@example.com');
        cy.get(userPage.usernameInput).type('automateuser');
        cy.get(userPage.phoneCodeInput).type('972');
        cy.get(userPage.phoneCodeIsraelOption).click();
        cy.get(userPage.phoneNumberInput).type('123456789');
        cy.get(userPage.roleSelect).click();
        cy.get(userPage.roleProgrammerOption).click();
        cy.get(userPage.confirmPasswordInput).type('Password123!');
        cy.get(userPage.enable2FA).click(); // Toggle 2FA
        cy.get(userPage.saveButton).click();

        // Verify error message for missing password
        cy.get('#toast-container').should('be.visible').and('contain', 'Error');
    });

    it('should not allow creating a user without a last name', () => {
        cy.get(userPage.firstNameInput).type('testauto', { force: true });
        cy.get(userPage.emailInput).type('user@example.com');
        cy.get(userPage.usernameInput).type('automateuser');
        cy.get(userPage.phoneCodeInput).type('972');
        cy.get(userPage.phoneCodeIsraelOption).click();
        cy.get(userPage.phoneNumberInput).type('123456789');
        cy.get(userPage.roleSelect).click();
        cy.get(userPage.roleProgrammerOption).click();
        cy.get(userPage.passwordInput).type('Password123!');
        cy.get(userPage.confirmPasswordInput).type('Password123!');
        cy.get(userPage.enable2FA).click(); // Toggle 2FA
        cy.get(userPage.saveButton).click();

        // Verify error message for missing last name
        cy.get('#toast-container').should('be.visible').and('contain', 'Error');
    });


    it('should not allow creating a user without matching password', () => {
        cy.get(userPage.firstNameInput).type('testauto', { force: true });
        cy.get(userPage.lastNameInput).type('ben');
        cy.get(userPage.emailInput).type('user@example.com', { force: true });
        cy.get(userPage.usernameInput).type('automateuser');
        cy.get(userPage.phoneCodeInput).type('972');
        cy.get(userPage.phoneCodeIsraelOption).click();
        cy.get(userPage.phoneNumberInput).type('123456789');
        cy.get(userPage.roleSelect).click();
        cy.get(userPage.roleProgrammerOption).click();
        cy.get(userPage.passwordInput).type('Password123!');
        cy.get(userPage.confirmPasswordInput).type('Aa123456!');
        cy.get(userPage.enable2FA).click(); // Toggle 2FA
        cy.get(userPage.saveButton).click();

        // Verify error message for missing last name
        cy.get('#toast-container').should('be.visible').and('contain', 'Error');
    });


    it('should not allow creating a user without a lowercase letter in the password', () => {
        fillUserDetails();
        cy.get(userPage.passwordInput).type('PASSWORD123!');
        cy.get(userPage.confirmPasswordInput).type('PASSWORD123!');
        cy.get(userPage.saveButton).click();
        cy.get('.mat-mdc-form-field-error').should('be.visible').and('contain', 'Password must contain a lowercase letter, an uppercase letter, a number and a special character');
    });

    it('should not allow creating a user without an uppercase letter in the password', () => {
        fillUserDetails();
        cy.get(userPage.passwordInput).type('password123!');
        cy.get(userPage.confirmPasswordInput).type('password123!');
        cy.get(userPage.saveButton).click();
        cy.get('.mat-mdc-form-field-error').should('be.visible').and('contain', 'Password must contain a lowercase letter, an uppercase letter, a number and a special character');
    });

    it('should not allow creating a user without a number in the password', () => {
        fillUserDetails();
        cy.get(userPage.passwordInput).type('Password!');
        cy.get(userPage.confirmPasswordInput).type('Password!');
        cy.get(userPage.saveButton).click();
        cy.get('.mat-mdc-form-field-error').should('be.visible').and('contain', 'Password must contain a lowercase letter, an uppercase letter, a number and a special character');
    });

    it('should not allow creating a user without a special character in the password', () => {
        fillUserDetails();
        cy.get(userPage.passwordInput).type('Password123');
        cy.get(userPage.confirmPasswordInput).type('Password123');
        cy.get(userPage.saveButton).click();
        cy.get('.mat-mdc-form-field-error').should('be.visible').and('contain', 'Password must contain a lowercase letter, an uppercase letter, a number and a special character');
    });


    function fillUserDetails() {
        cy.get(userPage.firstNameInput).type('testauto', { force: true });
        cy.get(userPage.lastNameInput).type('ben');
        cy.get(userPage.emailInput).type('user@example.com');
        cy.get(userPage.usernameInput).type('automateuser');
        cy.get(userPage.phoneCodeInput).type('972');
        cy.get(userPage.phoneCodeIsraelOption).click();
        cy.get(userPage.phoneNumberInput).type('123456789');
        cy.get(userPage.roleSelect).click();
        cy.get(userPage.roleProgrammerOption).click();
        cy.get(userPage.enable2FA).click(); // Toggle 2FA
    }
});