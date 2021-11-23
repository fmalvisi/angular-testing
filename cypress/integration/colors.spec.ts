describe('Color managements tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a new color', () => {

    //fist let's keep track of the current number of colours
    cy.get('app-color-card').then(cards => {
      const initialElements = cards.length;

      cy.get('span.action').click();
      cy.url().should('contain', '/color'); // let's verify we actually arrived to the page

      cy.get('#id')
        .should('be.visible')
        .and('be.disabled')

      cy.get('#name')
        .should('be.visible')
        .and('be.enabled')
        .clear()
        .type('illuminating');

      cy.get('#year')
        .should('be.visible')
        .and('be.enabled')
        .clear()
        .type('2021');

      cy.get('#color')
        .should('be.visible')
        .and('be.enabled')
        .clear()
        .type('#F5DF4D');

      cy.get('#pantone_value')
        .should('be.visible')
        .and('be.enabled')
        .clear()
        .type('13-0647');

      cy.get('#loaded')
        .should('be.visible')
        .and('be.disabled');

      cy.get('#edited_by')
        .should('be.visible')
        .and('be.disabled');

      cy.get('button[type="submit"]')
        .should('be.visible')
        .and('be.disabled')

      cy.get('#check')
        .should('be.visible')
        .and('be.enabled')
        .check()

      cy.get('button[type="submit"]')
        .should('be.visible')
        .and('be.enabled')
        .click();

      cy.url().should('eq', Cypress.config().baseUrl); // let's verify we actually landed back to main page

      cy.get('app-color-card').then(cards => { // get all cards again to count total elements
        expect(cards.length).equal(initialElements + 1);
      });
    });

  });

  it('edit an existing color', () => {

    cy.get('app-color-card div.polaroid div.details').eq(1).then(cardName => {
      const currentName = cardName.text();

      cy.get('app-color-card')
        .first()
        .find('button')
        .first()
        .click({force: true});

      cy.url().should('contain', '/color'); // let's verify we actually arrived to the page

      // now lets prepare a random name
      const name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

      cy.get('#name')
        .should('be.visible')
        .and('be.enabled')
        .should('contain.value', currentName)
        .clear()
        .type(name);

      cy.get('button[type="submit"]')
        .should('be.visible')
        .and('be.disabled')

      cy.get('#check')
        .should('be.visible')
        .and('be.enabled')
        .check()

      cy.get('button[type="submit"]')
        .should('be.visible')
        .and('be.enabled')
        .click();

      cy.url().should('eq', Cypress.config().baseUrl); // let's verify we actually landed back to main page

      cy.get('app-color-card div.polaroid div.details').eq(1).then(newName => { // get first card again to check name
        expect(newName).not.equal(currentName);
      });
    });
  });
});
