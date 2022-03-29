import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import MeetingLayout from 'src/layouts/MeetingLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/users/UsersAdminView';
import ChatView from 'src/views/chat/ChatView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import VerifyView from 'src/views/auth/VerifyView';
import Config from './config';
import ForgotView from './views/auth/ForgotView';
import CodeView from './views/auth/CodeView';
import CreditsView from './views/auth/CreditsView';
import WelcomeView from './views/chat/WelcomeView';
import EndedView from './views/meeting/EndedView';
import GuestView from './views/meeting/GuestView';
import JoinView from './views/meeting/JoinView';
import MeetingView from './views/meeting/MeetingView';
import QuickStartView from './views/meeting/QuickStartView';
import CalendarView from './views/calendar/CalendarView';

const registerRoutes = Config.registerEnabled ? [
  { path: 'register', element: <RegisterView /> },
  { path: 'verify', element: <VerifyView /> },

] : [];

const routes = [
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      { path: '', element: <Navigate to="/welcome" /> },
      { path: 'settings', element: <AccountView /> },
      { path: 'users', element: <CustomerListView /> },
      { path: 'room/:id', element: <ChatView /> },
      { path: 'welcome', element: <WelcomeView /> },
      { path: 'calendar', element: <CalendarView /> },
    ]
  },
  {
    path: '/meeting',
    element: <MeetingLayout />,
    children: [
      { path: '', element: <QuickStartView /> },
      { path: 'guest', element: <GuestView /> },
      { path: ':id', element: <MeetingView /> },
      { path: ':id/join', element: <JoinView /> },
      { path: ':id/ended', element: <EndedView /> },
      { path: ':id/guest', element: <GuestView /> },
      { path: '*', element: <NotFoundView /> }
    ]
  },
  {
    path: '/meetings',
    element: <MeetingLayout />,
    children: [
      { path: '', element: <QuickStartView /> },
      { path: 'guest', element: <GuestView /> },
      { path: ':id', element: <MeetingView /> },
      { path: ':id/join', element: <JoinView /> },
      { path: ':id/ended', element: <EndedView /> },
      { path: ':id/guest', element: <GuestView /> },
      { path: '*', element: <NotFoundView /> }
    ]
  },
  {
    path: '/auth',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/login" /> },
      { path: 'login', element: <LoginView /> },
      { path: 'forgot', element: <ForgotView /> },
      { path: 'code', element: <CodeView /> },
      { path: 'credits', element: <CreditsView /> },
      ...registerRoutes,
      { path: '*', element: <NotFoundView /> }
    ]
  },
  {
    path: '/404',
    element: <MainLayout />,
    children: [
      { path: '', element: <NotFoundView /> },
    ]
  },
  {
    path: '/login',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/login" /> },
    ]
  },
  {
    path: '/register',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/register" /> },
    ]
  },
  {
    path: '/forgot',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/forgot" /> },
    ]
  },
  {
    path: '/code',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/code" /> },
    ]
  },
  {
    path: '/credits',
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/credits" /> },
    ]
  },
  { path: '*', element: <NotFoundView /> }
];

export default routes;
