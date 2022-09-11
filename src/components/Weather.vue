<template>
  <div v-if="cityAllGet">
    <div class="weather">
      <div class="weather__show">
        <div @click="settings" class="settings">
          <div class="icon-settings icon-open">
            <Icon name="settings" />
          </div>
          <div class="icon-settings icon-close">
            <Icon name="close" />
          </div>
        </div>

        <div class="weather-settings">
          <p>Settings</p>

          <div class="weather-settings__cities">
            <div
              v-for="cityGet in cities"
              :key="cityGet.id"
              class="city-settings"
              @drop="onDrossp($event, cityGet.id)"
              @dragover.prevent
              @dragenter.prevent
              @dragstart="onDу($event, cityGet.id)"
              draggable="true"
            >
              <div class="city-settings__info">
                <div>|||</div>
                <div>{{ cityGet.name }}</div>
              </div>
              <div @click="removeCity(cityGet)" class="city-settings__delete">
                <Icon name="delete" />
              </div>
            </div>
          </div>

          <form @submit.prevent>
            <p>Add location:</p>
            <div class="form-add">
              <div>
                <input
                  @input="name = $event.target.value"
                  :value="name"
                  type="text"
                  @keyup.enter="addlik"
                />
                <div v-if="error" class="error">City not found</div>
              </div>
              <div class="add icon icon-enter" @click="addlik">
                <Icon name="enter" />
              </div>
            </div>
          </form>
        </div>

        <p v-if="noCities" class="no-cities">No cities</p>

        <Cities :cityAllGet="cityAllGet" />
      </div>
    </div>
  </div>
</template>

<script>
// <script lang="ts">

import Icon from "./Icon.vue";
import Cities from "./Cities";

export default {
  components: { Icon, Cities },

  data() {
    return {
      counrty: "",
      city: "",
      icon: "",
      temp: "",
      feels: "",
      description: "",
      speed: "",
      pressure: "",
      humidity: "",
      visibility: "",
      loading: true,
      name: "",
      error: false,
      cities: [],
      cityAllGet: [],
      noCities: false,
    };
  },
  methods: {
    onDу(e, item) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemId", item.toString());
    },
    onDrossp(e, item) {
      const itemId = parseInt(e.dataTransfer.getData("itemId"));
      const findIndexTarget = this.cities.findIndex((x) => x.id === item);
      const findIndexDrop = this.cities.findIndex((x) => x.id === itemId);
      [this.cities[findIndexDrop], this.cities[findIndexTarget]] = [
        this.cities[findIndexTarget],
        this.cities[findIndexDrop],
      ];
      localStorage.setItem("cities", JSON.stringify(this.cities));
      const citiesGet = localStorage.getItem("cities");
      const allCities = JSON.parse(citiesGet);
      const allIdCities = [];
      const allStringCities = "";
      allCities.forEach((e) => {
        allIdCities.push(e.id);
      });
      this.cities = allCities;

      const newCity = allCities
        .map(function (value) {
          return value.id;
        })
        .join(",");
      fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${newCity}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
      )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            if (this.error === true) {
              this.error = false;
            }
            return response.json();
          } else {
            this.error = true;
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        })
        .then((data) => {
          this.cityAllGet = data.list;
        });
    },

    addlik() {
      if (this.name) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
        )
          // First it finds a city then adds all cities
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              if (this.error === true) {
                this.error = false;
              }
              return response.json();
            } else {
              this.error = true;
              let error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
          })
          .then((data) => {
            if (this.noCities) {
              this.noCities = false;
            }

            if (
              this.cityAllGet.some((element) => element.name === data?.name)
            ) {
              console.log("already been");
            } else {
              this.cities.push({
                id: data?.id,
                name: data?.name,
              });
            }
            localStorage.setItem("cities", JSON.stringify(this.cities));
          })
          .then(() => {
            const citiesGet = localStorage.getItem("cities");
            const allCities = JSON.parse(citiesGet);
            const allIdCities = [];
            const allStringCities = "";
            allCities.forEach((e) => {
              allIdCities.push(e.id);
            });
            this.cities = allCities;

            const newCity = allCities
              .map(function (value) {
                return value.id;
              })
              .join(",");
            fetch(
              `https://api.openweathermap.org/data/2.5/group?id=${newCity}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
            )
              .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                  if (this.error === true) {
                    this.error = false;
                  }
                  return response.json();
                } else {
                  this.error = true;
                  let error = new Error(response.statusText);
                  error.response = response;
                  throw error;
                }
              })
              .then((data) => {
                this.cityAllGet = data.list;
                this.name = "";
              });
          });
      } else {
        console.log("else");
      }
    },
    settings({ target }) {
      target.closest(".weather__show").classList.toggle("settings-toggle");
    },

    inputName({ target }) {
      this.name = target.value;
    },
    removeCity(e) {
      this.cities = this.cities.filter((p) => p.id !== e.id);
      localStorage.setItem("cities", JSON.stringify(this.cities));

      // this.cityAllGet =
      const citiesGet = localStorage.getItem("cities");
      const allCities = JSON.parse(citiesGet);
      const allIdCities = [];
      const allStringCities = "";

      allCities.forEach((e) => {
        allIdCities.push(e.id);
      });

      this.cities = allCities;

      const newCity = allCities
        .map(function (value) {
          return value.id;
        })
        .join(",");

      if (this.cities.length) {
        fetch(
          `https://api.openweathermap.org/data/2.5/group?id=${newCity}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
        )
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              if (this.error === true) {
                this.error = false;
              }
              return response.json();
            } else {
              this.error = true;
              let error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
          })
          .then((data) => {
            this.cityAllGet = data.list;
          })
          .catch(() => {
            if (!this.cities.length && !this.noCities) {
              this.noCities = true;
            }
          });
      } else {
        this.cityAllGet = [];
        this.noCities = true;
      }
    },
  },

  mounted() {
    const citiesGet = localStorage.getItem("cities");
    if (!citiesGet) {
      const success = ({ coords }) => {
        const APIkey = "81e9d77e5339d6601b69f80f0e235644";
        const { latitude, longitude } = coords;
        const city = longitude.toFixed(2);
        const units = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${city}&units=${units}&appid=${APIkey}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.cityAllGet.push(data);
            this.cities.push({
              id: data?.id,
              name: data?.name,
            });

            localStorage.setItem("cities", JSON.stringify(this.cities));
          });
      };

      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: false,
      });
      function error({ message }) {
        console.log(message); // при отказе в доступе получаем PositionError: User denied Geolocation
      }
      console.log("mounted");
      // }
    } else {
      const allCities = JSON.parse(citiesGet);
      const allIdCities = [];
      const allStringCities = "";

      allCities.forEach((e) => {
        allIdCities.push(e.id);
      });

      this.cities = allCities;

      const newCity = allCities
        .map(function (value) {
          return value.id;
        })
        .join(",");

      const units = "metric";

      fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${newCity}&units=${units}&appid=81e9d77e5339d6601b69f80f0e235644`
      )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            if (this.error === true) {
              this.error = false;
            }
            return response.json();
          } else {
            this.error = true;
            console.log("нет тот sdadas");
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        })
        .then((data) => {
          this.cityAllGet = data.list;
        })
        .catch(() => {
          if (!this.cityAllGet.length) {
            this.noCities = true;
          }
        });
    }
  },
};
</script>