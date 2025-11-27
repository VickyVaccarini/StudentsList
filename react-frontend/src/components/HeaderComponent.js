import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark">
                    <div>
                        <a href="/" className="navbar-brand">
                            Gestión de Alumnos
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;
