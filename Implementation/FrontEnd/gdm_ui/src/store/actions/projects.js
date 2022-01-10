import * as types from "./types";
import catchError from "../../hoc/catchError";

import { projects, teams } from "../../axios/main";

export const get_all_projects = ({ page, limit }, enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    const { data } = await projects.get("/", {
      params: {
        page,
        limit,
      },
    });
    dispatch({ type: types.set_projects, projects: data });

    return data.total;
  }, enqueueSnackbar);
};

export const get_project = ({ project_id }, enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    const { data } = await projects.get(`/${project_id}/`);
    dispatch({ type: types.set_project, project: data });
  }, enqueueSnackbar);
};

export const get_all_members = (
  { project_id, my_members },
  enqueueSnackbar
) => {
  return catchError(async (dispatch) => {
    if (my_members) {
      const { data } = await projects.get(`/${project_id}/team_members/`);
      dispatch({ type: types.set_members, members: data });
    } else {
      const { data } = await projects.get(`/${project_id}/members/`);
      dispatch({ type: types.set_members, members: data });
    }
  }, enqueueSnackbar);
};

export const get_all_teams = ({ project_id }, enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    const { data } = await projects.get(`/${project_id}/teams/`);
    dispatch({ type: types.set_teams, teams: data });
  }, enqueueSnackbar);
};

export const set_role = ({ role }, enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    dispatch({ type: types.set_role, role });
  }, enqueueSnackbar);
};
