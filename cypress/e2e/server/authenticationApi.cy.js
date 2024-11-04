describe('API Auth', () => {
  it('authentication', () => {
    cy.request({
      method: 'POST',
      url: 'https://qa-30-api.nanolocksecurity.nl/api/Auth/AuthenticateUser',
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
      // Add assertions here to check the response
      expect(response.status).to.eq(200);
      // Add more assertions based on expected response
      const authToken = response.body.token;
     
    });
  });
});