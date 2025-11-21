# GestiA3n de Alumnos

#### Backend
Dentro de spring-boot: .\mvnw.cmd spring-boot:run
Para correr los tests, dentro de spring-boot: ./mvnw test
Cobertura backend: ./mvnw clean test (genera target/site/jacoco/index.html)

#### Frontend
Dentro de react-frontend 
- si falla: $env:NODE_OPTIONS="--openssl-legacy-provider"
- luego: npm start

Para correr los tests, dentro de react-frontend: npm test
Cobertura frontend: npm run test:coverage (genera coverage/lcov-report y cobertura de consola)

#### Integración (Cypress)
- App corriendo en http://localhost:3000
- Pruebas: npm run cypress:run (especificaciones en cypress/e2e)
