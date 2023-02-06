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
        :class="'grid-cell-layout' + (cell.active ? ' active' : '')"
        v-for="cell in computedDummyArray"
        :key="cell.id"
        :style="{ height: '5rem', minWidth: computedCellLength + 'px' }"
      >

        <div style="display: flex;justify-content: center">
          <div class="glow-select" v-if="cell.active"></div>
        </div>
        <!--    <div @click="handleCellSelect(cell)" :class="'grid-cell-layout active'" v-for="cell in gridCellArray" :key="cell.id" :style="{height: '5vh',minWidth:computedCellLength + 'px'}" >-->
      </div>
    </div>
  </div>
</template>

<script>
// import { ApplicationConfig } from "@/ApplicationConfig";
// import TrackPanelButton from "@/components/buttons/TrackPanelButton.vue";
import _ from "lodash";
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
  data() {
    return {
      // scale: 500,
      // computedInitArray: [],
    };
  },
  watch:{
    // computedInitArray(nv){
    //   this.computedInitArrayRefreshiation(nv)
    // },
    // initArray(nv){
    //   this.remoteDummyInitArrayInitialization(nv)
    // }
  },
  computed: {

    computedInitArray:{
      get(){
        return this.initArray
      },
      set(nv){
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
      const dummyConstant = 4; // länge von 10 viertelnoten
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
          instrument: this.instrument,
        });
      }
      // console.log("compute computedDummyArray",array,this.computedInitArray)
      return array;
    },
  },
  methods: {
    // remoteDummyInitArrayInitialization(array){
    //   console.log("remoteDummyInitArrayInitialization",array)
    //   const result = [];
    //   for(const cell of this.computedInitArray){
    //    cell.active = array.some(arrayCell=>{return arrayCell.start===cell.start})
    //     result.push(cell)
    //   }
    //   this.computedInitArray=result
    //   this.$emit("refresh",this.computedInitArray.filter((ele)=>{return ele.active}))
    // },


    handleCellSelect(cell) {
      var cellArray = [...this.computedDummyArray];
      const existingCell = _.find(cellArray,{start:cell.start})
      console.log("handleCellSelect",{cell,cellArray,existingCell})
      if(existingCell) {
        if (existingCell.active) {
          this.computedInitArray = this.computedInitArray.filter((arrayCell) => {
            return arrayCell.start !== existingCell.start
          })
        } else {
          const array = [...this.computedInitArray]
          array.push(cell)
          this.computedInitArray = array
        }
      }
      // const cell = _.find(cellArray, { id: cellId });
      // console.log("CellSelect: cell: ", cell);
      // if (cell) {
      //   if (cell.active) {
      //     cell.active = false;
      //     (cell.start = cell.id * this.grid), (cell.grid = this.grid);
      //     this.$emit("cell-select", cell);
      //   } else {
      //     cell.active = true;
      //     (cell.start = cell.id * this.grid), (cell.grid = this.grid);
      //     this.$emit("cell-select", cell);
      //   }
      // }
      // this.computedInitArray = cellArray;
    },
  },
  mounted() {
    // this.remoteDummyInitArrayInitialization(this.initArray)
  },
};
</script>

<style scoped>
.track-layout {
  display: flex;
}

.grid-cell-layout {
  background-color: lightsalmon;
  border: solid black;
  border-width: 2px 1px 2px 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.active {
  background-color: #ee6127;
}
.track-layout .grid-cell-layout:first-child {
  border-width: 2px 1px 2px 2px;
}
.track-layout .grid-cell-layout:last-child {
  border-width: 2px 2px 2px 1px;
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
