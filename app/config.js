export const config = {
  icons: {
    'favor-love':    'heart',
    'favor-like':    'arrow',
    'favor-accept':  'check',
    'favor-dislike': { icon: 'arrow', rotate: 180 },
    'arrow-left':    { icon: 'arrow', rotate: 270 },
    'arrow-right':   { icon: 'arrow', rotate: 90 },
    'favor-reject':  'close',
    'favor-unknown': 'question',
  },
  navigation: [
    { name: 'Home',      icon: 'dashboard-icon', route: 'index',    side: false },
    { name: 'Schedule',  icon: 'schedule-icon',  route: 'schedule', side: false },
    { name: 'Meals',     icon: 'meal-icon',      route: 'meals' },
    { name: 'Attendees', icon: 'attendees-icon', route: 'attendees' },
    { name: 'Slots',     icon: 'slots-icon',     route: 'slots' },
  ],
}
export default config;
