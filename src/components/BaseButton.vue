<template>
    <button :class="buttonClasses" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        type: {
            type: String,
            default: 'solid'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        buttonClasses() {
            let classes = 'py-2 px-4 rounded focus:outline-none'
            if (this.type === 'solid') {
                classes += ' bg-blue-500 hover:bg-blue-700 text-white'
            } else if (this.type === 'outline') {
                classes += ' border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
            } else if (this.type === 'text') {
                classes += ' text-blue-500 hover:bg-blue-100'
            }
            if (this.disabled) {
                classes += ' opacity-50 cursor-not-allowed'
            }
            return classes
        }
    }
}
</script>

<style scoped>
</style>
