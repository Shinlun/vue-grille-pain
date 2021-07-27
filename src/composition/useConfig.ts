import { Ref, ref } from "vue";
import { GpAnimation, GpOrder, GpPosition, GpTheme } from "../types/enums";
import { GpToast } from "../types/toast";

type GpConfig = Omit<GpToast, "id"> & {
  order: GpOrder;
  position: GpPosition;
  fullWidth: boolean;
};
export type GpOptions = Partial<GpConfig>;

const config: Ref<GpConfig> = ref({
  animation: GpAnimation.SLIDE_UP,
  order: GpOrder.DESC,
  position: GpPosition.BOTTOM_LEFT,
  theme: GpTheme.DARK,
  fadeAfter: 5000,
  closeOnClick: false,
  fullWidth: false,
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
