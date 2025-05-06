<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
export default {
  name: 'app',
  components: {LanguageSwitcher},
  data() {
    return {
      drawer: false,
      items: [
        { label: 'option.home', to: '/home' }
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>