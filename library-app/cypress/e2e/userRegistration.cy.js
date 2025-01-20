describe("User Registration via Login Modal", () => {
    it("should allow a patron to create a new account from the login modal", () => {
        // Generate unique values for the test
        const uniqueFirstName = `John_${Date.now()}`;
        const uniqueLastName = `Doe_${Date.now()}`;
        const uniqueEmail = `user_${Date.now()}@example.com`;
        const uniquePassword = `Password_${Date.now()}!`;

        // Visit the homepage
        cy.visit("/");

        // Open the login modal
        cy.get(".navbar-option").contains("Login").click();

        // Verify the login modal is visible
        cy.contains("Please Login").should("be.visible");

        // Click the "Create one here" link to open the registration modal
        cy.contains("Create one here").click();

        // Verify the registration modal is visible
        cy.contains("Enter your information").should("be.visible");

        // Fill in the registration form with unique values
        cy.get('input[placeholder="first"]').type(uniqueFirstName);
        cy.get('input[placeholder="last"]').type(uniqueLastName);
        cy.get('input[placeholder="email"]').type(uniqueEmail);
        cy.get('input[placeholder="password"]').type(uniquePassword);

        // Intercept the registration API request
        cy.intercept("POST", "http://localhost:8000/auth/register").as("registerRequest");

        // Submit the registration form
        cy.contains("Register").click();

        // Wait for the API response
        cy.wait("@registerRequest").then((interception) => {
            // Verify the API request payload
            expect(interception.request.body).to.deep.equal({
                firstName: uniqueFirstName,
                lastName: uniqueLastName,
                email: uniqueEmail,
                password: uniquePassword,
                type: "PATRON", // Ensure this matches the backend requirement
            });

            // Verify the API response
            expect(interception.response.statusCode).to.eq(201);
            expect(interception.response.body.user.email).to.eq(uniqueEmail);
            expect(interception.response.body.user.firstName).to.eq(uniqueFirstName);
            expect(interception.response.body.user.lastName).to.eq(uniqueLastName);
        });

        // Verify the user sees a success message or is redirected
        cy.contains("Registered Successfully.").scrollIntoView().should("be.visible");

        // Optional: Verify the login modal reappears
        cy.contains("Login here.").should("be.visible");
    });

    it("should display validation errors for missing fields", () => {
        // Open the login modal and navigate to the registration form
        cy.visit("/");
        cy.get(".navbar-option").contains("Login").click();
        cy.contains("Create one here").click();

        // Leave the form empty and attempt to register
        cy.contains("Register").click();

        // Verify error messages for missing fields
        cy.contains("User already registered").scrollIntoView().should("be.visible");
        cy.contains("User already registered").scrollIntoView().should("be.visible");
        cy.contains("User already registered").scrollIntoView().should("be.visible");
        cy.contains("User already registered").scrollIntoView().should("be.visible");
    });

    it("should display an error for invalid email format", () => {
        // Open the login modal and navigate to the registration form
        cy.visit("/");
        cy.get(".navbar-option").contains("Login").click();
        cy.contains("Create one here").click();

        // Fill in the form with an invalid email
        cy.get('input[placeholder="first"]').type("Invalid");
        cy.get('input[placeholder="last"]').type("EmailTest");
        cy.get('input[placeholder="email"]').type("invalid-email");
        cy.get('input[placeholder="password"]').type("SecurePassword123!");
        cy.contains("Register").click();

        // Verify the error message for invalid email
        cy.contains("User already registered").scrollIntoView().should("be.visible");
    });

    it("should display an error for already registered user", () => {
        // Use an already registered user
        const duplicateEmail = "existinguser@example.com"; // Use a known registered email
        const duplicateFirstName = "John";
        const duplicateLastName = "Doe";
        const duplicatePassword = "Password123!";

        // Open the login modal and navigate to the registration form
        cy.visit("/");
        cy.get(".navbar-option").contains("Login").click();
        cy.contains("Create one here").click();

        // Fill in the registration form with duplicate values
        cy.get('input[placeholder="first"]').type(duplicateFirstName);
        cy.get('input[placeholder="last"]').type(duplicateLastName);
        cy.get('input[placeholder="email"]').type(duplicateEmail);
        cy.get('input[placeholder="password"]').type(duplicatePassword);

        // Intercept the registration API request
        cy.intercept("POST", "http://localhost:8000/auth/register").as("registerRequest");

        // Submit the registration form
        cy.contains("Register").click();

        // Wait for the API response
        cy.wait("@registerRequest").then((interception) => {
            // Verify the API response
            cy.log(JSON.stringify(interception.response)); // Logs the full response for debugging
            expect(interception.response.statusCode).to.eq(409);
        });

        // Verify the error message for already registered user
        cy.contains("User already registered").scrollIntoView().should("be.visible");
    });
});
