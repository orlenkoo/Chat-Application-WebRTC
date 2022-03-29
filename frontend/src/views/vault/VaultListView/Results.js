import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button, Grid, CircularProgress
} from '@material-ui/core';
import {
  Trash as TrashIcon,
  Edit as EditIcon,
  HardDrive as HardDriveIcon,
  Download as DownloadIcon
} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Config from '../../../config';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (!bytes) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round((bytes / 1024 ** i) * 10, 2) / 10} ${sizes[i]}`;
}

const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedShield, setSelectedShield] = useState({});
  const dispatch = useDispatch();
  const files = useSelector((state) => state.vault.files);

  if (!files) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (files.length === 0) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Typography variant="body1">
          No files to show for the selected filters.
        </Typography>
      </Grid>
    );
  }

  const handleSelectAll = (event) => {
    let newSelectedFileIds;

    if (event.target.checked) {
      newSelectedFileIds = files.map((file) => file.id);
    } else {
      newSelectedFileIds = [];
    }

    setSelectedFileIds(newSelectedFileIds);
  };

  const handleSelectOne = (event, id) => {
    if (selectedFileIds.includes(id)) {
      const selection = [...selectedFileIds];
      selection.splice(selection.indexOf(id), 1);
      setSelectedFileIds(selection);
    } else {
      setSelectedFileIds([...selectedFileIds, id]);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const download = async (file) => {
    let url = `${Config.url}/api/vault/${file.shield}`;
    if (file.auth) {
      try {
        const result = await axios.post(`${Config.url}/api/vault/sign`, { shield: file.shield });
        url = result.data.url;
      } catch (e) {
        dispatch({ type: 'snack', content: 'download failed: error while generating url', severity: 'error' });
        return;
      }
    }
    dispatch({ type: 'snack', content: `download started: ${file.name}`, severity: 'info' });
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table style={{ overflowX: 'scroll' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFileIds.length === files.length}
                    color="primary"
                    indeterminate={
                      selectedFileIds.length > 0
                      && selectedFileIds.length < files.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Quick Actions
                </TableCell>
                <TableCell>
                  Date Upload
                </TableCell>
                <TableCell>
                  Size
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Tags
                </TableCell>
                <TableCell>
                  Visibility
                </TableCell>
                <TableCell>
                  Views
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.slice(0, limit).map((file) => (
                <TableRow
                  hover
                  key={file.id}
                  selected={selectedFileIds.includes(file.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFileIds.includes(file.id)}
                      onChange={(event) => handleSelectOne(event, file.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {file.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell width={306}>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ height: 36, marginRight: 6 }}
                    >
                      <HardDriveIcon size={16} />
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ height: 36, marginRight: 6 }}
                      onClick={() => download(file)}
                    >
                      <DownloadIcon size={16} />
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ height: 36, marginRight: 6 }}
                    >
                      <EditIcon size={16} />
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ height: 36 }}
                      onClick={() => {
                        setSelectedShield(file);
                        setDeleteDialog(true);
                      }}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {moment(file.createdAt).format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell>
                    {bytesToSize(file.size)}
                  </TableCell>
                  <TableCell>
                    {file.type}
                  </TableCell>
                  <TableCell>
                    {(file.tags || []).join(', ')}
                  </TableCell>
                  <TableCell>
                    {file.auth ? 'Private' : 'Public'}
                  </TableCell>
                  <TableCell>
                    {file.views}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={files.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} shield={selectedShield} />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
