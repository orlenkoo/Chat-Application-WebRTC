import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles, CircularProgress
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import formatBytes from '../../../utils/formatBytes';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const BandwidthConsumption = ({ className, ...rest }) => {
  const classes = useStyles();
  const bandwidth = useSelector((state) => state.stats.bandwidth);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent style={{ paddingBottom: 16 }}>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              BANDWIDTH CONSUMPTION
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {bandwidth
                ? formatBytes((bandwidth.upload + bandwidth.download), 1)
                : <CircularProgress size={24} />}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SwapHorizIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {bandwidth ? `${formatBytes(bandwidth.download, 1)} download / ${formatBytes(bandwidth.upload, 1)} upload` : <span>&nbsp;</span>}
        </Typography>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          &#8734;
        </Typography>
      </CardContent>
    </Card>
  );
};

BandwidthConsumption.propTypes = {
  className: PropTypes.string
};

export default BandwidthConsumption;
