<template>
  <div style="position: relative; padding-bottom: 56.25%; height: 0;">
    <iframe
        :src="`https://www.youtube.com/embed/${youtubeId}`"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;margin: 0.5rem 0 0.5rem 0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name:"ContentYouTube",
  props: {
    youtubeLink: {
      type: String,
      required: true
    }
  },
  computed: {
    youtubeId() {
      return this.youtubeLink.split("v=")[1].split("&")[0];
    }
  }
};
</script>
