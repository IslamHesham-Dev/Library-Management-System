describe("Homepage", () => {
    it("should display the homepage with all key sections", () => {
        cy.visit("/");
        cy.contains("Upcoming Events").should("be.visible");
        cy.contains("Library Hours").should("be.visible");
        cy.contains("Get A Library Card").should("be.visible");
    });
});
