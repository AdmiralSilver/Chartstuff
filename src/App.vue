<template>
<div id="show" class="graph">

  <h3 style="color: aliceblue; margin-bottom: 0" align="center" >Average temperature</h3>
  <h1 style="color: aliceblue" align="center" > {{avgTemp}}°C</h1>
  <canvas id="myChart" width="300" height="75" style="background: black"></canvas>
</div>
  <div class="buttons"><button>SHOW ME A TRICK</button>
    <button>RESET</button><br/></div>
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
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MjAwMDFkLTE4OWItNDRjMC1hM2Q1LWQ2MjQ1MmJmZGQ0MiIsInNjb3BlcyI6WyJndy1hcGktcmVhZCIsImd3LXdlYiJdLCJpc0ltcGVyc29uYXRlZCI6dHJ1ZSwiaW1wZXJzb25hdGlvbkNsYWltcyI6eyJsYW5ndWFnZSI6ImVuLVVTIn0sImlhdCI6MTY2MzMyMTU2NSwiZXhwIjoxNjYzMzI4NzY1LCJpc3MiOiJndyJ9.Kv3OFyMfPPWVYJRcW54CCrOvtdfKoZAWFiknur-uOrk"

export default {
  name: 'App',
  components: {

  },
  data() {
    return{
      avgTemp: 0,
        temps: []

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

       this.avgTemp = Math.round(this.avgTemp / data.weather.entries.length)
      })
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
            'rgba(255,255,255,0.2)'

          ],
          tooltip: {
            enabled: false
          },
          borderColor: [
            'rgb(255,255,255)'

          ],
          borderWidth: 1
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
.myChart {
  width: 500px;
  height: 500px;
  background: black;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.text {

  margin-left: 400px;
  margin-right: 400px ;
  margin-top: 20px;
  font-family: silca, sans-serif;

}
.graph {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  font-family: silca,serif;
}
</style>
