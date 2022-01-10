import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Box } from "@material-ui/core";

const Projects = lazy(() => import("../components/Projects/Projects"));
const Project = lazy(() => import("../components/Projects/Project"));

const AppBar = lazy(() => import("../components/AppBar/AppBar"));
const Breadcrumbs = lazy(() => import("../components/Breadcrumbs/Breadcrumbs"));

const router = () => {
  return (
    <Suspense fallback={<div></div>}>
      <AppBar />
      <Container maxWidth="xl">
        <Box m={1}>
          <Breadcrumbs />
        </Box>
        <Switch>
          <Route path="/" exact component={Projects} />
          <Route path="/:id" exact component={Project} />
        </Switch>
      </Container>
    </Suspense>
  );
};

export default router;
