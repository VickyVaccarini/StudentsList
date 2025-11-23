import axios from 'axios';

// Lee la variable REACT_APP_API_BASE del entorno (inyectada por Azure DevOps)
//const BASE = process.env.REACT_APP_API_BASE;
// Fallback a localhost para ejecutar tests/local sin definir env.
const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api/v1/students';

class StudentService {
    getStudents() {
        return axios.get(BASE);
    }

    createStudent(student) {
        return axios.post(BASE, student);
    }

    getStudentById(studentId) {
        return axios.get(`${BASE}/${studentId}`);
    }

    updateStudent(student, studentId) {
        return axios.put(`${BASE}/${studentId}`, student);
    }

    deleteStudent(studentId) {
        return axios.delete(`${BASE}/${studentId}`);
    }
}

export default new StudentService();
