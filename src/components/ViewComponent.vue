<template>

    <div class="mx-auto border-2 border-gray-300 shadow p-4 flex flex-col justify-center items-center">
        <div class="w-full md:w-1/2 lg:w-1/3 text-center mb-4">
            <div class="w-full mb-4">
                <BaseInput id="task" label="Inserisci un nuovo task" class="w-full"/>
            </div>
            <div class="mt-1 flex justify-center items-center w-full flex-row justify-between">
                <BaseButton type="outline" @click="getAllTasks" class="flex-1 text-xs mr-2 md:mr-4 mb-2 md:mb-0">Lista
                    task
                </BaseButton>
                <BaseButton type="outline" @click="taskCompleted" class="flex-1 text-xs mr-2 md:mr-4 mb-2 md:mb-0">Task
                    completati
                </BaseButton>
                <BaseButton type="outline" @click="taskIncomplete" class="flex-1 text-xs mr-2 md:mr-4 mb-2 md:mb-0">
                    Task da completare
                </BaseButton>
            </div>
        </div>
        <ul class="list-none w-full md:w-1/2 lg:w-1/3 mt-4">
            <li v-for="(task, index) in filteredTasks" :key="index"
                class="break-words flex justify-between items-center py-2 border-b border-gray-300">
                <div class="flex items-center" :class="{ 'completed': task.completed }">
                    <div v-if="task.completed">
                        <BaseCheckBox @change="updateTask(task)" :checked="true" class="mr-2"/>
                    </div>
                    <div v-else>
                        <BaseCheckBox @change="updateTask(task)" :checked="false" class="mr-2"/>
                    </div>
                    <span>{{ task.description }}</span>
                </div>
                <BaseButton type="text" @click="deleteTask(task)" class="mx-2 text-red-500">Cancella task</BaseButton>
            </li>
        </ul>
        <p class="w-full md:w-1/2 lg:w-1/3 mt-4 text-center">Task da completare: {{ activeTasks }}</p>
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
        const showIncompleteTasks = ref(false);
        const taskStore = useTaskStore();
        const newTask = ref('');
        const tasks = computed(() => {
            return taskStore.getTasks
        });

        const filteredTasks = computed(() => {
            if (showCompletedTasks.value === true) {
                return tasks.value.filter(task => task.completed);
            } else if (showIncompleteTasks.value === true) {
                return tasks.value.filter(task => !task.completed);
            } else {
                return tasks.value;
            }
        });
        const taskCompleted = () => {
            showCompletedTasks.value = true;
            showIncompleteTasks.value = false;
        };

        const taskIncomplete = () => {
            showCompletedTasks.value = false;
            showIncompleteTasks.value = true;
        };

        const getAllTasks = () => {
            showCompletedTasks.value = false;
            showIncompleteTasks.value = false;
        };

        const updateTask = (task) => {
            taskStore.updateTask(task, task.completed);
            showCompletedTasks.value = false;
            showIncompleteTasks.value = false;
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
            updateTask,
            deleteTask,
            activeTasks,
            taskCompleted,
            taskIncomplete,
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