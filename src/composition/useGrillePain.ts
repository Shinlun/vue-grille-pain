import { Ref, ref } from "vue";
import { GpToast } from "../types/toast";
import uniqId from "../utils/uniqId";

const notifications: Ref<GpToast[]> = ref([]);

export default function useGrillePain() {
  const toast = (notification: Omit<GpToast, "id">) =>
    notifications.value.push({
      id: uniqId(),
      ...notification,
    });

  const clean = (id: string) =>
    (notifications.value = notifications.value.filter(
      (notif) => notif.id !== id
    ));

  return { notifications, toast, clean };
}
