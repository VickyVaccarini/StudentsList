import axios from 'axios';
import StudentService from '../StudentService';

jest.mock('axios');

const BASE_URL = 'http://localhost:8080/api/v1/students';

// Verifica que obtener alumnos llama al endpoint correcto y devuelve los datos
it('deberia obtener alumnos desde el backend', async () => {
    const alumnos = [{ id: 1, firstName: 'Juan' }];
    axios.get.mockResolvedValue({ data: alumnos });

    const respuesta = await StudentService.getStudents();

    expect(axios.get).toHaveBeenCalledWith(BASE_URL);
    expect(respuesta.data).toEqual(alumnos);
});

// Verifica que crear un alumno envia el body y usa POST
it('deberia crear un alumno', async () => {
    const alumno = { firstName: 'Ana', lastName: 'Diaz', emailId: 'ana@test.com' };
    axios.post.mockResolvedValue({ data: { ...alumno, id: 10 } });

    const respuesta = await StudentService.createStudent(alumno);

    expect(axios.post).toHaveBeenCalledWith(BASE_URL, alumno);
    expect(respuesta.data.id).toBe(10);
});

// Verifica que actualizar y borrar usen los endpoints parametrizados
it('deberia actualizar y borrar por id', async () => {
    axios.put.mockResolvedValue({});
    axios.delete.mockResolvedValue({});

    await StudentService.updateStudent({ firstName: 'Nuevo' }, 5);
    await StudentService.deleteStudent(5);

    expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/5`, { firstName: 'Nuevo' });
    expect(axios.delete).toHaveBeenCalledWith(`${BASE_URL}/5`);
});
