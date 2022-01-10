import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Route } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { connect } from "react-redux";

const breadcrumbNameMap = {
  "/": "Projects",
  "/tasks": "Tasks",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360,
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Bread = (props) => {
  const classes = useStyles();

  if (props.project) {
    breadcrumbNameMap[`/${props.project.id}`] = props.project.title;
  }
  if (props.task) {
    breadcrumbNameMap[
      `/${props.task.project && props.task.project.id}/${props.task.id}`
    ] = props.task.title;
  }

  return (
    <div className={classes.root}>
      <Route>
        {({ location }) => {
          const pathname = location.pathname.split("/").filter((x) => x);
          return (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <LinkRouter color="inherit" to="/">
                Projects
              </LinkRouter>
              {pathname.map((value, index) => {
                const last = index === pathname.length - 1;
                const to = `/${pathname.slice(0, index + 1).join("/")}`;

                return last ? (
                  <Typography color="textPrimary" key={to}>
                    {breadcrumbNameMap[to]}
                  </Typography>
                ) : (
                  <LinkRouter color="inherit" to={to} key={to}>
                    {breadcrumbNameMap[to]}
                  </LinkRouter>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.project,
    task: state.task,
  };
};

export default connect(mapStateToProps)(Bread);
