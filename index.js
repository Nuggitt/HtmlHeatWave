const baseUrl =
  "https://heatwave20260329030232-f6aqg9bgfygkfmgw.denmarkeast-01.azurewebsites.net/api/temp";

Vue.createApp({
  data() {
    return {
      TempMeasurements: [],
      error: "",
      currentTemperature: null,
      showTable: false,
      loading: false, // <- NY
      sliderValue: localStorage.getItem("sliderValue")
        ? parseInt(localStorage.getItem("sliderValue"))
        : 20,
    };
  },
  created() {
    this.getPosts();
  },
  computed: {
    recommendedIndoorTemperature() {
      if (
        this.currentTemperature &&
        this.currentTemperature.outDoorTemperature !== null
      ) {
        if (
          this.currentTemperature.outDoorTemperature >= 15 &&
          this.currentTemperature.outDoorTemperature <= 20
        )
          return 20;
        else if (
          this.currentTemperature.outDoorTemperature >= 10 &&
          this.currentTemperature.outDoorTemperature <= 14
        )
          return 25;
        else if (
          this.currentTemperature.outDoorTemperature >= 5 &&
          this.currentTemperature.outDoorTemperature <= 9
        )
          return 25;
        else if (
          this.currentTemperature.outDoorTemperature >= -11 &&
          this.currentTemperature.outDoorTemperature <= 4
        )
          return 25;
        else if (
          this.currentTemperature.outDoorTemperature >= 21 &&
          this.currentTemperature.outDoorTemperature <= 30
        )
          return 20;
        return "Ingen specifik anbefaling";
      }
      return "Ingen specifik anbefaling";
    },
  },
  watch: {
    sliderValue(newValue) {
      localStorage.setItem("sliderValue", newValue);
    },
  },
  methods: {
    async getPosts() {
      this.loading = true; // <- start spinner
      this.error = "";
      try {
        const response = await axios.get(baseUrl);
        this.TempMeasurements = response.data;
        this.getCurrentTemp();
      } catch (error) {
        this.error = error.message || "Noget gik galt ved hentning af data.";
        console.error(error);
      } finally {
        this.loading = false; // <- stop spinner
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
}).mount("#app");
