<template>
    <div>
        <BaseInput id="task" label="Inserisci un nuovo task" v-model="newTask"/>
        <BaseButton type="solid" :disabled="newTask === ''" @click="addTask">Aggiungi Task</BaseButton>
        <ul>
            <li v-for="(task, index) in tasks" :key="index" :class="{ 'completed': task.completed }">
                {{ task.description }}
                <BaseCheckBox @change="updateTask(index)"/>
                <BaseButton type="outline" @click="deleteTask(index)">Cancella task</BaseButton>
            </li>
        </ul>
        <p>Active tasks: {{ activeTasks }}</p>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import BaseCheckBox from './BaseCheckBox.vue';
import {useTaskStore} from "../store/store.js";

export default {
    components: {
        BaseInput,
        BaseButton,
        BaseCheckBox
    },
    setup() {
        const taskStore = useTaskStore();
        const newTask = ref('');
        const tasks = computed(() => {
            return taskStore.getTasks
        });

        const addTask = () => {
            taskStore.addTask({
                description: newTask.value,
                completed: false
            });
            newTask.value = '';
        };

        const updateTask = (index) => {
            const task = tasks.value[index];
            taskStore.updateTask(index, task.completed)
        };

        const deleteTask = (index) => {
            taskStore.deleteTask(index);
        };

        const activeTasks = computed(() => {
            return tasks.value.filter(task => !task.completed).length;
        });


        return {
            newTask,
            tasks,
            addTask,
            updateTask,
            deleteTask,
            activeTasks
        };
    }
};
</script>


<style scoped>
.completed {
    text-decoration: line-through;
}
</style>