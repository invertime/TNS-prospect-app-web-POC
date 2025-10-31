<script setup lang="ts">
import { user } from '@/stores/user';
import { SERVER_URL } from '@/utils/const';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';

const first_name = ref("");
const last_name = ref("");
const birth_date = ref(Date.now());
const password = ref("");
const email = ref("");
const phone = ref("");
const health_insurance_card = ref(0);
const role_id = ref(0);

const router = useRouter();

const handleForm = async () => {
    const response = await fetch(SERVER_URL+"/API/user/register", {
        method: 'POST',
        body: JSON.stringify({
            first_name: first_name.value,
            last_name: last_name.value,
            birth_date: birth_date.value,
            password: password.value,
            email: email.value,
            phone:phone.value,
            health_insurance_card: health_insurance_card.value,
            role_id: role_id.value
        }),
        headers: {'Content-Type': 'application/json'},
    });
    const code = await response.status;
    if (code >= 400){
        console.log("error handling boyyys");
        return code
    }
    const body = await response.json();
    const token = body.token;
    user.token = token;
    localStorage.setItem("token", token);
    router.push("/dashboard");
}

type Json = {
  description: string
  id: number
  permissions: string
  title: string
}

const roles: Ref<Array<Json> | undefined> = ref()

onMounted( async () => {
    const response = await fetch(SERVER_URL+"/API/roles");
    const body = await response.json() as Array<Json>;
    roles.value = body;
})

</script>

<template>
   <form @submit.prevent="handleForm">

        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname" placeholder="John" v-model="first_name" />

        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" name="username" placeholder="Doe" v-model="last_name" />

        <label for="">Date of Birth:</label>
        <input type="date" id="bdate" name="bdate" v-model="birth_date" />

        <label for="fpassword">Password:</label>
        <input type="password" id="fpassword" name="password" placeholder="S3cret-P4ssw0rd" v-model="password" />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="mail@mail.mail" v-model="email" />

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" placeholder="0702030405" v-model="phone" />

        <label for="healthinsurancecard">Health insurance card:</label>
        <input type="number" id="healthinsurancecard" name="healthinsurancecard" placeholder="101018732001" v-model="health_insurance_card" />


        <label for="frole">Role:</label>
        <select id="frole" name="role" v-model="role_id" >
            <option v-for="role in roles" :key="role.id" :value="role.id" >{{ role.title }}</option>
        </select>

        <input type="submit" value="Register">

    </form>
</template>
