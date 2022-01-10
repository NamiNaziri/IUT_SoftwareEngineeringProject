const catchError = (fn, enqueueSnackbar) => {
  return (dispatch, getState) => {
    return fn(dispatch, getState).catch((err) => {
      enqueueSnackbar?.(err.message, {
        variant: "error",
        style: { margin: "0.25rem 0" },
      });
      return false;
    });
  };
};

export default catchError;
