describe("Login", () => {
  it("contains login form", () => {
    cy.visit("/");

    cy.contains("Номер ИСУ");
    cy.contains("Пароль");
  });

  it("can log in", () => {
    cy.visit("/");

    cy.get("[data_cy=number-input]").type("334790");
    cy.get("[data_cy=password-input]").type("123456");
    cy.get("[data_cy=login-form]").submit();

    cy.contains("Линейная алгерба I");
  });
});
