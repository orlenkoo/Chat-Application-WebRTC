import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import { CSVLink, } from 'react-csv';
import getUsers from '../../../actions/users/getUsers';
import exportData from '../../../utils/exportData';
import Config from '../../../config';
import CreateDialog from './CreateDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.users.users);

  const [createDialog, setCreateDialog] = useState(false);

  const csvData = [
    ['first name', 'last name', 'username', 'email', 'registration date'],
  ];

  if (customers) {
    customers.forEach((e) => {
      csvData.push([e.firstName, e.lastName, e.username, e.email, e.registrationDate]);
    });
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Box flex={1}>
          <Button className={classes.exportButton}>
            Admin Panel - Users
          </Button>
        </Box>
        {!Config.demo && (
          <CSVLink data={csvData} filename="customers.csv">
            <Button className={classes.exportButton}>
              Export CSV
            </Button>
          </CSVLink>
        )}
        {Config.demo && (
          <Button
            className={classes.exportButton}
            onClick={() => {
              dispatch({ type: 'snack', severity: 'info', content: 'export csv can not be performed in demo mode' });
            }}
          >
            Export CSV
          </Button>
        )}
        <Button
          className={classes.exportButton}
          onClick={() => {
            if (Config.demo) {
              dispatch({ type: 'snack', severity: 'info', content: 'export data can not be performed in demo mode' });
            } else {
              exportData(customers);
            }
          }}
        >
          Export Data
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (Config.demo) {
              dispatch({
                type: 'snack',
                severity: 'info',
                content: 'add user action can not be performed in demo mode',
              });
            } else {
              setCreateDialog(true);
            }
          }}
        >
          Add user
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search user"
                variant="outlined"
                onChange={(e) => {
                  dispatch(getUsers({ text: e.target.value, limit: 500 }));
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <CreateDialog open={createDialog} setOpen={setCreateDialog} />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
