describe('Navigation tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to add color after button click', () => {
    cy.get('div.title span.action').click();
    cy.url().should('contain', 'color');
    cy.get('app-add-or-edit').should('be.visible');
  });

  it('should navigate to add color after clicking edit color', () => {
    cy.navigateToColor(4);

    cy.url().should('contain', 'color');
    cy.get('app-add-or-edit').should('be.visible');
  });

  it('should navigate to homepage after clicking "Annulla" on form', () => {

    cy.navigateToColor(0);

    cy.get('a.goBack').click();
    cy.url().should('not.contain', 'color');
  });
});
