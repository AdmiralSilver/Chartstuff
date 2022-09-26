<template>
  <div class="container">
    <div class="col text-center">
      <h3 style="color: aliceblue; margin-bottom: 0; background: #000422; padding-top: 10px">Average temperature</h3>
      <h1 style="color: aliceblue; background: #000422"> {{avgTemp}}°</h1>
    </div>
    <div id="show" class="col text-center">
      <canvas id="myChart" width="300px" height="100px" style="background: #000422"></canvas>
    </div>
  </div>
  <TibberButtons></TibberButtons>
  <slot name="nowTemp">
    <div id="onclick" class="now" hidden="hidden">
      <h3>Weather right now</h3>
      <h1 class ="test"></h1>
      <h2>{{nowTemp}}°</h2>
    </div>
  </slot>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import TibberButtons from "./TibberButtons.vue";
//The token to send to the api to be able to get the data
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MjAwMDFkLTE4OWItNDRjMC1hM2Q1LWQ2MjQ1MmJmZGQ0MiIsInNjb3BlcyI6WyJndy1hcGktcmVhZCIsImd3LXdlYiJdLCJpc0ltcGVyc29uYXRlZCI6dHJ1ZSwiaW1wZXJzb25hdGlvbkNsYWltcyI6eyJsYW5ndWFnZSI6ImVuLVVTIn0sImlhdCI6MTY2NDE5MjM4NywiZXhwIjoxNjY0MTk5NTg3LCJpc3MiOiJndyJ9.VpV5zBu_JPGeXGOU-TZtEWyetE5vsZPvcYftW4bA-1k"
export default {
  name: "TibberGraph",
  components: {
    TibberButtons
  },
  data() {
    return {
      avgTemp: 0,
      temps: [],
      nowTemp: 0,
      nowType: ""
    };
  },
  methods: {
    getData: function () {
      // Query to get the data from the API
      axios.post(`https://app.tibber.com/v4/gql`,{
        query: `query {
        me {
        home(id: "36013c85-ba95-428c-8ca3-76d81bc4180e") {
        weather {
        minTemperature maxTemperature entries {
        time temperature type
        }
        }
        }
        }
        }`
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        let data = response.data.data.me.home
        // Add the temperatures from the query to the array and calculate the average
        for (let i = 0; i < response.data.data.me.home.weather.entries.length; i++) {
          //console.log(data.weather.entries[i].temperature)
          this.avgTemp += data.weather.entries[i].temperature
          this.temps[i] = data.weather.entries[i].temperature
        }
        // Could probably be done easier
        this.nowTemp = this.temps[this.temps.length - 1]
        this.avgTemp = Math.round((this.avgTemp / data.weather.entries.length)* 10) / 10
        this.nowType = data.weather.entries[data.weather.entries.length - 1].type
        // Switch case to change what the emoji is depending on the weather
        switch (this.nowType) {
          case "cloud":
            document.querySelector(".test").innerHTML="☁"
            break;
          case "sunny":
            document.querySelector(".test").innerHTML="☀"
            break;
          case "rain":
            document.querySelector(".test").innerHTML="🌧️"
            break;
          case "snow":
            document.querySelector(".test").innerHTML="🌨️"
            break;
          case "tornado":
            document.querySelector(".test").innerHTML="🌪"
            break;
          default:
            console.log("Add this type to the switch case: " + this.nowType)
            document.querySelector(".test").innerHTML="❓"
            break;
        }
      })
      // If error log it and post login credentials to https://app.tibber.com/v4/login.credentials
      // to get new access token and update the token variable
      // then run the function again
    }
  },
  mounted() {
    this.getData()
    // Create the chart with the data from the API
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.temps,
        datasets: [{
          label: `Temperature`,
          data: this.temps,
          backgroundColor: [
            'rgba(255,255,255,1)'
          ],
          tooltip: {
            enabled: false
          },
          borderColor: [
            'rgb(255,255,255)'
          ],
          borderWidth: 1,
          borderRadius: 10
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: false
          },
          x: {
            display: false
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 20
          }
        },
        }
    });
    myChart;
  }
}

</script>

<style scoped>
.now {
  alignment: center;
  width: 30%;
  margin: auto;
  text-anchor: middle;
  justify-content: center;
  align-self: center;
  text-align: center;
}
.container{
  background: #000422;
}

</style>