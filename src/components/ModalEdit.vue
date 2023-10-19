<template>
  <div class="budget-form-container-edit">
    <div class="budget-form-edit">
      <h1>Editar Orçamento</h1>
      <form class="form-edit" @submit.prevent="submitForm">
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
        <div class="containet-button">
          <button type="submit" class="save">Salvar dados</button>
          <button type="button" @click="closeModal" class="exit">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import Swal from "sweetalert2";
import api from "../services/api";

const { emit } = getCurrentInstance();
const props = defineProps(["user"]);

const formData = ref({
  client: props.user.client,
  date: props.user.date,
  time: props.user.time,
  salesperson: props.user.salesperson,
  description: props.user.description,
  amount: props.user.amount,
});

const submitForm = async () => {
  const userId = props.user.id;
  try {
    const response = await api.put(`/update/${userId}`, formData.value);

    if (response.data) {
      await Swal.fire({
        icon: "success",
        title: "Orçamento Salvo com Sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      location.reload();
      closeModal();
    } else {
      await Swal.fire({
        icon: "error",
        title: "Dados incorretos, revise os dados!",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Dados incorretos, revise os dados!",
      showConfirmButton: false,
      timer: 2500,
    });
  }
};

const closeModal = () => {
  emit("close-modal");
};
</script>

<style scoped>
.budget-form-container-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.budget-form-edit {
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

.form-edit {
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
  width: 100%;
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
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
button:hover {
  background-color: #2c7a5e;
}
.exit:hover {
  background: darkred;
}
.containet-button {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
}
.exit {
  width: 30%;
  background: red;
  transition: background-color 0.3s ease;
}
.save {
  width: 30%;
}
</style>
