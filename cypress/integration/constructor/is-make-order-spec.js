describe('make order correctly', function () {
	before(function () {
		cy.visit('http://localhost:3000');
	});

	it('should drag and drop ingredient', function () {
		cy.get('[class^=burger-ingredient_ingredient]').first().as('bun');
		cy.get('[class^=burger-constructor_elements]').first().as('constructor');

		cy.get('@bun').trigger('dragstart')
		cy.get('@constructor').trigger('drop')

		cy.get('[class=constructor-element__text]').should('have.length', 2);
	});

	it('should open login page', function () {
		cy.get('button[class^=button_button__]').first().as('orderBtn');
		cy.get('@orderBtn').click();

		cy.get('button[class^=button_button__]').as('loginBtn');
		cy.get('@loginBtn').should('contain', "Войти");
	});

	it('should login successfully', function () {
		cy.get('input[name="email"]').first().type('redsfanatic@yandex.ru');
		cy.get('input[name="password"]').first().type('123456');

		cy.get('button[class^=button_button__]').click();
		cy.get('button[class^=button_button__]').first().as('orderBtn');
		cy.get('@orderBtn').should('contain', "Оформить заказ");
	});

	it('should make order correctly', function () {
		cy.get('button[class^=button_button__]').first().as('orderBtn');
		cy.get('@orderBtn').click();
		cy.get('p[class^=order-details_orderNumber]').should('be.not.empty');
	});
}); 