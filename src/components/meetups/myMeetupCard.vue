<template>
  <v-card class="ma-2">
    <v-card-media
      :src="meetup.coverPicURL"
      height="125px"
      :class="color"
    >
    </v-card-media>
    <v-card-title primary-title class="pb-0 pt-1">
      <div>
        <h3 class="headline mb-2 text--ellipsisTwoLines">{{meetup.title}}</h3>
        <div>
          <b>Date: </b>{{meetup.date}}
        </div>
        <div>
          <b>Location: </b>{{meetup.location}}
        </div>
      </div>
    </v-card-title>
    <v-card-text class="pa-1">
      <v-list three-line class="pt-0">
        <v-list-tile>
          <v-list-tile-content>
            {{meetup.description}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        flat 
        color="primary"
        @click="onEdit">
        EDIT
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'my-meetup-card',
  props: {
    meetup: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    onEdit () {
      this.$emit('onEdit', Object.assign({}, this.meetup))
    }
  },
  computed: {
    color () {
      return 'orange'
    }
  }
}
</script>

<style>
.text--ellipsisTwoLines {
  height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
