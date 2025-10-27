<script setup lang="ts">
import { computed } from 'vue';
import { user, logout } from './stores/user';

const isLogged = computed ( () => user.token != null);


</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/login" v-if="!isLogged">Go to Login</RouterLink>
    <RouterLink to="/register" v-if="!isLogged">Go to Register</RouterLink>
    <RouterLink to="/dashboard" v-else>Go to dashboard</RouterLink>
    <button @click="logout" v-if="isLogged">logout</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>