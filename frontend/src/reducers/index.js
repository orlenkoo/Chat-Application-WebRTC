import { combineReducers } from 'redux';
import agenda from './agenda';
import auth from './auth';
import config from './config';
import theme from './theme';
import snack from './snack';
import stats from './stats';
import register from './register';
import media from './media';
import room from './room';
import rooms from './rooms';
import form from './form';
import users from './users';
import vault from './vault';

export default combineReducers({
  agenda, auth, config, theme, snack, stats, register, room, rooms, form, users, vault, media,
});
