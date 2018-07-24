<template>
  <div>
    <v-toolbar
      dense
      color="primary"
      dark
      extended
      extension-height="300"
      flat
    >
      <v-toolbar-title class="mx-auto" slot="extension">
        <span>Welcome to Meetups</span>
        <h2>Meet like minded people.</h2>
        <!-- <v-layout row>
          <v-flex wrap>
            <v-btn outline large fab color="white" class="outine-2">
              <i class="fab fa-vuejs fa-3x"></i>
              <v-icon large>mdi-map-marker-circle</v-icon>
            </v-btn>
          </v-flex>
          <v-flex wrap>
            <v-btn outline large fab color="white" class="outine-2">
              <i class="fab fa-node fa-3x"></i>
              <v-icon large>add_circle_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout> -->
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 class="white--text">Discover Meetups</h2>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6 lg4 v-for="meetup in allMeetups" :key="meetup.id">
                  <meetupCard
                    :meetup="meetup"
                    @click.native="onShowDetails(meetup)"
                    style="cursor: pointer"
                  >
                  </meetupCard>
                </v-flex>
              </v-layout>
              <!-- <v-layout row wrap>
                <v-flex xs12 sm6 md6 lg4>
                  <depthCard
                    data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="
                  >
                    <h1 slot="header">Canyons</h1>
                    <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                  </depthCard>
                </v-flex>
              </v-layout> -->
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <meetupDetails
      :dialog="meetupDetailsDialog"
      v-on:close="closeMeetupDetails"
      :meetup="meetup"
    >
    </meetupDetails>
    <v-footer height="auto">
      <v-card
        flat
        tile
        color="primary"
        class="white--text text-xs-center"
        style="width:100%"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            icon
            class="mx-3 white--text"
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Meet like minded people and make amazing friends.
        </v-card-text>
        <v-card-text class="white--text">
          &copy;2018 — <strong>Meetups</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
// import depthCard from '@/components/shared/depthCard'
import meetupCard from '@/components/meetups/meetupCard'
import meetupDetails from '@/components/meetups/meetupDetails'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters({
      allMeetups: 'getMeetups'
    }),
    totalMeetups () {
      return Object.keys(this.allMeetups).length
    }
  },
  data () {
    return {
      icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
      meetupDetailsDialog: false,
      meetup: {}
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

<style scoped>
.outine-2 {
  border: 2px solid white;
}

.card--flex-toolbar {
  margin-top: -104px;
}

.learn-more-btn {
  text-transform: initial;
  text-decoration: underline;
}
</style>
