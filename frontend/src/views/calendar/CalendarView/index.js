import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Hidden, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';
import './calendar.sass';
import agenda from '../../../actions/events/agenda';

const getLanguage = () => {
  return i18n.language || (typeof window !== 'undefined' && window.localStorage.i18nextLng) || 'en';
};

const CalendarView = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.dark);
  const events = useSelector((state) => state.agenda.events);

  useEffect(() => {
    document.documentElement.style.setProperty('--fc-border-color', dark ? '#000' : '#ddd');
    document.documentElement.style.setProperty('--fc-list-event-hover-bg-color', dark ? '#232323' : '#f5f5f5');
    document.documentElement.style.setProperty('--fc-today-bg-color', dark ? '#191919' : '#f5f5f5');
    document.documentElement.style.setProperty('--fc-event-border-color', dark ? '#fff' : '#000');
    document.documentElement.style.setProperty('--fc-event-text-color', dark ? '#000' : '#fff');
    document.documentElement.style.setProperty('--fc-page-bg-color', dark ? '#1f1f1f' : '#fff');

    document.documentElement.style.setProperty('--fc-button-bg-color', '#000');
    document.documentElement.style.setProperty('--fc-button-border-color', '#000');
    document.documentElement.style.setProperty('--fc-button-active-border-color', dark ? '#121212' : '#232323');
    document.documentElement.style.setProperty('--fc-button-hover-border-color', '#121212');
    document.documentElement.style.setProperty('--fc-button-active-bg-color', dark ? '#121212' : '#232323');
    document.documentElement.style.setProperty('--fc-button-hover-bg-color', '#121212');

    document.documentElement.style.setProperty('--fc-event-bg-color', dark ? '#fff' : '#000');
    document.documentElement.style.setProperty('--fc-neutral-bg-color', dark ? '#121212' : 'rgba(208, 208, 208, 0.3)');

    dispatch(agenda());
  }, [dark]);

  return (
    <Paper
      flex={1}
      style={{
        height: '100%',
        padding: 20,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      }}
    >
      <Hidden xsDown>
        <FullCalendar
          locale={getLanguage()}
          plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth',
          }}
          initialView="dayGridMonth"
          height="100%"
          events={events.map((event) => ({
            _id: event._id,
            title: event.title,
            date: event.date, // 2021-05-12 format for full day
            meetingDate: event.date, // 2021-05-12 format for full day
            meeting: event.meeting,
            members: event.members,
          }))}
          editable
          eventClick={(e) => {
            const event = e.event._def;
            console.log('click', event);
            dispatch({ type: 'meeting-details', details: { ...event, ...event.extendedProps } });
            dispatch({ type: 'form-type', value: 'meeting-details' });
            dispatch({ type: 'form-open', value: true });
          }}
          eventDragStart={(e) => {
            console.log('drag start', e);
          }}
          eventDrop={(e) => {
            console.log('drag end', e);
          }}
        />
      </Hidden>
      <Hidden smUp>
        <FullCalendar
          plugins={[interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'listMonth',
          }}
          initialView="listMonth"
          height="100%"
          events={[
            { title: 'event 1', date: '2021-05-02T14:28:23.382748' },
            { title: 'event 2', date: '2021-05-15' },
            { title: 'event 3', date: '2021-05-17' },
            { title: 'event 4', date: '2021-05-17' },
            { title: 'event 5', date: '2021-05-18' },
            { title: 'event 6', date: '2021-05-15' },
            { title: 'event 7', date: '2021-05-20' }
          ]}
          editable
          eventClick={(e) => {
            console.log('click', e.event._def);
          }}
        />
      </Hidden>
    </Paper>
  );
};

export default CalendarView;
