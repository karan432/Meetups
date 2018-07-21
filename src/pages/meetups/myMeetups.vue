<template>
  <v-container fluid>
    <h1>My meetups</h1>
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
      v-on:updateMeetup="updateMeetup"
      v-on:createMeetup="createMeetup"
      v-on:close="closeCreateEditDialog"
    >
    </createEditMeetup>
  </v-container>
</template>

<script>
import createEditMeetup from '@/components/meetups/createEditMeetup'
import { mapActions } from 'vuex'
export default {
  name: 'myMeetups',
  data () {
    return {
      createEditDialog: false,
      createEditDialogMode: 'Create',
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'createNewMeetup'
    ]),
    updateMeetup (meetup) {
      console.log('updateMeetup: ', meetup)
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
    showCreateEditDialog (mode) {
      // console.log('dialog mode: ', mode)
      this.createEditDialogMode = mode === 'Edit' ? 'Edit' : 'Create'
      this.createEditDialog = true
    },
    closeCreateEditDialog () {
      this.createEditDialog = false
    }
  },
  components: {
    createEditMeetup
  }
}
</script>

<style>
</style>
