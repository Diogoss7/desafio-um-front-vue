<template>
  <div class="budget-form-container">
    <div class="budget-form">
      <h1>Cadastro de Orçamento</h1>
      <form class="form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="client">Cliente:</label>
          <input type="text" id="client" v-model="formData.client" required />
        </div>
        <div class="form-group">
          <label for="date">Data:</label>
          <input type="date" id="date" v-model="formData.date" required />
        </div>
        <div class="form-group">
          <label for="time">Hora:</label>
          <input type="time" id="time" v-model="formData.time" required />
        </div>
        <div class="form-group">
          <label for="salesperson">Vendedor:</label>
          <input
            type="text"
            id="salesperson"
            v-model="formData.salesperson"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea
            id="description"
            v-model="formData.description"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="amount">Valor do Orçamento (R$):</label>
          <input type="number" id="amount" v-model="formData.amount" required />
        </div>
        <div>
          <button type="submit">Salvar dados</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import api from "../services/api";

const formData = ref({
  client: "",
  date: "",
  time: "",
  salesperson: "",
  description: "",
  amount: "",
});

const submitForm = async () => {
  try {
    const response = await api.post("/register", formData.value);

    if (response.data) {
      await Swal.fire({
        icon: "success",
        title: "Orçamento Salvo com Sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });

      clearForm();
    } else {
      await Swal.fire({
        icon: "error",
        title: "Dados icorretos, revise os dados!",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Dados icorretos, revise os dados!",
      showConfirmButton: false,
      timer: 2500,
    });
  }
};

const clearForm = () => {
  formData.value = {
    client: "",
    date: "",
    time: "",
    salesperson: "",
    description: "",
    amount: "",
  };
};
</script>
<style scoped>
.budget-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.budget-form {
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5%;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #333;
  text-align: center;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input,
textarea {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #42b883;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
}
button:hover {
  background-color: #2c7a5e;
}
</style>
