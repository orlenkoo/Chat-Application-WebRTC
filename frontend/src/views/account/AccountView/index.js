import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Password from './Password';
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page
      className={classes.root}
      title={t('Settings')}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
            <Box mt={3}>
              <Logout />
            </Box>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
            <Box mt={3}>
              <Password />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
