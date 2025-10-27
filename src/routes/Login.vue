<script setup lang="ts">
import { user } from '@/stores/user';
import { SERVER_URL } from '@/utils/const';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");

const router = useRouter();

const handleForm = async () => {
    const response = await fetch(SERVER_URL+"/API/user/login", {
        method: 'POST',
        body: JSON.stringify({username: username.value, password: password.value}),
        headers: {'Content-Type': 'application/json'},
    });
    const body = await response.json();
    const token = body.token;
    user.token = token;
    localStorage.setItem("token", token);
    router.push("/dashboard");
}
</script>

<template>
   <form @submit.prevent="handleForm">
        <label for="fusername">Username:</label>
        <input type="text" id="fusername" name="username" placeholder="John.Doe" v-model="username"/>
        <label for="fpassword">Password:</label>
        <input type="password" id="fpassword" name="password" placeholder="S3cret-P4ssw0rd" v-model="password"/>
        <input type="submit" value="login">
    </form>
</template>
