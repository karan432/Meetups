<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item 
            v-for="(meetup, index) in featuredMeetups" 
            :key="index"
            :src="meetup.coverPicURL"
            @click.native="onShowDetails(meetup)"
            style="cursor: pointer"
          >
            <!-- <div class="title">
              Welcome to Meetups
            </div> -->
            <v-container fill-height>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <h3 class="display-1 white--text">Welcome to Meetups</h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <!-- <v-flex xs12>
        <carousel 
          :per-page="1"
          :autoplay="true"
          :navigationEnabled="true"
        >
          <slide v-for="(meetup, index) in featuredMeetups" :key="index">
            <v-card>
              <v-card-media
                :src="meetup.coverPicURL"
                height="500px"
                class="primary"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                  <v-layout fill-height justify-center align-center>
                    <v-flex xs12 flexbox style="text-align: center;">
                      <h1 class="headline white--text">Welcome to Meetups</h1>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
            </v-card>
          </slide>
        </carousel>
      </v-flex> -->
    </v-layout>
    <v-toolbar
      dense
      color="primary"
      dark
      extended
      flat
    >
      <!-- <v-toolbar-title class="mx-auto" slot="extension">
        <span>Welcome to Meetups</span>
        <h2>Meet like minded people.</h2>
      </v-toolbar-title> -->
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
                <v-flex xs12 sm6 md6 lg4 v-for="meetup in featuredMeetups" :key="meetup.id">
                  <meetupCard
                    :meetup="meetup"
                    @click.native="onShowDetails(meetup)"
                    style="cursor: pointer"
                  >
                  </meetupCard>
                </v-flex>
              </v-layout>
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
import { Carousel, Slide } from 'vue-carousel'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters({
      allMeetups: 'getMeetups'
    }),
    totalMeetups () {
      return Object.keys(this.allMeetups).length
    },
    featuredMeetups () {
      var keys = Object.keys(this.allMeetups)
      if (keys.length < 6) {
        return keys.map((key) => {
          return this.allMeetups[key]
        })
      } else {
        var featured = []
        for (var i = 0; i < 6; i++) {
          featured.push(this.allMeetups[keys[i]])
        }
        return featured
      }
    }
  },
  data () {
    return {
      icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
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
    meetupDetails,
    Carousel,
    Slide
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

.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
