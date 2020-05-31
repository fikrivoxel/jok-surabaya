<template>
  <home-layout v-if="isAuth">
    <nuxt-child/>
  </home-layout>
  <guest-layout v-else>
    <nuxt-child/>
  </guest-layout>
</template>

<script>
  import {mapGetters} from 'vuex';

  import GuestLayout from '@/components/layouts/guest';
  import HomeLayout from '@/components/layouts/home';

  export default {
    components: {
      GuestLayout,
      HomeLayout
    },
    computed: {
      ...mapGetters('authorization', [
        'token'
      ]),
      isAuth() {
        return !_.isEmpty(this.token);
      }
    }
  };
</script>
