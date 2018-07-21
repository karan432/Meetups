<template>
  <v-app>
    <v-navigation-drawer
      width="250"
      class="blue-grey darken-4"
      dark
      temporary
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar flat class="transparent" dense>
        <v-list class="pa-0">
          <v-list-tile @click="navigateToHome" style="cursor: pointer">
            <v-list-tile-action>
              <v-avatar
                size="42px"
              >
                <img
                  src="./../../static/img/icons/meetup-icon.png"
                >
              </v-avatar>
            </v-list-tile-action>
            <v-list-tile-content >
              <v-list-tile-title><h2 class="app-title">Meetups</h2></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <!-- <v-toolbar flat class="transparent" dense>
        <v-list class="pa-0">
          <v-list-tile
            :to="{name: 'home'}"
            exact
          >
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Meetups Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar> -->
      <v-divider></v-divider>
      <v-list subheader>
        <template v-for="item in actions">
          <v-list-tile
            :key="item.icon"
            :to="item.link"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <!-- <v-divider></v-divider> -->
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-toolbar
      app
      flat
      prominent
      color="primary"
      dark
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      />
      <v-toolbar-title class="mx-2" @click="navigateToHome" style="cursor: pointer">
        <v-avatar
          size="42px"
        >
          <img
            src="./../../static/img/icons/meetup-icon.png"
          >
        </v-avatar>
        <span class="app-title hidden-xs-only"><b>Meetups</b></span>
      </v-toolbar-title>
      <!-- <v-btn icon @click.native.stop="searchBegin">
          <v-icon>search</v-icon>
      </v-btn>
      <div :class="{'searching--closed': !searching}" class="searching">
        <v-text-field
          id="search"
          v-model="search"
          append-icon="close"
          :append-icon-cb="searchEnd"
          label="Search"
          hide-details
          single-line
          color="white"
          @blur="onBlur"
        />
      </div> -->
      <v-toolbar-items
        class="hidden-xs-only"
      >
        <v-btn 
          flat
          v-for="item in actions"
          :key="item.title"
          :to="item.link"
          >
          <small>
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </small>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="isAuthenticated">
        <v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
          <v-badge color="red" overlap>
            <span slot="badge">2</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
        <span>2 unread notifications</span>
      </v-tooltip>
      <v-menu
        bottom
        offset-x
        left
        v-if="isAuthenticated"
      >
        <v-btn icon slot="activator">
          <v-avatar class="white" size="32">
            <img 
              v-if="user.photoURL"
              :src="user.photoURL"
            >
            <v-icon 
              v-else
              color="primary"
            >
              person
            </v-icon>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar class="primary" size="48px">
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
              <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
              <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile 
            key="profile"
            :to="{name: 'profile'}">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile 
            key="lock"
            @click="onLogout"
          >
            <v-list-tile-action>
              <v-icon>lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        flat
        @click="onSignIn"
        v-if="!isAuthenticated"
      >
        Sign In
        <v-icon class="pl-2">mdi-login</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-toolbar flat prominent dark class="primary">
        <v-toolbar-title>Notifications</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="rightDrawer = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list subheader dense>
        <v-subheader>All notifications</v-subheader>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            12 new users registered
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>data_usage</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            80% increase in popularity
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'defaultLayout',
  data () {
    return {
      drawer: false,
      fixed: false,
      actions: [
        {
          icon: 'mdi-map-marker-circle',
          title: 'Explore',
          link: {name: 'meetups'}
        },
        {
          icon: 'add_circle_outline',
          title: 'Create Meetup',
          link: {name: 'myMeetups'}
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      searching: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      user: 'getUser'
    }),
    showMenuIcon () {
      var classes = ''
      classes += this.searching ? 'hidden-xs-only ' : ''
      classes += this.drawer ? 'hidden-lg-and-up ' : ''
      return classes
    }
  },
  methods: {
    ...mapActions([
      'signOutUser'
    ]),
    onBlur () {
      this.searching = false
      this.search = ''
    },

    searchBegin () {
      this.searching = true
      setTimeout(() => document.querySelector('#search').focus(), 50)
    },

    searchEnd () {
      this.searching = false
      this.search = ''
      document.querySelector('#search').blur()
    },
    onSignIn () {
      this.$router.push({ name: 'auth', query: { redirect: this.$route.fullPath } })
    },
    onLogout () {
      this.signOutUser().then(res => {
        this.$router.push({ name: 'home' })
      }).catch(err => {
        alert('failed to Logout, ' + err)
      })
    },
    navigateToHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../node_modules/vuetify/src/stylus/settings/_variables.styl';

.app-title {
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.bottom-menu {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.searching {
  overflow: hidden;
  width: 208px;
  padding-left: 8px;
  transition: $primary-transition;
}

.searching--closed {
  padding-left: 0;
  width: 0;
}

.searching > * {
  right: 8px;
}

.searching--closed > * {
  display: none;
}

.hidden-searching {
  @media $display-breakpoints.sm-and-down {
    display: none !important;
  }
}

.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
