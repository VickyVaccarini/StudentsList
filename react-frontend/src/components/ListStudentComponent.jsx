import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class ListStudentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alumnos: []
        };
        this.addAlumno = this.addAlumno.bind(this);
        this.editAlumno = this.editAlumno.bind(this);
        this.deleteAlumno = this.deleteAlumno.bind(this);
    }

    deleteAlumno(id) {
        StudentService.deleteStudent(id).then(() => {
            this.setState({ alumnos: this.state.alumnos.filter((alumno) => alumno.id !== id) });
        });
    }
    viewAlumno(id) {
        this.props.history.push(`/ver-alumno/${id}`);
    }
    editAlumno(id) {
        this.props.history.push(`/guardar-alumno/${id}`);
    }

    componentDidMount() {
        StudentService.getStudents().then((res) => {
            this.setState({ alumnos: res.data });
        });
    }

    addAlumno() {
        this.props.history.push('/guardar-alumno/_add');
    }

    render() {
        return (
            <div className="page-shell">
                <div className="hero">
                    <div className="text-white">
                        <p className="eyebrow">Panel académico</p>
                        <h2>Alumnos</h2>
                        <p>Administra inscripciones, edita datos y consulta fichas de cada alumno.</p>
                    </div>
                    <div className="actions">
                        <button className="btn btn-primary" onClick={this.addAlumno}>
                            + Agregar alumno
                        </button>
                    </div>
                </div>

                <div className="card-surface table-responsive">
                    <table className="table table-modern">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.alumnos.map((alumno) => (
                                <tr key={alumno.id}>
                                    <td>{alumno.firstName}</td>
                                    <td>{alumno.lastName}</td>
                                    <td>{alumno.emailId}</td>
                                    <td>
                                        <div className="actions justify-content-center">
                                            <button onClick={() => this.viewAlumno(alumno.id)} className="btn btn-secondary">
                                                Ver
                                            </button>
                                            <button onClick={() => this.editAlumno(alumno.id)} className="btn btn-info">
                                                Editar
                                            </button>
                                            <button onClick={() => this.deleteAlumno(alumno.id)} className="btn btn-danger">
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListStudentComponent;
