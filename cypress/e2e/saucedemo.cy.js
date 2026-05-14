describe('SauceDemo Login Tests', () => {

  const url = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(url);
  });

  it('TC_01 - Valid login', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');
  });

  it('TC_02 - Invalid username', () => {
    cy.get('#user-name').type('Admi');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]').should('be.visible');
  });

  it('TC_03 - Invalid password', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('wrong_pass');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]').should('be.visible');
  });

  it('TC_09 - Empty fields validation', () => {
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('be.visible');
  });

});
describe('Inventory Page Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Verify products are displayed', () => {
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('Verify product details visibility', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('.inventory_item_name').should('be.visible');
      cy.get('.inventory_item_price').should('be.visible');
      cy.get('img').should('be.visible');
    });
  });

  it('Sort A-Z', () => {
    cy.get('[data-test="product-sort-container"]').select('az');
  });

  it('Sort Price Low to High', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi');
  });

});
describe('Cart Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Add item to cart', () => {
    cy.get('.inventory_item').first().contains('Add to cart').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('Remove item from cart', () => {
    cy.get('.inventory_item').first().contains('Add to cart').click();
    cy.get('.shopping_cart_link').click();
    cy.contains('Remove').click();
  });

  it('Cart badge update check', () => {
    cy.get('.btn_inventory').eq(0).click();
    cy.get('.btn_inventory').eq(1).click();
    cy.get('.shopping_cart_badge').should('have.text', '2');
  });

});
describe('Checkout Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Successful checkout', () => {
    cy.get('.btn_inventory').first().click();

    cy.get('.shopping_cart_link').click();
    cy.get('#checkout').click();

    cy.get('#first-name').type('Sampath');
    cy.get('#last-name').type('Perera');
    cy.get('#postal-code').type('61270');

    cy.get('#continue').click();
    cy.get('#finish').click();

    cy.contains('Thank you for your order').should('be.visible');
  });

  it('Checkout validation empty fields', () => {
    cy.get('.shopping_cart_link').click();
    cy.get('#checkout').click();
    cy.get('#continue').click();

    cy.get('[data-test="error"]').should('be.visible');
  });

});
describe('Logout Test', () => {

  it('User logout successfully', () => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    cy.url().should('include', 'saucedemo.com');
  });

});