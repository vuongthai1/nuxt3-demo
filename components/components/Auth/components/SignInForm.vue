<template>
  <form class="form form--signin">
    <div class="form__header">
      <h3>Welcome back!</h3>
      <p>Sign in to continue</p>
    </div>

    <div class="form__content">
      <div class="error-message">
        <p v-if="error" class="alert alert--red">{{ errorMessage }}</p>
      </div>

      <div class="form-item">
        <label>Username: </label>
        <v-text-field dense outlined v-model="username"> </v-text-field>
      </div>
      <div class="form-item">
        <label>Password: </label>
        <v-text-field dense outlined type="password" v-model="password" />
      </div>
    </div>
    <div class="form__actions">
      <v-btn
        class="btn btn--primary btn--green form__btn"
        @click.prevent="handleSignIn"
      >
        Sign in
      </v-btn>
    </div>
    <p>HEH ád</p>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate/lib/validators";
import { required, email } from "vuelidate/lib/validators";
import { httpEndpoint } from "~/services/https/endpoints";
import { appSettings } from "~/app-settings";
export default {
  //   mixins: [validationMixin],
  //   validations: {
  //     username: {
  //       required,
  //     },
  //     password: {
  //       required,
  //     },
  //   },

  data() {
    return {
      username: "", // developer
      password: "", // tester@aes2022
      rememberMe: true,
      errorUserName: "",
      errorPassword: "",
      loading: false,
      azureLoading: false,
      error: false,
      errorMessage: "",
    };
  },
  computed: {
    // usernameErrors() {
    //     const errors = []
    //     if (!this.$v.username.$dirty) return errors
    //     !this.$v.username.required && errors.push("Username must be valid")
    //     //!this.$v.username.required && errors.push("Email is required")
    //     return errors
    // },
    // passwordErrors() {
    //     const errors = []
    //     if (!this.$v.password.$dirty) return errors
    //     !this.$v.password.required && errors.push("Password is required")
    //     return errors
    // },
    // loggedIn() {
    //     return this.$auth.loggedIn
    // },
  },

  methods: {
    async handleSignIn() {
      //   this.$v.$touch();
      //   if (!this.$v.$invalid) {
      //     this.loading = true;
      const params = {
        username: this.username,
        password: this.password,
        rememberMe: true,
      };
      try {
        const response = await this.$auth.loginWith("local", {
          data: params,
        });
        if (response.data.valid) {
          // this.loading = true;
          const { jwtToken } = response.data;
          if (jwtToken) {
            window.location.href = "/";
          }
          this.error = false;
          this.$store.dispatch("app/showSnackBar", "Login successfully.");
        } else {
          this.error = true;
          this.errorMessage = response
            ? response.data.message
            : "Some thing went wrong";
        }
      } catch (e) {
        console.log(e);
      }
      // } else {
      //   console.log("eeee");
      // }
      // console.log("eeee");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn--azure {
  transition: all 0.2s ease;
  img {
    height: 2.4rem;
    margin-right: 1.2rem;
  }
  span {
    font-weight: 500;
  }
}

.form--signin {
  .form__header {
    h3 {
      margin-bottom: 0;
      font-size: 2.2rem;
      font-weight: 600;
      line-height: 3.08rem;
    }

    p {
      margin-bottom: 0;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.1rem;
    }
  }

  .form__content {
    margin: 4.8rem auto;

    label {
      font-weight: 500;
    }

    .errormessage {
      position: absolute;
      top: -2.1rem;
    }

    .alert {
      margin-bottom: 0;
      padding: 0.75rem 1.25rem;
      // position: absolute;
      // top: 0%;
      // left:0%;
      // right: 0%
    }

    p {
      justify-content: center;
    }
  }

  .form__actions {
    .form__link {
      color: var(--color-blue);
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.8rem;
      text-align: right;
      width: 100%;
      display: inline-block;

      &:hover {
        text-decoration: underline;
      }
    }

    .form__btn {
      width: 100%;
      margin-top: 2.4rem;
    }
  }
}
</style>
