function getApiBaseUrl() {
  const env = Cypress.env('environment') || 'qa-30'; // Default to 'qa-30' if not provided
  const apiUrls = {
    'dev-30': 'https://dev-30-api.nanolocksecurity.nl',
    'qa-30': 'https://qa-30-api.nanolocksecurity.nl',
    'dev-21': 'https://dev-21-api.nanolocksecurity.nl',
    'qa-21': 'https://qa-21-api.nanolocksecurity.nl'
  };
  return apiUrls[env];
}

Cypress.Commands.add('authenticateAsAdmin', () => {
  cy.request({
    method: 'POST',
    url: `${getApiBaseUrl()}/api/Auth/AuthenticateUser`,
    headers: {
      'accept': '*/*',
      'Nl-Platform': 'MOT',
      'Content-Type': 'application/json'
    },
    body: {
      UserName: 'admin',
      Password: 'Aa123456!'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const cookies = response.headers['set-cookie'];
    const tokenCookie = cookies.find(cookie => cookie.startsWith('X-Access-Token='));
    const authToken = tokenCookie.split(';')[0].split('=')[1];
    Cypress.env('token', authToken); // Save the token
  });
});

Cypress.Commands.add('createUser', (userData) => {
  cy.authenticateAsAdmin().then(() => {
    const authToken = Cypress.env('token');
    return cy.request({
      method: 'POST',
      url: `${getApiBaseUrl()}/api/Users/CreateUser`,
      headers: {
        'accept': '*/*',
        'Nl-Platform': 'MOT',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: userData
    });
  });
});

Cypress.Commands.add('deleteUser', (userId) => {
  cy.authenticateAsAdmin().then(() => {
    const authToken = Cypress.env('token');
    cy.request({
      method: 'DELETE',
      url: `${getApiBaseUrl()}/api/Users/DeleteUser/${userId}`,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'accept': '*/*',
        'Nl-Platform': 'MOT',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 204) {
        cy.log(`User deleted successfully: UserID ${userId}`);
      } else {
        cy.log(`Failed to delete user: Status code ${response.status}`);
        cy.log(`Error message: ${response.body}`);
      }
    });
  });
});

Cypress.Commands.add('getUsers', () => {
  cy.authenticateAsAdmin().then(() => {
    const authToken = Cypress.env('token');
    return cy.request({
      method: 'GET',
      url: `${getApiBaseUrl()}/api/Users/GetUsers`,
      headers: {
        'accept': '*/*',
        'Nl-Platform': 'MOT',
        'Authorization': `Bearer ${authToken}`
      }
    }).then((userResponse) => {
      return userResponse.body.Users; // Return only the 'Users' array
    });
  });
});

Cypress.Commands.add('deleteUserByUsername', (username) => {
  cy.getUsers().then((usersArray) => {
    const user = usersArray.find(user => user.UserName === username);
    if (user) {
      const userId = user.Id;
      cy.log(`Deleting user: ${username} with ID: ${userId}`);
      cy.deleteUser(userId);
    } else {
      cy.log(`User with username "${username}" not found.`);
    }
  });
});


Cypress.Commands.add('getAllExternalDevices', () => {
  cy.authenticateAsAdmin().then(() => {
    const authToken = Cypress.env('token');
    return cy.request({
      method: 'GET',
      url: `${getApiBaseUrl()}/api/ExternalDevices/getAllExternalDevices`,
      headers: {
        'accept': '*/*',
        'Nl-Platform': 'MOT',
        'Authorization': `Bearer ${authToken}`
      }
    }).then((devicesResponse) => {
      return devicesResponse.body.Devices; 
    });
  });
});





// UI login command for Cypress tests
Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/');
  cy.get('#username').type('admin');
  cy.get('#password').type('Aa123456!');
  cy.get('button.fuse-mat-button-large.bg-primary').click();
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button.fuse-mat-button-large.bg-primary').click();
});


Cypress.Commands.add('openUserPageByUsername', (username) => {
  // Navigate to the users page
  cy.get('a[href="/users"]').click();
  // Click to open the specific combobox
  cy.get('mat-form-field .mat-mdc-select').first().click();
  cy.get('.mat-select-search-input:visible').type(username);
  cy.wait(500);
  cy.contains('mat-option', username).click();
  cy.get('body').click();
  cy.get('tbody[role="rowgroup"]')
    .find('tr')
    .contains('td.mat-column-UserName', username)
    .click();
});

// In cypress/support/commands.js
Cypress.Commands.add('checkAuditLogEntry', (eventCategory, auditMessage) => {
  // Navigate to the Audit page
  cy.get('a[href="/audit"]').click();

  // Check the first row in the audit log for the specified event category and message
  cy.get('tr[role="row"][mat-row]').first().within(() => {
    // Verify the event category in the Event column (based on data-cy attribute)
    cy.get('[data-cy^="Event"]').should('contain', eventCategory);
    
    // Verify the audit message in the Message column
    cy.get('.audit-message-cell').should('contain', auditMessage);
  });
});

