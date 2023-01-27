<template>
  <TopBar :model="items" />
  <h2>Deine grooves</h2>
  <AccorDion>
    <AccordionTab
      style="padding: 0.5rem !important"
      header="Dein erster groove"
    >
      <GrooveSequencer />
    </AccordionTab>

    <AccordionTab :key="lesson.id" v-for="lesson in lessons" :header="lesson.label">    <GrooveSequencer /> </AccordionTab>

    <AccordionTab :disabled="true">
      <template #header>
        <RowCenterDiv>
          <template #default>
            <div style="margin-right: 1rem">Stunde 1</div>
            <i class="pi pi-lock"></i>
          </template>
        </RowCenterDiv>
      </template>
      Content
    </AccordionTab>
  </AccorDion>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import GrooveSequencer from "@/components/sequencer/GrooveSequencer.vue";

// import CenterDiv from "@/components/ColCenterDiv.vue";
// import ColCenterDiv from "@/components/ColCenterDiv.vue";
import RowCenterDiv from "@/components/RowCenterDiv.vue";

export default {
  name: "App",
  components: {
    RowCenterDiv,
    // ColCenterDiv,
    // CenterDiv,

    GrooveSequencer,
    // HelloWorld
  },
  data() {
    return {
      lessons:[
        {id:1,label:"Erster Groove"}  ,
        {id:2,label:"Zweiter Groove"}  ,
        {id:3,label:"test Groove"}  ,
        {id:4,label:"blast Groove"}  ,
        {id:5,label:"anderer Groove"}  ,
        {id:6,label:"and Groove"}  ,
        {id:8,label:"Ersterdbfhrfr Groove"}  ,
        {id:9,label:"and Groove Groove"}  ,
        {id:10,label:"and Groove Groove Groove"}  ,
        {id:11,label:"rg Groove"}  ,
        {id:12,label:"grg Groove"}  ,
        {id:13,label:"Ersterdbfhrfr Groove"}  ,
        {id:14,label:"Ersterdbfhrfr Groove"}  ,
      ],
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
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Left",
              icon: "pi pi-fw pi-align-left",
            },
            {
              label: "Right",
              icon: "pi pi-fw pi-align-right",
            },
            {
              label: "Center",
              icon: "pi pi-fw pi-align-center",
            },
            {
              label: "Justify",
              icon: "pi pi-fw pi-align-justify",
            },
          ],
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-user-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-user-minus",
            },
            {
              label: "Search",
              icon: "pi pi-fw pi-users",
              items: [
                {
                  label: "Filter",
                  icon: "pi pi-fw pi-filter",
                  items: [
                    {
                      label: "Print",
                      icon: "pi pi-fw pi-print",
                    },
                  ],
                },
                {
                  icon: "pi pi-fw pi-bars",
                  label: "List",
                },
              ],
            },
          ],
        },
        {
          label: "Events",
          icon: "pi pi-fw pi-calendar",
          items: [
            {
              label: "Edit",
              icon: "pi pi-fw pi-pencil",
              items: [
                {
                  label: "Save",
                  icon: "pi pi-fw pi-calendar-plus",
                },
                {
                  label: "Delete",
                  icon: "pi pi-fw pi-calendar-minus",
                },
              ],
            },
            {
              label: "Archieve",
              icon: "pi pi-fw pi-calendar-times",
              items: [
                {
                  label: "Remove",
                  icon: "pi pi-fw pi-calendar-minus",
                },
              ],
            },
          ],
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
        },
      ],
    };
  },
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
