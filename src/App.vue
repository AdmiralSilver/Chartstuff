<template>
  <head>
    <title>Tja</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  </head>
    <TibberHeader></TibberHeader>
    <TibberGraph></TibberGraph>
    <TibberButtons></TibberButtons>
    <TibberText></TibberText>
    <TibberPictures></TibberPictures>
</template>

<script>
import TibberGraph from "@/TibberGraph";
import TibberHeader from "@/TibberHeader";
import TibberPictures from "@/TibberPictures";
import TibberText from "@/TibberText";
import TibberButtons from "@/TibberButtons";
export default {
  name: 'App',
  components: {
    TibberButtons,
    TibberText,
    TibberPictures,
    TibberHeader,
    TibberGraph,
  },
}
</script>

<style>
body {
  background-color: rgb(245, 245, 245);
  margin: 10px;
}
.threeimg ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #f3f3f3;
}
.threeimg li{
  float: left;
  height: 29vh;
  padding-right: 10px;
}
.threeimg a{
  display: block;
  color: #000000;
  text-align: left;
  text-decoration: none;
  padding-right: 10px;
  font-size: 25px;
  font-family: "Silka bold", sans-serif;
  width: 10vw;
  padding-top: 10px;
  padding-left: 10px;
}
</style>
