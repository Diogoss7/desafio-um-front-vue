<template>
  <div class="home-container">
    <div class="register">
      <div class="title">
        <font-awesome-icon
          icon="folder-plus"
          size="2x"
          :style="{ fontSize: '4.0em' }"
        />
      </div>
      <router-link to="/register" class="button-action">
        Cadastrar Novo Orçamento
      </router-link>
    </div>
    <div class="budgets">
      <div class="title">
        <font-awesome-icon
          icon="book"
          size="2x"
          :style="{ fontSize: '4.0em' }"
        />
      </div>
      <router-link to="/budget-list" class="button-action">
        Ver Orçamentos
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
}

.register,
.budgets {
  width: 350px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.register {
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
}

.budgets {
  background: linear-gradient(45deg, #4a90e2, #2e6fd4);
}

.title {
  height: 70%;
  width: 100%;
  font-size: 1.5em;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-action {
  width: 80%;
  padding: 10px;
  background: #fff;
  color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin: 10px 0;
  text-align: center;
  text-decoration: none;
}

.button-action:hover {
  background: #e6e6e6;
}

.router-link-exact-active a {
  text-decoration: none;
  color: inherit;
}
@media (max-width: 760px) {
  .home-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .budgets {
    width: 350px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
