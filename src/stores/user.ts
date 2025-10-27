import { router } from '@/routes';
import { reactive } from 'vue'

export const user = reactive({ token: localStorage.getItem("token") })

export const logout = () => {
    user.token = null;
    localStorage.removeItem("token")
    router.push("/")
}
