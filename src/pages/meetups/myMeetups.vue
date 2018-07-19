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
        @click="showCreateEditDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>create</span>
    </v-tooltip>
    <createEditMeetup
      :dialog="createEditDialog"
      v-on:close="closeCreateEditDialog"
    >
    </createEditMeetup>
  </v-container>
</template>

<script>
import createEditMeetup from '@/components/meetups/createEditMeetup'
export default {
  name: 'myMeetups',
  data () {
    return {
      createEditDialog: false
    }
  },
  methods: {
    showCreateEditDialog () {
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
