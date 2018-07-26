<template>
  <v-container fluid>
    <h3
      v-if="totalMeetups === 0"
    >
      No Meetups at the moment...
    </h3>
    <v-layout row>
      <v-flex xs12 sm4 md3 lg3>

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 lg3 v-for="meetup in meetups" :key="meetup.id">
        <meetupCard
          :meetup="meetup"
          @click.native="onShowDetails(meetup)"
          style="cursor: pointer"
        >
        </meetupCard>
      </v-flex>
    </v-layout>
    <meetupDetails
      :dialog="meetupDetailsDialog"
      v-on:close="closeMeetupDetails"
      :meetup="meetup"
    >
    </meetupDetails>
  </v-container>
</template>

<script>
import meetupCard from '@/components/meetups/meetupCard'
import meetupDetails from '@/components/meetups/meetupDetails'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'meetups',
  computed: {
    ...mapGetters({
      meetups: 'getMeetups',
      categories: 'getMeetupCategories'
    }),
    totalMeetups () {
      return Object.keys(this.meetups).length
    }
  },
  data () {
    return {
      meetupDetailsDialog: false,
      meetup: {
        title: '',
        coverPicURL: '',
        description: '',
        date: null,
        time: null,
        location: '',
        category: '',
        user: {
          photoURL: '',
          displayName: '',
          email: ''
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchAllMeetups'
    ]),
    onShowDetails (meetup) {
      console.log('called showDetails for: ', meetup)
      this.meetup = meetup
      this.meetupDetailsDialog = true
    },
    closeMeetupDetails () {
      this.meetupDetailsDialog = false
    }
  },
  components: {
    meetupCard,
    meetupDetails
  },
  created () {
    this.fetchAllMeetups().then(res => {

    }).catch(error => {
      alert('Could not fetch meetups, ' + error)
    })
  }
}
</script>

<style>
</style>
