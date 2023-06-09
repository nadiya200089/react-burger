describe("test", () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000/');
        cy.intercept('GET', "https://norma.nomoreparties.space/api/ingredients").as('baseQuery');
        cy.wait('@baseQuery');
    })

    // it ('тестируем получение данных', () => {
    //     cy.intercept('GET', "https://norma.nomoreparties.space/api/ingredients", {fixtures: "ingredients.json"});

    // })


    it('проверка открытие модального окна', () => {
        cy.get('[class^=style_dragIngredient]').each(($el) => {
            cy.get('[id^=modal]').first().as('modal');

            cy.get($el).click();

            cy.get('@modal').find('[class^=style_ingredient_details]').first().as('details');
            cy.get('@details').find('[class^=style_title]').first().as('style_title');
            cy.get('@style_title').should('contain', 'Детали ингредиента');

            cy.get('[class^=style_close]').click();

        })

    })

    // it('проверка drag n drop', () => {
    //     cy.get('[class^=style_dragIngredient]').each(($el) => {
    //         cy.get($el).trigger('dragstart', { force: true });
    //         cy.get('.drop-provider').eq(1).trigger('drop', { force: true })
    //     })
    //     cy.wait(10000);
    //     cy.get('[data-handler-id]').each(($el) => {
    //         cy.get($el).trigger('dragstart', { force: true });
    //         cy.get('[data-handler-id]').first().trigger('drop', { force: true })
    //     })
    // })


    it('проверка оформления заказа и dragNdrop', () => {
        cy.get('[class^=style_dragIngredient]').each(($el) => {
            cy.get($el).trigger('dragstart', { force: true });
            cy.get('.drop-provider').eq(1).trigger('drop', { force: true })
        })
        cy.wait(10000);
        cy.get('[data-handler-id]').each(($el) => {
            cy.get($el).trigger('dragstart', { force: true });
            cy.get('[data-handler-id]').first().trigger('drop', { force: true })
        })
            cy.get('button').contains('Оформить заказ').as('button');

            cy.get('button').click();
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq('/enter')
            })
            cy.get('h2').contains('Вход').should('exist');
            cy.get(':nth-child(2) > .input').should('exist');
            cy.get(':nth-child(3) > .input').should('exist');
            cy.get(':nth-child(2) > .input').type('l@l.ru');
            cy.get(':nth-child(3) > .input').type('1234');
            cy.get('button').contains('Войти').as('enter');
            cy.get('@enter').click().then(($button) => {
                cy.location().should((loc) => {
                    expect(loc.pathname).to.eq('/')
                })
                // cy.intercept('POST', "https://norma.nomoreparties.space/api/auth/login").as('baseQuery');
                // cy.wait('@baseQuery');
                cy.get('button').click();
                cy.get('[class^=style_ldsDefault__]');
                 cy.intercept('POST', "https://norma.nomoreparties.space/api/orders").as('baseQuery');
                cy.wait('@baseQuery').then((inter) => {
                    cy.wait(15000);
                    cy.get('h3').contains('идентификатор заказа').should('exist');
                    cy.get('[class^=style_close]').click();
                })

            })


        })

    })