import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Page from 'src/components/Page';
import BandwidthConsumption from './BandwidthConsumption';
import LatestFiles from './LatestFiles';
import TrafficData from './TrafficData';
import DiskSpace from './DiskSpace';
import TotalDataSize from './TotalDataSize';
import TotalProfit from './TotalProfit';
import FilesByType from './FilesByType';
import getOverall from '../../../actions/stats/getOverall';
import getTraffic from '../../../actions/stats/getTraffic';
import getData from '../../../actions/stats/getData';
import getLatest from '../../../actions/stats/getLatest';
import getType from '../../../actions/stats/getType';
import getBandwidth from '../../../actions/stats/getBandwidth';
import getDisk from '../../../actions/stats/getDisk';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOverall());
    dispatch(getTraffic(7));
    dispatch(getData());
    dispatch(getLatest());
    dispatch(getType());
    dispatch(getBandwidth());
    dispatch(getDisk());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <BandwidthConsumption />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalDataSize />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <DiskSpace />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <TrafficData />
          </Grid>
          <Grid item lg={4} md={12} xl={3} xs={12}>
            <FilesByType />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestFiles />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
