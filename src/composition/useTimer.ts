import { ref } from 'vue';

export default function useTimer(time: number) {
  const timeup = ref(false);

  const timeout = ref(setTimeout(() => {
    console.log('TIME UP');
    timeup.value = true
  }, time));

  const stopTimer = () => {
    console.log('STOP TIMER');
    timeup.value = false;
    clearTimeout(timeout.value);
  }

  const resetTimer = () => {
    console.log('RESET TIMER');
    timeup.value = false;
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      console.log('TIME UP');
      timeup.value = true
    }, time)
  }

  return { timeup, stopTimer, resetTimer }
}