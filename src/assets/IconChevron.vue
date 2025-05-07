<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      :style="transformStyle"
  >
    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  direction: {
    type: String,
    default: 'left',
    validator: (value) => ['up', 'right', 'down', 'left'].includes(value)
  }
});

const transformStyle = computed(() => {
  const rotations = {
    up: 'rotate(90deg)',
    right: 'rotate(180deg)',
    down: 'rotate(270deg)',
    left: 'rotate(0deg)'
  };

  return { transform: rotations[props.direction] };
});
</script>