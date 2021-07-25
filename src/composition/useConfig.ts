import { Ref, ref } from "vue";
import { GpAnimation, GpOrder, GpPosition, GpTheme } from "../types/enums";

interface GpConfig {
  animation: GpAnimation;
  order: GpOrder;
  position: GpPosition;
  theme: GpTheme;
  fadeAfter: number;
  closeOnClick: boolean;
  maxMessageLength?: number;
}

export interface GpOptions {
  animation?: GpAnimation;
  order?: GpOrder;
  position?: GpPosition;
  theme?: GpTheme;
  fadeAfter?: number;
  closeOnClick?: boolean;
  maxMessageLength?: number;
}

const config: Ref<GpConfig> = ref({
  animation: GpAnimation.SLIDE_UP,
  order: GpOrder.DESC,
  position: GpPosition.BOTTOM_LEFT,
  theme: GpTheme.DARK,
  fadeAfter: 5000,
  closeOnClick: false,
});

export default function useConfig() {
  const updateConfig = (payload: GpOptions) => {
    const newConfig: GpConfig = {
      ...config.value,
      ...payload,
    };

    config.value = newConfig;
  };

  return { config, updateConfig };
}
