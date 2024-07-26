"use client";

import { Divider, List, ListItem, Paper, Typography } from "@mui/material";
import { Box, Container, width } from "@mui/system";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      <Typography variant="h1" textAlign={"center"} gutterBottom>
        Welcome to the About Page
      </Typography>
      <Divider sx={{ marginBottom: "10px" }}></Divider>
      <Container>
        <Paper>
          <Typography variant="h2" textAlign={"center"} gutterBottom>
            Frountend
          </Typography>

          <Typography variant="h4" textAlign={"center"}>
            Figma Planing
          </Typography>
          <Box
            component="img"
            alt="FrountEnd Diagram Plan"
            src="Capstone project.png"
            sx={{ width: "100%" }}
          ></Box>

          <Typography variant="h6">Using:</Typography>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              React
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Next.js
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              MUI
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Axios
            </ListItem>
          </List>

          <Typography>
            Start Frountend:{" "}
            <code style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
              npm run dev
            </code>
          </Typography>
        </Paper>
        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h2" textAlign={"center"} gutterBottom>
            Backend
          </Typography>
          <Typography>
            Link to Swagger File:{" "}
            <Link
              href="http://localhost:8081/api-docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Swagger File
            </Link>
          </Typography>

          <Typography variant="h6">Using:</Typography>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Express
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Knex
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Axios
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Bcrypt
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Cors
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Jsonwebtoken
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Swagger
            </ListItem>
          </List>

          <Typography>
            Rollback / remove SQL Database table from MySQL using knex:{" "}
            <code style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
              npx knex migrate:rollback
            </code>
          </Typography>
          <Typography>
            Migrate datatbase tables to MySQL using knex:{" "}
            <code style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
              npx knex migrate:latest
            </code>
          </Typography>
          <Typography>
            Add product data into MySQL tabels from product seed file:{" "}
            <code style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
              npx knex seed:run --specific=Product.js
            </code>
          </Typography>
          <Typography>
            Start Backend:{" "}
            <code style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
              npm start
            </code>
          </Typography>
        </Paper>

        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h2" textAlign={"center"} gutterBottom>
            Container
          </Typography>
          <Typography variant="h6">Using:</Typography>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Docker
            </ListItem>
          </List>

          <Typography>
            Create Docker container:{" "}
            <code style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
              docker-compose -f .\compose.mysql.yml up
            </code>
          </Typography>
        </Paper>

        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h2" textAlign={"center"} gutterBottom>
            Database
          </Typography>

          <Typography variant="h4" textAlign={"center"}>
            Database Diagram
          </Typography>
          <Box
            component="img"
            alt="FrountEnd Diagram Plan"
            src="Capstone Database Diagram.png"
            sx={{ width: "100%" }}
          ></Box>
          <Typography variant="h6">Using:</Typography>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              MySQL
            </ListItem>
          </List>

          <Typography>Database name: glencapstoneproject</Typography>
        </Paper>

        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h1" textAlign={"center"} gutterBottom>
            Future expanions
          </Typography>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Learn and Change to typescript if I dont just start a new project
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Add Sequelize with Knex to make backend and database connetions
              smoother
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Add realtime support chat feature e.g from the socket.io lab we
              had done in class
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Add user page to check and change details of logged in user and
              check ordered items
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Add difirent tiers of login such as admin logins who can add
              remove and edit products
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Add checkout form to collect postage data and payment info after
              purchase
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              after purchacing update amount of products by removing from amount
              available
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              add abbility to add comments and rate products
            </ListItem>
            <ListItem>
              make ratings on products correct and not from dummy data info
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Save products to local storage or cachce and only fetch from
              server if needed to save on loading times
            </ListItem>
            <ListItem sx={{ display: "list-item", marginLeft: "25px" }}>
              Dokerize and or host in azure cloud
            </ListItem>
          </List>
        </Paper>
        <Divider sx={{ marginBottom: "10px" }}></Divider>
      </Container>
    </>
  );
};

export default AboutPage;
