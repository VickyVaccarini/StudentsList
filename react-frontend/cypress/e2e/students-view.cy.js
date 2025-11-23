// Ver detalle de alumno con esperas para entornos lentos
const API_BASE = Cypress.env('apiBase') || 'http://localhost:8080/api/v1/students';
const FRONT_BASE = Cypress.env('frontBase') || 'http://localhost:3000';
const API_REGEX = new RegExp(`${API_BASE.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}.*`);

describe('Ver alumno', () => {
  const listBase = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
    { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' },
  ];

  it('muestra ficha y permite volver al listado', () => {
    cy.intercept('GET', API_REGEX, { body: listBase }).as('getList');
    cy.intercept('GET', `${API_BASE}/1`, { body: listBase[0] }).as('getAlumno');

    cy.visit(`${FRONT_BASE}/alumnos`);
    cy.wait(3000);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(3000);

    cy.contains('Ver').first().click();
    cy.wait(3000);
    cy.wait('@getAlumno', { timeout: 20000 });
    cy.wait(3000);

    cy.contains('Detalle del alumno');
    cy.contains('Juan');
    cy.contains('Perez');
    cy.contains('juan@test.com');

    cy.contains('Volver al listado').click();
    cy.wait(3000);
    cy.url().should('include', '/alumnos');
  });
});
