describe('Central de Atendimento ao Cliente TAT', function() {

    const converte3000MiliSegundosEmVariavel = 3000

    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', function() {
        
        cy.title('').should('be.equals', 'Central de Atendimento ao Cliente TAT')
    })
//Caminho feliz
    it('Preencher os campos obrigatórios e envia o formulario', function(){
        const escreverComentario = 'Teste curso Cypress com Java Script que esta sendo feito por jucicleber um grande programador de testes automatizados, muito massa...'
         //para o tempo
        cy.clock()

        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('creber.silva@yahoo.com')
        cy.get('#phone').type('65999990000')
        cy.get('#open-text-area').type(escreverComentario, {delay: 0})
        cy.contains('button','Enviar').click()
        //Mensagem de sucesso...
        cy.get('.success').should('be.visible')
        //validar exibição da mensagem em 3 segundos
        cy.tick(converte3000MiliSegundosEmVariavel)

        cy.get('.success').should('not.be.visible')

    })
//Email inválido
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.clock()

        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        //o email neste cenário tem uma virgula ficando invalido
        cy.get('#email').type('creber.silva@yahoo,com')
        cy.get('#phone').type('65999990000')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        //Mensagem de erro...
        cy.get('.error').should('be.visible')

        cy.tick(converte3000MiliSegundosEmVariavel)

        cy.get('.success').should('not.be.visible')
    })

    Cypress._.times(3, function() {
        it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
            //inserindo um texto no campo telefone que só aceita, atravez de uma função
            //assim vazio por não ter número, depois o should valida que o campo esta vazio
            cy.get('#phone')
             .type('aaaaaaaaa')
             .should('have.value', '')
         })
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function(){

        cy.clock()

        cy.get('#firstName').type('Creber')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('creber.silva@yahoo.com')
        //marcando o checkbox para o telefone ficar vazio depois não preenche
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        //quando clica no botão mostra o erro
        cy.contains('button','Enviar').click()
        //Mensagem de erro...
        cy.get('.error').should('be.visible')

        cy.tick(converte3000MiliSegundosEmVariavel)

        cy.get('.error').should('not.be.visible')
    })
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Creber')
            .should('have.value', 'Creber')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('creber.silva@yahoo.com')
            .should('have.value', 'creber.silva@yahoo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('65999990000')
            .should('have.value', '65999990000')
            .clear()
            .should('have.value', '')
    })
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

        cy.clock()

        cy.contains('button','Enviar').click()
        //Mensagem de erro...
        cy.get('.error').should('be.visible')

        cy.tick(converte3000MiliSegundosEmVariavel)
        
        cy.get('.error').should('not.be.visible')
    })

    it('Envia o formulario com sucesso usando um comando customizado', function(){

        cy.clock()

        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(converte3000MiliSegundosEmVariavel)

        cy.get('.success').should('not.be.visible')
    })
    it('Selecione um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        //selecioando YouTube pelo texto na tela
            .select('YouTube')
            .should('have.value','youtube')
    })
    it('Selecione um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        //esta pegando pelo value no caso mentoria com letra minuscula
            .select('mentoria')
            .should('have.value','mentoria')
    })
    it('selecione um produto (Blog) por seu indice', function(){
        cy.get('#product')
        //selecione é o 0 indice é 1
            .select(1)
            //averiguando pelo value
            .should('have.value','blog')
    })
    it('Seleciona um arquivo da pasta fixtures', function (){
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
       cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain','Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
       cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain','Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })
    it.only('preenche a area de texto usando o comando invoke errado', function(){
        const longText = Cypress._.repeat('0123456789',30)

        cy.get('#open-text-area')
         .invoke('val',longText)
         .should('have.value', longText)
    })    
})