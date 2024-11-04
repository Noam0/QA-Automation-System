// userPage.js
const userPage = {
    usersNavItem: '.fuse-vertical-navigation-item-title:contains("Users")',
    addUserButton: '[data-cy="addUser"]',
    firstNameInput: '[data-cy="firstName"] input',
    lastNameInput: '[data-cy="lastName"] input',
    usernameInput: '[data-cy="username"] input',
    emailInput: '[data-cy="email"] input',
    phoneCodeInput: '[data-cy="phoneCode"]',
    phoneNumberInput: '[data-cy="phoneNumber"]',
    roleSelect: '[data-cy="role"] mat-select',
    passwordInput: '[data-cy="password"] input',
    confirmPasswordInput: '[data-cy="PasswordConfirm"] input',
    enable2FA: '[data-cy="2fa"] mat-slide-toggle',
    deleteUserButton: '[data-cy="delete"]',
    saveButton: '[data-cy="save"]',

    // Role options in the role select dropdown
    roleAdministratorOption: 'span.mdc-list-item__primary-text:contains("Administrator")',
    roleProgrammerOption: 'span.mdc-list-item__primary-text:contains("Programmer")',
    roleSupervisorOption: 'span.mdc-list-item__primary-text:contains("Supervisor")',

    // Phone code option for Israel
    phoneCodeIsraelOption: 'span.mdc-list-item__primary-text:contains("Israel (972)")'
};
export default userPage;
