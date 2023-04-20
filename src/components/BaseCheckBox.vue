<template>
    <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" @change="onCheck" :checked="checked">
        <span class="ml-2 text-gray-700">
      <slot></slot>
    </span>
    </label>
</template>

<script>
export default {
    name: "BaseCheckBox",
    props: {
        checked: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onCheck() {
            this.$emit("update:checked", !this.checked);
        }
    }
}
</script>

<style scoped>
</style>