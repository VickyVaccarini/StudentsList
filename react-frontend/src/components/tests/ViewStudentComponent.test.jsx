import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ViewStudentComponent from '../ViewStudentComponent';
import StudentService from '../../services/StudentService';

jest.mock('../../services/StudentService', () => ({
    __esModule: true,
    default: {
        getStudentById: jest.fn()
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

// Verifica que se lean los datos del servicio y se muestren en pantalla
it('muestra los datos del alumno obtenido por id', async () => {
    StudentService.getStudentById.mockResolvedValue({
        data: { firstName: 'Laura', lastName: 'Gomez', emailId: 'laura@test.com' }
    });
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <ViewStudentComponent history={history} match={{ params: { id: '4' } }} />
        </Router>
    );

    await wait(() => expect(screen.getByText('Laura')).toBeInTheDocument());
    expect(screen.getByText('Gomez')).toBeInTheDocument();
    expect(screen.getByText('laura@test.com')).toBeInTheDocument();
});

// Verifica que el botón de volver navegue al listado
it('permite volver al listado mediante el botón', async () => {
    StudentService.getStudentById.mockResolvedValue({
        data: { firstName: 'Pablo', lastName: 'Suarez', emailId: 'pablo@test.com' }
    });
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
        <Router history={history}>
            <ViewStudentComponent history={history} match={{ params: { id: '7' } }} />
        </Router>
    );

    await wait(() => expect(screen.getByText('Pablo')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Volver al listado'));

    expect(history.push).toHaveBeenCalledWith('/alumnos');
});
