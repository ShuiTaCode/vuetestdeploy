<template>
  <div class="drum-player-layout">
    <div style="display: flex; justify-content: start">
      <BasicButton
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0"
        @click="play"
        class="p-button-icon"
        icon="pi pi-play"
        :disabled="replaying"
        v-if="!playing"
      ></BasicButton>
      <BasicButton
          v-else
        @click="pause"
        class="p-button-icon"
        icon="pi pi-stop"
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0.25rem"
        :disabled="replaying"
      ></BasicButton>

      <BasicButton
        @click="replay"
        class="p-button-icon"
        icon="pi pi-replay"
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0.25rem"
        :disabled="playing"
        v-if="!replaying"
      ></BasicButton>
      <BasicButton
          v-else
          @click="pause"
          class="p-button-icon"
          icon="pi pi-stop"
          style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0.25rem"
          :disabled="playing"
      ></BasicButton>

      <NumberInput
        style="width: 50%; margin: 0.5rem"
        v-model="bestPerMinute"
        suffix=" bpm"
        step="1"
        show-buttons
      ></NumberInput>
    </div>
  </div>
</template>

<script>
// import ColCenterDiv from "@/components/ColCenterDiv.vue";
// import RowCenterDiv from "@/App.vue";
// import ColCenterDiv from "@/components/ColCenterDiv.vue";

// import DrPlayer from "@/components/player/DrPlayer";
import DrumPlayer from "@/components/player/DrPlayer";

export default {
  name: "DrumPlayer",
  components: {},
  data(){
    return {
      playing:false,
      replaying:false,
      drumPlayer:new DrumPlayer()
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
      this.drumPlayer.prePareAndPlayPiece(this.audioEvents, this.bpm);
    },
    pause() {
      // this.$emit("pause");
      this.playing=false
      this.replaying=false
      this.drumPlayer.stopPiece();
    },
    replay() {
      this.replaying=true
      // this.playing=true
      this.drumPlayer.prePareAndPlayPiece(this.audioEvents, this.bpm);
      // DrPlayer.replay(this.audioEvents, this.bpm)
    },
    handlePlayStart() {
      this.$emit("PlayStart")
    },
    handlePlayEnd(evt) {
      if(this.replaying){
        this.drumPlayer.prePareAndPlayPiece(this.audioEvents, this.bpm);
      }else{
        this.playing=false
        this.$emit("PlayEnd",evt)
      }


    },
  },
  mounted() {
    this.drumPlayer.eventEmitterDelegate.addListener("playing", this.handlePlayStart);
    this.drumPlayer.eventEmitterDelegate.addListener("end", this.handlePlayEnd);
  },
  beforeUnmount() {
    this.drumPlayer.eventEmitterDelegate.removeListener("playing",this.handlePlayStart)
    this.drumPlayer.eventEmitterDelegate.removeListener("end",this.handlePlayEnd)
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
  padding-left:0.5rem;
}
</style>
