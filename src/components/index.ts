import { App, createApp } from "vue";
import useConfig, { GpOptions } from "../composition/useConfig";
import useGrillePain from "../composition/useGrillePain";
import {
  GpAnimation,
  GpOrder,
  GpPosition,
  GpTheme,
  GpToastType,
} from "../types/enums";
import { GpToast } from "../types/toast";
import GrillePain from "./GrillePain.vue";

export default {
  install(app: App, options: GpOptions) {
    const { updateConfig } = useConfig();
    updateConfig(options);

    const mountPoint = document.createElement("div");
    document.body.appendChild(mountPoint);

    createApp(GrillePain).mount(mountPoint);
  },
};

export {
  useGrillePain,
  GpOptions,
  GpToastType,
  GpTheme,
  GpPosition,
  GpAnimation,
  GpOrder,
  GpToast,
};
