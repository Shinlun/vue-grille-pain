import { GpNotificationType } from "./enums";

export interface GpNotification {
  id: string;
  title?: string;
  message?: string;
  type?: GpNotificationType;
}
