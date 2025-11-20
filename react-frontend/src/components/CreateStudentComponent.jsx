import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class CreateStudentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateAlumno = this.saveOrUpdateAlumno.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return;
        } else {
            StudentService.getStudentById(this.state.id).then((res) => {
                const alumno = res.data;
                this.setState({
                    firstName: alumno.firstName,
                    lastName: alumno.lastName,
                    emailId: alumno.emailId
                });
            });
        }
    }

    saveOrUpdateAlumno = (e) => {
        e.preventDefault();
        let alumno = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };

        if (this.state.id === '_add') {
            StudentService.createStudent(alumno).then(() => {
                this.props.history.push('/alumnos');
            });
        } else {
            StudentService.updateStudent(alumno, this.state.id).then(() => {
                this.props.history.push('/alumnos');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    cancel() {
        this.props.history.push('/alumnos');
    }

    render() {
        const isNew = this.state.id === '_add';
        return (
            <div className="page-shell">
                <div className="hero">
                    <div className="text-white">
                        <p className="eyebrow">{isNew ? 'Nuevo registro' : 'Editar registro'}</p>
                        <h2>{isNew ? 'Agregar alumno' : 'Actualizar alumno'}</h2>
                        <p>Completa la información básica para mantener al día la ficha del alumno.</p>
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-secondary" onClick={this.cancel.bind(this)}>
                            Volver al listado
                        </button>
                    </div>
                </div>

                <div className="form-card">
                    <form onSubmit={this.saveOrUpdateAlumno}>
                        <div className="form-group mb-3">
                            <label>Nombre</label>
                            <input
                                placeholder="Nombre"
                                name="firstName"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.changeFirstNameHandler}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Apellido</label>
                            <input
                                placeholder="Apellido"
                                name="lastName"
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.changeLastNameHandler}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Email</label>
                            <input
                                placeholder="Email"
                                name="emailId"
                                className="form-control"
                                value={this.state.emailId}
                                onChange={this.changeEmailHandler}
                                type="email"
                                required
                            />
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn btn-primary">
                                Guardar cambios
                            </button>
                            <button type="button" className="btn btn-danger" onClick={this.cancel.bind(this)}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateStudentComponent;
