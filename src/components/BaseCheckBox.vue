<template>
    <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" :checked="value"
               @change="$emit('input', $event.target.checked)">
        <span class="ml-2 text-gray-700">
      <slot></slot>
    </span>
    </label>
</template>

<script>
export default {
    name: "BaseCheckBox",
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
</style>