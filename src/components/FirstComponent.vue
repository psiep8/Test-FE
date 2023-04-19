<template>
    <div>
        <BaseInput id="task" label="Inserisci un nuovo task" v-model="newTask"/>
        <BaseButton type="solid" :disabled="newTask === ''" @click="addTask">Aggiungi Task</BaseButton>
        <BaseButton type="outline" @click="getAllTasks">Tutte le Task</BaseButton>
        <BaseButton type="outline" @click="taskCompleted">Task completate</BaseButton>
        <BaseButton type="outline" @click="taskUncompleted">Task da completare</BaseButton>
        <ul>
            <li v-for="(task, index) in filteredTasks" :key="index" :class="{ 'completed': task.completed }">
                {{ task.description }}
                <BaseCheckBox v-model="task.completed" @change="updateTask(index)" :value="task.completed"/>
                <BaseButton type="text" @click="deleteTask(task)">Cancella task</BaseButton>
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
        const showCompletedTasks = ref(false);
        const showUncompletedTasks = ref(false);

        const taskStore = useTaskStore();
        const newTask = ref('');
        const tasks = computed(() => {
            return taskStore.getTasks
        });

        const filteredTasks = computed(() => {
            if (showCompletedTasks.value === true) {
                return tasks.value.filter(task => task.completed);
            } else if (showUncompletedTasks.value === true) {
                return tasks.value.filter(task => !task.completed);
            } else {
                return tasks.value;
            }
        });
        const taskCompleted = () => {
            showCompletedTasks.value = true;
            showUncompletedTasks.value = false;
        };

        const taskUncompleted = () => {
            showCompletedTasks.value = false;
            showUncompletedTasks.value = true;
        };

        const getAllTasks = () => {
            showCompletedTasks.value = false;
            showUncompletedTasks.value = false;
        };

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

        const deleteTask = (task) => {
            taskStore.deleteTask(task);
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
            activeTasks,
            taskCompleted,
            taskUncompleted,
            filteredTasks,
            getAllTasks,
        };
    }
};
</script>


<style scoped>
.completed {
    text-decoration: line-through;
}
</style>