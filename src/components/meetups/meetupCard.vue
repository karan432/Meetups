<template>
  <v-card class="ma-2">
    <v-card-media
      :src="meetup.coverPicURL"
      height="125px"
      :class="color"
    >
    </v-card-media>
    <v-subheader>
      {{meetup.date}}, {{meetup.location}}
    </v-subheader>
    <v-card-title primary-title class="pb-0 pt-1">
      <div>
        <h3 class="headline mb-0">{{meetup.title}}</h3>
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
    <v-card-text class="pa-1">
      <v-list two-line class="pt-0">
        <v-list-tile>
          <v-list-tile-avatar>
            <v-avatar class="primary" size="32">
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
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            by <b>{{meetup.user.displayName}}</b>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary">Learn more</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: 'meetup',
  props: {
    meetup: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    color () {
      return 'orange'
    }
  },
  methods: {}
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
