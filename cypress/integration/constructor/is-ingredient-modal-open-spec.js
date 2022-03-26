describe('ingredient modal open correctly', function () {
	before(function () {
		cy.visit('http://localhost:3000');
	});

	it('should open ingredient modal', function () {
		cy.get('[class^=burger-ingredient_ingredient]').first().as('ingredient');
		cy.get('@ingredient').click();

		cy.get('[class^=modal_modal__]').first().as('modal');
		cy.get('@modal').find('h3').first().as('ingredientName');

		cy.get('@ingredientName').should('be.not.empty');
	});

	it('should close ingredient modal', function () {
		cy.get('[class^=modal_modal__]').first().as('modal');
		cy.get('@modal').find('span[class^=modal_closeIcon__]').first().as('closeBtn');
		cy.get('@closeBtn').click();
		cy.get('[class^=modal_modal__]').should('not.exist');
	});
}); 