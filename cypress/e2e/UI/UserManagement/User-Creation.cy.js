import userPage from '../../../support/selectors/usersPage';

describe('User Creation Tests', () => {
    let createdUserId; // Variable to store the user ID

    // Helper function to create a user with a specified role
    function createUserWithRole(roleOptionSelector) {
        cy.loginAsAdmin();

        cy.get(userPage.usersNavItem).click();
        cy.get(userPage.addUserButton).click();

        cy.get(userPage.firstNameInput).type('testauto', { force: true });
        cy.get(userPage.lastNameInput).type('ben' , { force: true });
        cy.get(userPage.emailInput).type('user@example.com', { force: true });
        cy.get(userPage.usernameInput).type('automateuser', { force: true });

        cy.get(userPage.phoneCodeInput).type('972', { force: true });
        cy.get(userPage.phoneCodeIsraelOption).click();

        cy.get(userPage.phoneNumberInput).type('123456789', { force: true });
        cy.get(userPage.roleSelect).click();
        cy.get(roleOptionSelector).click();

        cy.get(userPage.passwordInput).type('Password123!', { force: true });
        cy.get(userPage.confirmPasswordInput).type('Password123!', { force: true });
        cy.get(userPage.enable2FA).click(); // Toggle 2FA
        cy.get(userPage.saveButton).click(); // Save user

        // Make sure that toast message was created
        cy.get('#toast-container').should('be.visible').and('contain', 'User Created');

        // Confirm user creation and retrieve the user ID
        return cy.getUsers().then((users) => {
            const createdUser = users.find(user => user.UserName === 'automateuser');
            if (createdUser) {
                createdUserId = createdUser.Id; // Store user ID for deletion
                cy.log(`Created User ID: ${createdUserId}`);
            } else {
                throw new Error('User not found in the response');
            }
        });
    }

    it('Should create a Programmer user', () => {
        createUserWithRole(userPage.roleProgrammerOption);
    });

    it('Should create an Admin user', () => {
        createUserWithRole(userPage.roleAdministratorOption);
    });

    it('Should create a Supervisor user', () => {
        createUserWithRole(userPage.roleSupervisorOption);
    });

    afterEach(() => {
        // Delete the created user after the test if createdUserId is set
        if (createdUserId) {
            cy.deleteUser(createdUserId);
            createdUserId = null; // Reset the ID for the next test
        }
    });
});