<script setup>
const title = "Acerca de Nosotros";
const description = "Esta es la página de información sobre nuestra aplicación.";
</script>

<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: #666;
}
</style>
