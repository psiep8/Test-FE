<template>
    <div class="mx-auto border-2 border-gray-300 shadow p-4 flex flex-col justify-center items-center">
        <div class="flex flex-wrap justify-center items-center w-full">
            <div class="w-full md:w-1/2 lg:w-1/3 text-center mb-4">
                <BaseInput id="task" label="Inserisci un nuovo task" v-model="newTask" class="w-full"/>
            </div>
            <div class="flex flex-col md:flex-row mt-1">
                <BaseButton type="solid" :disabled="newTask === ''" @click="addTask"
                            class="mx-2 my-1 md:my-0 md:ml-2 lg:ml-4">Inserisci task
                </BaseButton>
                <div class="mt-1">
                    <BaseButton type="outline" @click="getAllTasks" class="flex-1 text-xs">Lista task
                    </BaseButton>
                    <BaseButton type="outline" @click="taskCompleted" class="flex-1 text-xs">Task
                        completati
                    </BaseButton>
                    <BaseButton type="outline" @click="taskUncompleted" class="flex-1 text-xs">Task da
                        completare
                    </BaseButton>
                </div>
            </div>
        </div>

        <ul class="list-none w-full md:w-1/2 lg:w-1/3 mt-4">
            <li class="break-words" v-for="(task, index) in filteredTasks" :key="index"
                :class="{ 'completed': task.completed }">
                {{ task.description }}
                <BaseCheckBox v-model="task.completed" @change="updateTask(task)" :value="task.completed"/>
                <BaseButton type="text" @click="deleteTask(task)" class="mx-2">Cancella task
                </BaseButton>
            </li>
        </ul>
        <p class="w-full md:w-1/2 lg:w-1/3">Task da completare: {{ activeTasks }}</p>
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
            console.log(filteredTasks.value)
            console.log(showCompletedTasks.value)
            console.log(showUncompletedTasks.value)
        };

        const taskUncompleted = () => {
            showCompletedTasks.value = false;
            showUncompletedTasks.value = true;
            console.log(filteredTasks.value)
            console.log(showCompletedTasks.value)
            console.log(showUncompletedTasks.value)
        };

        const getAllTasks = () => {
            showCompletedTasks.value = false;
            showUncompletedTasks.value = false;
            console.log(filteredTasks.value)
            console.log(showCompletedTasks.value)
            console.log(showUncompletedTasks.value)
        };

        const addTask = () => {
            taskStore.addTask({
                description: newTask.value,
                completed: false
            });
            newTask.value = '';
        };

        const updateTask = (task) => {
            taskStore.updateTask(task, task.completed);
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