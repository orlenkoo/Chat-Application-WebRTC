import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Page from 'src/components/Page';
import logo from '../../assets/logo-text.png';
import background from '../../assets/background/2000x1050.jpg';
import './style.sass';
import changePassword from '../../actions/auth/changePassword';

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
  info: {
    color: theme.colors.orange[400],
  },
}));

const CodeView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

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
      title="Login"
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
              code: '',
              password: ''
            }}
            onSubmit={(values, actions) => {
              dispatch(changePassword({
                email,
                code: values.code,
                password: values.password,
                navigate,
                actions,
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
                {Object.keys(errors).length === 0 && (
                  <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                    <Typography
                      className={classes.info}
                      gutterBottom
                      variant="body2"
                    >
                      We sent you an auth code, wait a couple of minutes
                    </Typography>
                  </Box>
                )}
                {Object.keys(errors).length > 0 && (
                  <Box mt={1.5} mb={0.5} display="flex" flexDirection="column" alignItems="center">
                    <Typography
                      className={classes.error}
                      gutterBottom
                      variant="body2"
                    >
                      {errors.code || errors.password}
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
                  placeholder="Auth code"
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
                  placeholder="New password"
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
                    Change password
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

export default CodeView;
