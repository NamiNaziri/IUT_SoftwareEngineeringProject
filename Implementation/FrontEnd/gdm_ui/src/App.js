import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

import * as creators from "./store/actions/index";
import Login from "./components/Login/Login";
import Router from "./routes/Router";

class App extends Component {
  async componentDidMount() {
    await this.props.get_me(this.props.enqueueSnackbar);
  }

  render() {
    return (
      <HashRouter basename="/">
        {this.props.me ? <Router /> : <Login />}
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.me,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_me: (enqueueSnackbar) => dispatch(creators.get_me(enqueueSnackbar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(App));
