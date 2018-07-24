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
        <v-toolbar-title>Create Meetup</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container style="margin-top: 50px">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card elevation-12>
              <v-card-media
                v-if="meetup.coverPicURL"
                :src="meetup.coverPicURL"
                height="200px"
              >
              </v-card-media>
              <form @submit.prevent="onSubmit">
                <v-layout row class="pa-1">
                  <v-flex xs12>
                    <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    prepend-icon="title"
                    v-model="meetup.title"
                    type="text"
                    required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="pa-1">
                  <v-flex xs10>
                    <FileUpload
                      label="Cover Pic"
                      :required="false"
                      v-on:uploadFile="uploadCover"
                    ></FileUpload>
                  </v-flex>
                  <v-flex xs2>
                    <div 
                      v-if="showUploadProgress"
                      class="text-xs-center">
                      <v-progress-circular
                        :rotate="360"
                        :size="42"
                        :indeterminate="uploadProgress < 100"
                        :value="uploadProgress"
                        color="teal"
                      >
                        {{ uploadProgress+"%" }}
                      </v-progress-circular>
                      <span v-if="uploadProgress < 100" >Uploading</span>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row class="pa-1">
                  <v-flex xs12>
                    <v-select
                      name="category"
                      label="Category"
                      id="description"
                      :items="categories"
                      v-model="meetup.category"
                      prepend-icon="category"
                      required
                      autocomplete
                    >
                    </v-select>
                  </v-flex>
                </v-layout>
                <v-layout row class="pa-1">
                  <v-flex xs12>
                    <v-text-field
                    name="description"
                    label="Description"
                    id="description"
                    prepend-icon="description"
                    v-model="meetup.description"
                    type="text"
                    multi-line
                    required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row class="pa-1">
                  <v-flex xs12>
                    <v-text-field
                    name="location"
                    label="Location"
                    id="location"
                    prepend-icon="location_on"
                    v-model="meetup.location"
                    type="text"
                    required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row class="pa-1">
                  <v-flex xs12 sm6>
                    <v-menu
                      ref="dateDialog"
                      :close-on-content-click="false"
                      v-model="dateDialog"
                      :nudge-right="40"
                      :return-value.sync="meetup.date"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="meetup.date"
                        label="Date"
                        prepend-icon="event"
                        readonly
                        required
                      ></v-text-field>
                      <v-date-picker v-model="meetup.date" @input="$refs.dateDialog.save(meetup.date)"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-menu
                      ref="timeDialog"
                      :close-on-content-click="false"
                      v-model="timeDialog"
                      :nudge-right="40"
                      :return-value.sync="meetup.time"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px">
                      <v-text-field
                        slot="activator"
                        v-model="meetup.time"
                        label="Time"
                        prepend-icon="access_time"
                        readonly
                        required
                      ></v-text-field>
                      <v-time-picker
                        v-if="timeDialog"
                        v-model="meetup.time"
                        format="24hr"
                        @change="$refs.timeDialog.save(meetup.time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    color="secondary"
                    :loading="loading"
                    :disabled="loading || disabled || incomplete"
                  >
                    {{submitBtnText}}
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import FileUpload from '@/components/shared/FileUpload'
import firebase from '@firebase/app'
import '@firebase/storage'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'create-edit-meetup-dialog',
  props: {
    dialog: {
      type: Boolean,
      default () {
        return false
      }
    },
    mode: {
      type: String,
      default () {
        return 'Create'
      }
    },
    loading: {
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
          category: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    submitBtnText () {
      return this.mode === 'Edit' ? 'Update' : 'Create'
    },
    incomplete () {
      if (this.meetup.title && this.meetup.description && this.meetup.date && this.meetup.time && this.meetup.location && this.meetup.category) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      disabled: false,
      // title: '',
      // coverPicURL: '',
      // description: '',
      // date: null,
      // time: null,
      // location: '',
      // category: '',
      dateDialog: false,
      timeDialog: false,
      uploadProgress: 0,
      showUploadProgress: false,
      categories: [
        'Sports & Fitness',
        'Health & Wellness',
        'Technology',
        'Outdoor & Adventure',
        'Music',
        'Spirituality',
        'Fashion & Beauty',
        'Arts',
        'Film',
        'Writing',
        'Other'
      ]
    }
  },
  methods: {
    ...mapActions([
      'uploadMeetupCover'
    ]),
    onSubmit () {
      // var meetup = {
      //   title: this.title,
      //   location: this.location,
      //   description: this.description,
      //   date: this.date,
      //   time: this.time,
      //   coverPicURL: this.coverPicURL,
      //   category: this.category
      // }
      // console.log('mode: ', this.mode)
      // console.log('meetup: ', meetup)
      if (this.mode === 'Edit') {
        this.$emit('updateMeetup', this.meetup)
      } else {
        this.$emit('createMeetup', this.meetup)
      }
    },
    uploadCover (file) {
      console.log('called uploadCover: ', file)
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.meetup.coverPicURL = fileReader.result
      })
      fileReader.readAsDataURL(file)
      // this.uploadMeetupCover(file)
      const myApp = this
      // Create a root reference
      var storageRef = firebase.storage().ref()
      myApp.disabled = true
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(`${myApp.user.id}/meetups/${file.name}`).put(file)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          myApp.showUploadProgress = true
          myApp.uploadProgress = Math.floor(progress)
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        },
        function (error) {
          myApp.disabled = false
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('User doesn\'t have permission to access the object')
              break
            case 'storage/canceled':
              console.log('User canceled the upload')
              break
            case 'storage/unknown':
              console.log('Unknown error occurred, inspect error.serverResponse')
              break
          }
        },
        function () {
          myApp.disabled = false
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('downloadURL: ', downloadURL)
            myApp.meetup.coverPicURL = downloadURL
          })
        }
      )
    },
    onClose () {
      this.$emit('close')
    }
  },
  components: {
    FileUpload
  }
}
</script>

<style>
</style>
