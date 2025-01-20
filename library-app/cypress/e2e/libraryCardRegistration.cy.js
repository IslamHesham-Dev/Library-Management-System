describe("Library Card Registration Workflow", () => {
    it("should allow a patron to register for a library card following the specified flow", () => {
        // Step 1: Visit the homepage
        cy.visit("/");

        // Step 2: Click on the "here" link in the sentence about learning how to get a library card
        cy.contains("Learn how to get your own library card here.")
            .find("span") // Assuming "here" is wrapped in a span or similar
            .click();

        // Step 3: Click on the "Login" button below the password field
        cy.get('button').contains("Login").click();

        // Step 4: Navigate to the registration form by clicking "Create one here"
        cy.contains("Create one here").click();

        // Step 5: Fill out the registration form with random data
        const uniqueFirstName = `Patron_${Cypress._.random(1000, 9999)}`;
        const uniqueLastName = `User_${Cypress._.random(1000, 9999)}`;
        const uniqueEmail = `patron_${Cypress._.random(100000, 999999)}@example.com`;
        const uniquePassword = `SecurePassword_${Cypress._.random(1000, 9999)}!`;

        cy.get('input[placeholder="first"]').type(uniqueFirstName);
        cy.get('input[placeholder="last"]').type(uniqueLastName);
        cy.get('input[placeholder="email"]').type(uniqueEmail);
        cy.get('input[placeholder="password"]').type(uniquePassword);

        // Submit the registration form
        cy.contains("Register").click();

        // Step 6: Verify registration success and proceed to login
        cy.contains("Login here.").click();

        // Step 7: Log in with the newly created credentials
        cy.get('input[placeholder="email"]').type(uniqueEmail);
        cy.get('input[placeholder="password"]').type(uniquePassword);
        cy.get('button').contains("Login").click(); // Click the correct "Login" button below the password field

        // Verify successful login by checking for the patron's name in the UI
        cy.get(".navbar-option").should("contain.text", uniqueFirstName);

        // Step 8: Return to the homepage and click "here" again
        cy.visit("/");
        cy.contains("Learn how to get your own library card here.")
            .find("span")
            .click();

        // Step 9: Click the "Get Library Card" button
        cy.contains("Get Library Card").click();

        // Step 10: Verify the library card generation by checking the sentence
        cy.contains("Your library card number:").should("be.visible");
    });
});
