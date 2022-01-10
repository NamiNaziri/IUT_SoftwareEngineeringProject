import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Paper,
  Tab,
  Tabs,
  Fab,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Close, Check, MoreVert, Add, NotInterested } from "@material-ui/icons";
import { red, green, yellow } from "@material-ui/core/colors";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";

import Timer from "../Timer/Timer";
import Task from "./Task";
import task_status from "../../defaults/task.json";
import roles from "../../defaults/roles.json";

import * as creators from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    flexGrow: 1,
    textAlign: "right",
  },
  red: {
    color: red[500],
  },
  green: {
    color: green[500],
  },
  yellow: {
    color: yellow[900],
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    position: "fixed",
    bottom: 0,
    right: 0,
    margin: theme.spacing(5),
  },
  nav: {
    margin: "auto",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    width: "max-content",
  },
}));

const Tasks = (props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState(0);

  const status_map = ["_", "CP", "NC", "C", "F"];

  const limit = 10;

  const getTasks = async (page = 1) => {
    const total = await props.get_all_tasks(
      { page, limit, project_id: props.projectId, role: props.role },
      enqueueSnackbar
    );
    const count = Math.ceil(total / limit);
    setCount(count);
  };

  const changePage = (e, value) => {
    if (value < 1 || value > count || value === page) return;
    setPage(value);
    getTasks(value);
  };

  const changeStatus = (e, val) => {
    setStatus(val);
  };

  const createNew = () => {
    setIsNew(true);
    setOpen(true);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const viewTask = async (task_id) => {
    const res = await props.get_task(task_id, enqueueSnackbar);
    if (res !== false) {
      setIsNew(false);
      setOpen(true);
    }
  };
  const cancelTask = async (task_id) => {
    const res = await props.cancel_task(task_id, enqueueSnackbar);
    if (res !== false) getTasks();
  };
  const rejectTask = async (task_id) => {
    const res = await props.reject_task(task_id, enqueueSnackbar);
    if (res !== false) getTasks();
  };
  const completeTask = async (task_id) => {
    const res = await props.complete_task(task_id, enqueueSnackbar);
    if (res !== false) getTasks();
  };

  const renderButtons = (task) => {
    let buttons;
    const canAlter =
      (props.me && task && task.creator && task.creator.id === props.me.pk) ||
      props.role === roles.project_manager;

    if (task.completion_status === task_status.not_completed) {
      buttons = (
        <CardActions className={classes.buttons}>
          {canAlter && (
            <IconButton
              aria-label="close"
              className={classes.red}
              onClick={cancelTask.bind(null, task.id)}
            >
              <Close />
            </IconButton>
          )}
          <IconButton
            aria-label="check"
            className={classes.green}
            onClick={completeTask.bind(null, task.id)}
          >
            <Check />
          </IconButton>
          <IconButton aria-label="view" onClick={viewTask.bind(null, task.id)}>
            <MoreVert />
          </IconButton>
        </CardActions>
      );
    } else if (task.completion_status === task_status.check_pending) {
      buttons = (
        <CardActions className={classes.buttons}>
          {canAlter && (
            <>
              <IconButton
                aria-label="close"
                className={classes.red}
                onClick={cancelTask.bind(null, task.id)}
              >
                <Close />
              </IconButton>
              <IconButton
                aria-label="reject"
                className={classes.yellow}
                onClick={rejectTask.bind(null, task.id)}
              >
                <NotInterested />
              </IconButton>
              <IconButton
                aria-label="check"
                className={classes.green}
                onClick={completeTask.bind(null, task.id)}
              >
                <Check />
              </IconButton>
            </>
          )}
          <IconButton aria-label="view" onClick={viewTask.bind(null, task.id)}>
            <MoreVert />
          </IconButton>
        </CardActions>
      );
    } else {
      buttons = (
        <CardActions className={classes.buttons}>
          <IconButton aria-label="view" onClick={viewTask.bind(null, task.id)}>
            <MoreVert />
          </IconButton>
        </CardActions>
      );
    }

    return buttons;
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Paper square className={classes.nav}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
          value={status}
          onChange={changeStatus}
        >
          <Tab label="All" />
          <Tab label="Check Pending" />
          <Tab label="Not Completed" />
          <Tab label="Completed" />
          <Tab label="Failed" />
        </Tabs>
      </Paper>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item style={{ width: "100%" }}>
          <Grid container spacing={3}>
            {Array.isArray(props.tasks) &&
              props.tasks.map((task) => {
                if (
                  task.completion_status === status_map[status] ||
                  status === 0
                )
                  return (
                    <Grid item xs={12} lg={3} md={4} sm={6} key={task.id}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography
                            className={classes.title}
                            variant="h6"
                            gutterBottom
                          >
                            {task.title}
                          </Typography>
                          <Timer
                            deadline={
                              Array.isArray(task.deadlines) &&
                              task.deadlines[0] &&
                              task.deadlines[0].end_date
                            }
                            done={
                              task.completion_status === task_status.completed
                            }
                            pending={
                              task.completion_status ===
                              task_status.check_pending
                            }
                            failed={
                              task.completion_status === task_status.failed
                            }
                          />
                        </CardContent>
                        {renderButtons(task)}
                      </Card>
                    </Grid>
                  );
                else {
                  return null;
                }
              })}
          </Grid>
        </Grid>
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
      <Task
        open={open}
        setOpen={setOpen}
        projectId={props.projectId}
        role={props.role}
        isNew={isNew}
        getAllTasks={getTasks}
      />
      <Fab
        aria-label="add"
        className={classes.addBtn}
        onClick={createNew}
        color="primary"
      >
        <Add />
      </Fab>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    me: state.me,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_all_tasks: ({ project_id, role, page, limit }, enqueueSnackbar) =>
      dispatch(
        creators.get_all_tasks(
          { page, limit, project_id, role },
          enqueueSnackbar
        )
      ),
    get_task: (task_id, enqueueSnackbar) =>
      dispatch(creators.get_task({ task_id }, enqueueSnackbar)),
    complete_task: (task_id, enqueueSnackbar) =>
      dispatch(creators.complete_task({ task_id }, enqueueSnackbar)),
    cancel_task: (task_id, enqueueSnackbar) =>
      dispatch(creators.cancel_task({ task_id }, enqueueSnackbar)),
    reject_task: (task_id, enqueueSnackbar) =>
      dispatch(creators.reject_task({ task_id }, enqueueSnackbar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
