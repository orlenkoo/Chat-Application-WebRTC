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
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useSelector } from 'react-redux';
import formatBytes from '../../../utils/formatBytes';
import getSign from '../../../utils/getSign';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalDataSize = ({ className, ...rest }) => {
  const classes = useStyles();
  const data = useSelector((state) => state.stats.data);

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
              TOTAL DATA SIZE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {data ? formatBytes((data.dataSize), 1) : <CircularProgress size={24} />}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EqualizerIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {data
            ? `${getSign(data.variation.month)}${formatBytes(Math.abs(data.variation.month), 1)} this month`
            : <span>&nbsp;</span>}
        </Typography>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {data
            ? `${getSign(data.variation.week)}${formatBytes(Math.abs(data.variation.week), 1)} in the last 7 days`
            : <span>&nbsp;</span>}
        </Typography>
      </CardContent>
    </Card>
  );
};

TotalDataSize.propTypes = {
  className: PropTypes.string
};

export default TotalDataSize;
