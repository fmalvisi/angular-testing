describe('UI elements and responsiveness', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Dimostrazione Test Unitari e E2E Angular');
    cy.contains('Colori del giorno');
    cy.get('carousel').should('be.visible');
  });

  context('mobile protrait', () => {
    beforeEach(() => cy.viewport('iphone-x', 'portrait'));

    it('should display 1 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '1');
    });
  });

  context('mobile landscape', () => {
    beforeEach(() => cy.viewport('iphone-x', 'landscape'));

    it('should display 1 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '1');
    });
  });

  context('tablet protrait', () => {
    beforeEach(() => cy.viewport('ipad-2', 'portrait'));

    it('should display 1 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '1');
    });
  });
  //
  context('tablet landscape', () => {
    beforeEach(() => cy.viewport('ipad-2', 'landscape'));

    it('should display 2 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '2');
    });
  });

  context('desktop', () => {
    beforeEach(() => cy.viewport(1024, 768));

    it('should display 2 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '2');
    });
  });

  context('desktop XL', () => {
    beforeEach(() => cy.viewport(1280, 1024));

    it('should display 3 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '3');
    });
  });

  context('desktop 4K', () => {
    beforeEach(() => cy.viewport(3840, 2160));

    it('should display 3 cards in the carousel', () => {
      cy.get('carousel').invoke('attr', 'ng-reflect-cells-to-show').should('eq', '3');
    });
  });
});
