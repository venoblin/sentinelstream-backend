<br/>
<div align="center">
<a href="https://github.com/user/repo">
<img src=".readme-images/project-logo.svg" alt="Logo" height="128px">
</a>
<h3 align="center">SentinelStream</h3>
<p align="center">
SentinelStream is a high-velocity fraud detection engine that processes and visualizes banking transactions in real-time
<br/>
<br/>
<a href="#">View Demo</a> . 
<a href="https://trello.com/b/K5LCVO34/sentinelstream">Trello Board</a> 
</p>
</div>
Table of Contents

- [About The Project](#about-the-project)
  - [Database Schema](#database-schema)
  - [Built With](#built-with)

## About The Project

SentinelStream is a high-velocity fraud detection engine that processes and visualizes banking transactions in real-time. Built with Node.js and WebSockets, it simulates a live financial network, applying heuristic algorithms to detect anomalies (like velocity attacks) in under 100ms and broadcasting alerts to a live React dashboard.

### Database Schema

The schema enforces strict Separation of Duties (SoD) by isolating internal Staff/Analysts from Customer entities, ensuring operational security and preventing insider threat transaction.

<img src=".readme-images/db-schema.png" alt="Database schema" height="500px" />

### Built With

This project was built with the following technologies:

- <img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" alt="React" />
- <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="TypeScript" />
- <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" alt="Node.js" />
- <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB" alt="Express.js" />
- <img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="PostgreSQL" />
