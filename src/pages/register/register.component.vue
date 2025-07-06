<template>
  <div class="login-container h-screen flex">
    <div class="logo-container flex">
      <img src="https://i.postimg.cc/FsRYbx4m/logo.jpg" alt="logo" />
      <span class="font-bold text-3xl">HelpMom</span>
    </div>

    <div class="card flex">
      <span class="title font-normal text-xl" style="color: #B8578D;">
        ¡Crea tu cuenta en HelpMom!
      </span>
      <p class="text-center mb-4 text-gray-600 text-sm">
        Completa el siguiente formulario para comenzar a cuidar tu salud y la de tu bebé.
      </p>

      <form class="flex flex-column gap-3" @submit.prevent="handleSubmit">
        <input v-model="firstName" type="text" placeholder="Nombre" class="input-field p-3" />
        <input v-model="lastName" type="text" placeholder="Apellido" class="input-field p-3" />
        <input v-model="email" type="email" placeholder="Correo electrónico" class="input-field p-3" />

        <div class="password-field">
          <input
              :type="passwordFieldType"
              v-model="password"
              placeholder="Contraseña"
              class="input-field p-3"
          />
          <i
              :class="passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"
              @click="togglePasswordFieldType"
              class="toggle-icon"
          ></i>
        </div>

        <div class="password-field">
          <input
              :type="passwordFieldType"
              v-model="confirmPassword"
              placeholder="Confirmar contraseña"
              class="input-field p-3"
          />
          <i
              :class="passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"
              @click="togglePasswordFieldType"
              class="toggle-icon"
          ></i>
        </div>

        <!-- Selector de rol (sin texto, solo botones) -->
        <div class="flex justify-center gap-4 my-3">
          <div class="flex align-items-center gap-2">
            <input
                type="radio"
                id="madre"
                value="madre"
                v-model="role"
                class="accent-[#B8578D]"
            />
            <label for="madre" class="text-gray-700 text-sm">Madre</label>
          </div>
          <div class="flex align-items-center gap-2">
            <input
                type="radio"
                id="obstetra"
                value="obstetra"
                v-model="role"
                class="accent-[#B8578D]"
            />
            <label for="obstetra" class="text-gray-700 text-sm">Obstetra</label>
          </div>
        </div>

        <button :disabled="!formValid" type="submit" class="button p-3 mt-4" style="color: white">
          Registrarse
        </button>
      </form>
    </div>

    <h3 class="card-footer">
      ¿Ya tienes cuenta?
      <router-link to="/login" class="link" style="font-weight: 600">Iniciar Sesion</router-link>

    </h3>

    <div v-if="showDialog" class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-exclamation-circle text-red-500"></i>
      <h1>Error de registro</h1>
      <p class="text-md">{{ messageError }}</p>
      <button class="py-2 px-4 bg-red-500 text-white rounded" @click="showDialog = false">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      passwordFieldType: 'password',
      showDialog: false,
      messageError: ''
    };
  },
  computed: {
    formValid() {
      return (
          this.firstName &&
          this.lastName &&
          this.email &&
          this.password &&
          this.confirmPassword &&
          this.password === this.confirmPassword &&
          this.role
      );
    }
  },
  methods: {
    handleSubmit() {
      if (!this.formValid) {
        this.messageError = "Por favor completa todos los campos correctamente.";
        this.showDialog = true;
        return;
      }

      alert(`Cuenta creada para ${this.firstName} como ${this.role}.`);
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

.card-footer {
  font-weight: normal;
  font-size: 1rem;
}

.link {
  width: 90%;
  align-self: center;
  text-align: right;
  color: #B8578D;
  text-decoration: none;
}

.password-field {
  align-self: center;
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
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
