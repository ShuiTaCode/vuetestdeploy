<template>
  <div class="drum-player-layout">
    <div style="display: flex; justify-content: start">
      <BasicButton
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0"
        @click="play"
        class="p-button-icon"
        icon="pi pi-play"
        :disabled="playing || replaying || audioEvents.length===0"
      ></BasicButton>
      <BasicButton
        @click="pause"
        class="p-button-icon"
        icon="pi pi-stop"
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0.25rem"
        :disabled="!playing && !replaying"
      ></BasicButton>

      <BasicButton
        @click="replay"
        class="p-button-icon"
        icon="pi pi-replay"
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0.25rem"
        :disabled="playing || replaying || audioEvents.length===0"
      ></BasicButton>
      <NumberInput
        style="width: 20%; margin: 0.5rem"
        v-model="bestPerMinute"
      ></NumberInput>
    </div>
  </div>
</template>

<script>
// import ColCenterDiv from "@/components/ColCenterDiv.vue";
// import RowCenterDiv from "@/App.vue";
// import ColCenterDiv from "@/components/ColCenterDiv.vue";

import DrPlayer from "@/components/player/DrPlayer";

export default {
  name: "DrumPlayer",
  components: {},
  data(){
    return {
      playing:false,
      replaying:false
    }
  },
  props: {
    bpm: {
      type: Number,
      default: 60,
    },
    audioEvents: {
      type: Array,
    },
  },
  computed: {
    bestPerMinute: {
      get() {
        return this.bpm;
      },
      set(nv) {
        this.$emit("update:bpm", nv);
      },
    },
  },
  methods: {
    play() {
      this.playing=true
      // this.$emit("play");
      DrPlayer.prePareAndPlayPiece(this.audioEvents, this.bpm);
    },
    pause() {
      // this.$emit("pause");
      this.playing=false
      this.replaying=false
      DrPlayer.stopPiece();
    },
    replay() {
      this.replaying=true
      this.playing=true
      DrPlayer.replay(this.audioEvents, this.bpm)
    },
    handlePlayStart() {
      this.$emit("PlayStart")
    },
    handlePlayEnd(evt) {
      this.playing=false
      this.$emit("PlayEnd",evt)
    },
  },
  mounted() {
    DrPlayer.eventEmitterDelegate.addListener("playing", this.handlePlayStart);
    DrPlayer.eventEmitterDelegate.addListener("end", this.handlePlayEnd);
  },
  beforeUnmount() {
    DrPlayer.eventEmitterDelegate.removeListener("playing",this.handlePlayStart)
    DrPlayer.eventEmitterDelegate.removeListener("end",this.handlePlayEnd)
  }
};
</script>

<style scoped>
.drum-player-layout {
  display: flex;
  width: 100%;
}
:deep(input) {
  box-sizing: border-box;
  width: 100%;
}
</style>
