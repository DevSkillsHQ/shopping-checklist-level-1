const items = [
  "baby food",
  "bacon",
  "bread",
  "butter",
  "cake",
  "ketchup",
  "cereal",
  "cheese",
  "cocoa",
  "cookies",
  "coffee",
  "cream",
  "delicatess",
  "eggs",
  "fish",
  "flour",
  "frozen food",
  "fruit",
  "jams",
  "juices",
  "matches",
  "meats",
  "milk",
  "mustard",
  "noodles",
  "oil",
  "onions",
  "pepper",
  "poultry",
  "potatoes",
  "rice",
  "salt",
  "soap",
  "soups",
  "spaghetti",
  "spices",
  "sugar",
  "tea",
  "vegetable",
  "vinegar",
];

describe("Frontend Test Spec", () => {
  it("all the required items should be in the checklist", () => {
    cy.visit("/");

    items.forEach((item) => {
      cy.contains(item, { matchCase: false });
    });
  });

  it("should be able to check and uncheck the items", () => {
    cy.visit("/");

    items.forEach((item) => {
      const element = cy.contains(item, { matchCase: false });
      element.click();
      const elementCheckbox = element.parent().get("input");
      elementCheckbox.should("be.checked");
      cy.contains(item, { matchCase: false }).click();
      elementCheckbox.should("not.be.checked");
    });
  });

  it("should preserve the checked state when the page is reloaded", () => {
    cy.visit("/");

    const item = items[0];
    cy.contains(item, { matchCase: false })
      .parent()
      .get("input")
      .should("not.be.checked");

    cy.contains(item, { matchCase: false }).click();

    cy.contains(item, { matchCase: false })
      .parent()
      .get("input")
      .should("be.checked");

    cy.reload();

    cy.contains(item, { matchCase: false })
      .parent()
      .get("input")
      .should("be.checked");
  });

  it("should reset all the items after all of them were checked (has a delay to allow animation)", () => {
    cy.visit("/");

    items.forEach((item) => {
      const element = cy.contains(item, { matchCase: false });
      element.click();
    });

    cy.wait(500);

    items.forEach((item) => {
      const element = cy.contains(item, { matchCase: false });
      const elementCheckbox = element.parent().get("input");
      elementCheckbox.should("not.be.checked");
    });
  });
});
