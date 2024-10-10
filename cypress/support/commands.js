Cypress.Commands.add('fillMandatoryFieldAndSubmit', function(){
    cy.get('#firstName').type('Creber')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('creber.silva@yahoo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})