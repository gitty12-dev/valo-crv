<script setup lang="ts">
import { ref, onMounted, watch} from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps({
  userId: String,
});

const user = ref({
  id: Number,
  name: String,
  email: String
});

let id:number = Number(props.userId);
const isExistId = ref(false);

const fetchUser = async (userId: number) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`
  const res: Response = await fetch(url)
  if (res.ok) {
    isExistId.value = true;
    const data = await res.json();
    user.value = data;
  } else {
    isExistId.value = false;
    console.error('Could not fetch url :' + url)
  }
}

// 違うコンポーネントの場合
onMounted(() => {
  fetchUser(Number(props.userId));
});

// 同じコンポーネント内の場合
onBeforeRouteUpdate(async (to, from) => {
  fetchUser(Number(to.params.userId));
})


</script>

<template>
  <h2>User詳細</h2>
  <!-- <RouterLink to="/users">戻る</RouterLink> -->
  <button @click="$router.push({ path: '/users' })">戻る</button>
  <div v-if="isExistId">
    <ul>
      <li>User Id: {{ user.id }}</li>
      <li>User Name: {{ user.name }}</li>
      <li>User Email: {{ user.email }}</li>
    </ul>
  </div>
  <div v-else>
    <p>not exist user...</p>
  </div>  
  <RouterView />
</template>
