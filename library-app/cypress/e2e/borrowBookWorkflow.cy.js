describe("Patron Borrow Book Workflow", () => {
    const email = "testing12345@gmail.com";
    const password = "gmail12345";
    const generatedLibraryCard = "6766dc34ca32da425a004904"; // Hardcoded card number

    it("Allows a patron to borrow a book", () => {
        // Step 1: Login as the patron
        cy.visit("/");
        cy.contains("Login").click();
        cy.get('input[placeholder="email"]').type(email);
        cy.get('input[placeholder="password"]').type(password);
        cy.get("button").contains("Login").click(); // Explicitly target and click the correct Login button

        // Step 2: Generate a library card (for visual validation only)
        cy.contains("Learn how to get your own library card here.")
            .within(() => cy.contains("here").click());
        cy.contains("Get Library Card").click();
        cy.contains("Your library card number:")
            .should("be.visible")
            .then((cardText) => {
                const cardNumber = cardText.text().split(":")[1].trim();
                expect(cardNumber).to.equal(generatedLibraryCard); // Ensure the card number matches the hardcoded value
            });

        // Step 3: Navigate to View Catalog
        cy.visit("/catalog");
        cy.contains("View Catalog").should("be.visible"); // Confirm the catalog is loaded

        // Step 4: Log out of the patron account
        cy.contains("testing").click(); // Open the user menu
        cy.contains("Logout of Account").click(); // Perform logout

        // Step 5: Login as the librarian
        cy.contains("Login").click(); // Ensure the Login button on the top right is clicked
        cy.get('input[placeholder="email"]').type("employee@library.com");
        cy.get('input[placeholder="password"]').type("password");
        cy.get("button").contains("Login").click();
        cy.contains("Employee's Account").should("be.visible"); // Confirm successful login

        // Step 6: Search for "Elon Musk"
        cy.get(".navbar-search-input")
            .click()
            .clear()
            .type("Elon Musk")
            .type("{enter}");
        cy.wait(2000); // Add a small wait to ensure the results load

        // Step 7: Loan the book
        cy.contains("Status: AVAILABLE", { timeout: 5000 }) // Add timeout for loading
            .should("be.visible")
            .scrollIntoView() // Ensure the element is in view
            .then((statusElement) => {
                // Locate the button below "Status: AVAILABLE"
                cy.wrap(statusElement)
                    .parent() // Go to the parent container
                    .find("button") // Find the button within the container
                    .should("be.visible") // Ensure the button is visible
                    .click(); // Click the button
            });

        cy.get('input[placeholder="Library Card ID"]') // Match the correct input

            .click() // Focus the input
            .type(generatedLibraryCard); // Type the stored library card number

        cy.get("button") // Locate the "Loan Book" button explicitly
            .contains("Loan Book")
            .should("be.visible")
            .click(); // Click the "Loan Book" button


        // Step 8: Verify the book loaned under patron account
        cy.contains("Employee's Account").click();
        cy.contains("Logout of Account").click();
        cy.contains("Login").click();
        cy.get('input[placeholder="email"]').type(email);
        cy.get('input[placeholder="password"]').type(password);
        cy.get("button").contains("Login").click(); // Explicitly target and click the correct Login button
        cy.contains("testing").click();
        cy.contains("Elon Musk").should("be.visible");
        cy.contains("Status: LOANED").should("be.visible");
    });
});
