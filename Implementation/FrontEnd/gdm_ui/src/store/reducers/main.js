import * as types from "../actions/types";

const initState = {
  me: null,
  projects: [],
  project: null,
  tasks: [],
  task: null,
  teams: [],
  members: [],
  role: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.set_me:
      return { ...state, me: action.me };
    case types.set_projects:
      return { ...state, projects: action.projects };
    case types.set_project:
      return { ...state, project: action.project };
    case types.set_tasks:
      return { ...state, tasks: action.tasks };
    case types.set_task:
      return { ...state, task: action.task };
    case types.set_teams:
      return { ...state, teams: action.teams };
    case types.set_members:
      return { ...state, members: action.members };
    case types.set_role:
      return { ...state, role: action.role };
    default:
      return state;
  }
};

export default reducer;
