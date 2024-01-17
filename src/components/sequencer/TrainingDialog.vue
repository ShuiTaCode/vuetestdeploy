<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["update:visible","apply"]);
const props = defineProps({
  visible: Boolean,
  startTempo:{
    type:Number,
    default:100,
  }
});

const compVisible = computed({
  get() {
    return props.visible;
  },
  set(nv) {
    emit("update:visible", nv);
  },
});

const trainingOptions = ref({
  startTempo: props.startTempo,
  repsBeforeIncrease: 4,
  increase: 5,
});
const close = () =>{
  compVisible.value = false
}

const applyAndClose = ()=>{
  emit("apply",trainingOptions.value)
  close()
}

const cancelAndClose = ()=>{
  close()
}


</script>

<template>
  <BasicDialog header="Start training" modal v-model:visible="compVisible">
    <div>
      <div style="display: flex;justify-content: space-between">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1rem;
          "
        >
          <div>Start tempo</div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1rem;
          "
        >
          <NumberInput v-model="trainingOptions.startTempo"></NumberInput>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1rem;
          "
        >
          <div>Reps before increase</div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1rem;
          "
        >
          <NumberInput
            v-model="trainingOptions.repsBeforeIncrease"
          ></NumberInput>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1rem;
          "
        >
          <div>Bpm to increase</div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 1rem;
          "
        >
          <NumberInput v-model="trainingOptions.increase"></NumberInput>
        </div>
      </div>
    </div>
    <template #footer>
      <BasicButton label="Apply" icon="pi pi-check" @click="applyAndClose" autofocus />
      <BasicButton label="Cancel" icon="pi pi-time" @click="cancelAndClose"  />
    </template>
  </BasicDialog>
</template>

<style scoped></style>
