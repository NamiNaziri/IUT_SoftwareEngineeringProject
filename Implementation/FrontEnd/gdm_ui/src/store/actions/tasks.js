import * as types from "./types";
import catchError from "../../hoc/catchError";

import { tasks, projects } from "../../axios/main";

export const get_all_tasks = (
  { project_id, role, page, limit },
  enqueueSnackbar
) => {
  return catchError(async (dispatch) => {
    const { data } = await projects.get(`${project_id}/tasks/`, {
      params: {
        page,
        limit,
        role,
      },
    });
    dispatch({ type: types.set_tasks, tasks: data });

    return data.total;
  }, enqueueSnackbar);
};

export const get_task = ({ task_id }, enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    const { data } = await tasks.get(`/${task_id}/`);
    dispatch({ type: types.set_task, task: data });
  }, enqueueSnackbar);
};

export const create_task = (
  { project_id, title, deadline, assigned_to, assigned_to_team },
  enqueueSnackbar
) => {
  return catchError(async () => {
    const { data } = await projects.post(`/${project_id}/tasks/`, {
      title,
      deadline,
      assigned_to,
      assigned_to_team,
    });
    return data;
  }, enqueueSnackbar);
};

export const update_task = (
  { task_id, title, deadline, assigned_to, assigned_to_team },
  enqueueSnackbar
) => {
  return catchError(async () => {
    const { data } = await tasks.patch(`/${task_id}/`, {
      title,
      deadline,
      assigned_to,
      assigned_to_team,
    });
    return data;
  }, enqueueSnackbar);
};

export const complete_task = ({ task_id }, enqueueSnackbar) => {
  return catchError(async () => {
    const { data } = await tasks.post(`/${task_id}/completed/`);
    return data;
  }, enqueueSnackbar);
};

export const cancel_task = ({ task_id }, enqueueSnackbar) => {
  return catchError(async () => {
    const { data } = await tasks.post(`/${task_id}/canceled/`);
    return data;
  }, enqueueSnackbar);
};

export const reject_task = ({ task_id }, enqueueSnackbar) => {
  return catchError(async () => {
    const { data } = await tasks.post(`/${task_id}/rejected/`);
    return data;
  }, enqueueSnackbar);
};
