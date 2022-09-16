<template>
  <header class="header">
    <img src="./assets/logo.png" height="45" alt="logo.png">
  </header>
<div id="show" class="graph">

  <h3 style="color: aliceblue; margin-bottom: 0">Average temperature</h3>
  <h1 style="color: aliceblue"> {{avgTemp}}°C</h1>
  <canvas id="myChart" width="300" height="75" style="background: #000422"></canvas>
</div>
  <div class="buttons"><button class="button button1" @click="showMe">SHOW ME A TRICK</button>
    <button class="button button2" @click="hide">RESET</button><br/></div>
  <div id="onclick" class="now" hidden="hidden">
    <h3>Temperature right now</h3>
    <h2>{{nowTemp}}°C</h2>
  </div>
  <div id="text" class="text">

    <h2>Infrastructure supply chain seed lean startup technology</h2>
    <p>Assets traction angel investor user experience social media leverage value
      propositions startup success founders creative. Equity value propositions launch
      party business-to-consumer research & development freemium bandwidth stock
      scrum project analytics</p>
    <br/>
    <p>Agile development backing business-to-consumer analytics burn rate leverage
     business-to-business market creative responsive web design graphical user
     interface</p>




  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from "axios";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MjAwMDFkLTE4OWItNDRjMC1hM2Q1LWQ2MjQ1MmJmZGQ0MiIsInNjb3BlcyI6WyJndy1hcGktcmVhZCIsImd3LXdlYiJdLCJpc0ltcGVyc29uYXRlZCI6dHJ1ZSwiaW1wZXJzb25hdGlvbkNsYWltcyI6eyJsYW5ndWFnZSI6ImVuLVVTIn0sImlhdCI6MTY2MzMyOTYzOCwiZXhwIjoxNjYzMzM2ODM4LCJpc3MiOiJndyJ9.ydHb38lntXuF2dY1_-8Q_gdpsBozBXT41b5TSm7je3w"

export default {
  name: 'App',
  components: {

  },
  data() {
    return{
      avgTemp: 0,
        temps: [],
      nowTemp: 0

  }},
  methods: {
    getData: function () {
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
        for (let i = 0; i < response.data.data.me.home.weather.entries.length; i++) {
          //console.log(data.weather.entries[i].temperature)
          this.avgTemp += data.weather.entries[i].temperature
          this.temps[i] = data.weather.entries[i].temperature

        }
        this.nowTemp = this.temps[this.temps.length - 1]
       this.avgTemp = Math.round(this.avgTemp / data.weather.entries.length)
      })
    },
    showMe: function () {

      document.getElementById("onclick").hidden = false

    },
    hide: function (){
      document.getElementById("onclick").hidden = true

    }
  },
  mounted() {
    this.getData()
    const ctx = document.getElementById('myChart');
    console.log("mounted")

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.temps,
        datasets: [{
          label: `Temperatur`,
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
  },
  created() {
    this.getData()
      console.log('created')

    }
  }

</script>

<style>
body {
  background-color: rgb(245, 245, 245);
  margin: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.text {
  display: block;
  width: 30%;
  padding-left: 35%;
  text-anchor: middle;
  margin-top: 20px;
  font-family: "Silka bold", sans-serif;
  align-self: center;
}
.graph {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000521;
  font-family: silca,serif;
  padding-left: 10px;
}
.header {
  border-bottom: #ffffff;
  background: #ffffff;
  height: 75px;
  padding: 5px;
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
  padding: 5px;
  margin: 4px 2px;
  width: 200px;
}
.button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.now {
  alignment: center;
  width: 30%;
  padding-left: 35%;
  text-anchor: middle;
  font-family: "Silka bold", sans-serif;
  justify-content: center;
  align-self: center;
  text-align: center;
}
</style>
