<template>
  <div class="container">
    <div class="container-search">
      <div class="container-data">
        <VueDatePicker
          :model-value="date"
          @update:model-value="handleDate"
          range
          placeholder="Busque uma data"
          class="date"
        />
      </div>
      <div class="container-button">
        <input v-model="searchQuery" placeholder="Pesquisar por nome" />
        <button @click="search" class="search-button">
          <font-awesome-icon icon="magnifying-glass" class="search-icon" />
        </button>
      </div>
    </div>
    <div class="user-table-container">
      <table v-if="displayedUsers.length" class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data e Hora</th>
            <th>Vendedor</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in displayedUsers" :key="user.id" class="user-row">
            <td>{{ user.id }}</td>
            <td>{{ user.client }}</td>
            <td>
              {{ user.date }} <br />
              {{ user.time }}
            </td>
            <td>{{ user.salesperson }}</td>
            <td>{{ user.description }}</td>
            <td>R$ {{ user.amount }}</td>
            <td>
              <div class="icons-action">
                <div class="icons-action-pen">
                  <button @click="openModal(user)">
                    <font-awesome-icon
                      icon="pen"
                      class="action-icon edit-icon"
                    />
                  </button>
                </div>
                <div class="icons-action-thash">
                  <button @click="openDeleteModal(user)">
                    <font-awesome-icon
                      icon="trash-alt"
                      class="action-icon delete-icon"
                    />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>Nenhum registro encontrado</p>
      </div>
    </div>
    <div v-if="isModalVisible" class="modal-overlay">
      <ModalEdit :user="selectedUser" @close-modal="closeModal" />
    </div>
    <div v-if="isDeleteModalVisible" class="modal-overlay">
      <ModalDelete
        :user="selectedUser"
        @close-delete-modal="closeDeleteModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { isWithinInterval } from "date-fns";
import VueDatePicker from "@vuepic/vue-datepicker";
import ModalDelete from "../components/ModalDelete.vue";
import ModalEdit from "../components/ModalEdit.vue";
import api from "../services/api";
import "@vuepic/vue-datepicker/dist/main.css";

const displayedUsers = ref([]);
const users = ref([]);
const isModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedUser = ref(null);
const searchQuery = ref("");
const date = ref();

const getUsers = async () => {
  try {
    const response = await api.get("/users");
    const data = response.data;
    users.value = data.users;
    displayedUsers.value = users.value;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
};

const openModal = (user) => {
  isModalVisible.value = true;
  selectedUser.value = user;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const openDeleteModal = (user) => {
  isDeleteModalVisible.value = true;
  selectedUser.value = user;
};

const closeDeleteModal = () => {
  isDeleteModalVisible.value = false;
};

const search = () => {
  const searchQueryValue = searchQuery.value.toLowerCase()
  displayedUsers.value = users.value.filter((user) => {
    const clientName = user.client.toLowerCase();
    const salespersonName = user.salesperson.toLowerCase();
    return (
      clientName.includes(searchQueryValue) ||
      salespersonName.includes(searchQueryValue)
    );
  });
};

const handleDate = (modelData) => {
  date.value = modelData;
};

const filterUsersByDate = () => {
  if (!date.value || date.value.length !== 2) {
    displayedUsers.value = users.value;
    return;
  }

  const startDate = date.value[0];
  const endDate = date.value[1];

  displayedUsers.value = users.value.filter((user) =>
    isWithinInterval(new Date(user.date), { start: startDate, end: endDate })
  );
};

watch(date, filterUsersByDate);

onMounted(() => {
  getUsers();
});
</script>

<style scoped>
.container {
  padding: 10px;
}
.user-table-container {
  overflow-x: auto;
  scroll-behavior: smooth;
}
.user-table-container::-webkit-scrollbar {
  width: 12px;
}
.user-table-container table {
  overflow-y: scroll;
}
.user-table-container::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 6px;
}

.user-table-container::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.user-table-container::-webkit-scrollbar {
  height: 12px;
}

.user-table-container::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 6px;
}

.user-table-container::-webkit-scrollbar-track {
  background-color: transparent;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
  overflow-x: auto;
}
.clickable-text {
  color: #1976d2;
  cursor: pointer;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  font-size: 15px;
}

th {
  background-color: #f8f9fa;
  color: #007bff;
}

.user-row:hover {
  background-color: #f5f5f5;
}

.icons-action,
.icons-action-thash,
.icons-action-pen {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}

.icons-action-thash button,
.icons-action-pen button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 16px;
}

.icons-action-thash button {
  color: #dc3545;
}

.icons-action-pen button {
  color: #28a745;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-search {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}
.search-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.search-button:hover {
  background-color: #0056b3;
}
.search-icon {
  font-size: 18px;
}
.container-button {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.container-data {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.date {
  width: 60%;
}
.container-button button {
  margin-left: 8px;
}

@media (max-width: 620px) {
  .user-table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px;
  }

  .container-search {
    flex-direction: column;
  }
  .container-button {
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 2%;
  }

  .container-button input {
    width: 90%;
  }
  .container-button button {
    width: 15%;
  }

  .container-button {
    width: 100%;
    justify-content: flex-start;
  }
  .container-data {
    justify-content: flex-start;
  }
}
</style>
