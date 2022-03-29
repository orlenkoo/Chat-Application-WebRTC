import {
  Box,
  DialogContent,
  makeStyles,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Title from '@material-ui/icons/Title';
import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next';

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
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DialogContent dividers>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
          <TextField
            variant="outlined"
            className={classes.margin}
            label={t('Meeting title')}
            onChange={() => {}}
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
