describe('Recherche météo', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/forecast*', { fixture: 'forecast.json' }).as('getForecast')
    cy.visit('/')
  })

  it('cherche une ville et affiche les prévisions', () => {
    cy.get('[data-cy=search-input]').type('Brest')
    cy.get('[data-cy=search-submit]').click()

    cy.wait('@getForecast')
    cy.get('[data-cy=search-error]').should('not.exist')
    cy.contains('Prévisions 3h par 3h :').should('exist')
    cy.get('ul.encartTemp li').should('have.length.greaterThan', 0)
  })

  it('désactive le bouton de soumission quand le champ est vide', () => {
    cy.get('[data-cy=search-input]').clear()
    cy.get('[data-cy=search-submit]').should('be.disabled')
  })
})
