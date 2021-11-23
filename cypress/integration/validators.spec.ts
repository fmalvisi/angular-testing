describe('Form Validation tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.navigateToColor(0);

    // check checkbox to enable form by default
    cy.get('#check')
      .should('be.visible')
      .and('be.enabled')
      .check()
  });

  it('Name should NOT be empty', () => {
    cy.get('#name')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('qwerty')
      .should('not.have.class', 'errmsg')
      .clear()
      .should('have.class', 'errmsg')

    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#name').type('qwerty');

    cy.get('button[type="submit"]').should('be.enabled');
  });

  it('Year should have 4 digits', () => {
    cy.get('#year')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('1970')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('1969')
      .should('have.class', 'errmsg')

    cy.get('span.form__error').should('contain', 'Anno non valido');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#year')
      .clear()
      .type('2021');

    cy.get('button[type="submit"]').should('be.enabled');
  });

  it('HEX color should have #XXXXXX format', () => {
    cy.get('#color')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('#AABBCC')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('AABBCC')
      .should('have.class', 'errmsg')

    cy.get('span.form__error').should('contain', 'Colore non valido, deve essere nel formato #XXXXXX');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#color')
      .clear()
      .type('#112233');

    cy.get('button[type="submit"]').should('be.enabled');
  });

  it('Pantone name should be in XX-XXXX format', () => {
    cy.get('#pantone_value')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('12-1234')
      .should('not.have.class', 'errmsg')
      .clear()
      .type('qwerty')
      .should('have.class', 'errmsg')

    cy.get('span.form__error').should('contain', 'Nomenclatura Pantone non valida, deve essere nel formato XX-XXXX');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#pantone_value')
      .clear()
      .type('12-1234');

    cy.get('button[type="submit"]').should('be.enabled');
  });
});
