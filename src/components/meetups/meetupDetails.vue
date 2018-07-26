<template>
  <v-layout row justify-center>
    <v-dialog 
      v-model="dialog"
      scrollable
      max-width="800px"
      persistent
    >
      <v-card>
        <v-card-media
          :src="meetup.coverPicURL"
          height="200px"
          :class="color"
        >
        </v-card-media>
        <v-tabs
          v-model="active"
          fixed-tabs
        >
          <v-tab
            :key="1"
            ripple
          >
            Details
          </v-tab>
          <v-tab-item
            :key="1"
          >
            <v-card-title>
              <v-layout row wrap>
                <v-flex xs12>
                  <h1>{{meetup.title}}</h1>
                </v-flex>
                <v-flex xs12>
                  {{meetup.date}}, {{meetup.time}}
                </v-flex>
                <v-flex xs12>
                  <b>@ </b>{{meetup.location}}
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              {{meetup.description}}
            </v-card-text>
            <v-card-text class="py-2">
              <v-switch
                v-if="isAuthenticated"
                label="Going"
                v-model="going"
                @change="onChangeGoing"
              ></v-switch>
              <v-subheader>
                Created By
              </v-subheader>
              <v-list two-line class="pt-0">
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img 
                      v-if="meetup.user.photoURL"
                      :src="meetup.user.photoURL"
                    >
                    <v-icon 
                      v-else
                      dark
                    >
                      person
                    </v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <b>{{meetup.user.displayName}}</b>
                    {{meetup.user.email}}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-tab-item>
          <v-tab
            :key="2"
            ripple
          >
            Going
            <v-badge 
              color="primary"
              v-if="totalGoing > 0"
              small
            >
              <span slot="badge">{{totalGoing > 99 ? '99+' : totalGoing }}</span>
            </v-badge>
          </v-tab>
          <v-tab-item
            :key="2"
          >
            <h3
              v-if="totalGoing === 0"
            >
              No users going at the moment.
            </h3>
            <template 
              v-for="(user) in goingUsers" >
              <v-list-tile :key="user.id">
                <v-list-tile-avatar>
                  <v-avatar class="primary" size="32">
                    <img 
                      v-if="user.photoURL"            
                      :src="user.photoURL"
                    >
                    <v-icon 
                      v-else
                      dark
                    >
                      person
                    </v-icon>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <b>{{user.displayName}}</b>
                  {{user.email}}
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="user.email"></v-divider>
            </template>
          </v-tab-item>
        </v-tabs>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="primary"
            @click="onClose"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'meetup-details',
  props: {
    dialog: {
      type: Boolean,
      default () {
        return false
      }
    },
    meetup: {
      type: Object,
      default () {
        return {
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
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    }),
    totalGoing () {
      return Object.keys(this.goingUsers).length
    },
    color () {
      return 'orange'
    }
  },
  data () {
    return {
      active: null,
      going: false,
      goingUsers: {}
    }
  },
  methods: {
    ...mapActions([
      'updateGoingStatus',
      'isGoing',
      'fetchAllGoingUsers'
    ]),
    onClose () {
      this.$emit('close')
    },
    onChangeGoing (event) {
      console.log('change: ', event)
      this.updateGoingStatus({meetup: this.meetup, status: event})
      this.setGoingUsers()
    },
    setGoingStatus () {
      this.isGoing(this.meetup).then(res => {
        console.log('gonig: ', res)
        this.going = res
      })
    },
    setGoingUsers () {
      this.fetchAllGoingUsers(this.meetup).then(users => {
        this.goingUsers = users
      }).catch(error => {
        console.log('error: ', error)
      })
    }
  },
  watch: {
    dialog (value) {
      if (value) {
        this.setGoingStatus()
        this.setGoingUsers()
      }
    }
  }
}
</script>

<style>

</style>
