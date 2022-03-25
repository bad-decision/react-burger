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
}); 