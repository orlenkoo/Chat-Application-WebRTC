import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme, CircularProgress, Grid
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import DescriptionIcon from '@material-ui/icons/Description';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const FilesByType = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const type = useSelector((state) => state.stats.type);

  let images = 0;
  let videos = 0;
  let others = 0;

  if (type) {
    images = type.images;
    videos = type.videos;
    others = type.others + type.pdf;
  }

  const SuspenseDoughnut = () => {
    if (!type) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
          <CircularProgress />
        </Grid>
      );
    }

    const data = {
      datasets: [
        {
          data: [images, videos, others],
          backgroundColor: [
            colors.indigo[500],
            colors.red[600],
            colors.orange[600]
          ],
          borderWidth: 8,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: ['Images', 'Videos', 'Others']
    };

    const options = {
      animation: false,
      cutoutPercentage: 80,
      layout: { padding: 0 },
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        backgroundColor: theme.palette.background.default,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary
      }
    };

    return (
      <Doughnut
        data={data}
        options={options}
      />
    );
  };

  const SuspenseDevices = () => {
    if (!type) return null;

    const devices = [
      {
        title: 'Images',
        value: images,
        icon: ImageIcon,
        color: colors.indigo[500]
      },
      {
        title: 'Videos',
        value: videos,
        icon: VideoLabelIcon,
        color: colors.red[600]
      },
      {
        title: 'Others',
        value: others,
        icon: DescriptionIcon,
        color: colors.orange[600]
      }
    ];

    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
      >
        {devices.map(({
          color,
          icon: Icon,
          title,
          value
        }) => (
          <Box
            key={title}
            p={1}
            textAlign="center"
          >
            <Icon color="action" />
            <Typography
              color="textPrimary"
              variant="body1"
            >
              {title}
            </Typography>
            <Typography
              style={{ color }}
              variant="h2"
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Files by Type" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <SuspenseDoughnut />
        </Box>
        <SuspenseDevices />
      </CardContent>
    </Card>
  );
};

FilesByType.propTypes = {
  className: PropTypes.string
};

export default FilesByType;
