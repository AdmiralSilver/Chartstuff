<template>
  <head>
    <title>Temperatures</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
          crossorigin="anonymous">
  </head>
  <body style="background-color: #f5f5f5">
  <TibberHeader></TibberHeader>
  <TibberGraph></TibberGraph>
  <TibberText></TibberText>
  <TibberPictures></TibberPictures>
  </body>
</template>

<script>
import TibberGraph from "./TibberGraph.vue";
import TibberHeader from "./TibberHeader.vue";
import TibberPictures from "./TibberPictures.vue";
import TibberText from "./TibberText.vue";
export default {
  name: 'App',
  components: {
    TibberText,
    TibberPictures,
    TibberHeader,
    TibberGraph,
  },
  created() {
    document.title = "Temperatures";
  }
}
</script>

<style>

</style>
