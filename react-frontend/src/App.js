import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ListStudentComponent from './components/ListStudentComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStudentComponent from './components/CreateStudentComponent';
import UpdateStudentComponent from './components/UpdateStudentComponent';
import ViewStudentComponent from './components/ViewStudentComponent';

function App() {
  return (
    <div className="app-shell">
        <Router>
              <HeaderComponent />
                <main className="app-main">
                    <Switch> 
                          <Route path="/" exact>
                            <Redirect to="/alumnos" />
                          </Route>
                          <Route path="/alumnos" component={ListStudentComponent}></Route>
                          <Route path="/guardar-alumno/:id" component={CreateStudentComponent}></Route>
                          <Route path="/ver-alumno/:id" component={ViewStudentComponent}></Route>
                          {/* Rutas en inglés */}
                          <Route path="/students" component={ListStudentComponent}></Route>
                          <Route path="/add-student/:id" component={CreateStudentComponent}></Route>
                          <Route path="/view-student/:id" component={ViewStudentComponent}></Route>
                          {/* <Route path = "/update-student/:id" component = {UpdateStudentComponent}></Route> */}
                    </Switch>
                </main>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
