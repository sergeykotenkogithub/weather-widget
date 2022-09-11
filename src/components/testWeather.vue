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
        </div>

        <p v-if="noHaveCities">No cities</p>

        <div v-for="cityAllNow in cityAllGet" :key="cityAllNow.id">
          <div class="weather__show">
            <div class="weather__info">
              <p class="sity">
                {{ cityAllNow.name }}, {{ cityAllNow?.sys?.country }}
              </p>
              <div class="temperature">
                <img
                  :src="
                    'https://openweathermap.org/img/wn/' +
                    cityAllNow.weather[0].icon +
                    '@2x.png'
                  "
                  alt="temperature"
                  class="temperature__image"
                />
                <p
                  v-html="Math.round(cityAllNow.main.temp) + '&deg;C'"
                  class="temperature__text"
                ></p>
              </div>

              <p class="feels">
                Feels like:
                <span
                  v-html="
                    Math.round(cityAllNow.main.feels_like) +
                    '&deg;C. ' +
                    cityAllNow.weather[0].main +
                    ', ' +
                    cityAllNow.weather[0].description
                  "
                ></span>
              </p>
              <div class="speed_hpa">
                <div class="speed icon-description">
                  <Icon name="wind" />
                  <p>{{ cityAllNow.wind.speed }} m/s</p>
                </div>
                <div class="hpa icon-description">
                  <Icon name="hpa" />
                  <p>{{ cityAllNow.main.pressure }} hpa</p>
                </div>

                <div class="icon-description">
                  <Icon name="humidity" />
                  <p>{{ cityAllNow.main.humidity }}%</p>
                </div>
                <div class="icon-description">
                  <Icon name="visibility" />
                  <p>{{ cityAllNow.visibility / 1000 }} km</p>
                </div>
                <div></div>
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
                  />
                  <div v-if="error" class="error">City not found</div>
                </div>
                <div class="add icon icon-enter" @click="addlik">
                  <Icon name="enter" />
                </div>
              </div>
            </form>

            <div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// <script lang="ts">

import Icon from "./Icon.vue";

