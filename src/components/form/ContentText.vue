<template>
<div class="content-text-wrapper" >
  <TextArea :rows="10" style="width: 100%" v-model="computedModel" v-if="edit">

  </TextArea>
  <div style="width: 100% ; white-space: pre-wrap;text-align: left;padding:0.5rem" class="content-text"  v-else> {{computedModel}}</div>
  <div style="display:flex; justify-content: left">

<!--    <BasicButton class="p-button-icon" :icon="edit?'pi pi-search':'pi pi-pencil'" @click="toggleEditMode"></BasicButton>-->
  </div>
</div>
</template>

<script>
export default {
  name: "ContentText",
  props:{
text:{
  type:String
},
    edit:{
  type:Boolean,
      default:false
    }
  },
  data(){
    return{
      // edit:true,
      dummy:"fsffsefsef"
    }
  },
  computed:{
    computedModel:{
      get(){
        return this.text
      },
      set(nv){
        //console.log("set Text:",nv)
        this.$emit("update:text",nv)
      }
    }
  },
  methods:{
    // toggleEditMode(){
    //   this.edit =!this.edit
    // }
  }
}
</script>

<style scoped>

.content-text{
  /*display: block;*/
  /*height:fit-content;*/
  /*background-color: #ee6127;*/


}

</style>