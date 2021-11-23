describe('Voting tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('like a color', () => {
    cy.get('app-color-card').first().within(() => {

      cy.get('app-vote-wrapper')
        .should('not.contain.text', 'Hai già espresso il tuo parere.')
        .should('contain.text', 'Ti piace questo colore?');

      cy.get('button.vote-yes')
        .should('contain.text', 'Mi Piace!')
        .and('not.have.class', 'highlighted')
        .and('be.enabled')
        .click({force: true})
        .should('have.class', 'highlighted')
        .and('be.disabled');

      cy.get('app-vote-wrapper')
        .should('contain.text', 'Hai già espresso il tuo parere.')
        .should('not.contain.text', 'Ti piace questo colore?');

      cy.get('button.vote-no')
        .should('contain.text', 'Non mi Piace')
        .and('not.be.enabled')
        .and('not.have.class', 'highlighted');

    });
  });

  it('dislike a color', () => {
    cy.get('app-color-card').first().within(() => {
      cy.get('div.polaroid-inner').should('not.contain.text', 'Hai già espresso il tuo parere.');

      cy.get('button').eq(2)
        .should('contain.text', 'Non mi Piace')
        .and('not.have.class', 'highlighted')
        .and('be.enabled')
        .click({force: true})
        .should('have.class', 'highlighted')
        .and('be.disabled');

      cy.get('div.polaroid-inner').should('contain.text', 'Hai già espresso il tuo parere.');
      cy.get('button').eq(1)
        .should('contain.text', 'Mi Piace!')
        .and('not.be.enabled')
        .and('not.have.class', 'highlighted');
    });
  });
});
