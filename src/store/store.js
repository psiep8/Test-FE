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
        updateTask(task, completed) {
            const taskToFind = this.tasks.find(res => res.description === task.description);
            if (taskToFind) {
                this.tasks = this.tasks.map(t => {
                    if (t === taskToFind) {
                        return {...t, completed: !completed};
                    }
                    return t;
                });
            }
        },
        deleteTask(task) {
            const taskIndex = this.tasks.indexOf(task);
            this.tasks.splice(taskIndex, 1);
        }

    },
    getters: {
        getTasks() {
            return this.tasks;
        },
    },
    persist: true
});