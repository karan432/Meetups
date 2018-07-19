<template>
  <component :is="component">
    <slot />
  </component>
</template>

<script>
import defaultLayout from './layouts/defaultLayout'
import authLayout from './layouts/authLayout'

export default {
  name: 'App',
  components: {
    defaultLayout,
    authLayout
  },
  computed: {
    component () {
      const route = this.$route
      if (route.name === 'auth') {
        return authLayout
      }
      return defaultLayout
    }
  }
}
</script>
