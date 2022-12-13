<script setup lang="ts">
import { ref, onMounted } from 'vue';

const users = ref([{
  id: Number,
  name: String,
}]);

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  users.value = data;
});
</script>

<template>
  <h2>Users一覧</h2>
  <ul>
    <li v-for="user in users" :key="user.id">
      <RouterLink :to="`/users/${user.id}`">{{ user.name }}</RouterLink>
    </li>
  </ul>
</template>
