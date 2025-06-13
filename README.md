# Medical Q&A Collaborative Platform

This project is a collaborative web platform that allows users to post questions and receive answers on various medical topics.  
The application is built using modern technologies including Java, React, and H2 Database.

---

## Technologies Used

- **Java** – Backend server handling API, business logic, and data management.  
- **React** – Frontend framework providing a dynamic and interactive user interface.  
- **H2 Database Console** – In-memory database used for data storage during development.

---

## Project Structure

- `java/` – Backend source code in Java.  
- `react/` – Frontend source code in React.  
- Database is managed with H2, accessible via the H2 console.

---

## System Requirements

- JDK 11 or higher  
- Node.js and npm (or yarn)  
- Modern web browser  
- Internet connection for GitHub (optional for local development)

---

## Installation and Running Instructions

### Running the Backend (Java)

1. Navigate to the `java` directory:  
    ```bash
    cd java
    ```
2. Build and run the server (using Maven or Gradle):  
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```  
    or the equivalent for your build tool.

3. The backend server runs by default on port `8080`.

### Running the Frontend (React)

1. Navigate to the `react` directory:  
    ```bash
    cd react
    ```
2. Install dependencies:  
    ```bash
    npm install
    ```
3. Start the development server:  
    ```bash
    npm start
    ```
4. The frontend UI will open automatically at:  
    ```
    http://localhost:3000
    ```

### Accessing the H2 Database Console

- Available at:  
    ```
    http://localhost:8080/h2-console
    ```
- Configure the JDBC connection string as per your project settings.

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests with improvements or new features.

---

## License

This project is licensed under the MIT License (or specify your chosen license).

---

## Contact

For questions or clarifications:  
`[Insert your contact email or details here]`

---

Good luck with the project!
