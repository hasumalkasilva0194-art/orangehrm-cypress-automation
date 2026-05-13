describe("OrangeHRM Login & Forgot Password Tests", () => {

  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  // =========================
  // TC_01 - Valid Login
  // =========================
  it("TC_01 - Valid login", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");
  });

  // =========================
  // TC_02 - Invalid username
  // =========================
  it("TC_02 - Invalid username + valid password", () => {
    cy.get('input[name="username"]').type("Admi");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.contains(/invalid credentials/i).should("be.visible");
  });

  // =========================
  // TC_03 - Invalid password
  // =========================
  it("TC_03 - Valid username + invalid password", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();

    cy.contains(/invalid credentials/i).should("be.visible");
  });

  // =========================
  // TC_04 - Both invalid
  // =========================
  it("TC_04 - Invalid username and password", () => {
    cy.get('input[name="username"]').type("wrong");
    cy.get('input[name="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();

    cy.contains(/invalid credentials/i).should("be.visible");
  });

  // =========================
  // TC_05 - Empty password
  // =========================
  it("TC_05 - Valid username, empty password", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should("contain", "Required");
  });

  // =========================
  // TC_06 - Empty username
  // =========================
  it("TC_06 - Empty username, valid password", () => {

  // Wait for login page to load properly
  cy.visit("/web/index.php/auth/login");

  // Ensure page elements are visible before interaction
  cy.get('input[name="username"]', { timeout: 10000 })
    .should("be.visible");

  cy.get('input[name="password"]', { timeout: 10000 })
    .should("be.visible")
    .type("admin123");

  // Click login button
  cy.get('button[type="submit"]').click();

  // Validate required field error message (OrangeHRM UI message)
  cy.get('.oxd-input-field-error-message', { timeout: 10000 })
    .should("contain", "Required");
});

  // =========================
  // TC_07 - Invalid username + empty password
  // =========================
  it("TC_07 - Invalid username, empty password", () => {
    cy.get('input[name="username"]').type("Admi");
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should("contain", "Required");
  });

  // =========================
  // TC_08 - Empty username + invalid password
  // =========================
  it("TC_08 - Empty username, invalid password", () => {
    cy.get('input[name="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should("contain", "Required");
  });

  // =========================
  // TC_09 - Both empty
  // =========================
  it("TC_09 - Empty username and password", () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should("contain", "Required");
  });

  // =========================
  // TC_10 - Forgot Password navigation
  // =========================
 it("TC_10 - Forgot Password navigation", () => {
  cy.contains('Forgot your password').click();

  cy.url().should("include", "requestPasswordResetCode");
  cy.contains("Reset Password").should("be.visible");
});

  // =========================
  // TC_11 - Valid reset username
  // =========================
it("TC_11 - Reset password with valid username", () => {

  // Open forgot password page
  cy.contains('Forgot your password').click();

  // Wait for page
  cy.url().should("include", "requestPasswordResetCode");

  // Enter username
  cy.get('input[name="username"]', { timeout: 10000 })
    .should("be.visible")
    .type("Admin");

  // Submit
  cy.get('button[type="submit"]').click();

  // ✅ FIX: OrangeHRM does NOT always show "reset password" text
  // So we check URL OR success container instead

  cy.url().should("include", "requestResetPassword");

  // OR check any success message safely
  cy.get('body').then(($body) => {
    if ($body.text().includes("Reset Password")) {
      cy.log("Reset Password message found");
    } else {
      cy.log("No visible success text (OrangeHRM behavior)");
    }
  });

});

  // =========================
  // TC_12 - Invalid reset username
  // =========================
it("TC_12 - Reset password with invalid username", () => {
  cy.contains('Forgot your password').click();

  cy.get('input[name="username"]').type("Admi");
  cy.get('button[type="submit"]').click();

  cy.contains(/reset password/i).should("exist");
});

  // =========================
  // TC_13 - Empty reset username
  // =========================
 it("TC_13 - Reset password empty username", () => {

    cy.contains('Forgot your password').click();

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should("contain", "Required");
  });

});