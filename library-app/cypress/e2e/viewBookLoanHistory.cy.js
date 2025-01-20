describe("Employee Views Book Loan History", () => {
    it("Allows the employee to view the loan history of a book", () => {
        // Step 1: Log in as the librarian
        cy.visit("/");
        cy.contains("Login").click();
        cy.get('input[placeholder="email"]').type("employee@library.com");
        cy.get('input[placeholder="password"]').type("password");
        cy.get("button").contains("Login").click();
        cy.contains("Employee's Account").should("be.visible"); // Confirm successful login

        // Step 2: Search for "Elon Musk"
        cy.get(".navbar-search-input")
            .click()
            .clear()
            .type("Elon Musk")
            .type("{enter}");
        cy.wait(2000); // Ensure results have loaded

        // Step 3: Click on the book title to view details
        cy.contains("Elon Musk").should("be.visible").click();

        // Step 4: View Loan History
        cy.contains("Loan History", { timeout: 5000 }) // Ensure "Loan History" is visible
            .should("be.visible")
            .scrollIntoView(); // Scroll to ensure visibility

        // Verify Loan History is displayed
        cy.contains("Loan History", { timeout: 5000 }) // Wait for the text to appear
            .scrollIntoView() // Ensure the element is in view
            .should("be.visible"); // Verify the text is visible


        // Step 5: Log out of the librarian account
        cy.contains("Employee's Account").click();
        cy.contains("Logout of Account").click();
    });
});
