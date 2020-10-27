<template>
  <div class="card">
    <div
      class="card-content"
      @click="editShift()"
    >
      <div>
        {{ shift.title }}
      </div>

      <div>
        {{ shift.description }}
      </div>

      <section>
        <div>
          Dates
        </div>

        <div
          class="columns"
          v-for="date in shift.dates"
        >
          <div class="column">
            {{ date.date }} | {{ date.startTime }} | {{ date.endTime }} | {{ date.type }} | {{ date.price }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'shift',
  props: {
    shift: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapMutations({
      OPEN_DRAWER: 'drawer/OPEN_DRAWER'
    }),
    editShift() {
      this.OPEN_DRAWER(this.shift);
    }
  }
};
</script>

<style scoped lang=scss>

</style>
