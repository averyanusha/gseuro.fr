import Calendar from '@toast-ui/react-calendar';

export default function MyCalendar() {
  return (
    <Calendar
      height="600px"
      view="month"
      useFormPopup={true}
      useDetailPopup={true}
      calendars={[{ id: '1', name: 'My Calendar', color: '#fff', bgColor: '#9e5fff' }]}
      schedules={[
        {
          id: '1',
          calendarId: '1',
          title: 'Event',
          category: 'time',
          dueDateClass: '',
          start: '2025-07-01T10:30:00+09:00',
          end: '2025-07-01T12:30:00+09:00',
        }
      ]}
    />
  )
}
