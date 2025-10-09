const baseUrl = "https://heatwaveprojekt.azurewebsites.net/api/temp";

Vue.createApp({
  data() {
    return {
      TempMeasurements: [],
      error: "",
      currentTemperature: null,
      showTable: false,
      sliderValue: localStorage.getItem("sliderValue")
        ? parseInt(localStorage.getItem("sliderValue"))
        : 20,
    };
  },
  created() {
    // Kaldes, når instansen af Vue er oprettet
    this.getPosts();
  },

  computed: {
    // Beregner en værdi baseret på andre værdier
    recommendedIndoorTemperature() {
      if (
        this.currentTemperature &&
        this.currentTemperature.outDoorTemperature !== null
      ) {
        if (
          this.currentTemperature.outDoorTemperature >= 15 &&
          this.currentTemperature.outDoorTemperature <= 20
        ) {
          return 20;
        } else if (
          this.currentTemperature.outDoorTemperature >= 10 &&
          this.currentTemperature.outDoorTemperature <= 14
        ) {
          return 25;
        } else if (
          this.currentTemperature.outDoorTemperature >= 5 &&
          this.currentTemperature.outDoorTemperature <= 9
        ) {
          return 25;
        } else if (
          this.currentTemperature.outDoorTemperature >= -11 &&
          this.currentTemperature.outDoorTemperature <= 4
        ) {
          return 25;
        } else if (
          this.currentTemperature.outDoorTemperature >= 21 &&
          this.currentTemperature.outDoorTemperature <= 30
        ) {
          return 20;
        } else {
          return "Ingen specifik anbefaling";
        }
      }
      return "Ingen specifik anbefaling";
    },
  },
  watch: {
    // Overvåger ændringer i specifikke dataegenskaber og udfører en handling, når de ændres
    sliderValue(newValue) {
      localStorage.setItem("sliderValue", newValue);
    },
  },

  methods: {
    // Metoder til at udføre handlinger
    async getPosts() {
      try {
        const response = await axios.get(baseUrl);
        this.TempMeasurements = response.data;
        this.getCurrentTemp();
      } catch (error) {
        this.error = error.message;
      }
    },
    getCurrentTemp() {
      if (this.TempMeasurements.length > 0) {
        const lastMeasurement =
          this.TempMeasurements[this.TempMeasurements.length - 1];
        this.currentTemperature = lastMeasurement;
      }
    },
    toggleTable() {
      this.showTable = !this.showTable;
    },
    mounted() {},
  },
}).mount("#app"); // Mounter appen på elementet med id'et app
