<template>
    <div v-if="errors !== ''">
        {{ errors }}
    </div>
    <form class="space-y-6" @submit.prevent="storeCustomer">
        <div>
            <label for="name" class="block">Nom du client</label>
            <input type="text" id="name" v-model="form.name" />
        </div>
        <div>
            <label for="tel" class="block">Tél. du client</label>
            <input type="text" id="tel" v-model="form.tel" />
        </div>
        <div>
            <label for="is_favourite" class="block">Favori ?</label>
            <input
                type="checkbox"
                id="is_favourite"
                v-model="form.is_favourite"
            />
        </div>
        <button type="submit">Enregistrer</button>
    </form>
</template>

<script>
import { ref, reactive } from "vue";
import { createCustomer, errors } from "../services/customerservices.js";

export default {
    setup() {
        const form = reactive({
            name: "",
            tel: "",
            is_favourite: "",
        });

        const storeCustomer = async () => {
            await createCustomer({ ...form });
        };

        return {
            form,
            errors,
            storeCustomer,
        };
    },
};
</script>
