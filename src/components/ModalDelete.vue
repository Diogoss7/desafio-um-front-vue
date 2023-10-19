<template>
  <div class="budget-form-container-delet">
    <div class="message">
      <h1>Dejesa mesmo apagar este registro?</h1>
      <div class="containet-button">
        <button @click="deleteRegister" class="save">Apagar Dados</button>
        <button type="button" @click="closeDeleteModal" class="exit">
          Cancelar
        </button>
      </div>
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

const deleteRegister = async () => {
  const userId = props.user.id;
  try {
    const response = await api.put(`/user/${userId}`);
    if (response.data) {
      await Swal.fire({
        icon: "success",
        title: "Registro apagado com sucesso!",
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

const closeDeleteModal = () => {
  emit("close-delete-modal");
};
</script>

<style scoped>
.budget-form-container-delet {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.message {
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
