import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useNavigate } from 'react-router';
import GlobalStyles from 'src/components/GlobalStyles';
import routes from 'src/routes';
import { useDispatch, useSelector } from 'react-redux';
import Snack from './components/Snack';
import RingingDialog from './components/RingingDialog';
import initIO from './actions/auth/initIO';
import getTheme from './theme';
import config from './config';
import { subscribeUser } from './subscription';

const App = () => {
  const routing = useRoutes(routes);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const dark = useSelector((state) => state.theme.dark);
  const dialog = useSelector((state) => state.media.dialog);
  const navigate = useNavigate();

  const theme = React.useMemo(() => createMuiTheme(getTheme(dark)), [dark]);

  useEffect(() => {
    if (token) {
      dispatch(initIO(token, navigate));
      if (config.vapidKey && typeof config.vapidKey === 'string') {
        subscribeUser();
      } else {
        console.log('desktop notifications not available: invalid vapid key');
      }
    }
  }, [token]);

  useEffect(() => {
    if (config.preferDark) {
      dispatch({ type: 'set dark mode', dark: true });
    } else {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        dispatch({ type: 'set dark mode', dark: e.matches });
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <Snack />
      <RingingDialog open={dialog} />
    </ThemeProvider>
  );
};

export default App;