export default {
  components: { Icon },

  data() {
    return {
      lik: 0,
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
      noHaveCities: false,
    };
  },
  methods: {
    onDу(e, item) {
      console.log("ttttt", e, item);
      console.log(item);

      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemId", item.toString());
    },
    onDrossp(e, item) {
      const itemId = parseInt(e.dataTransfer.getData("itemId"));
      // console.log("start", e.target.closest("div").id);
      // console.log("start1", item);
      // console.log(this.cities);

      const findIndexTarget = this.cities.findIndex((x) => x.id === item);
      const findIndexDrop = this.cities.findIndex((x) => x.id === itemId);

      console.log("start2", findIndexTarget);
      console.log("start3", findIndexDrop);

      // const Twelve = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10 ,11 ,12];
      // this.cities = swap(this.cities, findIndexDrop, findIndexTarget); // индексы считаются от 0

      [this.cities[findIndexDrop], this.cities[findIndexTarget]] = [
        this.cities[findIndexTarget],
        this.cities[findIndexDrop],
      ];

      localStorage.setItem("cities", JSON.stringify(this.cities));

      const citiesGet = localStorage.getItem("cities");
      console.log("stage 2");

      console.log(citiesGet);

      console.log("out cities");

      const allCities = JSON.parse(citiesGet);

      console.log(allCities);

      const allIdCities = [];
      const allStringCities = "";

      allCities.forEach((e) => {
        allIdCities.push(e.id);
      });

      console.log("allIdCities", allIdCities);

      this.cities = allCities;

      allCities.map((e) => {
        console.log("www", e.id);
      });

      const newww = allCities
        .map(function (value) {
          return value.id;
        })
        .join(",");

      console.log("newww", newww);

      fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${newww}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
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
          console.log("wdwadsadas");
          console.log(data.list);
          this.cityAllGet = data.list;
        });

      // const arrayLocalStorage = JSON.parse(localStorage.getItem("cities"))

      // const bbb = ([this.cities[0], this.cities[1]] = [
      //   this.cities[1],
      //   this.cities[0],
      // ]);

      console.log(this.cities);
      // swap( Twelve, 7, 11);
      // swap( Twelve, 9, 4);

      // Twelve;

      // console.log(
      //   this.cities.findIndex(this.cities.find((x, index) =>  x.id === item))
      // );
    },

    addlik() {
      console.log(this.name);

      if (this.name) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
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
            console.log("wdwadsadas");
            console.log(data);

            if (
              this.cityAllGet.some((element) => element.name === data?.name)
            ) {
              console.log("уже был");
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
            console.log("stage 2");

            console.log(citiesGet);

            console.log("out cities");

            const allCities = JSON.parse(citiesGet);

            console.log(allCities);

            const allIdCities = [];
            const allStringCities = "";

            allCities.forEach((e) => {
              allIdCities.push(e.id);
            });

            console.log("allIdCities", allIdCities);

            this.cities = allCities;

            allCities.map((e) => {
              console.log("www", e.id);
            });

            const newww = allCities
              .map(function (value) {
                return value.id;
              })
              .join(",");

            console.log("newww", newww);

            fetch(
              `https://api.openweathermap.org/data/2.5/group?id=${newww}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
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
                console.log("wdwadsadas");
                console.log(data.list);
                this.cityAllGet = data.list;
              });
          });
      }
    },
    settings({ target }) {
      target.closest(".weather__show").classList.toggle("settings-toggle");
      console.log("dwwdas");
    },
    clc() {
      console.log(this.city);
    },
    inputName({ target }) {
      this.name = target.value;
    },
    removeCity(e) {
      console.log("mountedeee", e);
      this.cities = this.cities.filter((p) => p.id !== e.id);
      localStorage.setItem("cities", JSON.stringify(this.cities));

      // this.cityAllGet =
      const citiesGet = localStorage.getItem("cities");
      console.log("stage 2");

      console.log(citiesGet);

      console.log("out cities");

      const allCities = JSON.parse(citiesGet);

      console.log(allCities);

      const allIdCities = [];
      const allStringCities = "";

      allCities.forEach((e) => {
        allIdCities.push(e.id);
      });

      console.log("allIdCities", allIdCities);

      this.cities = allCities;

      allCities.map((e) => {
        console.log("www", e.id);
      });

      const newww = allCities
        .map(function (value) {
          return value.id;
        })
        .join(",");

      console.log("newww", newww);

      if (this.cities.length) {
        fetch(
          `https://api.openweathermap.org/data/2.5/group?id=${newww}&units=metric&appid=81e9d77e5339d6601b69f80f0e235644`
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
            console.log("wdwadsadas");
            console.log(data.list);
            this.cityAllGet = data.list;
          });
      } else {
        this.noHaveCities = true;
      }
    },
  },

  // http://api.openweathermap.org/data/2.5/group?id=2643743,491422&units=metric&appid=81e9d77e5339d6601b69f80f0e235644

  // https://api.openweathermap.org/data/2.5/group?q=Sochi,London&units=metric&appid=81e9d77e5339d6601b69f80f0e235644

  mounted() {
    const citiesGet = localStorage.getItem("cities");
    if (!citiesGet) {
      // if (!citiesGet) {
      console.log("in cities");

      // this.cities = JSON.parse(citiesGet);
      // const allCities = JSON.parse(citiesGet);
      // allCities.forEach((e) => console.log(e.id));

      console.log(this.cities);
      // if (!localStorage.getItem("city-get-geolocation")) {
      const success = ({ coords }) => {
        const APIkey = "81e9d77e5339d6601b69f80f0e235644";
        console.log(APIkey);
        console.log(coords);
        const { latitude, longitude } = coords;
        const city = longitude.toFixed(2);
        const units = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${city}&units=${units}&appid=${APIkey}`;
        console.log(url);

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("wwwwwwwwwwwwww");
            console.log(data);
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
      console.log(citiesGet);

      console.log("out cities");

      const allCities = JSON.parse(citiesGet);

      console.log(allCities);

      const allIdCities = [];
      const allStringCities = "";

      allCities.forEach((e) => {
        allIdCities.push(e.id);
      });

      console.log("allIdCities", allIdCities);

      this.cities = allCities;

      allCities.map((e) => {
        console.log("www", e.id);
      });

      const newww = allCities
        .map(function (value) {
          return value.id;
        })
        .join(",");

      console.log("newww", newww);

      const units = "metric";

      fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${newww}&units=${units}&appid=81e9d77e5339d6601b69f80f0e235644`
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
          console.log("wdwadsadas");
          console.log(data.list);
          this.cityAllGet = data.list;
        })
        .catch(() => {
          if (!this.cityAllGet.length) {
            this.noHaveCities = true;
          }
        });
    }
  },
};
</script>