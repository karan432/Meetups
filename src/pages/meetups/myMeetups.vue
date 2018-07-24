<template>
  <v-container fluid>
    <h3
      v-if="totalMeetups === 0"
    >
      Click on the + (create) icon at the bottom to create Meetup.
    </h3>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 lg3 v-for="meetup in myMeetups" :key="meetup.id">
        <myMeetupCard
          :meetup="meetup"
          v-on:onEdit="onEdit"
        >
        </myMeetupCard>
      </v-flex>
    </v-layout>
    <v-tooltip left>
      <v-btn
        color="secondary"
        dark
        fab
        fixed
        bottom
        right
        small
        slot="activator"
        @click="showCreateEditDialog('Create')"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>create</span>
    </v-tooltip>
    <createEditMeetup
      :dialog="createEditDialog"
      :mode="createEditDialogMode"
      :loading="loading"
      :meetup="meetup"
      v-on:updateMeetup="updateMeetup"
      v-on:createMeetup="createMeetup"
      v-on:close="closeCreateEditDialog"
    >
    </createEditMeetup>
  </v-container>
</template>

<script>
import createEditMeetup from '@/components/meetups/createEditMeetup'
import myMeetupCard from '@/components/meetups/myMeetupCard'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'myMeetups',
  data () {
    return {
      createEditDialog: false,
      createEditDialogMode: 'Create',
      loading: false,
      meetup: {
        title: '',
        coverPicURL: '',
        description: '',
        date: null,
        time: null,
        location: '',
        category: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      myMeetups: 'getMyMeetups'
    }),
    totalMeetups () {
      return Object.keys(this.myMeetups).length
    }
  },
  methods: {
    ...mapActions([
      'createNewMeetup',
      'updateExistingMeetup',
      'fetchMyMeetups'
    ]),
    updateMeetup (meetup) {
      console.log('updateMeetup: ', meetup)
      this.loading = true
      this.updateExistingMeetup(meetup).then(res => {
        alert('Meetup was successfully updated.')
        this.closeCreateEditDialog()
      }).catch(error => {
        alert('Failed to update meetup, ' + error)
      }).then(() => {
        this.loading = false
      })
    },
    createMeetup (meetup) {
      console.log('createMeetup: ', meetup)
      this.loading = true
      this.createNewMeetup(meetup).then(res => {
        alert('Meetup was successfully created.')
        this.closeCreateEditDialog()
      }).catch(error => {
        alert('Failed to create meetup, ' + error)
      }).then(() => {
        this.loading = false
      })
    },
    onEdit (meetup) {
      this.showCreateEditDialog('Edit', meetup)
    },
    showCreateEditDialog (mode, meetup) {
      // console.log('dialog mode: ', mode)
      if (mode === 'Edit') {
        this.createEditDialogMode = 'Edit'
        this.meetup = meetup
      } else {
        this.createEditDialogMode = 'Create'
        this.meetup = {
          title: '',
          coverPicURL: '',
          description: '',
          date: null,
          time: null,
          location: '',
          category: ''
        }
      }
      this.createEditDialog = true
    },
    closeCreateEditDialog () {
      this.createEditDialog = false
    }
  },
  components: {
    createEditMeetup,
    myMeetupCard
  },
  created () {
    this.fetchMyMeetups().then(res => {

    }).catch(error => {
      // alert('Could not fetch your meetups, ' + error)
      console.log('Could not fetch your meetups, ' + error)
    })
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeEnter to: ', to)
    console.log('beforeEnter from: ', from)
    next(vm => {
      console.log('auth state: ', vm.$store.getters.isAuthenticated)
      if (!vm.$store.getters.isAuthenticated) {
        next({name: 'auth'})
      }
    })
  }
}
</script>

<style>
</style>
