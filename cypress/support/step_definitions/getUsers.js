/* eslint-disable new-cap */
/// <reference types="cypress" />
import {
    Given,
    Then,
    When
} from 'cypress-cucumber-preprocessor/steps';
//import * as fs from 'fs'
const fs = require('fs')
var request = require('request')
let suser = ''

var page;
var singleuser;

Given(/^que envio uma requisicao de login$/, () => {
    cy.getToken('fkiyoshim@gmail.com', '231564chico')
})

When(/^envio uma requisicao para abertura de uma conta$/, () => {
    cy.getToken('fkiyoshim@gmail.com', '231564chico')
        .then(token => {
            cy.request({
                url: '/contas',
                method: 'POST',
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: 'Conta via requisicao'
                }
            }).as('response')
        })
    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('nome', 'Conta via requisicao')
    })
})

When('envio uma requisicao para abertura de uma conta {string}', (contaText) => {
    cy.getToken('fkiyoshim@gmail.com', '231564chico')
        .then(token => {
            cy.request({
                url: '/contas',
                method: 'POST',
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: contaText
                },
                failOnStatusCode: false
            }).as('response')
        })
            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(400)
                expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
})
})


When(/^eu reseto as configuracoes$/, () => {
    cy.resetRest();

})

when('altero dados de uma conta {string}', (text) => {
    cy.getToken('fkiyoshim@gmail.com', '231564chico')
        .then(token => {
            cy.request({
                method: 'GET',
                url: '/contas',
                headers: {
                    Authorization: `JWT ${token}`
                },
                qs: {
                    nome: text
                }
            }).then(res => {

                cy.request({
                    url: `/contas/${res.body[0].id}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `JWT ${token}`
                    },
                    body: {
                        nome: 'Conta alterada via rest'
                    }
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)

        })
})