import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import getFiles from '../../../actions/vault/getFiles';
import exportData from '../../../utils/exportData';
import UploadDialog from './UploadDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    padding: theme.spacing(2, 4, 3),
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [uploadDialog, setUploadDialog] = useState(false);

  const dispatch = useDispatch();
  const files = useSelector((state) => state.vault.files);

  const csvData = [
    ['shield', 'tags', 'auth', 'views', 'name', 'description', 'extension', 'type', 'size', 'duration', 'width', 'height', 'timestamp'],
  ];

  if (files) {
    files.forEach((e) => {
      // eslint-disable-next-line max-len, no-underscore-dangle
      csvData.push([e.shield, (e.tags || []).join(','), e.auth, e.views, e.name, e.description, e.extension, e.type, e.size, e.duration, e.width, e.height, e.timestamp]);
    });
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <CSVLink data={csvData} filename="vault.csv">
          <Button className={classes.exportButton}>
            Export CSV
          </Button>
        </CSVLink>
        <Button className={classes.exportButton} onClick={() => exportData(files)}>
          Export Data
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setUploadDialog(true)}
        >
          Upload Files
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent style={{ paddingBottom: 16 }}>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search files"
                variant="outlined"
                onChange={(e) => dispatch(getFiles(e.target.value))}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <UploadDialog open={uploadDialog} setOpen={setUploadDialog} />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
