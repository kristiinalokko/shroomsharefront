<template>
  <div class="nineties-login-page">
    <center>
      <table border="5" cellpadding="20" bgcolor="#FF69B4" class="login-table">
        <tr bgcolor="#FFD700">
          <td align="center">
            <font color="#FF0000" size="6"><b>🔐 MEMBER LOGIN ZONE! 🔐</b></font><br>
            <marquee width="300px" behavior="alternate">
              <font color="#0000FF" size="3">SUPER SECRET ACCESS!</font>
            </marquee>
          </td>
        </tr>
        <tr>
          <td bgcolor="#FFFFFF">
            <center>
              <h2 class="login-title">Enter Your Credentials Below:</h2>

              <!-- 90s Alert Messages -->
              <div v-if="errorResponse.message">
                <table border="3" bgcolor="#FF0000" cellpadding="5">
                  <tr>
                    <td align="center">
                      <font color="#FFFFFF" size="3"><b>❌ ACCESS DENIED! ❌</b></font><br>
                      <font color="#FFFF00">{{ errorResponse.message }}</font>
                    </td>
                  </tr>
                </table>
                <br>
              </div>

              <div v-if="successMessage">
                <table border="3" bgcolor="#00FF00" cellpadding="5">
                  <tr>
                    <td align="center">
                      <font color="#FF0000" size="3"><b>✅ SUCCESS! ✅</b></font><br>
                      <font color="#0000FF">{{ successMessage }}</font>
                    </td>
                  </tr>
                </table>
                <br>
              </div>

              <!-- Login Form -->
              <table border="2" bgcolor="#FFFFCC" cellpadding="15">
                <tr>
                  <td align="right"><font color="#800080" size="3"><b>Username:</b></font></td>
                  <td>
                    <input v-model="username" type="text" size="20" class="nineties-input" placeholder="Enter your username">
                  </td>
                </tr>
                <tr>
                  <td align="right"><font color="#800080" size="3"><b>Password:</b></font></td>
                  <td>
                    <input v-model="password" type="password" size="20" class="nineties-input" placeholder="Super secret password">
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center">
                    <br>
                    <button @click="login" class="nineties-login-btn">
                      🚀 LOG ME IN! 🚀
                    </button>
                    <br><br>
                    <font color="#FF0000" size="2">
                      <blink>Don't have an account?</blink>
                    </font>
                    <br>
                    <router-link to="/register" class="nineties-register-link">
                      ⭐ CLICK HERE TO REGISTER! ⭐
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
      <img src="@/assets/shroom.png" width="60" height="60" class="bouncing-shroom" alt="Dancing Shroom">
      <font color="#FF0000" size="4"><b> MUSHROOM POWER! </b></font>
      <img src="@/assets/shroom.png" width="60" height="60" class="bouncing-shroom" alt="Dancing Shroom">
    </center>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import NavigationService from "@/services/NavigationService";
import AlertDanger from "@/components/AlertDanger.vue";

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }



    }
  },
  methods: {

    login() {

      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleErrorResponse(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-logged-in')
      NavigationService.navigateToHome()
    },

    handleErrorResponse(error) {
      this.errorResponse = error.response.data
      setTimeout(this.resetErrorMessage, 4000)
    },

    resetErrorMessage(){
      this.errorResponse.message = ''
    }
  },

  mounted() {
  }
}
</script>

<style scoped>
.nineties-login-page {
  background: radial-gradient(circle, #FF00FF, #00FFFF, #FFFF00, #FF69B4);
  background-size: 200% 200%;
  animation: psychedelicBackground 4s ease infinite;
  min-height: 100vh;
  padding: 50px 20px;
}

@keyframes psychedelicBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-table {
  animation: tableWobble 3s ease-in-out infinite;
  box-shadow: 10px 10px 20px #000000;
}

@keyframes tableWobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
}

.login-title {
  color: #800080;
  font-size: 24px;
  text-shadow: 2px 2px 4px #FFD700;
  text-decoration: underline;
}

.nineties-input {
  border: 3px inset #C0C0C0;
  padding: 8px;
  font-size: 14px;
  font-family: 'Comic Neue', cursive;
  background: linear-gradient(45deg, #FFFFFF, #F0F8FF);
}

.nineties-input:focus {
  border: 3px outset #FFD700;
  background: linear-gradient(45deg, #FFFF99, #FFFFFF);
}

.nineties-login-btn {
  background: linear-gradient(45deg, #FF4500, #FFD700);
  color: #FFFFFF;
  font-weight: bold;
  font-size: 18px;
  padding: 15px 30px;
  border: 4px outset #FFD700;
  cursor: pointer;
  animation: buttonBounce 2s ease infinite;
  text-shadow: 2px 2px 4px #000000;
}

.nineties-login-btn:hover {
  background: linear-gradient(45deg, #FFD700, #FF4500);
  border: 4px inset #FFD700;
}

@keyframes buttonBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.nineties-register-link {
  color: #0000FF;
  font-weight: bold;
  font-size: 16px;
  text-decoration: underline;
  animation: linkFlash 1.5s ease infinite;
}

.nineties-register-link:hover {
  color: #FF0000;
  background-color: #FFFF00;
  padding: 2px 5px;
}

@keyframes linkFlash {
  0%, 100% { text-shadow: 1px 1px 2px #000000; }
  50% { text-shadow: 1px 1px 10px #FF0000; }
}

.bouncing-shroom {
  animation: bounce 2s ease infinite;
  margin: 0 10px;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>
