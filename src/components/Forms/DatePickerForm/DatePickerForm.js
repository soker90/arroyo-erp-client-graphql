import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import deLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import {useStyles} from './DatePickerForm.styles';

const DatePickerForm = memo(({size = 6, variant, format = 'dd/MM/yyyy', children, ...rest}) => {
    const classes = useStyles();

    return <Grid
      item
      md={size}
      xs={12}
    >
      <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
        <DatePicker
          className={classes.picker}
          onChange={() => {
          }}
          animateYearScrolling
          format={format}
          inputVariant={variant}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  },
);

DatePickerForm.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onAccept: PropTypes.func,
  onChange: PropTypes.func,
  disableFuture: PropTypes.bool,
  format: PropTypes.string,
};

DatePickerForm.displayName = 'DatePickerForm';

export default DatePickerForm;