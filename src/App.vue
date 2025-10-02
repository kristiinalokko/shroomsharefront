<template>
  <div class="nineties-container">
    <!-- Classic 90s Header with blinking text -->
    <div class="nineties-header">
      <marquee class="header-marquee">🍄 WELCOME TO THE RADICAL SHROOMSHARE WEBSITE! 🍄 THE COOLEST MUSHROOM SITE ON THE WORLD WIDE WEB! 🍄</marquee>
    </div>

    <!-- 90s Navigation Bar -->
    <div class="nineties-nav">
      <table class="nav-table" width="100%" border="2" cellpadding="5" cellspacing="0">
        <tr bgcolor="#FF00FF">
          <td align="center" class="nav-cell">
            <img src="@/assets/shroomshare white.png" alt="ShroomShare" width="40" height="40" />
            <blink class="site-title">SHROOMSHARE</blink>
          </td>
          <td align="center" class="nav-cell">
            <router-link to="/locations" class="nineties-link">
              🏠 HOME PAGE 🏠
            </router-link>
          </td>
          <td align="center" class="nav-cell">
            <router-link to="/shroom-table" class="nineties-link">
              🍄 MUSHROOMS 🍄
            </router-link>
          </td>
          <td align="center" class="nav-cell">
            <router-link to="/location-table" class="nineties-link">
              📍 LOCATIONS 📍
            </router-link>
          </td>
          <td align="center" class="nav-cell" v-if="!isLoggedIn">
            <router-link to="/login" class="nineties-link">
              🔑 LOG IN 🔑
            </router-link>
          </td>
          <td align="center" class="nav-cell" v-if="!isLoggedIn">
            <router-link to="/register" class="nineties-button">
              ★ SIGN UP NOW! ★
            </router-link>
          </td>
          <td align="center" class="nav-cell" v-if="isLoggedIn">
            <router-link to="/profile" class="nineties-link">
              👤 MY PROFILE 👤
            </router-link>
          </td>
          <td align="center" class="nav-cell" v-if="isLoggedIn">
            <button @click="logOut" class="nineties-logout-btn">
              🚪 LOGOUT 🚪
            </button>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Content Area -->
    <div class="nineties-content">
      <router-view @event-logged-in="updateNavMenu"/>
    </div>

    <!-- 90s Footer -->
    <div class="nineties-footer">
      <marquee direction="right" class="footer-marquee">
        ⭐ Thanks for visiting SHROOMSHARE! This site is best viewed in Netscape Navigator! ⭐
      </marquee>
      <center>
        <p class="footer-text">
          © 2025 ShroomShare |
          <blink>Webmaster: Admin</blink> |
          Counter: 00001337 visitors!
        </p>
      </center>
    </div>
  </div>
</template>

<script>
import SessionStorageService from "@/services/SessionStorageService";
import NavigationService from "@/services/NavigationService";
export default {
  name: 'App',
  components: {SessionStorageService},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      userId: sessionStorage.getItem("userId")
    }
  },
  methods: {
    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
    },
    logOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      NavigationService.navigateToHome()
    },
  },
  mounted() {
    this.updateNavMenu()
  }
}
</script>

<style>
/* 90s Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');

* {
  font-family: 'Comic Neue', 'Comic Sans MS', cursive !important;
}

body {
  background: linear-gradient(45deg, #FF00FF, #00FFFF, #FFFF00, #FF0000);
  background-size: 400% 400%;
  animation: rainbowBackground 3s ease infinite;
  margin: 0;
  padding: 0;
}

@keyframes rainbowBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.nineties-container {
  min-height: 100vh;
  background-image:
    radial-gradient(circle at 20% 80%, #FF00FF 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, #00FFFF 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, #FFFF00 0%, transparent 50%);
}

/* Header */
.nineties-header {
  background: linear-gradient(90deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #FF00FF);
  border: 5px ridge #FFD700;
  padding: 10px;
}

.header-marquee {
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

/* Navigation */
.nineties-nav {
  margin: 10px;
  filter: drop-shadow(5px 5px 10px #000000);
}

.nav-table {
  background: linear-gradient(45deg, #FF00FF, #00FFFF);
  border: 3px outset #C0C0C0;
}

.nav-cell {
  border: 2px inset #C0C0C0;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  padding: 8px !important;
}

.site-title {
  font-size: 24px;
  font-weight: bold;
  color: #FF0000;
  text-shadow: 3px 3px 0px #FFFF00;
  display: block;
  margin-top: 5px;
}

.nineties-link {
  color: #0000FF !important;
  font-weight: bold;
  font-size: 14px;
  text-decoration: underline;
  text-shadow: 1px 1px 2px #FFFFFF;
  animation: textGlow 2s ease-in-out infinite alternate;
}

.nineties-link:hover {
  color: #FF0000 !important;
  background-color: #FFFF00;
  padding: 2px 4px;
  border: 1px solid #000000;
}

.nineties-button {
  background: linear-gradient(45deg, #FF0000, #FFFF00);
  color: #FFFFFF !important;
  font-weight: bold;
  padding: 8px 12px;
  border: 3px outset #FFD700;
  text-decoration: none;
  animation: buttonPulse 1s ease infinite;
  text-shadow: 2px 2px 4px #000000;
}

.nineties-button:hover {
  background: linear-gradient(45deg, #FFFF00, #FF0000);
  border: 3px inset #FFD700;
}

.nineties-logout-btn {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  color: #FFFFFF;
  font-weight: bold;
  padding: 8px 12px;
  border: 3px outset #FF69B4;
  cursor: pointer;
  font-family: 'Comic Neue', cursive;
  animation: buttonPulse 1.5s ease infinite;
}

@keyframes textGlow {
  0% { text-shadow: 1px 1px 2px #FFFFFF; }
  100% { text-shadow: 1px 1px 10px #FFFF00, 0 0 20px #FFFF00; }
}

@keyframes buttonPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Content Area */
.nineties-content {
  margin: 20px;
  padding: 20px;
  background: #FFFFFF;
  border: 5px ridge #C0C0C0;
  box-shadow: 10px 10px 20px #000000;
  min-height: 400px;
}

/* Footer */
.nineties-footer {
  background: linear-gradient(90deg, #800080, #008080, #808000);
  border: 3px ridge #FFD700;
  margin-top: 20px;
  padding: 15px;
}

.footer-marquee {
  color: #FFFF00;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 2px 2px 4px #000000;
}

.footer-text {
  color: #FFFFFF;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000000;
  margin: 10px 0;
}

/* Blink Animation */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

blink {
  animation: blink 1s linear infinite;
}

/* Router Link Active State */
.router-link-active {
  background: #FFFF00 !important;
  color: #FF0000 !important;
  border: 2px solid #000000 !important;
  padding: 4px 8px !important;
}
</style>
