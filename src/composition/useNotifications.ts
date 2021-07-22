import { Ref, ref } from "vue";
import { GpNotification } from "../components";
import uniqId from "../utils/uniqId";

const notifications: Ref<GpNotification[]> = ref([]);

export default function useNotifications() {
  const addNotification = (notification: Omit<GpNotification, "id">) => {
    notifications.value.push({
      id: uniqId(),
      ...notification,
    });
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter(
      (notif) => notif.id !== id
    );
  };

  return { notifications, addNotification, removeNotification };
}
