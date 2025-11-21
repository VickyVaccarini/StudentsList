// Crear alumno con esperas extra para estabilidad en pipelines lentos
const API_BASE = 'http://localhost:8080/api/v1/students';
const API_REGEX = /\/api\/v1\/students.*/;

describe('Crear alumno', () => {
  const listBase = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
    { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' },
  ];

  it('crea un alumno nuevo', () => {
    let creado = false;
    const nuevo = { id: 3, firstName: 'Perla', lastName: 'Herrera', emailId: 'perla@test.com' };
    const listConNuevo = [...listBase, nuevo];

    // Devuelve base al inicio y luego la lista con el nuevo registro
    cy.intercept('GET', API_REGEX, (req) => {
      req.reply(creado ? listConNuevo : listBase);
    }).as('getList');

    cy.intercept('POST', API_BASE, (req) => {
      creado = true;
      req.reply({ statusCode: 201, body: nuevo });
    }).as('crearAlumno');

    cy.visit('http://localhost:3000/alumnos');
    cy.wait(1500);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(1500);

    cy.contains('+ Agregar alumno').click();
    cy.wait(800);

    cy.get('input[name="firstName"]').type('Perla');
    cy.wait(600);
    cy.get('input[name="lastName"]').type('Herrera');
    cy.wait(600);
    cy.get('input[name="emailId"]').type('perla@test.com');
    cy.wait(600);

    cy.contains('Guardar cambios').click();
    cy.wait(1000);

    cy.wait('@crearAlumno', { timeout: 20000 });
    cy.wait(1200);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(1200);

    cy.contains('Perla');
    cy.contains('Herrera');
  });
});
