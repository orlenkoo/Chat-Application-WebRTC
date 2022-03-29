import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import StorageIcon from '@material-ui/icons/StorageOutlined';
import { useSelector } from 'react-redux';
import formatBytes from '../../../utils/formatBytes';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const DiskSpace = ({ className, ...rest }) => {
  const classes = useStyles();
  const disk = useSelector((state) => state.stats.disk);

  const space = disk
    ? ((disk.diskSize - disk.availableSize) / disk.diskSize) * 100
    : null;

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
              DISK SPACE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {space ? `${space.toFixed(2)}%` : <CircularProgress size={24} />}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <StorageIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {disk ? `${formatBytes((disk.diskSize - disk.availableSize), 1)} used / ${formatBytes(disk.availableSize, 1)} available ` : <span>&nbsp;</span>}
        </Typography>
        <Box mt={1}>
          <LinearProgress
            value={space}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

DiskSpace.propTypes = {
  className: PropTypes.string
};

export default DiskSpace;
