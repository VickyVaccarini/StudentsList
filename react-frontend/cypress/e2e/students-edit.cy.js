// Editar alumno con esperas extra y mocks que cambian despues de actualizar
const API_BASE = 'http://localhost:8080/api/v1/students';
const API_REGEX = /\/api\/v1\/students.*/;

describe('Editar alumno', () => {
  const listBase = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
    { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' },
  ];

  it('edita un alumno existente', () => {
    let actualizado = false;
    const alumnoEditado = { ...listBase[0], lastName: 'Actualizado', emailId: 'juan@nuevo.com' };
    const listEditada = [alumnoEditado, listBase[1]];

    // GET general cambia luego de actualizar
    cy.intercept('GET', API_REGEX, (req) => {
      req.reply(actualizado ? listEditada : listBase);
    }).as('getList');

    cy.intercept('GET', `${API_BASE}/1`, { body: listBase[0] }).as('getAlumno');
    cy.intercept('PUT', `${API_BASE}/1`, (req) => {
      actualizado = true;
      req.reply({ body: alumnoEditado });
    }).as('updateAlumno');

    cy.visit('http://localhost:3000/alumnos');
    cy.wait(3000);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(3000);

    cy.contains('Editar').click();
    cy.wait(3000);

    cy.wait('@getAlumno', { timeout: 20000 });
    cy.wait(3000);
    cy.get('input[name="lastName"]').clear().type('Actualizado');
    cy.wait(3000);
    cy.contains('Guardar cambios').click();
    cy.wait(3000);

    cy.wait('@updateAlumno', { timeout: 20000 });
    cy.wait(3000);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(3000);

    cy.contains('Actualizado');
    cy.contains('juan@nuevo.com');
  });
});
