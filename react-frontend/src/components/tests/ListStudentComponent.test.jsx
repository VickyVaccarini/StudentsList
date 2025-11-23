import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ListStudentComponent from '../ListStudentComponent';
import StudentService from '../../services/StudentService';

jest.mock('../../services/StudentService', () => ({
    __esModule: true,
    default: {
        getStudents: jest.fn(),
        deleteStudent: jest.fn()
    }
}));

const renderWithRouter = () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <ListStudentComponent history={history} />
        </Router>
    );
    return history;
};

beforeEach(() => {
    jest.clearAllMocks();
});

// Comprueba que el componente pinta la tabla con los alumnos que entrega el servicio
it('muestra el listado retornado por StudentService', async () => {
    StudentService.getStudents.mockResolvedValue({
        data: [
            { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' },
            { id: 2, firstName: 'Maria', lastName: 'Lopez', emailId: 'maria@test.com' }
        ]
    });

    renderWithRouter();

    // Espera hasta que se rendericen los datos mockeados
    await wait(() => expect(screen.getByText('Juan')).toBeInTheDocument());
    expect(screen.getByText('Perez')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
});

// Comprueba que al eliminar un alumno se llama al servicio y se remueve de la tabla
it('elimina un alumno y actualiza el DOM', async () => {
    StudentService.getStudents.mockResolvedValue({
        data: [
            { id: 1, firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' }
        ]
    });
    StudentService.deleteStudent.mockResolvedValue({});

    renderWithRouter();
    await wait(() => screen.getByText('Juan'));

    fireEvent.click(screen.getByText('Eliminar'));

    await wait(() => expect(StudentService.deleteStudent).toHaveBeenCalledWith(1));
    await wait(() => expect(screen.queryByText('Juan')).not.toBeInTheDocument());
});

// Falla intencional para demostrar corte de pipeline en frontend
/*
it('falla intencionalmente para cortar pipeline', () => {
    expect(true).toBe(false);
});*/
