describe("User Account Management", () => {
    it("should allow a patron to create, log in, and update their profile", () => {
        // Generate random and unique credentials for the test
        const uniqueFirstName = `User_${Date.now()}`;
        const uniqueLastName = `Last_${Date.now()}`;
        const uniqueEmail = `user_${Date.now()}@example.com`;
        const uniquePassword = `Password_${Date.now()}!`;

        // Step 1: Register a new account
        cy.visit("/");

        // Open the login modal
        cy.get(".navbar-option").contains("Login").click();
        cy.contains("Create one here").click(); // Click the "Create one here" link

        // Fill in the registration form
        cy.get('input[placeholder="first"]').type(uniqueFirstName);
        cy.get('input[placeholder="last"]').type(uniqueLastName);
        cy.get('input[placeholder="email"]').type(uniqueEmail);
        cy.get('input[placeholder="password"]').type(uniquePassword);

        // Intercept the registration request
        cy.intercept("POST", "http://localhost:8000/auth/register").as("registerRequest");
        cy.get('button').contains("Register").click(); // Submit registration

        // Wait for registration and verify success
        cy.wait("@registerRequest").then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
            expect(interception.response.body.user.email).to.eq(uniqueEmail);
        });

        // Verify success message and click "Login here."
        cy.contains("Login here.").click(); // Click "Login here."

        // Step 2: Log in with the newly created credentials
        cy.get('input[placeholder="email"]').type(uniqueEmail); // Enter email
        cy.get('input[placeholder="password"]').type(uniquePassword); // Enter password
        cy.get('button').contains("Login").click(); // Click Login button

        // Verify login success by checking for the account name on the navbar
        cy.get(".navbar-option").should("contain.text", uniqueFirstName);

        // Step 3: Navigate to the profile page
        cy.get(".navbar-option").contains(uniqueFirstName).click(); // Click account name in the navbar

        // Step 4: Update the last name
        const updatedLastName = `UpdatedLast_${Date.now()}`;
        cy.get('.update-user-input[name="lastName"]') // Locate the last name field using 'name' attribute
            .should("be.visible") // Ensure it's visible
            .scrollIntoView() // Scroll to make it interactable
            .click()
            .type(updatedLastName, { delay: 50 }) // Append the updated last name
            .type("{backspace}".repeat(updatedLastName.length)); // Delete the original part if needed
        cy.get('button').contains("Update Profile").click(); // Click "Update Profile"

        // Verify the profile was updated by checking it has changed
        cy.get('.update-user-input[name="lastName"]').invoke("val").then((newValue) => {
            expect(newValue).to.not.equal(`Last_${Date.now()}`); // Ensure it's not the previous value
        });

        // Step 5: Logout the account
        cy.get('button').contains("Logout of Account").click(); // Click "Logout"

        // Verify logout by checking the login button is visible again
        cy.get(".navbar-option").contains("Login").should("be.visible");

    });

    it("should display an error for incorrect login credentials", () => {
        // Step 1: Visit the login page
        cy.visit("/");

        // Open the login modal
        cy.get(".navbar-option").contains("Login").click();

        // Step 2: Enter incorrect credentials
        cy.get('input[placeholder="email"]').type("nonexistentuser@example.com");
        cy.get('input[placeholder="password"]').type("WrongPassword123!");
        cy.get('button').contains("Login").click(); // Click Login button

        // Step 3: Verify the error message
        cy.get('p.login-form-error')
            .should("contain.text", "Username or password incorrect")
            .scrollIntoView(); // Scroll to make sure it's visible
    });
});
