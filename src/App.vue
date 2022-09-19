<template>
  <head>
    <title>Tja</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  </head>
  <header class="header">
    <img src="./assets/logo.png" height="45" alt="logo.png">
  </header>
  <div class="container">
    <div class="col text-center text-bg-dark">
      <h3 style="color: aliceblue; margin-bottom: 0; background: #000422">Average temperature</h3>
      <h1 style="color: aliceblue; background: #000422"> {{avgTemp}}°</h1>
    </div>
    <div id="show" class="col text-center">
      <canvas id="myChart" width="300px" height="100px" style="background: #000422"></canvas>
    </div>
  </div>
  <div class="buttons"><button class="button button1" @click="showMe">SHOW ME A TRICK</button>
    <button class="button button2" @click="hide">RESET</button><br/></div>
  <div id="onclick" class="now" hidden="hidden">
    <h3>Temperature right now</h3>
    <h2>{{nowTemp}}°</h2>
  </div>
  <div class="container text-sm-left">
    <div class="row-cols-1">
      <div class="col">
        <h1>Infrastructure supply chain seed lean startup technology</h1>
        <p>Assets traction angel investor user experience social media leverage value
          propositions startup success founders creative. Equity value propositions launch
          party business-to-consumer research & development freemium bandwidth stock
          scrum project analytics</p>
        <br/>
        <p>Agile development backing business-to-consumer analytics burn rate leverage
         business-to-business market creative responsive web design graphical user
         interface</p>
      </div>
    </div>
  </div>
  <div class="container text-left">
    <div class="row">
      <div class="col-lg-6">
        <img src="./assets/img1.png" alt="img1.png">
      </div>
      <div class="col-lg-3">
        <img src="./assets/imgs.png" alt="imgs.png">
        <br/>
        <p class="h3"><strong>Direct mailing strategy buzz social proof</strong></p>
      </div>
      <div class="col-lg-2 ">
        <img src="./assets/charge.png" alt="charge.png">
        <br/>
        <p class="h3"><strong>Hypotheses value proposition</strong></p>
      </div>
    </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from "axios";
// Remember to update the token with the new one every two hrs...
// Probably should be done with query??
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MjAwMDFkLTE4OWItNDRjMC1hM2Q1LWQ2MjQ1MmJmZGQ0MiIsInNjb3BlcyI6WyJndy1hcGktcmVhZCIsImd3LXdlYiJdLCJpc0ltcGVyc29uYXRlZCI6dHJ1ZSwiaW1wZXJzb25hdGlvbkNsYWltcyI6eyJsYW5ndWFnZSI6ImVuLVVTIn0sImlhdCI6MTY2MzU4OTY1MywiZXhwIjoxNjYzNTk2ODUzLCJpc3MiOiJndyJ9.DBKJ4y6ix_3Te8zbPTdzZTQAZIH5YRsDIJbtdGnqrFo"
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
    },
    showMe: function () {
      // Make the element visible
      document.getElementById("onclick").hidden = false

    },
    hide: function (){
      // Make the element hidden
      document.getElementById("onclick").hidden = true

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
  },
  created() {
    // Get the data from the API and initialize it
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
  justify-content: center;
  padding-left: 35%;
  text-anchor: middle;
  margin-top: 0;
  font-family: "Silka bold", sans-serif;
  align-self: center;
}
.graph {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  background: #000521;
  font-family: silca,serif;
  padding-left: 10px;
  margin-top: 0;
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
  padding: 10px;
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
.avgTemp{
  text-align: center;
  background: #000422;
  position: relative;
  padding-bottom: 10px;
  height: 10vh;
  width: 97.5vw;
  padding-left: 10px;
}
.threeimg {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
