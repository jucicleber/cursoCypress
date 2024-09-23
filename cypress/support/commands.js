Cypress.Commands.add('fillMandatoryFieldAndSubmit', function(){
    cy.get('#firstName').type('Creber')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('creber.silva@yahoo.com')
    cy.get('#phone').type('65999990000')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
})