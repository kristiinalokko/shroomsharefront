<template>
  <div class="nineties-register-page">
    <center>
      <table border="5" cellpadding="25" bgcolor="#00FFFF" class="register-table">
        <tr bgcolor="#FF69B4">
          <td align="center">
            <font color="#FFFFFF" size="7"><b>🌟 JOIN THE SHROOM REVOLUTION! 🌟</b></font><br>
            <marquee width="400px" behavior="scroll" direction="left">
              <font color="#FFFF00" size="4">BECOME A MEMBER TODAY! FREE REGISTRATION!</font>
            </marquee>
          </td>
        </tr>
        <tr>
          <td bgcolor="#FFFFFF">
            <center>
              <h2 class="register-title">✨ CREATE YOUR ACCOUNT ✨</h2>
              <marquee width="300px" behavior="alternate">
                <font color="#FF0000" size="2">Join thousands of mushroom enthusiasts!</font>
              </marquee>

              <!-- 90s Alert Messages -->
              <div v-if="errorResponse.message">
                <table border="4" bgcolor="#FF0000" cellpadding="8" class="alert-table">
                  <tr>
                    <td align="center">
                      <font color="#FFFFFF" size="4"><b>🚫 REGISTRATION ERROR! 🚫</b></font><br>
                      <font color="#FFFF00" size="3">{{ errorResponse.message }}</font>
                    </td>
                  </tr>
                </table>
                <br>
              </div>

              <div v-if="successMessage">
                <table border="4" bgcolor="#00FF00" cellpadding="8" class="alert-table">
                  <tr>
                    <td align="center">
                      <font color="#FF0000" size="4"><b>🎉 WELCOME TO THE CLUB! 🎉</b></font><br>
                      <font color="#0000FF" size="3">{{ successMessage }}</font>
                    </td>
                  </tr>
                </table>
                <br>
              </div>

              <!-- Registration Form -->
              <table border="3" bgcolor="#FFFFCC" cellpadding="20" class="form-table">
                <tr>
                  <td align="right"><font color="#800080" size="3"><b>👤 Username:</b></font></td>
                  <td>
                    <input v-model="username" type="text" size="25" class="nineties-input" placeholder="Choose a cool username!">
                  </td>
                </tr>
                <tr>
                  <td align="right"><font color="#800080" size="3"><b>🔒 Password:</b></font></td>
                  <td>
                    <input v-model="password" type="password" size="25" class="nineties-input" placeholder="Make it super secret!">
                  </td>
                </tr>
                <tr>
                  <td align="right"><font color="#800080" size="3"><b>📧 Email:</b></font></td>
                  <td>
                    <input v-model="email" type="email" size="25" class="nineties-input" placeholder="your.email@domain.com">
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center">
                    <br>
                    <button @click="register" class="nineties-register-btn">
                      🚀 REGISTER ME NOW! 🚀
                    </button>
                    <br><br>
                    <font color="#0000FF" size="2">
                      <blink>Already have an account?</blink>
                    </font>
                    <br>
                    <router-link to="/login" class="nineties-login-link">
                      🔑 CLICK HERE TO LOGIN! 🔑
                    </router-link>
                  </td>
                </tr>
              </table>
            </center>
          </td>
        </tr>
      </table>

      <!-- Decorative elements -->
      <br><br>
      <table border="2" bgcolor="#FFD700" cellpadding="10">
        <tr>
          <td align="center">
            <img src="@/assets/shroom.png" width="50" height="50" class="rotating-shroom" alt="Spinning Shroom">
            <font color="#FF0000" size="3"><b> MUSHROOM COMMUNITY </b></font>
            <img src="@/assets/shroom.png" width="50" height="50" class="rotating-shroom" alt="Spinning Shroom">
          </td>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
import RegisterService from "@/services/RegisterService";
import NavigationService from "@/services/NavigationService";
import AlertSuccess from "@/components/AlertSuccess.vue";

