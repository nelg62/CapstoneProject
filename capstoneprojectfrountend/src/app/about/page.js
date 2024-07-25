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
          <List>
            <ListItem>React</ListItem>
            <ListItem>Next.js</ListItem>
            <ListItem>MUI</ListItem>
            <ListItem>Axios</ListItem>
          </List>
        </Paper>
        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h2" textAlign={"center"} gutterBottom>
            Backend
          </Typography>

          <Link
            href="http://localhost:8081/api-docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Swagger File
          </Link>

          <List>
            <ListItem>Express</ListItem>
            <ListItem>Knex</ListItem>
            <ListItem>Axios</ListItem>
            <ListItem>Bcrypt</ListItem>
            <ListItem>Cors</ListItem>
            <ListItem>Jsonwebtoken</ListItem>
          </List>
        </Paper>

        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h2" textAlign={"center"} gutterBottom>
            Container
          </Typography>
          <List>
            <ListItem>Docker</ListItem>
          </List>
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
          <List>
            <ListItem>MySQL</ListItem>
          </List>
        </Paper>

        <Divider sx={{ marginBottom: "10px" }}></Divider>

        <Paper>
          <Typography variant="h1" textAlign={"center"} gutterBottom>
            Future expanions
          </Typography>
          <List>
            <ListItem>
              Learn and Change to typescript if I dont just start a new project
            </ListItem>
            <ListItem>
              Add Sequelize with Knex to make backend and database connetions
              smoother
            </ListItem>
            <ListItem>
              Add realtime support chat feature e.g from the socket.io lab we
              had done in class
            </ListItem>
            <ListItem>
              Add user page to check and change details of logged in user and
              check ordered items
            </ListItem>
            <ListItem>
              Add difirent tiers of login such as admin logins who can add
              remove and edit products
            </ListItem>
            <ListItem>
              Add checkout form to collect postage data and payment info after
              purchase
            </ListItem>
            <ListItem>
              after purchacing update amount of products by removing from amount
              available
            </ListItem>
            <ListItem>add abbility to add comments and rate products</ListItem>
            <ListItem>
              make ratings on products correct and not from dummy data info
            </ListItem>
            <ListItem>
              Save products to local storage or cachce and only fetch from
              server if needed to save on loading times
            </ListItem>
            <ListItem>Dokerize or host in azure cloud</ListItem>
          </List>
        </Paper>
        <Divider sx={{ marginBottom: "10px" }}></Divider>
      </Container>
    </>
  );
};

export default AboutPage;
