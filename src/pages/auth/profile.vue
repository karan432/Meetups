<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation-12>
          <v-layout align-center>
            <v-flex xs12>
              <h1 class="pl-2"  style="text-align: center">PROFILE</h1>
            </v-flex>
          </v-layout>
          <form @submit.prevent="onSubmit">
            <v-layout row align-center class="pa-1">
              <v-flex xs12 style="text-align: center">
                <v-avatar
                  size="80px"
                  class="primary"
                >
                  <img 
                    v-if="photoURL"
                    :src="photoURL"
                  >
                  <v-icon 
                    v-else
                    dark
                    large
                  >
                    person
                  </v-icon>
                </v-avatar>
              </v-flex>
            </v-layout>
            <v-layout row class="pa-1">
              <v-flex xs10>
                <FileUpload
                  label="Update Profile Pic"
                  :required="false"
                  v-on:uploadFile="uploadProfilePic"
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
                <v-text-field
                name="name"
                label="Name"
                id="name"
                prepend-icon="person"
                v-model="displayName"
                type="text"
                required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row class="pa-1">
              <v-flex xs12>
                <v-text-field
                name="email"
                label="Email"
                id="email"
                prepend-icon="mail"
                v-model="email"
                type="email"
                required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                type="submit"
                color="secondary"
                :loading="loading"
                :disabled="loading || disabled"
              >
                Save
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FileUpload from '@/components/shared/FileUpload'
import firebase from '@firebase/app'
import '@firebase/storage'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  data () {
    return {
      loading: false,
      disabled: false,
      displayName: '',
      photoURL: '',
      email: '',
      uploadProgress: 0,
      showUploadProgress: false
    }
  },
  methods: {
    ...mapActions([
      'updateUserProfile',
      'autoSignIn'
    ]),
    onSubmit () {
      const profile = {
        displayName: this.displayName,
        email: this.email,
        photoURL: this.photoURL
      }
      this.loading = true
      this.updateUserProfile(profile).then(res => {
        console.log('profile updated successfully.')
        this.autoSignIn()
        this.redirect()
      }).catch(error => {
        console.log('error updating profile, ', error)
      }).then(() => {
        this.loading = false
      })
    },
    redirect () {
      this.$router.push({name: 'home'})
    },
    uploadProfilePic (file) {
      console.log('called uploadProfilePic: ', file)
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        console.log('base64: ', fileReader.result)
        this.photoURL = fileReader.result
      })
      fileReader.readAsDataURL(file)
      // this.uploadMeetupCover(file)
      const myApp = this
      // Create a root reference
      var storageRef = firebase.storage().ref()
      myApp.disabled = true
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(`${myApp.user.id}/profilePic/${file.name}`).put(file)
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
            myApp.photoURL = downloadURL
          })
        }
      )
    }
  },
  created () {
    console.log('called created!!')
    this.displayName = this.user.displayName
    this.photoURL = this.user.photoURL
    this.email = this.user.email
  },
  components: {
    FileUpload
  }
}
</script>

<style>
</style>
