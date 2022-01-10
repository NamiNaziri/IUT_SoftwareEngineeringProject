import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Container,
  Typography,
  Badge,
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Person, Assignment } from "@material-ui/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import * as creators from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  buttons: {
    flexGrow: 1,
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1, 0, 1, 1),
  },
}));

const Projects = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const limit = 10;

  const getProjects = async (page = 1) => {
    const total = await props.get_all_projects(
      { page, limit },
      enqueueSnackbar
    );
    const count = Math.ceil(total / limit);
    setCount(count);
  };

  const changePage = (e, value) => {
    if (value < 1 || value > count || value === page) return;
    setPage(value);
    getProjects(value);
  };

  const changeRole = async (role, e) => {
    const res = await props.set_role(role, enqueueSnackbar);
    if (res === false) e.preventDefault();
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {Array.isArray(props.projects) &&
          props.projects.map((project) => {
            return (
              <Grid item xs={12} key={project.id} style={{ width: "100%" }}>
                <Paper className={classes.paper} elevation={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">{project.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Deadline:{" "}
                      {moment(project.deadline).format("YYYY/MM/DD hh:mm:ss")}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="center"
                  >
                    <Grid item>
                      <Badge
                        badgeContent={project.members || 0}
                        showZero
                        color="secondary"
                      >
                        <Person />
                      </Badge>
                    </Grid>

                    <Grid item>
                      <Badge
                        badgeContent={project.tasks || 0}
                        showZero
                        color="secondary"
                      >
                        <Assignment />
                      </Badge>
                    </Grid>

                    <Grid item className={classes.buttons}>
                      {Array.isArray(project.roles) &&
                        project.roles.map((role) => {
                          return (
                            <Link
                              to={`/${project.id}`}
                              key={role}
                              onClick={changeRole.bind(this, role)}
                            >
                              <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                              >
                                Enter as {role}
                              </Button>
                            </Link>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        <Grid item>
          {count > 1 && (
            <Pagination
              count={count}
              page={page}
              onChange={changePage}
              variant="outlined"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_all_projects: ({ page, limit }, enqueueSnackbar) =>
      dispatch(creators.get_all_projects({ page, limit }, enqueueSnackbar)),
    set_role: (role, enqueueSnackbar) =>
      dispatch(creators.set_role({ role }, enqueueSnackbar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
