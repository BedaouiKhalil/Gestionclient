import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export const errors = ref("");

export async function getCustomers() {
    let response = await axios.get("/api/customers");
    return response.data.data;
}

export async function getCustomer(id) {
    let response = await axios.get("/api/customers/" + id);
    return response.data.data;
}

export async function createCustomer(data) {
    errors.value = "";
    try {
        await axios.post("/api/customers", data);
        await router.push({ name: "customers.index" });
    } catch (error) {
        const createCustomerErrors = error.response.data.errors;

        for (const key in createCustomerErrors) {
            errors.value += createCustomerErrors[key][0] + " ";
        }
    }
}

export async function updateCustomer(id, customer) {
    errors.value = "";
    try {
        await axios.put("/api/customers/" + id, customer);
        await router.push({ name: "customers.index" });
    } catch (error) {
        const updateCustomerErrors = error.response.data.errors;

        for (const key in updateCustomerErrors) {
            errors.value += updateCustomerErrors[key][0] + " ";
        }
    }
}

export async function destroyCustomer(id) {
    if (!window.confirm("Supprimer ce client ?")) return;

    await axios.delete("/api/customers/" + id);
}
