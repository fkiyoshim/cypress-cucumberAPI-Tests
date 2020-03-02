// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//^altero dados de uma conta
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
      Cypress.Commands.add('getToken', (user, password) => {
  cy.request({
              method: 'POST',
              url: '/signin',
              body: {
                  email: user,
                  redirecionar: false,
                  senha: password
              }
          }).its('body.token').should('not.be.empty')
          .then(token => {
          return token
          })
          })

Cypress.Commands.add('resetRest', () => {
cy.getToken('fkiyoshim@gmail.com', '231564chico').then(token => {
cy.request({
    method: 'GET',
    url: '/reset',
    headers: { Authorization: `JWT ${token}` }
            })
    })
})


  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
