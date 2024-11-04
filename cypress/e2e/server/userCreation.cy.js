const { newProgrammer, newSupervisor } = require('../../support/userData');




describe('API User Management', () => {
  it('should create a new programmer successfully', () => {
    cy.createUser(newProgrammer).then((response) => {
      expect(response.status).to.eq(201);
      // Add more assertions based on expected response
    });
  });

  it('should create a new supervisor successfully', () => {
    cy.createUser(newSupervisor).then((response) => {
      expect(response.status).to.eq(201);
      // Add more assertions based on expected response
    });
  });
});