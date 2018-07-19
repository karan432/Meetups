import meetups from '@/pages/meetups/meetups'
import myMeetups from '@/pages/meetups/myMeetups'

export const routes = [{
  path: '/meetups',
  component: meetups,
  name: 'meetups'
}, {
  path: '/myMeetups',
  component: myMeetups,
  name: 'myMeetups'
}]
