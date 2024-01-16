<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
    "
  >
    <div class="track-layout">
      <div
        @click="handleCellSelect(cell)"
        :class="'grid-cell-layout' + (cell.active ? ' active' : '')  + (cell.ghost ? ' ghost-select' : '') "
        v-for="cell in computedDummyArray"
        :key="cell.id"
        :style="{ height: '2rem', minWidth: computedCellLength + 'px' }"
      >
      </div>
    </div>
  </div>
</template>

<script>
// import { ApplicationConfig } from "@/ApplicationConfig";
// import TrackPanelButton from "@/components/buttons/TrackPanelButton.vue";

import { ApplicationConfig } from "@/ApplicationConfig";
// import {re} from "@babel/core/lib/vendor/import-meta-resolve";

export default {
  name: "GrooveSequencerTrack",
  // components: {TrackPanelButton},
  props: {
    trackId: {
      type: Number,
    },
    grid: {
      type: Number,
      default: 1,
    },
    instrument: {
      type: String,
      default: ApplicationConfig.drums.HIHAT,
    },
    scale: {
      type: Number,
      default: 500,
    },
    initArray:{
      type:Array
    }
  },
  computed: {
    computedInitArray:{
      get(){
        return this.initArray
      },
      set(nv){
        console.log("computedInitArray update",nv)
        this.$emit("update:initArray",nv)
      }
    },
    computedCellLength() {
      return this.grid * this.scale;
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
    computedDummyArray() {
      const array = [];
      const dummyConstant = 40; // länge von 10 viertelnoten
      const notSoDummyConstant = dummyConstant / this.grid;
      for (let i = 0; i < notSoDummyConstant; i++) {
        array.push({
          trackId: this.trackId,
          id: i,
          start: i * this.grid,
          grid: this.grid,
          active: this.computedInitArray.some((cell) => {
            return cell.start === i * this.grid;
          }),
          ghost:this.computedInitArray.some((cell) => {
            return (cell.start === i * this.grid) && cell.ghost;
          }),
          instrument: this.instrument,
        });
      }
      return array;
    },
  },
  methods: {


    handleCellSelect(cell) {
      let cellArray = [...this.computedDummyArray];
      const existingCell = cellArray.find((c)=>{return c.start===cell.start})


      if(existingCell) {
        console.log("Found existing cell... deleting it",{existingCell})
        const filteredArray = this.computedInitArray.filter((arrayCell) => {
          return arrayCell.start !== existingCell.start
        })
        console.log("done result",filteredArray)
        if (existingCell.active) {
          if(!existingCell.ghost){
            filteredArray.push({...cell,ghost:true,active:true})
            console.log("added ghost",filteredArray)
          }
        } else {
          filteredArray.push({...cell, active: true,ghost:false})
          console.log("added new one",filteredArray)
        }

        this.computedInitArray=filteredArray
      }

    },
  },

};
</script>

<style scoped>
.track-layout {
  display: flex;
}

.grid-cell-layout {
  background-color: rgba(0, 123, 255, 0.09);
  border: solid rgba(7, 7, 7, 0.11);
  border-width: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.active {
  background-color: #007bff;
}
.ghost-select {
  background-color: rgba(0, 123, 255, 0.33);
}

.glow-select{
  /*width: 1rem;*/
  /*height: 1rem;*/
  /*border-radius: 50%;*/
  /*background-color: #7c5454;*/
  /*box-shadow:*/
  /*    0 0 0.6rem 0.30rem #7c5454,  !* inner white *!*/
  /*    0 0 1rem 0.6rem #815b6c, !* middle magenta *!*/
  /*    0 0 1.4rem 0.9rem #57404a; !* outer cyan *!*/
}
</style>
