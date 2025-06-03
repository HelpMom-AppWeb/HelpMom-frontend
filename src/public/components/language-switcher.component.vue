<template>
  <div class="language-switcher" ref="switcher">
    <button class="dropdown-button" @click="toggle">
      <img :src="getFlagSrc(currentLocale)" class="flag" />
      <span class="label">{{ getLabel(currentLocale) }}</span>
      <span class="arrow">▼</span>
    </button>

    <div v-if="visible" class="dropdown-menu">
      <div
          v-for="lang in languages"
          :key="lang"
          :class="['language-option', { active: isActive(lang) }]"
          @click="changeLanguage(lang)"
      >
        <img :src="getFlagSrc(lang)" class="flag" />
        <span class="label">{{ getLabel(lang) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  data() {
    return {
      visible: false,
      languages: [],
      currentLocale: this.$i18n.locale,
    };
  },
  created() {
    this.languages = this.$i18n.availableLocales;
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentLocale = lang;
      this.visible = false;
    },
    isActive(lang) {
      return this.currentLocale === lang;
    },
    getLabel(lang) {
      return {
        en: "English",
        es: "Español",
      }[lang] || lang.toUpperCase();
    },
    getFlagSrc(lang) {
      return {
        en: "https://flagcdn.com/gb.svg",
        es: "https://flagcdn.com/es.svg",
      }[lang];
    },
    handleClickOutside(event) {
      if (this.visible && !this.$refs.switcher.contains(event.target)) {
        this.visible = false;
      }
    },
  },
};
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  font-family: sans-serif;
}

.dropdown-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.flag {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
}

.label {
  font-weight: 500;
}

.arrow {
  font-size: 0.6rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.4rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 150px;
  padding: 0.5rem 0;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.language-option:hover {
  background: #f0f0f0;
}

.language-option.active {
  background: #e50914;
  color: white;
  font-weight: bold;
}
</style>
