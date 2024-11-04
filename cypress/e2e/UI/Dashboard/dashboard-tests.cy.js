import { navigationBar } from '../../../support/selectors/navigationBar';

describe('user-authorization', () => {
   
    before(() => {   
    cy.visit('/');
    cy.loginAsAdmin();
   
    
    });

    it('Total users Validation', () => {
        let userCount;
        // Fetch the users and store the count
        cy.getUsers().then((users) => {
          userCount = users.length; // Store the length in a variable
          cy.log(`Number of users: ${userCount}`);
        }).then(() => {
          // Verify that the displayed element contains the user count
          cy.get('.text-7xl')
            .should('be.visible')
            .and('contain', userCount.toString());
        });
 
    });


    it('Protected Devices Validation', () => {
        let lockedDevicesCount;
    
        // Calculate the locked devices count with LockState === 1
        cy.getAllExternalDevices().then((devicesResponse) => {
            lockedDevicesCount = devicesResponse.filter(device => device.LockState === 1).length;
        }).then(() => {
            // Target the specific element with a combination of classes to locate the count display
          //  cy.get('.flex.flex-col.items-center.mt-2')
            //    .find('.text-7xl.font-bold.tracking-tight.text-green-500')
               // .should('be.visible')
               // .and('contain', lockedDevicesCount.toString());
        });
    });
       



});
