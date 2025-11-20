import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class ViewStudentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            student: {}
        };
    }

    componentDidMount() {
        StudentService.getStudentById(this.state.id).then((res) => {
            this.setState({ student: res.data });
        });
    }

    goBackToList = () => {
        this.props.history.push('/alumnos');
    }

    render() {
        return (
            <div className="page-shell">
                <div className="hero">
                    <div className="text-white">
                        <p className="eyebrow">Ficha</p>
                        <h2>Detalle del alumno</h2>
                        <p>Consulta rapida de los datos cargados.</p>
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-secondary" onClick={this.goBackToList}>
                            Volver al listado
                        </button>
                    </div>
                </div>

                <div className="card-surface">
                    <h4 className="section-title mb-4">Informacion basica</h4>
                    <div className="row mb-3">
                        <div className="col-sm-4 text-muted">Nombre</div>
                        <div className="col-sm-8">{this.state.student.firstName}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-4 text-muted">Apellido</div>
                        <div className="col-sm-8">{this.state.student.lastName}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-sm-4 text-muted">Email</div>
                        <div className="col-sm-8">{this.state.student.emailId}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewStudentComponent;
