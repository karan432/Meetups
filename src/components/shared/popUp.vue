<template>
 <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-toolbar
          flat
          dense
          :color="color"
          dark
        >
          <v-toolbar-title>
            {{title}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          {{body}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>         
          <v-btn 
            v-for="(button, index) in buttons"
            :color="button.color ? button.color : 'primary'"
            :flat="button.flat"
            :key="index"
            @click="onButtonClick(button.action, index)"
          >
            <v-icon>{{button.icon ? button.icon : ''}}</v-icon>
            {{button.text}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'popUp',
  props: {
    buttons: {
      type: Array,
      default () {
        return [{
          icon: '',
          text: 'OK',
          action: 'okay',
          color: 'primary',
          flat: false
        }]
      }
    },
    dialog: {
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String,
      default () {
        return 'Alert'
      }
    },
    color: {
      type: String,
      default () {
        return 'primary'
      }
    },
    body: {
      type: String,
      default () {
        return 'Something went WRONG!!'
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onButtonClick (action, index) {
      // console.log('buttons: ', this.buttons)
      // console.log('button action: ', action)
      // console.log('button index: ', index)
      this.$emit(action)
    }
  }
}
</script>

<style>
</style>
