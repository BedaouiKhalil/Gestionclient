<template>
    <div v-if="errors !== ''">
        {{ errors }}
    </div>
    <form class="space-y-6" @submit.prevent="saveCustomer">
        <div>
            <label for="name" class="block">Nom du client</label>
            <input
                type="text"
                id="name"
                v-model="customer.name"
                class="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md shadow-sm"
            />
        </div>
        <div>
            <label for="tel" class="block">Tél. du client</label>
            <input
                type="text"
                id="tel"
                v-model="customer.tel"
                class="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md shadow-sm"
            />
        </div>
        <div>
            <label for="is_favourite" class="block">Favori ?</label>
            <input
                type="checkbox"
                id="is_favourite"
                v-model="customer.is_favourite"
                class="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md shadow-sm"
            />
        </div>
        <button
            type="submit"
            class="px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        >
            Mettre à jour
        </button>
    </form>
</template>

<script>
import { ref, onMounted } from "vue";
import {
    getCustomer,
    updateCustomer,
    errors,
} from "../services/customerservices.js";

export default {
    props: {
        id: {
            required: true,
            type: String,
        },
    },

    setup(props) {
        const customer = ref([]);

        onMounted(async () => {
            customer.value = await getCustomer(props.id);
        });

        const saveCustomer = async () => {
            await updateCustomer(props.id, customer.value);
        };

        return {
            saveCustomer,
            customer,
            errors,
        };
    },
};
</script>
