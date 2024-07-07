# Billiard Table Booking Platform

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Node.js and npm](https://nodejs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/votrongluan/billiards-booking-webapp
   ```

2. Navigate to the backend folder and install dependencies:

   ```bash
   cd BBP_Backend
   mvnw clean install
   ```

3. Navigate to the frontend folder and install dependencies:
   ```bash
   cd ../BBP_Frontend
   npm install
   ```

### Setting Up the Database

1. Update the `application.properties` file in `BBP_Backend/src/main/resources` with your database connection string:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/yourdatabase
   spring.datasource.username=yourusername
   spring.datasource.password=yourpassword
   ```

   **Please do not commit any changes in `application.properties`**

2. Run the `DatabaseScript.sql` in the `database` folder to set up the initial database schema.

## Usage

### Running the Application

1. Run the backend application:

   ```bash
   cd BBP_Backend
   mvnw spring-boot:run
   ```

2. Run the frontend application:

   ```bash
   cd ../BBP_Frontend
   npm run dev
   ```

3. Navigate to `http://localhost:5173` in your web browser to see the application in action.

### Examples

Here are some example usages of the application:

- View all clubs
- Book a table
- View your booking history

## Screenshots

<div style="text-align: center;">
    <img src="./img/index.png" alt="Home" style="width: 70%;"/>
    <p><em>Home</em></p>
</div>

<hr/>
<br/>

<div style="text-align: center;">
    <img src="img/find-club.png" alt="Find club" style="width: 70%;"/>
    <p><em>Find club</em></p>
</div>

<hr/>
<br/>

<div style="text-align: center;">
    <img src="img/club-detail.png" alt="Club detail" style="width: 70%;"/>
    <p><em>Club detail</em></p>
</div>

<hr/>
<br/>

<div style="text-align: center;">
    <img src="img/book.png" alt="Book" style="width: 70%;"/>
    <p><em>Book</em></p>
</div>

<hr/>
<br/>

<div style="text-align: center;">
    <img src="img/book-detail.png" alt="Book detail" style="width: 70%;"/>
    <p><em>Book detail</em></p>
</div>

<hr/>
<br/>

## Authors and Acknowledgment

Thanks to all the contributors who have helped develop this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Status

**Not Actively Maintained**

Thank you for your interest in this project! Unfortunately, we regret to inform you that this project is no longer actively maintained. While contributions are always welcome, we recommend checking out other active projects or exploring alternative solutions.

If you have any questions or need further assistance, feel free to reach out. We appreciate your understanding and support!
