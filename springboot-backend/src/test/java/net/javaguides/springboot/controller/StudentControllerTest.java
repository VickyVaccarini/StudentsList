package net.javaguides.springboot.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.javaguides.springboot.model.Student;
import net.javaguides.springboot.repository.StudentRepository;

@WebMvcTest(StudentController.class)
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private StudentRepository studentRepository;

    // Verifica que el endpoint de listado devuelva todos los alumnos guardados
    @Test
    void obtenerTodosDebeDevolverLista() throws Exception {
        Student s1 = new Student("Juan", "Perez", "juan@test.com");
        s1.setId(1L);
        Student s2 = new Student("Maria", "Lopez", "maria@test.com");
        s2.setId(2L);
        when(studentRepository.findAll()).thenReturn(List.of(s1, s2));

        mockMvc.perform(get("/api/v1/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].firstName").value("Juan"))
                .andExpect(jsonPath("$[1].emailId").value("maria@test.com"));
    }

    // Verifica que devolver un alumno existente por id responda 200 con el cuerpo esperado
    @Test
    void obtenerPorIdDebeDevolverAlumno() throws Exception {
        Student student = new Student("Juan", "Perez", "juan@test.com");
        student.setId(1L);
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        mockMvc.perform(get("/api/v1/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.firstName").value("Juan"));
    }

    // Verifica que buscar un id inexistente retorna 404 segun la ResourceNotFoundException
    @Test
    void obtenerPorIdInexistenteDebeResponder404() throws Exception {
        when(studentRepository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/students/99"))
                .andExpect(status().isNotFound());
    }

    // Verifica que se pueda crear un alumno via POST y se persista mediante el repositorio
    @Test
    void crearAlumnoDebeGuardarYResponderOk() throws Exception {
        Student request = new Student("Ana", "Diaz", "ana@test.com");
        Student saved = new Student("Ana", "Diaz", "ana@test.com");
        saved.setId(5L);
        when(studentRepository.save(any(Student.class))).thenReturn(saved);

        mockMvc.perform(post("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5L))
                .andExpect(jsonPath("$.emailId").value("ana@test.com"));

        verify(studentRepository).save(any(Student.class));
    }

    // Verifica que se pueda actualizar un alumno existente y se devuelvan los datos modificados
    @Test
    void actualizarAlumnoDebePersistirCambios() throws Exception {
        Student existente = new Student("Juan", "Perez", "juan@test.com");
        existente.setId(10L);
        when(studentRepository.findById(10L)).thenReturn(Optional.of(existente));

        Student actualizado = new Student("Juan", "Nuevo", "nuevo@test.com");
        actualizado.setId(10L);
        when(studentRepository.save(any(Student.class))).thenReturn(actualizado);

        Student payload = new Student("Juan", "Nuevo", "nuevo@test.com");

        mockMvc.perform(put("/api/v1/students/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastName").value("Nuevo"))
                .andExpect(jsonPath("$.emailId").value("nuevo@test.com"));

        verify(studentRepository).findById(10L);
        verify(studentRepository).save(any(Student.class));
    }

    // Verifica que eliminar un alumno existente responda 200 y marque el JSON como eliminado
    @Test
    void eliminarAlumnoDebeResponderMapaDeEliminacion() throws Exception {
        Student student = new Student("Jose", "Suarez", "jose@test.com");
        student.setId(8L);
        when(studentRepository.findById(8L)).thenReturn(Optional.of(student));
        doNothing().when(studentRepository).delete(student);

        mockMvc.perform(delete("/api/v1/students/8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.deleted").value(true));

        verify(studentRepository).delete(student);
    }
}
