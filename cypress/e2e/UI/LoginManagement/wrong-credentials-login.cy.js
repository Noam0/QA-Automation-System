describe('register functionallity with wrong credentials', () => {
  it('should display an unauthorized message with invalid credentials', () => {

    cy.visit('/')
    cy.get('#username').type('admin2');
    cy.get('#password').type('Aa976521!');
    cy.get('button.fuse-mat-button-large.bg-primary').click();
    cy.get('.fuse-alert-message').should('contain', 'User Authentication has failed, invalid user credentials, Unauthorized');
  });


});


describe('Forgot Password', () => {
  it('Forgot Password should present support window', () => {

    // Visit the login page
    cy.visit('/');

    // Click the "Forgot your password?" link
    cy.get('a.text-md.font-medium.text-primary').click();

    // Assert that the div with "Forgot your password?" text is displayed
    cy.get('div.mt-8.text-4xl.font-extrabold.tracking-tight.leading-tight')
      .should('contain.text', 'Forgot your password?');

  });
});