describe('Тесты E2E конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000');
  });

  it('Сервис должен быть доступен по адресу http://localhost:4000', () => {
    cy.url().should('include', 'http://localhost:4000');
  });

  it('Доступные ингредиенты', () => {
    cy.get('[data-type="bun"]', { timeout: 10000 }).should(
      'have.length.at.least',
      1
    );
    cy.get('[data-type="main"]', { timeout: 10000 }).should(
      'have.length.at.least',
      1
    );
    cy.get('[data-type="sauce"]', { timeout: 10000 }).should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка открытия модальных окон', () => {
    it('Окно карточки ингридиента', () => {
      cy.get('[data-type="bun"]:first-of-type', { timeout: 10000 }).click();
      cy.get('#modals').children().should('have.length', 2);
    });
    it('Модальное окно закрывается при нажатии на крестик', () => {
      cy.get('[data-type="bun"]:first-of-type', { timeout: 10000 }).click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('[data-testid="modal-close"]').click();
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', `api/auth/user`, { fixture: 'user' }).as('getUser');
      cy.intercept('POST', `api/orders`, { fixture: 'order' }).as('postOrder');
      cy.setCookie('token', 'mock-token');
    });

    it('Должен успешно оформить заказ', () => {
      cy.wait('@getUser');

      // Добавление ингредиентов по нажатию на кнопку
      cy.get('[data-type="bun"]').first().find('button').click();
      cy.get('[data-type="main"]').first().find('button').click();
      cy.get('[data-type="sauce"]').first().find('button').click();

      // Оформляем заказ
      cy.get('[data-testid="order"]').click();
      cy.wait('@postOrder', { timeout: 100000 })
        .its('response.statusCode')
        .should('eq', 200);

      // Проверка модального окна с номером заказа
      cy.get('#modals').children().should('have.length', 2);
      cy.get('[data-testid="order-number"]').should('contain.text', '12345');

      cy.get('[data-testid="modal-close"]').click();
      cy.get('#modals').children().should('have.length', 0);
      cy.get('[data-testid="drop-zone"]').children().should('have.length', 1);
    });
  });
});
