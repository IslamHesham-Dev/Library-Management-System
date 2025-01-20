describe("Catalog Overview", () => {
    it("should verify that books with titles, authors, and descriptions are displayed", () => {
        // Visit the catalog page
        cy.visit("/catalog");

        // Verify the welcome message
        cy.contains("Welcome to our library").should("be.visible");

        // Dynamically check for book titles, authors, and descriptions
        cy.get(".book-card-info").then((bookCards) => {
            // Ensure at least one book card is present
            expect(bookCards.length).to.be.greaterThan(0);

            // Iterate through each book card and validate its content
            bookCards.each((index, card) => {
                // Check the title
                const title = card.querySelector(".book-card-title");
                expect(title).to.exist;
                expect(title.innerText).to.not.be.empty;

                // Check the author
                const author = card.querySelector(".book-card-author");
                expect(author).to.exist;
                expect(author.innerText).to.not.be.empty;

                // Check the description
                const description = card.querySelector(".book-card-description");
                expect(description).to.exist;
                // Descriptions can sometimes be empty, so this is optional
                if (description.innerText.trim() === "") {
                    cy.log(`Book card ${index + 1} has no description.`);
                }
            });
        });
    });
});
