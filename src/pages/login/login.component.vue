<template>
  <div class="login-container h-screen flex">
    <div class="logo-container flex">
      <img src="https://i.postimg.cc/FsRYbx4m/logo.jpg" alt="logo" />
      <span class="font-bold text-3xl">HelpMom</span>
    </div>

    <div class="card flex">
      <span class="title font-normal text-xl" style="color: #B8578D;">
        ¡Bienvenida a HelpMom!
      </span>
      <p class="text-center mb-4 text-gray-600 text-sm">
        Plataforma para madres gestantes y primerizas: accede a atención médica especializada y lleva el control de tu salud y la de tu bebé.
      </p>

      <form class="flex flex-column gap-3" @submit.prevent="handleSubmitLogin">
        <input
            type="email"
            placeholder="Correo electrónico"
            class="input-field p-3"
            v-model="email"
            @input="validateForm"
        />
        <div class="password-field">
          <input
              :type="passwordFieldType"
              placeholder="Contraseña"
              class="input-field p-3"
              v-model="password"
              @input="validateForm"
          />
          <i
              :class="passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"
              @click="togglePasswordFieldType"
              class="toggle-icon"
          ></i>
        </div>

        <a class="link" href="#" style="color: #B8578D; font-style:italic; font-size: 0.8rem;">
          ¿Olvidaste tu contraseña?
        </a>

        <button :disabled="!formValid" type="submit" class="button p-3" style="color: #fff; margin-top:30px">
          Iniciar sesión
        </button>
      </form>
    </div>

    <h3 class="card-footer">
      ¿Eres nueva en HelpMom?
      <router-link to="/register" class="link" style="font-weight: 600">Crea una cuenta</router-link>
    </h3>

    <div v-if="showDialog" class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-exclamation-circle text-red-500"></i>
      <h1>¡Inicio de sesión fallido!</h1>
      <p class="text-md">{{ message_error }}</p>
      <button class="py-2 px-4 bg-red-500 text-white rounded" @click="showDialog = false">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-content",
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      formValid: false,
      showDialog: false,
      message_error: ''
    };
  },
  methods: {
    handleSubmitLogin() {
      if (!this.email || !this.password) {
        this.message_error = "Por favor, completa todos los campos.";
        this.showDialog = true;
      } else {
        // Simulación de login exitoso
        alert("Inicio de sesión simulado. Aquí iría la navegación a la plataforma.");
      }
    },
    validateForm() {
      this.formValid = this.email !== '' && this.password !== '';
    },
    togglePasswordFieldType() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
};
</script>

<style scoped>
.login-container {
  background-color: #FCEFF5;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.logo-container {
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
}

.card {
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: center;
  padding: 40px;
  margin: 40px;
  flex-direction: column;
}

.title {
  margin-bottom: 10px;
}

.input-field {
  align-self: center;
  width: 90%;
  border-radius: 20px;
  border: 1px solid #BDBDBD;
  color: #0009;
}

.input-field:focus {
  background-color: #F7F7F7;
}

.button {
  width: 40%;
  align-self: center;
  background-color: #B8578D;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.button:hover {
  background-color: #99436F;
}

.link {
  width: 90%;
  align-self: center;
  text-align: right;
  color: #B8578D;
  text-decoration: none;
}

.card-footer {
  font-weight: normal;
  font-size: 1rem;
}

.password-field {
  align-self: center;
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
}

.input-field {
  flex: 1;
  padding-right: 2.5rem;
}

.toggle-icon {
  color: #575757;
  position: absolute;
  right: 15px;
  cursor: pointer;
}

.error-modal {
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  margin-top: 1rem;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  max-width: 400px;
}
</style>
