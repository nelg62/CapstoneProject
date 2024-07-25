"use client";

import { Box, Container, width } from "@mui/system";

const AboutPage = () => {
  return (
    <>
      <h1>Welcome to the About Page</h1>
      <Container>
        <h2>Frountend</h2>

        <h4>Figma Planing</h4>
        <Box
          component="img"
          alt="FrountEnd Diagram Plan"
          src="Capstone project.png"
          sx={{ width: "100%" }}
        ></Box>
        <ul>
          <li>React</li>
          <li>Next.js</li>
          <li>MUI</li>
          <li>Axios</li>
        </ul>

        <h2>Backend</h2>

        <a
          href="http://localhost:8081/api-docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Swagger File
        </a>

        <ul>
          <li>Express</li>
          <li>Knex</li>
          <li>Axios</li>
          <li>Bcrypt</li>
          <li>Cors</li>
          <li>Jsonwebtoken</li>
        </ul>

        <h2>Container</h2>
        <ul>
          <li>Docker</li>
        </ul>

        <h2>Database</h2>

        <h4>Database Diagram</h4>
        <Box
          component="img"
          alt="FrountEnd Diagram Plan"
          src="Capstone Database Diagram.png"
          sx={{ width: "100%" }}
        ></Box>
        <ul>
          <li>MySQL</li>
        </ul>

        <h1>Future expanions</h1>
        <ul>
          <li>
            Learn and Change to typescript if I dont just start a new project
          </li>
          <li>
            Add Sequelize with Knex to make backend and database connetions
            smoother
          </li>
          <li>
            Add realtime support chat feature e.g from the socket.io lab we had
            done in class
          </li>
          <li>
            Add user page to check and change details of logged in user and
            check ordered items
          </li>
          <li>
            Add difirent tiers of login such as admin logins who can add remove
            and edit products
          </li>
          <li>
            Add checkout form to collect postage data and payment info after
            purchase
          </li>
          <li>
            after purchacing update amount of products by removing from amount
            available
          </li>
          <li>add abbility to add comments and rate products</li>
          <li>make ratings on products correct and not from dummy data info</li>
        </ul>
      </Container>
    </>
  );
};

export default AboutPage;
