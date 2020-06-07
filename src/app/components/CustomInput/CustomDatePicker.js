import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { DateTimePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
// @material-ui/icons
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
// core components
import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

const useStyles = makeStyles(styles);

export default function CustomDateTimePicker(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    value,
    onChange,
    minDate,
    maxDate,
  } = props;

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });

  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  return (
    <FormControl
      {...formControlProps}
      className={`${formControlProps.className} ${classes.formControl}`}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <DateTimePicker
        classes={{
          root: marginTop,
        }}
        id={id}
        {...inputProps}
        value={value}
        onChange={onChange}
        minDate={minDate}
      />
      {error ? (
        <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
      ) : success ? (
        <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
      ) : null}
    </FormControl>
  );
}
