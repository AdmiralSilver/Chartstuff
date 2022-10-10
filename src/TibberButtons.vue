<template>
  <!--Div with the buttons, one to make the element visible and one to hide it again.
  The element is hidden by default-->
  <div class="buttons"><button id="vis" class="button button1" @click="showMe">SHOW ME A TRICK</button>
    <button id="fjern" class="button button2" @click="hide">RESET</button><br/></div>
</template>

<script>
export default {
  name: "TibberButtons",
  methods: {
    showMe: function () {
      //document.getElementById("onclick").style.display = "block";
      this.$emit("show", true);
    },
    hide: function () {
      //document.getElementById("onclick").style.display = "none";
      this.$emit("show", false);
    },
  },
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.button1{
  background-color: #1fb7c9;
  border-color: #1fb7c9;
  color: white;
}
.button2{
  background-color: #fdfdfd;
}
.button {
  border-radius: 25px;
  padding: 10px;
  margin: 4px 2px;
  width: 200px;
}
.button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>