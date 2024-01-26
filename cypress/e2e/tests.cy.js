describe("Geld overmaken naar een andere rekening", () => {
  it("passes", () => {
    // check if correctly loggin in.
    cy.visit("http://localhost:3000/login");
    cy.contains("Melvin").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Melvin");

    cy.visit("http://localhost:3000/transfer");
    cy.get("select[name=toaccount]").select("2");
    cy.get("#amount").type(100);
    cy.get("textarea").type("Test case");
    cy.get("button:contains(Overboeken)").click();
    cy.get("h1").should("have.text", "Gelukt!");
  });
});

describe("Geld overmaken zonder een bedrag in te vullen", () => {
  it("passes", () => {
    // check if correctly loggin in.
    cy.visit("http://localhost:3000/login");
    cy.contains("Melvin").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Melvin");

    cy.visit("http://localhost:3000/transfer");
    cy.get("select[name=toaccount]").select("2");
    cy.get("textarea").type("Test case");
    cy.get("button:contains(Overboeken)").click();
    cy.get("h1").not("have.text", "Gelukt!");
  });
});

describe("Geld overmaken in een vreemde valuta", () => {
  it("passes", () => {
    // check if correctly loggin in.
    cy.visit("http://localhost:3000/login");
    cy.contains("Melvin").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Melvin");

    cy.visit("http://localhost:3000/transfer");
    cy.get("select[name=toaccount]").select("2");
    cy.get(".transfer__currency").select("GBP");
    cy.get("#amount").type(100);
    cy.get("textarea").type("Test case");
    cy.get("button:contains(Overboeken)").click();
    cy.get("h1").should("have.text", "Gelukt!");

    cy.visit("http://localhost:3000/transactions");
    cy.get(":nth-child(1) > div.transaction__amount > .transaction__amount").should("have.text", "€ -114,77");
  });
});
