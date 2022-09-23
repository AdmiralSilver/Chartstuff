<template>
  <div class="container">
    <div class="col text-center">
      <h3 style="color: aliceblue; margin-bottom: 0; background: #000422">Average temperature</h3>
      <h1 style="color: aliceblue; background: #000422"> {{avgTemp}}°</h1>
    </div>
    <div id="show" class="col text-center">
      <canvas id="myChart" width="300px" height="100px" style="background: #000422"></canvas>
    </div>
  </div>
  <TibberButtons></TibberButtons>
  <slot name="nowTemp">
    <div id="onclick" class="now" hidden="hidden">
      <h3>Temperature right now</h3>
      <h2>{{nowTemp}}°</h2>

    </div>
  </slot>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import TibberButtons from "./TibberButtons.vue";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MjAwMDFkLTE4OWItNDRjMC1hM2Q1LWQ2MjQ1MmJmZGQ0MiIsInNjb3BlcyI6WyJndy1hcGktcmVhZCIsImd3LXdlYiJdLCJpc0ltcGVyc29uYXRlZCI6dHJ1ZSwiaW1wZXJzb25hdGlvbkNsYWltcyI6eyJsYW5ndWFnZSI6ImVuLVVTIn0sImlhdCI6MTY2MzkxMjk5NywiZXhwIjoxNjYzOTIwMTk3LCJpc3MiOiJndyJ9.qJ5ltz1R9uBjJ69_kH338Dot0EiLiP1jWShvt5pcawY"
export default {
  name: "TibberGraph",
  components: {
    TibberButtons
  },
  data() {
    return {
      avgTemp: 0,
      temps: [],
      nowTemp: 0
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
        // Add the data from the query to the array and calculate the average
        for (let i = 0; i < response.data.data.me.home.weather.entries.length; i++) {
          //console.log(data.weather.entries[i].temperature)
          this.avgTemp += data.weather.entries[i].temperature
          this.temps[i] = data.weather.entries[i].temperature

        }
        // Could probably be done easier
        this.nowTemp = this.temps[this.temps.length - 1]
        this.avgTemp = Math.round(this.avgTemp / data.weather.entries.length)
      })
      // If error log it and post login credentials to https://app.tibber.com/v4/login.credentials
      // to get new access token and update the token variable
      // then run the function again
    }
  },
  mounted() {
    this.getData()
    // Create the chart
    const ctx = document.getElementById('myChart');
    console.log("mounted")

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
            beginAtZero: true

          }
        }
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
  font-family: "Silka bold", sans-serif;
  justify-content: center;
  align-self: center;
  text-align: center;
}
.container{
  background: #000422;
}
</style>