// Validaciones del formulario de alta con esperas largas
const API_BASE = 'http://localhost:8080/api/v1/students';
const API_REGEX = /\/api\/v1\/students.*/;

describe('Validaciones de formulario', () => {
  const listBase = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
    { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' },
  ];

  it('no permite enviar sin completar campos requeridos', () => {
    cy.intercept('GET', API_REGEX, { body: listBase }).as('getList');
    const postSpy = cy.spy().as('postSpy');
    cy.intercept('POST', API_BASE, (req) => {
      postSpy(req);
      req.reply({ statusCode: 201, body: {} });
    }).as('crearAlumno');

    cy.visit('http://localhost:3000/alumnos');
    cy.wait(1200);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(1200);

    cy.contains('+ Agregar alumno').click();
    cy.wait(800);

    cy.contains('Guardar cambios').click();
    cy.wait(1000);

    cy.url().should('include', '/guardar-alumno/_add');
    cy.get('@postSpy').its('callCount').should('eq', 0);
  });

  it('no permite enviar email invalido', () => {
    cy.intercept('GET', API_REGEX, { body: listBase }).as('getList');
    const postSpy = cy.spy().as('postSpyInvalid');
    cy.intercept('POST', API_BASE, (req) => {
      postSpy(req);
      req.reply({ statusCode: 201, body: {} });
    }).as('crearAlumnoInvalid');

    cy.visit('http://localhost:3000/alumnos');
    cy.wait(1200);
    cy.wait('@getList', { timeout: 20000 });
    cy.wait(1200);

    cy.contains('+ Agregar alumno').click();
    cy.wait(800);

    cy.get('input[name=\"firstName\"]').type('SinMail');
    cy.wait(400);
    cy.get('input[name=\"lastName\"]').type('Prueba');
    cy.wait(400);
    cy.get('input[name=\"emailId\"]').type('correo-invalido');
    cy.wait(400);

    cy.get('body').click(10, 10);
    cy.wait(300);

    cy.contains('Guardar cambios').click();
    cy.wait(1000);


    cy.url().should('include', '/guardar-alumno/_add');
    cy.get('@postSpyInvalid').its('callCount').should('eq', 0);
  });
});
