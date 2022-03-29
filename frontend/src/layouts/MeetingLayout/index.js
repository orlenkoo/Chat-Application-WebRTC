import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import TopBar from './TopBar';
import refreshUser from '../../actions/auth/refreshUser';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingBottom: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isNavOpen, setNavOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigate('/auth/login', { replace: true });
    dispatch(refreshUser());
  }, [token]);

  if (!token) return null;

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setNavOpen(true)} />
      <NavBar
        onMobileClose={() => setNavOpen(false)}
        openMobile={isNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
