import {defineStore} from 'pinia';

export const useTaskStore = defineStore({
    id: 'task',
    state: () => ({
        tasks: []
    }),
    actions: {
        addTask(task) {
            this.tasks.push(task);
        },
        updateTask(index, completed) {
            this.tasks = this.tasks.map((task, i) => {
                if (i === index) {
                    return {...task, completed: !completed};
                } else {
                    return task;
                }
            });
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
        }
    },
    getters: {
        getTasks() {
            return this.tasks;
        },
    },
    persist: true
});