import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

export default function MaterialUIPickers({
  label,
  name,
  value,
  fullWidth,
  variant,
  onChange,
  disabled,
}) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        disablePast
        format="YYYY/MM/DD hh:mm:ss"
        margin="normal"
        id="date-picker-inline"
        label={label}
        name={name}
        fullWidth={fullWidth}
        value={value}
        onChange={(date) => {
          onChange?.({ target: { name, value: date } });
        }}
        inputVariant={variant}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
}
