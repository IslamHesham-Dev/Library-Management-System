describe("Employee Views Patron's Profile and Loan History", () => {
    it("Allows the employee to view a patron's profile and loan history", () => {
        // Step 1: Log in as the librarian
        cy.visit("/");
        cy.contains("Login").click();
        cy.get('input[placeholder="email"]').type("employee@library.com");
        cy.get('input[placeholder="password"]').type("password");
        cy.get("button").contains("Login").click();
        cy.contains("Employee's Account").should("be.visible"); // Confirm successful login

        // Step 2: Search for the book "Elon Musk"
        cy.get(".navbar-search-input")
            .should("be.visible")
            .click()
            .clear()
            .type("Elon Musk")
            .type("{enter}");

        // Step 3: Click on the book name "Elon Musk"
        cy.contains("Elon Musk", { timeout: 5000 }) // Wait for the book name to appear
            .should("be.visible")
            .scrollIntoView() // Ensure the element is in view
            .click(); // Click on the book name

        // Step 4: Click on the patron's card number in the loan history
        cy.contains("6766dbf3ca32da425a004901", { timeout: 5000 }) // Wait for the card number to appear
            .should("be.visible")
            .scrollIntoView() // Ensure the element is in view
            .click(); // Click on the card number


        // Step 4: Verify the loan history is displayed for the patron
        cy.contains("testing 's Item Loan History:", { timeout: 5000 }) // Wait for the text to appear
            .should("be.visible"); // Ensure the text is visible

        // Step 5: Log out of the librarian account
        cy.contains("Employee's Account").click();
        cy.contains("Logout of Account").click();
    });
});
