<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield-eszter]][linkedin-url-eszter]
[![LinkedIn][linkedin-shield-attila]][linkedin-url-attila]

<div align="center">
  <a href="https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p">
    <img src="frontend/src/images/QuizBuzzLogo.png" alt="Logo" width="806" height="201">
  </a>

<h3 align="center">QuizBuzz</h3>

  <p align="center">
    QuizBuzz allows users to play, create, and edit quizzes. You can enjoy a wide range of quizzes, create your own, and even modify existing ones to suit your preferences. It's a versatile platform for quiz enthusiasts and creators alike, offering endless opportunities for fun and learning.
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project

The Home page of the application:
<br />

![Main Page][product-screenshot-main]
<br />

The available quiz list:
<br />

![Quiz List][product-screenshot-list]
<br />

On this page you can edit your existing quiz:
<br />

![Quiz Editor][product-screenshot-editor]
<br />

Filling quiz:
<br />

![Game][product-screenshot-game]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<p>Frontend:</p>

-   [![Typescript][Typescript]][Typescript-url]
-   [![React][React.js]][React-url]
-   [![MUI][MUI]][MUI-url]
-   [![Node.js][NodeJS]][NodeJS-url]
-   [![Express.js][Express.js]][Express.js-url]
  
<p>Backend:</p>

-   [![Java][Java]][Java-url]
-   [![Spring][Spring]][Spring-url]
-   [![Spring-Security][Spring-Security]][Spring-Security-url]
-   [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

<p>Deployment:</p>

- [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow this guide to run and try the application. First you have to create a hosted database on Supabase and install Docker Desktop, then you can build the application.

### Prerequisites

- Create hosted DB on Supabase:
1. Create an account on https://supabase.com/
2. Click on the ``New Project`` button on the Projects site.
3. Give a name and add a password [Don't forget it, you have to use it later in environment variables!] to your database, select the nearest Region
4. Click on the ``New Project`` button.
5. Select the Project Settings on the sidebar.
6. Click Database on the left side.
7. Find Connection string and select the JDBC option.

- Install Docker Desktop. Follow this guide: https://docs.docker.com/desktop/install/windows-install/

### Installation

1. Open the terminal.
2. Clone the repository.
    ```sh
    git clone https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p.git
    ```
3. Navigate into the project folder with ``cd el-proyecte-grande-sprint-1-java-Sx4p`` command.
4. Set the environment variables:
    Username can be found in your Supabase project.
    ```sh
    export DB_USER={your database username}
    ```
    ```sh
    export DB_PASSWORD={your database password}
    ```
    Before this step copy the connection string JDBC URL until the postgres word from Supabase. => E.g.  ``jdbc:postgresql://db.example.supabase.co:5432/postgres``
    ```sh
    export DB_DATABASE={database connection string}
    ```
    Before this step generate a secret key on this website: https://www.browserling.com/tools/random-hex
    Set "How many digits?" input to 64 and "How many results?" to 1. Click ``Generate Hex`` and copy it.
    ```sh
    export SECRET_KEY={generated key}
    ```
5. Use the following command for building and running the application:
   ```sh
    docker-compose up -d
    ```
6. After building is finished go to the http://localhost:3000/ URL in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Roadmap

-   [ ] Basic Frontend design, and starter API endpoints in Spring.
-   [ ] Create and connect to the DB using JPA.
-   [ ] Add a Spring Security layer to the app, with stateless server and JWT token handling.
-   [ ] Dockerize the application, to make it easily runnable on any machine, that has docker.

See the [open issues](https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Eszter Gyöngyvér Erdélyi -  esztergyerdelyi@gmail.com
<br />
Attila Makó - mattila0611@gmail.com

Project Link: https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p.svg?style=for-the-badge
[contributors-url]: https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p.svg?style=for-the-badge
[issues-url]: https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-Sx4p/issues

[linkedin-shield-eszter]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-eszter]: https://www.linkedin.com/in/eszter-erdelyi/

[linkedin-shield-attila]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-attila]: https://www.linkedin.com/in/makoattila/

[product-screenshot-main]: https://i.imgur.com/yZZSwWj.png
[product-screenshot-list]: https://i.imgur.com/nCfMT9O.png
[product-screenshot-editor]: https://i.imgur.com/QNzWHFe.png
[product-screenshot-game]: https://i.imgur.com/u2NYCAg.png
[Typescript]: https://img.shields.io/badge/typescript-F7DF1E?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Spring]: https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[Spring-Security]: https://img.shields.io/badge/springsecurity-000000?style=for-the-badge&logo=springsecurity&logoColor=4FC08D
[Spring-Security-url]: https://spring.io/projects/spring-security
[PostgreSQL]: https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[MUI]: https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[Java]: https://img.shields.io/badge/java-F80000?style=for-the-badge&logo=oracle&logoColor=white
[Java-url]: https://www.oracle.com/java/
