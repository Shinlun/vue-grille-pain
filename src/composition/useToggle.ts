import { ref } from "vue";

export default function useToggle(init: boolean) {
  const bool = ref(init);

  const toggle = () => (bool.value = !bool.value);

  return { bool, toggle };
}
