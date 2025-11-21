import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import UpdateStudentComponent from '../UpdateStudentComponent';
import StudentService from '../../services/StudentService';

jest.mock('../../services/StudentService', () => ({
    __esModule: true,
    default: {
        getStudentById: jest.fn(),
        updateStudent: jest.fn()
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

// Verifica que al cargar precargue los datos y al enviar llame al servicio y navegue
it('actualiza un alumno y vuelve al listado', async () => {
    StudentService.getStudentById.mockResolvedValue({
        data: { firstName: 'Juan', lastName: 'Perez', emailId: 'juan@test.com' }
    });
    StudentService.updateStudent.mockResolvedValue({});
    const history = { push: jest.fn() };

    render(<UpdateStudentComponent history={history} match={{ params: { id: '9' } }} />);

    await wait(() => expect(screen.getByDisplayValue('Juan')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: 'Nuevo' } });
    fireEvent.click(screen.getByText('Guardar cambios'));

    await wait(() => expect(StudentService.updateStudent).toHaveBeenCalledWith({
        firstName: 'Juan',
        lastName: 'Nuevo',
        emailId: 'juan@test.com'
    }, '9'));
    expect(history.push).toHaveBeenCalledWith('/alumnos');
});

// Verifica que el botón cancelar regrese al listado
it('permite cancelar la edición', async () => {
    StudentService.getStudentById.mockResolvedValue({
        data: { firstName: 'Ana', lastName: 'Diaz', emailId: 'ana@test.com' }
    });
    const history = { push: jest.fn() };

    render(<UpdateStudentComponent history={history} match={{ params: { id: '3' } }} />);

    await wait(() => expect(screen.getByDisplayValue('Ana')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Cancelar'));

    expect(history.push).toHaveBeenCalledWith('/alumnos');
});
