import { ref } from "vue";

export default function useTimer(time: number) {
  const timeup = ref(false);

  const timeout = ref(setTimeout(() => (timeup.value = true), time));

  const stopTimer = () => {
    timeup.value = false;
    clearTimeout(timeout.value);
  };

  const resetTimer = () => {
    timeup.value = false;
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      timeup.value = true;
    }, time);
  };

  return { timeup, stopTimer, resetTimer };
}
