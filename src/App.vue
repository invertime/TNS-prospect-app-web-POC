<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { user, logout } from './stores/user';
import { canRegister } from './utils/functions';

const isLogged = computed ( () => user.token != null);

const canReg = ref(true);

onMounted(async () => {
    canReg.value = await canRegister();
});

</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/register" v-if="(!isLogged) && canReg">Go to Register</RouterLink>
    <RouterLink to="/login" v-if="!isLogged">Go to Login</RouterLink>
    <RouterLink to="/dashboard" v-else>Go to dashboard</RouterLink>
    <button @click="logout" v-if="isLogged">logout</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>