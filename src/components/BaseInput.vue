<template>
    <div>
        <label :for="id">{{ label }}</label>
        <br/>
        <input class="border border-gray-300 px-3 py-2 rounded-lg shadow-sm" :id="id" type="text"
               :placeholder="placeholder" v-model="localValue" @input="$emit('update:modelValue',$event.target.value)">
    </div>
</template>
<script>
export default {
    name: "BaseInput",
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
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            localValue: this.value
        }
    }
}
</script>

<style scoped>
</style>