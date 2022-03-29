import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import Mail from '@material-ui/icons/Mail';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Page from 'src/components/Page';
import Config from '../../config';
import logo from '../../assets/logo-text.png';
import background from '../../assets/background/2000x1050.jpg';
import './style.sass';
import register from '../../actions/auth/register';

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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
              username: '',
              email: '',
              firstName: '',
              lastName: '',
              password: ''
            }}
            onSubmit={(values, actions) => {
              dispatch(register({
                username: values.username,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
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
                      {
                        errors.username
                        || errors.email
                        || errors.firstName
                        || errors.lastName
                        || errors.password
                      }
                    </Typography>
                  </Box>
                )}
                <TextField
                  error={Boolean(errors.username)}
                  fullWidth
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                  placeholder="Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  style={{ backgroundColor: 'hsla(0,0%,100%,.1)' }}
                />
                <TextField
                  error={Boolean(errors.email)}
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
                        <Mail />
                      </InputAdornment>
                    ),
                  }}
                  style={{ backgroundColor: 'hsla(0,0%,100%,.1)' }}
                />
                <TextField
                  error={Boolean(errors.firstName)}
                  fullWidth
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.firstName}
                  variant="outlined"
                  placeholder="First name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  style={{ backgroundColor: 'hsla(0,0%,100%,.1)' }}
                />
                <TextField
                  error={Boolean(errors.lastName)}
                  fullWidth
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.lastName}
                  variant="outlined"
                  placeholder="Last name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  style={{ backgroundColor: 'hsla(0,0%,100%,.1)' }}
                />
                <TextField
                  error={Boolean(errors.password)}
                  fullWidth
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
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
                    Sign up
                  </Button>
                </Box>

                <Typography
                  color="textSecondary"
                  variant="h5"
                >
                  <Hidden smUp>
                    <Grid container direction="row">
                      <Grid item xs={12} container justify="center">
                        <Grid item xs={12} container direction="row" justify="center">
                          <Link
                            component={RouterLink}
                            to="/auth/forgot"
                            variant="h6"
                          >
                            Forgot password
                          </Link>
                        </Grid>
                        {Config.registerEnabled && (
                          <Box mt={2}>
                            <Link
                              component={RouterLink}
                              to="/auth/login"
                              variant="h5"
                            >
                              Do you have an account? Sign in
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
                    <Grid container direction="row">
                      <Grid item sm={7}>
                        {Config.registerEnabled && (
                          <Box>
                            <Link
                              component={RouterLink}
                              to="/auth/login"
                              variant="h6"
                            >
                              Do you have an account? Sign in
                            </Link>
                          </Box>
                        )}
                      </Grid>
                      <Grid item sm={5} container direction="row" justify="flex-end" mb={5}>
                        <Link
                          component={RouterLink}
                          to="/auth/forgot"
                          variant="h6"
                        >
                          Forgot password
                        </Link>
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
