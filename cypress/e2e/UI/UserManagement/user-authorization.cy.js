import { after } from 'mocha';
import { newSupervisor } from '../../../support/userData';


describe('user-authorization', () => {
    let envName;
    before(() => {
        // Get the environment name directly from Cypress environment variables
        envName = Cypress.env('environment') || 'qa-30'; // Default to 'qa-30' if not provided
    });

    it('Login as admin, check navigation elements and audit log for login event', () => {
  
      // Visit the base URL and log in as admin
      cy.visit('/');
      cy.loginAsAdmin();
  
      // Verify that the "Users" navigation link is visible
      cy.get('a[href="/users"] .fuse-vertical-navigation-item-title').should('be.visible').and('contain', 'Users');
      cy.get('a[href="/users"] mat-icon[data-mat-icon-name="user"]').should('be.visible'); // Verify user icon is visible
  
      // Navigate to the Audit page
      cy.get('a[href="/audit"]').click();
  
      // Check the first row in the audit log for the login event
      cy.get('tr[role="row"][mat-row]').first().within(() => {
        // Verify the specific login audit message
      cy.get('.audit-message-cell').should('contain', `admin has logged in successfully as Administrator to ${envName}`);
        
        // Additional check for "User Login" event if still needed
      cy.get('[data-cy="Event 0"]').should('contain', 'User Login');
      });
    });



    it('Login as Supervisor, check navigation elements and audit log for login event', () => {
        cy.createUser(newSupervisor);
        cy.visit('/');
        cy.login(newSupervisor.UserName, newSupervisor.Password);
        cy.get('a[href="/audit"]').click();
        cy.get('.audit-message-cell').should('contain',`${newSupervisor.UserName} has logged in successfully as Supervisor to ${envName}`);

        });

        afterEach(() => {
            // Clean up user regardless of test outcome
            cy.deleteUserByUsername(newSupervisor.UserName);
         });

      });




