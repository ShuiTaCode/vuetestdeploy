<template>
  <BasicButton class="p-button-sm p-button-rounded" style="height:fit-content" v-on:click="toggleValue">
    <div style="display: flex; justify-content: center;width: 1rem;height:1rem">
      <div
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <div>
          {{ computedLabel }}
        </div>
      </div>
    </div>
  </BasicButton>
</template>

<script>
export default {
  name: "TrackPanelButton",
  components: {},
  props: {
    buttonType: {
      type: String,
      default: "mute",
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    computedLabel() {
      if (this.buttonType) {
        console.log("buttonType", this.buttonType[0]);
        return this.buttonType[0].toUpperCase();
      } else {
        return "E";
      }
    },
    computedValue: {
      get() {
        return this.value;
      },
      set(nv) {
        this.$emit("update:value", nv);
      },
    },
  },
  methods: {
    toggleValue() {
      this.computedValue = !this.computedValue;
    },
  },
};
</script>

<style scoped></style>
