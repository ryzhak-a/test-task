<template>
  <section class="section">
    <div class="columns">
      <span class="column">
        Shifts
      </span>

      <div class="column">
        <b-button
          type="is-dark"
          size="is-medium"
          @click="OPEN_DRAWER(null)"
          :disabled="isDrawerOpen"
        >
          Add shift
        </b-button>
      </div>
    </div>

    <template v-if="shifts.length">
      <Shift
        v-for="shift in shifts"
        :shift="shift"
      />
    </template>

    <template v-else>
      No shifts
    </template>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Shift from '~/components/shift';

export default {
  name: 'HomePage',
  components: { Shift },
  computed: mapState({
    shifts: state => state.shifts.shifts,
    isDrawerOpen: state => state.drawer.isDrawerOpen
  }),
  methods: {
    ...mapMutations({
      OPEN_DRAWER: 'drawer/OPEN_DRAWER'
    })
  }
};
</script>
