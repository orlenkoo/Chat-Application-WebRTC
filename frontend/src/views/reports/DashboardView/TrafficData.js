import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  useTheme,
  makeStyles,
  colors, Grid, CircularProgress
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import getTraffic from '../../../actions/stats/getTraffic';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TrafficData = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const traffic = useSelector((state) => state.stats.traffic);
  const [anchorEl, setAnchorEl] = useState(null);
  const [days, setDays] = useState(7);
  const [download, setDownload] = useState(true);
  const [upload, setUpload] = useState(true);
  const [write, setWrite] = useState(false);
  const [remove, setRemove] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (d = 7) => {
    if (d && typeof d === 'number') {
      setDays(d);
      dispatch(getTraffic(d));
    }
    setAnchorEl(null);
  };

  let unit = 0;

  if (traffic) {
    let max = 0;
    traffic.forEach((e) => {
      if (download && e.download > max) max = e.download;
      if (upload && e.upload > max) max = e.upload;
      if (write && e.write > max) max = e.write;
      if (remove && e.remove > max) max = e.remove;
      if ((max / 1024) > 2) unit = 1;
      if ((max / 1024 ** 2) > 2) unit = 2;
      if ((max / 1024 ** 3) > 2) unit = 3;
      if ((max / 1024 ** 4) > 2) unit = 4;
      if ((max / 1024 ** 5) > 2) unit = 5;
      if ((max / 1024 ** 5) > 2) unit = 6;
      if ((max / 1024 ** 5) > 2) unit = 7;
    });
  }

  const getUnit = () => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
    return units[unit];
  };

  const SuspenseChart = () => {
    if (!traffic) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
          <CircularProgress />
        </Grid>
      );
    }

    const datasets = [];

    if (download) {
      datasets.push({
        backgroundColor: colors.indigo[500],
        data: traffic.map((e) => Math.round((e.download * 10) / 1024 ** unit) / 10),
        label: 'Download'
      });
    }
    if (upload) {
      datasets.push({
        backgroundColor: colors.red[600],
        data: traffic.map((e) => Math.round((e.upload * 10) / 1024 ** unit) / 10),
        label: 'Upload'
      });
    }
    if (write) {
      datasets.push({
        backgroundColor: colors.orange[600],
        data: traffic.map((e) => Math.round((e.write * 10) / 1024 ** unit) / 10),
        label: 'Write'
      });
    }
    if (remove) {
      datasets.push({
        backgroundColor: colors.green[600],
        data: traffic.map((e) => Math.round((e.remove * 10) / 1024 ** unit) / 10),
        label: 'Delete'
      });
    }

    const data = {
      datasets,
      labels: traffic.map((e) => moment(e.date).format('D MMM')),
    };

    const options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            barThickness: 12,
            maxBarThickness: 10,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
            ticks: {
              fontColor: theme.palette.text.secondary
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.secondary,
              beginAtZero: true,
              min: 0
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: theme.palette.divider,
              drawBorder: false,
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
              zeroLineColor: theme.palette.divider
            }
          }
        ]
      },
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
      <Bar
        data={data}
        options={options}
      />
    );
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Box>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="text"
            >
              {`Last ${days} days`}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose(2)}>Last 2 Days</MenuItem>
              <MenuItem onClick={() => handleClose(7)}>Last 7 Days</MenuItem>
              <MenuItem onClick={() => handleClose(30)}>Last 30 Days</MenuItem>
            </Menu>
          </Box>
        )}
        title={`Traffic Data (${getUnit()})`}
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <SuspenseChart />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <FormControlLabel
          control={(
            <Checkbox
              checked={download}
              onChange={(e) => setDownload(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          )}
          label="Download"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={upload}
              onChange={(e) => setUpload(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          )}
          label="Upload"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={write}
              onChange={(e) => setWrite(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          )}
          label="Write"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={remove}
              onChange={(e) => setRemove(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          )}
          label="Delete"
        />
      </Box>
    </Card>
  );
};

TrafficData.propTypes = {
  className: PropTypes.string
};

export default TrafficData;
