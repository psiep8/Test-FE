<template>
    <div>
        <label :for="id">{{ label }}</label>
        <br/>
        <input class="border border-gray-300 px-4 py-3 rounded-lg shadow-sm mb-6 mt-4 w-full" :id="id" type="text"
               :placeholder="placeholder" v-model="value">
        <div>
            <BaseButton class="w-3/4" type="solid"
                        @click="addTask" :disabled="value===''">
                Inserisci task
            </BaseButton>
        </div>
    </div>
</template>
<script>
import {computed, ref} from "vue";
import BaseButton from "./BaseButton.vue";
import {useTaskStore} from "../store/store.js";

export default {
    name: "BaseInput",
    components: {BaseButton},
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        },

    }, setup() {
        const taskStore = useTaskStore();
        const value = ref('');
        const tasks = computed(() => {
            return taskStore.getTasks
        });

        const addTask = () => {
            taskStore.addTask({
                description: value.value,
                completed: false
            });
            value.value = '';
        };
        return {
            tasks,
            addTask,
            value
        };

    }


}
</script>

<style scoped>
</style>