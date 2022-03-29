import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import Page from 'src/components/Page';
import Config from '../../config';
import logo from '../../assets/logo-text.png';
import background from '../../assets/background/2000x1050.jpg';
import './style.sass';
import confirmRegister from '../../actions/auth/confirmRegister';

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

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    username, email, password, firstName, lastName,
  } = useSelector((state) => state.register);

  return (
    <Page
      className={classes.root}
      title="Sign up"
      style={{ minHeight: 647 + 120 }}
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
              code: '',
            }}
            onSubmit={(values, actions) => {
              dispatch(confirmRegister({
                username,
                email,
                firstName,
                lastName,
                password,
                code: values.code,
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
                <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="body2"
                  >
                    A verification code has been sent to your email address
                  </Typography>
                </Box>
                {Object.keys(errors).length > 0 && (
                  <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                    <Typography
                      className={classes.error}
                      gutterBottom
                      variant="body2"
                    >
                      {
                        errors.username
                        || errors.email
                        || errors.firstName
                        || errors.lastName
                        || errors.password
                        || errors.code
                      }
                    </Typography>
                  </Box>
                )}
                <TextField
                  error={Boolean(errors.code)}
                  fullWidth
                  margin="normal"
                  name="code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.code}
                  variant="outlined"
                  placeholder="Verification Code"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
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
                    Verify
                  </Button>
                </Box>

                <Typography
                  color="textSecondary"
                  variant="h5"
                >
                  <Hidden smUp>
                    <Grid container direction="row">
                      <Grid item xs={12} container justify="center">
                        <Grid item xs={12} container direction="row" justify="center" />
                        {Config.registerEnabled && (
                          <Box mt={2}>
                            <Link
                              component={RouterLink}
                              to="/auth/register"
                              variant="h5"
                            >
                              Back to register form
                            </Link>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Hidden>
                </Typography>

                <Typography
                  color="textSecondary"
                  variant="h6"
                >
                  <Hidden xsDown>
                    <Grid container>
                      <Grid sm={12} container direction="row" justify="center">
                        {Config.registerEnabled && (
                          <Box>
                            <Link
                              component={RouterLink}
                              to="/auth/register"
                              variant="h6"
                            >
                              Back to register form
                            </Link>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Hidden>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
