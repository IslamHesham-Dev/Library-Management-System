describe("Catalog Search", () => {
    it("should allow the user to search the catalog and display relevant results", () => {
        // Visit the catalog page
        cy.visit("/catalog");

        // Verify the search input is visible
        cy.get(".navbar-search-input").should("be.visible");

        // Intercept the actual search API request
        cy.intercept("GET", "/book/query?*").as("searchResults"); // Adjusted to match the actual request

        // Perform a search with a specific term (e.g., "Biography")
        const searchTerm = "Biography";
        cy.get(".navbar-search-input").type(searchTerm);
        cy.get(".navbar-search-input").type("{enter}"); // Simulate pressing Enter

        // Wait for the intercepted network request
        cy.wait("@searchResults").then((interception) => {
            // Verify the search term is included in the backend request
            expect(interception.request.url).to.include(searchTerm);
        });

        // Verify that search results are displayed
        cy.get(".book-card").should("have.length.greaterThan", 0);

        // Log all book titles for debugging purposes
        cy.get(".book-card-title").each((title) => {
            cy.log(`Found Book Title: ${title.text()}`);
        });

        // Optional: Check for specific content in descriptions or genres, if needed
        cy.get(".book-card-description").each((description) => {
            cy.wrap(description).should("not.be.empty");
        });

        // Test case for no results
        const noResultTerm = "NonExistentBook";
        cy.get(".navbar-search-input").clear().type(noResultTerm);
        cy.get(".navbar-search-input").type("{enter}");

        cy.wait("@searchResults");

        // Verify the "Displaying 0 books out of 0" message is visible
        cy.contains("Displaying 0 books out of 0", { timeout: 10000 }).should("be.visible");
    });
});
