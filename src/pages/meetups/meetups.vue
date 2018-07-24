<template>
  <v-container fluid>
    <h3
      v-if="totalMeetups === 0"
    >
      No Meetups at the moment...
    </h3>
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
  </v-container>
</template>

<script>
import meetupCard from '@/components/meetups/meetupCard'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'meetups',
  computed: {
    ...mapGetters({
      meetups: 'getMeetups'
    }),
    totalMeetups () {
      return Object.keys(this.meetups).length
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'fetchAllMeetups'
    ]),
    onShowDetails (meetup) {
      console.log('called showDetails for: ', meetup)
    }
  },
  components: {
    meetupCard
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
