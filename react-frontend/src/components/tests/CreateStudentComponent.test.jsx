import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import CreateStudentComponent from '../CreateStudentComponent';
import StudentService from '../../services/StudentService';

jest.mock('../../services/StudentService', () => ({
    __esModule: true,
    default: {
        getStudentById: jest.fn(),
        createStudent: jest.fn(),
        updateStudent: jest.fn()
    }
}));

const fillForm = (nombre, apellido, email) => {
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: nombre } });
    fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: apellido } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: email } });
};

beforeEach(() => {
    jest.clearAllMocks();
});

// Comprueba el flujo de alta: completa el formulario, llama al servicio y redirige
it('crea un alumno nuevo y vuelve al listado', async () => {
    StudentService.createStudent.mockResolvedValue({});
    const history = { push: jest.fn() };

    render(<CreateStudentComponent history={history} match={{ params: { id: '_add' } }} />);

    fillForm('Ana', 'Diaz', 'ana@test.com');
    fireEvent.click(screen.getByText('Guardar cambios'));

    await wait(() => expect(StudentService.createStudent).toHaveBeenCalledWith({
        firstName: 'Ana',
        lastName: 'Diaz',
        emailId: 'ana@test.com'
    }));
    expect(history.push).toHaveBeenCalledWith('/alumnos');
});

// Comprueba el flujo de edicion: precarga datos, actualiza y navega de regreso
it('actualiza un alumno existente', async () => {
    StudentService.getStudentById.mockResolvedValue({
        data: { firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' }
    });
    StudentService.updateStudent.mockResolvedValue({});
    const history = { push: jest.fn() };

    render(<CreateStudentComponent history={history} match={{ params: { id: '10' } }} />);

    await wait(() => expect(screen.getByDisplayValue('Juan')).toBeInTheDocument());

    fillForm('Juan', 'Nuevo', 'juan@test.com');
    fireEvent.click(screen.getByText('Guardar cambios'));

    await wait(() => expect(StudentService.updateStudent).toHaveBeenCalledWith({
        firstName: 'Juan',
        lastName: 'Nuevo',
        emailId: 'juan@test.com'
    }, '10'));
    expect(history.push).toHaveBeenCalledWith('/alumnos');
});
