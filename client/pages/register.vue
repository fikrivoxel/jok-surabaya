<template>
  <b-col lg="7">
    <b-form class="card shadow-lg border-0 rounded-lg my-5">
      <b-card-header>
        <h3 class="text-center font-weight-light my-4">
          Create Account
        </h3>
      </b-card-header>
      <b-card-body></b-card-body>
      <b-card-footer class="text-center">
        <b-link to="/login" class="small">
          Have an account? Go to login
        </b-link>
      </b-card-footer>
    </b-form>
  </b-col>
</template>

<script>
  import {required, sameAs} from 'vuelidate/lib/validators';

  export default {
    head: {
      title: 'Login'
    },
    data() {
      return {
        nama_awal: '',
        nama_akhir: '',
        username: '',
        password: '',
        kon_password: '',
        togglePass: false,
        toggleKonpass: false
      };
    },
    validations: {
      nama_awal: {required},
      nama_akhir: {required},
      username: {
        required,
        async isUnique(val) {
          try {
            if (_.isEmpty(val)) {
              return true;
            }
            await this.$store.dispatch('authorization/checkUsername', {
              username: val
            });
            return true;
          } catch (err) {
            return false;
          }
        }
      },
      password: {required},
      kon_password: {
        sameAs: sameAs('password')
      }
    }
  };
</script>
