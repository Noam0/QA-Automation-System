import { after } from 'mocha';
import { newSupervisor } from '../../../support/userData';
import userPage from '../../../support/selectors/usersPage';


describe('user-edit', () => {

    before(() => {
        cy.createUser(newSupervisor);
    });

    it('Login as admin, edit supervisor details', () => {
      cy.visit('/');
      cy.loginAsAdmin();
    cy.get('a[href="/users"]').click();
    // Click to open the specific combobox
    cy.get('mat-form-field .mat-mdc-select').first().click();
    cy.get('.mat-select-search-input:visible').type(newSupervisor.UserName);
    cy.wait(500); // Optional wait for search results
    cy.contains('mat-option', newSupervisor.UserName).click();
    
    // Click outside to close the dropdown
    cy.get('body').click();
    cy.get('tbody[role="rowgroup"]').find('tr').contains('td.mat-column-UserName', newSupervisor.UserName).click();
    let newFirstName = newSupervisor.FirstName + "2";
    cy.get(userPage.firstNameInput).clear().type(newFirstName, { force: true });
    cy.get(userPage.saveButton).click();
     
    /*
      cy.get('a[href="/audit"]').click();
      cy.get('tr[role="row"][mat-row]').first().within(() => {
      
      cy.get('.audit-message-cell').should('contain', `admin with Administrator permissions has changed the user ${newSupervisor.UserName}'s FirstName to ${newFirstName}`);
        
      
      });
      */
    });



    it('', () => {
       

        });

        afterEach(() => {
            // Clean up user regardless of test outcome
            cy.deleteUserByUsername(newSupervisor.UserName);
         });

      });





