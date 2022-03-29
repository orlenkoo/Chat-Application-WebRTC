import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Page from 'src/components/Page';
import getUsers from '../../../actions/users/getUsers';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UsersAdminView = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ limit: 500 }));
  });

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default UsersAdminView;
