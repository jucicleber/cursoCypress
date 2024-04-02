/// <reference types="Cypress" />///

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        
        cy.title('').should('be.equals', 'Central de Atendimento ao Cliente TAT')
    })
//Caminho feliz
    it('preencher os campos obrigatórios e envia o formulario', function(){
        const escreverComentario = 'Teste curso Cypress com Java Script que esta sendo feito por jucicleber um grande programador de testes automatizados, muito massa...'
        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('creber.silva@yahoo.com')
        cy.get('#phone').type('65999990000')
        cy.get('#open-text-area').type(escreverComentario, {delay: 0})
        cy.get('button[type="submit"]').click()
        //Mensagem de sucesso...
        cy.get('.success').should('be.visible')
    })
//Email inválido
    it.only('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        //o email neste cenário tem uma virgula ficando invalido
        cy.get('#email').type('creber.silva@yahoo,com')
        cy.get('#phone').type('65999990000')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        //Mensagem de erro...
        cy.get('.error').should('be.visible')
    })
})
