import { ref } from "vue";

export default function useTimer(time: number) {
  const timeup = ref(false);
  const timeout =
    time > 0 ? ref(setTimeout(() => (timeup.value = true), time)) : ref(null);

  const stopTimer = () => {
    timeup.value = false;
    timeout.value && clearTimeout(timeout.value);
  };

  const resetTimer = () => {
    timeup.value = false;
    timeout.value && clearTimeout(timeout.value);
    timeout.value =
      time > 0
        ? setTimeout(() => {
            timeup.value = true;
          }, time)
        : null;
  };

  return { timeup, stopTimer, resetTimer };
}
