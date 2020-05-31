<template>
  <b-col lg="5">
    <b-form class="card shadow-lg border-0 rounded-lg my-5" @submit.prevent="submitLogin">
      <b-card-header>
        <h3 class="text-center font-weight-light my-4">
          Login
        </h3>
      </b-card-header>
      <b-card-body>
        <b-form-group label="Username" label-for="username" label-class="small">
          <b-input
            id="username"
            placeholder="Username"
            :state="validData($v.username)"
            v-model="$v.username.$model"/>
          <template v-if="validData($v.username) !== null && !validData($v.username)">
            <b-form-invalid-feedback v-if="!$v.username.required">
              Username silahkan diisi
            </b-form-invalid-feedback>
          </template>
        </b-form-group>
        <b-form-group label="Password" label-for="password" label-class="small">
          <b-input-group>
            <b-input
              :type="togglePass ? 'text' : 'password'"
              id="password"
              placeholder="Password"
              :state="validData($v.password)"
              v-model="$v.password.$model"/>
            <b-input-group-append>
              <b-button variant="primary" @click="togglePass = !togglePass">
                <fa-layer class="fa-fw">
                  <fa :icon="['fas', togglePass ? 'eye-slash' : 'eye']"/>
                </fa-layer>
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <template v-if="validData($v.password) !== null && !validData($v.password)">
            <b-form-invalid-feedback v-if="!$v.password.required" class="d-block">
              Password silahkan diisi
            </b-form-invalid-feedback>
          </template>
        </b-form-group>
        <b-button type="submit" variant="primary" class="w-100">
          Login
        </b-button>
      </b-card-body>
      <b-card-footer class="text-center">
        <b-link to="/register" class="small">
          Need an account? Sign up!
        </b-link>
      </b-card-footer>
    </b-form>
  </b-col>
</template>

<script>
  import {required} from 'vuelidate/lib/validators';

  export default {
    head: {
      title: 'Login'
    },
    data() {
      return {
        username: '',
        password: '',
        togglePass: false
      };
    },
    validations: {
      username: {required},
      password: {required}
    },
    methods: {
      validData(field) {
        if (field.$dirty) {
          return !field.$error;
        }
        return null;
      },
      async submitLogin() {
        try {
          this.$v.$touch();
          if (this.$v.$invalid) {
            return;
          }
          await this.$store.dispatch('authorization/login', {
            username: this.username,
            password: this.password
          });
          this.$utils.notification({
            title: 'Success',
            type: 'success',
            message: 'Berhasil login di dashboard'
          });
          this.$router.push('/');
        } catch (err) {
          this.$utils.notification({
            title: 'Error',
            type: 'error',
            message: err.message
          });
        }
      }
    }
  };
</script>
