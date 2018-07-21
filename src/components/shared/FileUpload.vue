<template>
  <v-layout row justify-center>
    <!-- xs12 sm6 offset-sm3 -->    
    <v-flex>
      <v-text-field 
        prepend-icon="attach_file" 
        single-line
        v-model="filename" 
        :label="label"
        :required="required"
        disabled
        ref="fileTextField"
      >
      <!-- @click.native="onFocus" -->
      </v-text-field>
    </v-flex>
    <v-btn
      color="pink"
      dark
      fab
      small        
      @click="onFocus"
      reg="uploadBtn"
    >
      <v-icon>file_upload</v-icon>
    </v-btn>  
    <input type="file" ref="fileInput" @change="onFileChange" style="position: absolute; display: none" accept="image/*">
    <v-snackbar
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      v-model="snackbar"
    >
      {{ snackbarText }}
    <v-btn dark flat @click.native="snackbar = false">Dismiss</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  name: 'file-upload',
  data () {
    return {
      snackbarTimeout: 2000,
      snackbarColor: 'error',
      snackbar: false,
      snackbarText: '',
      file: null,
      filename: ''
    }
  },
  props: {
    required: {
      type: Boolean,
      default () {
        return false
      }
    },
    label: {
      type: String,
      default () {
        return 'Choose File'
      }
    }
  },
  methods: {
    onFocus () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      var files = event.target.files || event.dataTransfer.files
      this.file = files[0]
      this.filename = this.file.name
      this.uploadFile()
      // if (!files.length) {
      //   return;
      // }
      // this.createImage(files[0]);
    },
    uploadFile () {
      console.log('UploadFile: ', this.file)
      if (this.file) {
        this.$emit('uploadFile', this.file)
      } else {
        this.snackbarTimeout = 3000
        this.snackbarColor = 'error'
        this.snackbar = true
        this.snackbarText = 'Please select a file to upload'
      }
    }
    // createImage (file) {
    //   var image = new Image();
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = (e) => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
  }
}
</script>

<style scoped>
</style>


