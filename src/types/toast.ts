import { GpAnimation, GpTheme, GpToastType } from "./enums";

export interface GpToast {
  id: string;
  title?: string;
  message?: string;
  type?: GpToastType;
  fadeAfter?: number;
  closeOnClick?: boolean;
  animation?: GpAnimation;
  theme?: GpTheme;
  maxMessageLength?: number;
  displayTimer?: boolean;
}
