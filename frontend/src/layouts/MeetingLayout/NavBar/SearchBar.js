import React from 'react';
import { makeStyles } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    margin: 10,
  },
  input: {
    backgroundColor: theme.palette.background.default,
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <FormControl className={classes.searchBar} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{t('Search')}</InputLabel>
      <OutlinedInput
        className={classes.input}
        id="outlined-adornment-password"
        type="text"
        onChange={(e) => dispatch({ type: 'search', search: e.target.value })}
        endAdornment={(
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        )}
        labelWidth={52}
      />
    </FormControl>
  );
};

export default SearchBar;
