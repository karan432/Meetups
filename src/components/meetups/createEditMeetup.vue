<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    :overlay="true"
  >
    <v-card>
      <v-toolbar card dark color="primary" fixed>
        <v-btn icon @click.native="onClose" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Meetups</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container></v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'create-edit-meetup-dialog',
  props: {
    dialog: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
