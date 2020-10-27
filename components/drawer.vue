<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open="isDrawerOpen"
      :can-cancel="true"
      position="absolute"
    >
      <h1>Edit</h1>

      <br>

      <section>
        <div class="columns">
          <div class="column">
            <b-field label="Title">
              <b-input
                v-model="vacancy.title"
                type="string"
                required
                maxlength="100"
              />
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Description">
              <b-input
                v-model="vacancy.description"
                type="textarea"
                maxlength="500"
              />
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Select a date">
              <b-datepicker
                placeholder="Click to select..."
                @input="addDate"
                required
              >
              </b-datepicker>
            </b-field>
          </div>
        </div>

        <template v-if="vacancy.dates && vacancy.dates.length">
          <div class="columns">
            <div class="column">
              <section v-for="(date, dateIndex) in vacancy.dates">
                <div class="columns">
                  <div class="column">
                    {{ date.date }}
                  </div>

                  <div
                    class="column"
                    @click="deleteDate(dateIndex)"
                  >
                    <b-icon
                      icon="close"
                      size="is-medium">
                    </b-icon>
                  </div>
                </div>

                <div class="columns">
                  <b-field label="Start time">
                    <b-timepicker
                      icon="clock"
                      :enable-seconds="enableSeconds"
                      :hour-format="hourFormat"
                      v-model="date.startTime"
                    >
                    </b-timepicker>
                  </b-field>

                  <b-field label="End time">
                    <b-timepicker
                      required
                      icon="clock"
                      :enable-seconds="enableSeconds"
                      :min-time="date.startTime"
                      :hour-format="hourFormat"
                      v-model="date.endTime"
                    >
                    </b-timepicker>
                  </b-field>

                  <b-field label="Price">
                    <b-input
                      icon="currency-eur"
                      type="number"
                      v-model="date.price"
                      required
                    />
                  </b-field>
                </div>

                <div class="columns">
                  <b-field label="Type">
                    <b-autocomplete
                      v-model="date.type"
                      :data="types"
                    >
                    </b-autocomplete>
                  </b-field>
                </div>
              </section>
            </div>
          </div>
        </template>


        <div class="columns">
          <div class="column is-half">
            <b-button @click="closeDrawer">
              Delete
            </b-button>
          </div>

          <div class="column is-half">
            <b-button @click="createShift">
              Save
            </b-button>
          </div>
        </div>
      </section>
    </b-sidebar>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import shift from '~/components/shift';

export default {
  name: 'drawer',
  data() {
    return {
      hourFormat: undefined,
      enableSeconds: false,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: true,
      vacancy: {
        title: '',
        description: '',
        dates: []
      },
      types: ['Consultation', 'Telephone', 'Ambulance']
    };
  },
  computed: mapState({
    isDrawerOpen: state => state.drawer.isDrawerOpen,
    shift: state => state.drawer.shift
  }),
  watch: {
    shift(val) {
      if (val) {
        this.vacancy = { ...val };
      }
    }
  },
  methods: {
    ...mapMutations({
      CREATE_SHIFT: 'shifts/CREATE_SHIFT',
      DELETE_SHIFT: 'shifts/DELETE_SHIFT',
      UPDATE_SHIFT: 'shifts/UPDATE_SHIFT',
      CLOSE_DRAWER: 'drawer/CLOSE_DRAWER'
    }),
    deleteDate(dateIndex) {
      this.vacancy.dates.splice(dateIndex, 1);

      if (this.shift) {
        this.DELETE_SHIFT(shift);
      }
    },
    createShift() {
      if (this.shift) {
        this.UPDATE_SHIFT(this.vacancy);
      } else {
        this.CREATE_SHIFT(this.vacancy);
      }

      this.closeDrawer();
    },
    closeDrawer() {
      this.vacancy.title = '';
      this.vacancy.description = '';
      this.vacancy.dates = [];

      this.CLOSE_DRAWER();
    },
    addDate(date) {
      const targetIndex = this.vacancy.dates.findIndex(({ d }) => d === date);

      if (targetIndex !== -1) {
        this.vacancy.dates.splice(targetIndex, 1);
      } else {
        this.vacancy.dates.push({
          date: date
        });
      }

    }
  }
};
</script>

<style scoped>
::v-deep .sidebar-content {
  width: 35%;
  padding: 2rem;
}

::v-deep .button {
  width: 100%;
}
</style>
