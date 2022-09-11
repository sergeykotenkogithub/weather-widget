<template>
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
    </div>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";

export default {
  components: { Icon },
  props: {
    cityAllGet: {
      type: Array,
    },
  },
};
</script>
