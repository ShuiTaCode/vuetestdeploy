<template>
  <TopBar :model="items" />
  <h2>Deine Lektionen</h2>

  <BasicAccordion>


    <AccordionTab :key="lesson.sort" v-for="lesson in sortBy(lessons,'sort')" >
      <template #header>
        <InputText @@keydown="handleInput" v-if="GLOBALEDIT" v-model="lesson.label"></InputText><div v-else>{{lesson.label}}</div>
      </template>
      <div :key="content.sort" v-for="content in sortBy(lesson.content,'sort')">
        <GrooveSequencer v-model:tempo="content.tempo"  v-if="content.type==='groove'" v-model:initArray="content.value"  />
        <ContentText :edit="GLOBALEDIT"  v-model:text="content.value" v-if="content.type==='text'"></ContentText>
      </div>
      <DropDown v-if="GLOBALEDIT" v-model="selectedContentType" :options="[ApplicationConfig.contentType.TEXT,ApplicationConfig.contentType.GROOVE]" ></DropDown>
      <BasicButton v-if="GLOBALEDIT" label="createContent" @click="createContent(lesson,selectedContentType)"></BasicButton>
      <BasicButton v-if="GLOBALEDIT" label="SaveLesson" @click="triggerSave(lesson)"></BasicButton>
    </AccordionTab>


  </BasicAccordion>
  <BasicButton v-if="GLOBALEDIT" label="Neue Lesson" @click="createNewLesson"></BasicButton>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import GrooveSequencer from "@/components/sequencer/GrooveSequencer.vue";
import ContentText from "@/components/form/ContentText.vue";
// import {ApplicationConfig} from "@/ApplicationConfig";

// import CenterDiv from "@/components/ColCenterDiv.vue";
// import ColCenterDiv from "@/components/ColCenterDiv.vue";
// import RowCenterDiv from "@/components/RowCenterDiv.vue";
import _ from "lodash"
import AXIOS from "@/clients/axoisClient";
import {ApplicationConfig} from "@/ApplicationConfig";
import BasicAccordion from "@/components/mainpage/BasicAccordion.vue";
export default {
  name: "App",
  computed: {
    ApplicationConfig() {
      return ApplicationConfig
    },

  },
  components: {
    BasicAccordion,
    ContentText,
    // RowCenterDiv,
    // ColCenterDiv,
    // CenterDiv,

    GrooveSequencer,
    // HelloWorld
  },
  data() {
    return {
      GLOBALEDIT:false,
      // GLOBALEDIT:true,
      lessons:[

      ],
      selectedContentType:ApplicationConfig.contentType.TEXT,
      items: [
        {
          label: "File",
          icon: "pi pi-fw pi-file",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark",
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video",
                },
              ],
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-trash",
            },
            {
              separator: true,
            },
            {
              label: "Export",
              icon: "pi pi-fw pi-external-link",
            },
          ],
        },
      ],
    };
  },

  methods:{
    handleInput(event){
      // console.log(event)
      event.preventDefault()
    },
    sortBy(collection,iterate){
      return _.sortBy(collection,iterate)
    },
    createContent(lesson,contentType){
      const content =
          {
            tempo:60,
            type: contentType,
            sort: lesson.content && lesson.content.length > 0 ? (_.maxBy(lesson.content, "sort").sort + 1) : 1,
            value: null
          }
          lesson.content.push(content)
      this.updateLesson(lesson)
    },
    createNewLesson(){
      const max = _.maxBy(this.lessons,"sort")
      const lesson = {
        sort:(max ? max.sort : 0) + 1,
        content:[],
        label:"TestStunde",
        locked:false,
      }
      this.createLesson(lesson)
    },

    triggerSave(lesson){
        console.log("Prepare to save lesson: ",lesson)
      this.updateLesson(lesson)
    },

    createLesson(lesson){
      return AXIOS.post("/lessons/insert", lesson).then((r) => {
        console.log("Post result:", r);
        this.load()
      });
    },
    updateLesson(lesson){
      return AXIOS.put("/lessons/update", lesson).then((r) => {
        console.log("Post result:", r);
        this.load()
      });
    },
    getGrooveById(id){
      console.log('getGrooveById',id)
      return []
    },
    load() {
      return AXIOS.get("/lessons/findAll").then((r) => {
        console.log("Result:", r);
        this.lessons = r.data;
      });
    }
  },
  mounted() {
   this.load()
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  /*margin-top: 60px;*/

  .p-accordion-content{
    padding:0.5rem !important;
  }

</style>
