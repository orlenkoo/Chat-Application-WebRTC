import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
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
  makeStyles, Grid, CircularProgress, Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  Edit as EditIcon,
  Trash as TrashIcon
} from 'react-feather';
import DeleteDialog from './DeleteDialog';
import Config from '../../../config';
import EditDialog from './EditDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const customers = useSelector((state) => state.users.users);

  const dispatch = useDispatch();

  if (!customers) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (customers.length === 0) {
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Typography variant="body1">
          No users to show for the selected filters.
        </Typography>
      </Grid>
    );
  }

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    if (selectedCustomerIds.includes(id)) {
      const selection = [...selectedCustomerIds];
      selection.splice(selection.indexOf(id), 1);
      setSelectedCustomerIds(selection);
    } else {
      setSelectedCustomerIds([...selectedCustomerIds, id]);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
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
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
                <TableCell>
                  Tenant
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page * limit, page * limit + limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.includes(customer.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.includes(customer.id)}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={customer.picture && `${Config.url}/api/vault/${customer.picture}?thumbnail=little`}
                      />
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {!Config.demo ? customer.fullName : '[demo privacy]'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell width={306}>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ height: 36, marginRight: 6 }}
                      onClick={() => {
                        if (Config.demo) {
                          dispatch({
                            type: 'snack',
                            severity: 'info',
                            content: 'edit user action can not be performed in demo mode',
                          });
                        } else {
                          setSelectedUser(customer);
                          setEditDialog(true);
                        }
                      }}
                    >
                      <EditIcon size={16} />
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ height: 36 }}
                      onClick={() => {
                        if (Config.demo) {
                          dispatch({
                            type: 'snack',
                            severity: 'info',
                            content: 'delete user action can not be performed in demo mode',
                          });
                        } else {
                          setSelectedUser(customer);
                          setDeleteDialog(true);
                        }
                      }}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {!Config.demo ? customer.username : '[demo privacy]'}
                  </TableCell>
                  <TableCell>
                    {!Config.demo ? customer.email : '[demo privacy]'}
                  </TableCell>
                  <TableCell>
                    {!Config.demo ? moment(customer.registrationDate).format('DD/MM/YYYY hh:mm A') : '[demo privacy]'}
                  </TableCell>
                  <TableCell>
                    {!Config.demo ? customer.tenant.substr(0, 20) : '[demo privacy]'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} user={selectedUser} />
      <EditDialog open={editDialog} setOpen={setEditDialog} user={selectedUser} />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
