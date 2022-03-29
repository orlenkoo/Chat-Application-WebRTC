import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Page from 'src/components/Page';
import logo from '../../assets/logo-text.png';
import background from '../../assets/background/2000x1050.jpg';
import './style.sass';
import requestCode from '../../actions/auth/requestCode';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(34,34,34,.8)',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  error: {
    color: theme.colors.red[500],
  },
}));

const ForgotView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Page
      className={classes.root}
      title="Forgot Password"
      style={{ minHeight: 462 + 120 }}
    >
      <img className="background" src={background} alt="" />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="xs">
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values, actions) => {
              dispatch(requestCode({
                email: values.email,
                navigate,
                actions
              }));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="center">
                  <img className="logo" src={logo} alt="logo" />
                </Box>
                <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Enterprise Messaging & Conferencing Platform
                  </Typography>
                </Box>
                {Object.keys(errors).length > 0 && (
                  <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                    <Typography
                      className={classes.error}
                      gutterBottom
                      variant="body2"
                    >
                      {errors.email}
                    </Typography>
                  </Box>
                )}
                <TextField
                  error={Boolean(errors.username)}
                  fullWidth
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  style={{ backgroundColor: 'hsla(0,0%,100%,.1)' }}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Send auth code
                  </Button>
                </Box>

                <Typography
                  color="textSecondary"
                  variant="h5"
                >
                  <Grid container direction="row">
                    <Grid item xs={12} container justify="center">
                      <Grid item xs={12} container direction="row" justify="center">
                        <Link
                          component={RouterLink}
                          to="/auth/login"
                          variant="h6"
                        >
                          Remember your password? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default ForgotView;
