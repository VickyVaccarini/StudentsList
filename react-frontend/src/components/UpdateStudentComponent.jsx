import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class UpdateStudentComponent extends Component {
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
        this.updateAlumno = this.updateAlumno.bind(this);
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then((res) => {
            const alumno = res.data;
            this.setState({
                firstName: alumno.firstName,
                lastName: alumno.lastName,
                emailId: alumno.emailId
            });
        });
    }

    updateAlumno = (e) => {
        e.preventDefault();
        let alumno = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };
        StudentService.updateStudent(alumno, this.state.id).then(() => {
            this.props.history.push('/alumnos');
        });
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
                        <p className="eyebrow">{isNew ? 'Nuevo registro' : 'Edición'}</p>
                        <h2>{isNew ? 'Agregar alumno' : 'Editar alumno'}</h2>
                        <p>Actualiza la información de contacto del alumno seleccionado.</p>
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-secondary" onClick={this.cancel.bind(this)}>
                            Volver al listado
                        </button>
                    </div>
                </div>

                <div className="form-card">
                    <form onSubmit={this.updateAlumno}>
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

export default UpdateStudentComponent;
