<template>
    <div style="height: 2rem;" class="track-panel" >

<!--/*        <div style="display: flex;flex-direction: column;justify-content: center;height:100%">*/-->

          <DropDown style="width: 2.25rem;height:100%; padding:0"  :options="ApplicationConfig.signatures" optionLabel="label" v-model="computedGrid" optionValue="value"></DropDown>
<!--        </div>-->
      <div style="font-size:0.9rem;text-align: start;white-space: nowrap; margin-left:0.2rem;display: flex;flex-direction: column;justify-content: center ">
        {{label}}
      </div>
<!--      <div class="track-panel-buttons">-->
<!--        <TrackPanelButton v-model:value="dummyTrack.mute" :button-type="ApplicationConfig.trackOptions.MUTE" > </TrackPanelButton>-->
<!--        <TrackPanelButton v-model:value="dummyTrack.solo" :button-type="ApplicationConfig.trackOptions.SOLO" > </TrackPanelButton>-->

<!--      </div>-->
    </div>

</template>

<script>
import { ApplicationConfig } from "@/ApplicationConfig";
// import TrackPanelButton from "@/components/buttons/TrackPanelButton.vue";

export default {
  name: "GrooveSequencerTrackPanel",
  components: {},
  // components: {TrackPanelButton},
  props: {
    mute: {
      type: Boolean,
      default: false,
    },
    solo: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    grid:{
      type:Number
    }
  },
  data() {
    return {
      dummyTrack: {
        solo: false,
        mute: false,
        grid: 1, //quaternote/beat length
        instrument: ApplicationConfig.drums.HIHAT,
      },
    };
  },
  computed: {
    computedGrid:{
      get(){
        return this.grid
      },
      set(nv){
        this.$emit("update:grid",nv)
      }
    },
    ApplicationConfig() {
      return ApplicationConfig
    },
    compMute: {
      get() {
        return this.mute;
      },
      set(nv) {
        this.$emit("update:mute", nv);
      },
    },
    compSolo: {
      get() {
        return this.solo;
      },
      set(nv) {
        this.$emit("update:solo", nv);
      },
    },
  },
};
</script>

<style scoped>
.track-layout {
  display: flex;
  height: 2vh;
}
.track-panel{
  display: flex;
  justify-content: flex-start;
  border: solid 1px #000000;
  /*padding:0 1rem 0 0;*/
  /*width:2.5rem;*/
  z-index: 33;
}
.track-panel-buttons{
  display: flex;
  flex-direction: row;
  justify-content: left;
}
:deep(.p-inputtext){
  padding:0.25rem 0 0.25rem 0.1rem
}
</style>
