import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles, CircularProgress, Grid
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useSelector } from 'react-redux';
import formatBytes from '../../../utils/formatBytes';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestFiles = ({ className, ...rest }) => {
  const classes = useStyles();
  const latest = useSelector((state) => state.stats.latest);
  const navigate = useNavigate();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Files" />
      <Divider />
      <PerfectScrollbar>
        {latest
          ? (
            <Box overflowX="scroll">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Owner
                    </TableCell>
                    <TableCell>
                      Size
                    </TableCell>
                    <TableCell>
                      Timestamp
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latest.map((file) => (
                    <TableRow
                      hover
                      key={file.id}
                    >
                      <TableCell>
                        {`${file.name.substr(0, 70)}${file.name.length > 70 ? '...' : 0}`}
                      </TableCell>
                      <TableCell>
                        {file.owner[0] ? `${file.owner[0].firstName} ${file.owner[0].lastName}` : 'n/a'}
                      </TableCell>
                      <TableCell>
                        {formatBytes(file.size)}
                      </TableCell>
                      <TableCell>
                        {moment(file.timestamp).fromNow()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Grid container justify="center" alignItems="center" style={{ height: '100%', minHeight: 200 }}>
              <CircularProgress />
            </Grid>
          )}
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={() => navigate('/vault', { replace: false })}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestFiles.propTypes = {
  className: PropTypes.string
};

export default LatestFiles;
