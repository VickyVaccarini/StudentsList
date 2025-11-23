// Eliminar alumno con esperas extra para entornos lentos
const API_URL = 'http://localhost:8080/api/v1/students';

describe('Eliminar alumno', () => {
  const listBase = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
    { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' },
  ];

  it('elimina un alumno del listado', () => {
    cy.intercept('GET', API_URL, { body: listBase }).as('getList');
    cy.intercept('DELETE', `${API_URL}/1`, { statusCode: 200, body: { deleted: true } }).as('deleteAlumno');

    cy.visit('http://localhost:3000/alumnos');
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