export default {
  name: 'RegisterView',
  components: {AlertSuccess},
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      successMessage: '',

      user: {
        username: '',
        password: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0,
      },

      alertMessage:''

    }
  },
  methods: {
    register() {

      if (this.inputIsEmpty()) {
        alert('täida kõik väljad')
      } else if (this.passwordsMatch()) {
        this.createUser();
        RegisterService.sendRegistrationRequest(this.user)
            .then(response => this.handleSuccessfulRegistration(response))
            .catch(error => this.handleErrorResponse(error))
      } else {
        alert('passwords dont match')
      }
    },

    handleSuccessfulRegistration(response) {
      this.alertMessage = 'Kasutaja ' + this.username + ' edukalt lisatud! Võid minna sisse logima!'
      setTimeout(this.resetAlertMessage, 6000)
      this.username = ''
      this.password1 = ''
      this.password2 = ''

    },

    inputIsEmpty() {
      return this.username.length < 1 || this.password1.length < 1 || this.password2.length < 1;
    },
    passwordsMatch() {
      return this.password1 === this.password2;
    },
    createUser() {
      this.user.username = this.username
      this.user.password = this.password1
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      alert(this.errorResponse.message)
    },

    resetAlertMessage() {
      this.alertMessage = ''
    }

  },
  mounted() {
  }
}
</script>

<style scoped>
.nineties-register-page {
  background: conic-gradient(from 0deg, #FF00FF, #00FFFF, #FFFF00, #FF69B4, #00FF00, #FF0000);
  background-size: 300% 300%;
  animation: conicSpin 6s linear infinite;
  min-height: 100vh;
  padding: 30px 20px;
}

@keyframes conicSpin {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.register-table {
  animation: registerFloat 4s ease-in-out infinite;
  box-shadow: 15px 15px 30px #000000;
}

@keyframes registerFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  75% { transform: translateY(10px) rotate(-1deg); }
}

.register-title {
  color: #FF0000;
  font-size: 28px;
  text-shadow: 3px 3px 0px #00FF00, 6px 6px 0px #0000FF;
  text-decoration: underline;
  animation: titleGlow 2s ease infinite;
}

@keyframes titleGlow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.5) hue-rotate(45deg); }
}

.form-table {
  animation: formPulse 3s ease infinite;
}

@keyframes formPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.nineties-input {
  border: 4px groove #C0C0C0;
  padding: 10px;
  font-size: 16px;
  font-family: 'Comic Neue', cursive;
  background: linear-gradient(45deg, #FFFFFF, #E6E6FA);
  animation: inputShimmer 2s ease infinite;
}

.nineties-input:focus {
  border: 4px ridge #FFD700;
  background: linear-gradient(45deg, #FFFF99, #FFFFFF);
  box-shadow: 0 0 15px #FFD700;
  animation: inputFocusGlow 1s ease infinite;
}

@keyframes inputShimmer {
  0%, 100% { box-shadow: inset 0 0 5px #C0C0C0; }
  50% { box-shadow: inset 0 0 10px #FFD700; }
}

@keyframes inputFocusGlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.nineties-register-btn {
  background: linear-gradient(45deg, #00FF00, #32CD32, #FFD700);
  color: #000000;
  font-weight: bold;
  font-size: 20px;
  padding: 20px 40px;
  border: 5px outset #32CD32;
  cursor: pointer;
  animation: registerBounce 1.5s ease infinite;
  text-shadow: 2px 2px 4px #FFFFFF;
  border-radius: 15px;
}

.nineties-register-btn:hover {
  background: linear-gradient(45deg, #FFD700, #32CD32, #00FF00);
  border: 5px inset #32CD32;
  transform: scale(1.1);
}

@keyframes registerBounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.nineties-login-link {
  color: #0000FF;
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
  animation: linkRainbow 3s ease infinite;
}

.nineties-login-link:hover {
  color: #FF0000;
  background-color: #FFFF00;
  padding: 5px 10px;
  border: 2px solid #000000;
}

@keyframes linkRainbow {
  0% { color: #FF0000; }
  16% { color: #FF8000; }
  33% { color: #FFFF00; }
  50% { color: #00FF00; }
  66% { color: #0000FF; }
  83% { color: #8000FF; }
  100% { color: #FF0000; }
}

.rotating-shroom {
  animation: shroomRotate 2s linear infinite;
  margin: 0 5px;
}

@keyframes shroomRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.alert-table {
  animation: alertBlink 1s ease infinite;
}

@keyframes alertBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
