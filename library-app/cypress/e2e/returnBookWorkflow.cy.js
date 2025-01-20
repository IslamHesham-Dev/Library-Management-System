describe("Return Book Workflow", () => {
    it("Allows the employee to return a borrowed book", () => {
        // Step 1: Log in as the librarian
        cy.visit("/");
        cy.contains("Login").click();
        cy.get('input[placeholder="email"]').type("employee@library.com");
        cy.get('input[placeholder="password"]').type("password");
        cy.get("button").contains("Login").click();
        cy.contains("Employee's Account").should("be.visible"); // Confirm successful login

        // Step 2: Search for "Elon Musk"
        cy.get(".navbar-search-input")
            .click() // Focus the input
            .clear() // Clear any existing text
            .type("Elon Musk") // Type the book title
            .type("{enter}"); // Trigger the search
        cy.wait(2000); // Ensure results have loaded

        // Step 3: Click "Status: UNAVAILABLE" button
        cy.contains("Status: UNAVAILABLE", { timeout: 5000 })
            .should("be.visible")
            .scrollIntoView() // Ensure it's visible on the screen
            .click({ force: true }); // Click the button directly

        // Step 4: Click the "Check In Book" button
        cy.get('button') // Locate all buttons on the page
            .contains("Check In Book") // Match the button by its exact text
            .scrollIntoView() // Ensure the button is visible
            .click({ force: true }); // Perform the click even if obstructed

        // Verify that the book status is updated back to "AVAILABLE"
        cy.contains("Status: AVAILABLE", { timeout: 5000 })
            .should("be.visible")
            .scrollIntoView(); // Ensure the status is updated

        // Step 5: Log out of the librarian account
        cy.contains("Employee's Account").click(); // Open the account menu
        cy.contains("Logout of Account").click(); // Log out

        // Step 6: Log in as the patron
        cy.contains("Login").click();
        cy.get('input[placeholder="email"]').type("testing12345@gmail.com");
        cy.get('input[placeholder="password"]').type("gmail12345");
        cy.get("button").contains("Login").click();
        cy.contains("testing").should("be.visible"); // Confirm the patron is logged in

        // Step 7: Visit the patron's profile and verify the book status
        cy.contains("testing").click(); // Go to the patron's profile
        cy.contains("Elon Musk").should("be.visible"); // Verify the book is listed
        cy.contains("Status: RETURNED").should("be.visible"); // Confirm the status is "RETURNED"
    });
});
