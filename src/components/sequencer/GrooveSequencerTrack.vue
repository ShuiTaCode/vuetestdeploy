<template>
  <div class="track-layout">
    <div
      @click="handleCellSelect(cell.id)"
      :class="'grid-cell-layout' + (cell.active ? ' active' : '')"
      v-for="cell in dummyArray"
      :key="cell.id"
      :style="{ height: '5vh', minWidth: computedCellLength + 'px' }"
    >
      <!--    <div @click="handleCellSelect(cell)" :class="'grid-cell-layout active'" v-for="cell in gridCellArray" :key="cell.id" :style="{height: '5vh',minWidth:computedCellLength + 'px'}" >-->
    </div>
  </div>
</template>

<script>
// import { ApplicationConfig } from "@/ApplicationConfig";
// import TrackPanelButton from "@/components/buttons/TrackPanelButton.vue";
import _ from "lodash";
import {ApplicationConfig} from "@/ApplicationConfig";

export default {
  name: "GrooveSequencerTrack",
  // components: {TrackPanelButton},
  props: {
    trackId:{
      type:Number
    },
    grid: {
      type: Number,
      default: 1,
    },
    instrument:{
      type:String,
      default: ApplicationConfig.drums.HIHAT
    },
    scale:{
      type:Number,
      default:500
    }
  },
  data() {
    return {
      // scale: 500,
      dummyArray: [],
    };
  },
  computed: {
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
  },
  methods: {
    dummyArrayInitialization() {
      const array = [];
      const dummyConstant = 4; // länge von 10 viertelnoten
      const notSoDummyConstant = dummyConstant / this.grid;
      for (let i = 0; i < notSoDummyConstant; i++) {
        array.push({
          trackId:this.trackId,
          id: i,
          start: i * this.grid,
          grid:this.grid,
          active: false,
          instrument:this.instrument
        });
      }
      this.dummyArray = array;
    },
    handleCellSelect(cellId) {
      var cellArray = [...this.dummyArray];
      const cell = _.find(cellArray, { id: cellId });
      console.log("CellSelect: cell: ", cell);
      if (cell) {
        if (cell.active) {
          cell.active = false;
          cell.start= cell.id * this.grid,
          cell.grid=this.grid;
          this.$emit("cell-select", cell);
        } else {
          cell.active = true;
          cell.start= cell.id * this.grid,
          cell.grid=this.grid;
          this.$emit("cell-select", cell);
        }
      }
      this.dummyArray = cellArray;
    },
  },
  mounted() {
    this.dummyArrayInitialization();
  },
};
</script>

<style scoped>
.track-layout {
  display: flex;
  height: 5vh;
}

.grid-cell-layout {
  background-color: lightsalmon;
  border: solid black;
  border-width: 2px 1px 2px 1px;
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
</style>
