// Eliminar alumno con esperas extra para entornos lentos
const API_BASE = Cypress.env('apiBase') || 'http://localhost:8080/api/v1/students';
const FRONT_BASE = Cypress.env('frontBase') || 'http://localhost:3000';
const API_REGEX = new RegExp(`${API_BASE.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}.*`);

describe('Eliminar alumno', () => {
  const listBase = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
    { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' },
  ];

  it('elimina un alumno del listado', () => {
    cy.intercept('GET', API_REGEX, { body: listBase }).as('getList');
    cy.intercept('DELETE', `${API_BASE}/1`, { statusCode: 200, body: { deleted: true } }).as('deleteAlumno');

    cy.visit(`${FRONT_BASE}/alumnos`);
    cy.wait(3000);
    cy.wait('@getList');
    cy.wait(3000);

    cy.contains('Juan').parents('tr').within(() => {
      cy.contains('Eliminar').click();
    });
    cy.wait(3000);

    cy.wait('@deleteAlumno');
    cy.wait(3000);

    cy.contains('Juan').should('not.exist');
  });
});
