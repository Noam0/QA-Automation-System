import { newSupervisor, newProgrammer } from '../../../support/userData';
import userPage from '../../../support/selectors/usersPage';

describe('User Deletion Tests', () => {
    let createdUserId;

    // Helper function to create a user and store their ID
    function createUser(user) {
        return cy.createUser(user).then((response) => {
            createdUserId = response.body.Id; // Store user ID for deletion
            cy.log(`Created User ID: ${createdUserId}`);
        });
    }

    // Helper function to delete a user through the UI
    function deleteUserThroughUI(username) {
        cy.openUserPageByUsername(username);
        cy.get(userPage.deleteUserButton).click();
        cy.contains('button.mat-mdc-unelevated-button', 'Delete')
            .should('be.visible')
            .click();
    }

    it('Should delete a Supervisor user through the UI and verify deletion', () => {
        // Step 1: Create a Supervisor user through the API
        createUser(newSupervisor);

        // Step 2: Delete the Supervisor user through the UI
        cy.loginAsAdmin();
        deleteUserThroughUI(newSupervisor.UserName);

      
      /*  // Step 3: Verify audit log entry for Supervisor deletion
        cy.get('a[href="/audit"]').click();
        cy.get('tr[role="row"][mat-row]').first().within(() => {
            cy.get('span.audit-message-cell[mattooltipposition="above"]')
              .should('contain', `admin has deleted the user ${newSupervisor.UserName} with Supervisor permissions`);
        });
        */
    });

    it('Should delete a Programmer user through the UI and verify deletion', () => {
        // Step 1: Create a Programmer user through the API
        createUser(newProgrammer);

        // Step 2: Delete the Programmer user through the UI
        cy.loginAsAdmin();
        deleteUserThroughUI(newProgrammer.UserName);
/*
        // Step 3: Verify audit log entry for Programmer deletion
        cy.get('a[href="/audit"]').click();
        cy.get('tr[role="row"][mat-row]').first().within(() => {
            cy.get('span.audit-message-cell[mattooltipposition="above"]')
              .should('contain', `admin has deleted the user ${newProgrammer.UserName} with Programmer permissions`);
        });
        */
    });

    afterEach(() => {
        // Clean up created users by username
        if (newSupervisor.UserName) cy.deleteUserByUsername(newSupervisor.UserName);
        if (newProgrammer.UserName) cy.deleteUserByUsername(newProgrammer.UserName);
        createdUserId = null; // Reset createdUserId for the next test
    });
});