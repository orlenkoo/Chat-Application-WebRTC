import {
  Box,
  DialogContent,
  makeStyles,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Title from '@material-ui/icons/Title';
import React, { useEffect } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.deep,
    color: theme.palette.primary.deep,
  },
  avatar: {
    width: 42,
    height: 42
  },
  spacer: {
    width: 24,
    height: 42,
  },
  buttons: {
    display: 'flex',
    minWidth: 300,
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    marginBottom: 16,
  },
  popover: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: theme.spacing(4)
  },
}));

const Base = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const title = useSelector((state) => state.form.createMeetingTitle);
  const selectedDate = useSelector((state) => state.form.createMeetingDate);

  useEffect(() => {
    dispatch({ type: 'create-meeting-date', date: moment().toDate() });
  }, []);

  const handleDateChange = (date) => {
    dispatch({ type: 'create-meeting-date', date });
  };

  return (
    <DialogContent dividers>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
          <TextField
            variant="outlined"
            className={classes.margin}
            label={t('Meeting title')}
            value={title}
            onChange={(e) => dispatch({ type: 'create-meeting-title', title: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title />
                </InputAdornment>
              ),
            }}
          />

          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label={t('Date picker dialog')}
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label={t('Time picker')}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Box>
      </MuiPickersUtilsProvider>
    </DialogContent>
  );
};

export default Base;
