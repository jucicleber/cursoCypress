describe('Central de Atendimento ao Cliente TAT', function() {
    // Corrigido o uso do beforeEach
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equals', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencher os campos obrigatórios e envia o formulário', function() {
        const escreverComentario = 'Teste curso Cypress com JavaScript que está sendo feito por jucicleber, um grande programador de testes automatizados, muito massa...'
        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('creber.silva@yahoo.com')
        cy.get('#phone').type('65999990000')
        cy.get('#open-text-area').type(escreverComentario, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('creber.silva@yahoo,com') // Email inválido
        cy.get('#phone').type('65999990000')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        // Limpar os campos após o teste
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()
        cy.get('#open-text-area').clear()
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('[id="phone"]').type('aaaaaaaaa').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function() {
        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('creber.silva@yahoo.com')
        cy.get('#phone-checkbox').check() // Torna o telefone obrigatório
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Creber').should('have.value', 'Creber').clear().should('have.value', '')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
        cy.get('#email').type('creber.silva@yahoo.com').should('have.value', 'creber.silva@yahoo.com').clear().should('have.value', '')
        cy.get('#phone').type('65999990000').should('have.value', '65999990000').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Selecione um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('Selecione um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('Selecione um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('Seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
})
