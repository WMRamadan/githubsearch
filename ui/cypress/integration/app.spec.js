describe('Navigation', () => {
    it('should navigate to the users page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find a link with an href attribute containing "users" and click it
      cy.get('a[href*="users"]').click()
  
      // The new url should include "/users"
      cy.url().should('include', '/users')
  
      // The new page should contain an h1 with "Welcome to Users Search!"
      cy.contains('h1#title', 'Welcome to Users Search!')
    })
  })