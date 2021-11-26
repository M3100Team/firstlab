describe("Login", () => {
  it("contains login form", () => {
    cy.visit("/");

    cy.contains("Номер ИСУ");
  });
});
