<script setup lang="ts">
import { user } from '@/stores/user';
import { SERVER_URL } from '@/utils/const';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");
const role = ref("");
const nom = ref("");
const prenom = ref("");

const router = useRouter();

const handleForm = async () => {
    const response = await fetch(SERVER_URL+"/API/user/register", {
        method: 'POST',
        body: JSON.stringify({username: username.value, password: password.value, role: role.value, nom: nom.value, prenom: prenom.value}),
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
        <input type="text" id="fusername" name="username" placeholder="John.Doe" v-model="username" />
        <label for="fpassword">Password:</label>
        <input type="password" id="fpassword" name="password" placeholder="S3cret-P4ssw0rd" v-model="password" />
        <label for="frole">Role:</label>
        <select id="frole" name="role" v-model="role" >
            <option value="CEO">CEO</option>
            <option value="Project-Manager">Project Manager</option>
            <option value="DSI">DSI</option>
        </select>
        <label for="ffirstname">First Name:</label>
        <input type="text" id="ffirstname" name="prenom" placeholder="John" v-model="prenom" />
        <label for="flastname">Last Name:</label>
        <input type="text" id="flastname" name="nom" placeholder="Doe" v-model="nom" />
        <input type="submit" value="Register">
    </form>
</template>
