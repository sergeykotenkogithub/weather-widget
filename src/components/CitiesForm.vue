<template>
  <h5>oiopkopkpok 111111111</h5>
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
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";

export default {
  components: { Icon },
  props: {
    addlik: {
      type: Function,
    },
    error: {
      type: Boolean,
    },
  },
};
</script>