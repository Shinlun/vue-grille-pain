import { GpAnimation, GpOrder, GpPosition } from "@/components";
import { GpTheme } from "@/types/enums";
import { ref } from "vue";

interface Config {
  animation: GpAnimation;
  order: GpOrder;
  position: GpPosition;
  theme: GpTheme;
  fade: number;
}

const config = ref({
  animation: GpAnimation.SLIDE_UP,
  order: GpOrder.ASC,
  position: GpPosition.BOTTOM,
  theme: GpTheme.LIGHT,
  fade: 5000,
});

export default function useConfig() {
  const updateConfig = (newConfig: Config) => {
    config.value = newConfig;

    // console.log("theme: ", config.value.theme);
    // console.log("animation: ", config.value.animation);
    // console.log("order: ", config.value.order);
    // console.log("position: ", config.value.position);
    // console.log("fade after: ", config.value.fade);
  };

  return { config, updateConfig };
}
