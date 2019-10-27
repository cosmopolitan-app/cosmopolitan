<template>
  <v-container>
    <form @submit.prevent="onSubmit">
      <v-row justify="center">
        <v-col md="3">
          <v-text-field
            v-model="eventSearch"
            placeholder="Search event..."
          ></v-text-field>
        </v-col>
        <v-col md="3">
          <v-text-field
            v-model="talkSearch"
            placeholder="Sarch talk..."
          ></v-text-field>
        </v-col>
        <v-col md="3">
          <v-text-field
            v-model="dateFilter"
            placeholder="Filter date..."
            :value="formatDate"
            @focus="visibleDatePicker = true"
          >
          </v-text-field>
          <template v-if="visibleDatePicker">
            <v-date-picker no-title @input="onSelectedDate"> </v-date-picker>
          </template>
        </v-col>
        <v-col md="2">
          <v-btn class="red" tile type="submit">
            Search <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <br />
      <v-row justify="center">
        <v-col class="col-sm-12 col-md-6">
          <h1>Title</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
            libero distinctio eaque ducimus nulla ex consequatur alias vitae,
            ratione earum dolores saepe itaque temporibus deserunt autem
            provident id sed?
          </p>
        </v-col>
        <v-col class="col-sm-12 col-md-6">
          <v-img
            src="http://lorempixel.com/output/nature-q-c-640-480-1.jpg"
          ></v-img>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <div class="mb-3">
          <h1>Talkers</h1>
        </div>
        <v-slide-group
          multiple
          show-arrows
          class="my-2"
          prev-icon="mdi-chevron-left-circle"
          next-icon=" mdi-chevron-right-circle"
        >
          <v-slide-item v-for="i in 10" :key="i">
            <v-card class="mx-2" max-width="200">
              <v-img
                src="http://lorempixel.com/output/abstract-q-c-100-100-8.jpg"
              ></v-img>
              <v-card-title>Headline</v-card-title>
              <v-card-text>Lorem ipsum dolor sit amet</v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-row>
      <br />
      <v-row>
        <div class="mb-3">
          <h1>Talks</h1>
        </div>
        <v-slide-group
          multiple
          show-arrows
          class="my-2"
          prev-icon="mdi-chevron-left-circle"
          next-icon=" mdi-chevron-right-circle"
        >
          <v-slide-item v-for="(e, i) in events" :key="i">
            <v-card class="mx-2" max-width="200">
              <v-img
                src="http://lorempixel.com/output/abstract-q-c-100-100-8.jpg"
              ></v-img>
              <v-card-title>{{ e.title }}</v-card-title>
              <!-- <v-card-subtitle class="text-truncate">
                {{ e.description }}
              </v-card-subtitle> -->
              <v-card-text class="text-truncate">
                {{ e.text }}
              </v-card-text>
              <div class="is-scrollable">
                <div style="display:inline-flex">
                  <v-chip v-for="j in 3" :key="j" class="ma-1">Category</v-chip>
                </div>
              </div>
              <div style="float: right">
                <v-btn small class="my-2 mr-2 purple lighten-1">
                  Information
                </v-btn>
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-row>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      eventSearch: '',
      talkSearch: '',
      dateFilter: '',
      visibleDatePicker: false,
      events: []
    }
  },

  methods: {
    onSelectedDate(d) {
      this.visibleDatePicker = false
      this.dateFilter = this.formatDate(d)
    },

    formatDate(date) {
      const [y, m, d] = date.split('-')
      return `${m}/${d}/${y}`
    },

    onSubmit() {
      this.$axios
        .get('/api/events')
        .then(({ data }) => (this.events = data.data))
    }
  }
}
</script>

<style scoped>
/* Customizing scrollbar */
.is-scrollable::-webkit-scrollbar {
  width: 7px;
  height: 2px;
}

/* Track */
.is-scrollable::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey;
  border-radius: 10px;
}

/* Handle */
.is-scrollable::-webkit-scrollbar-thumb {
  background: #353535;
  border-radius: 10px;
}

/* Handle on hover */
.is-scrollable::-webkit-scrollbar-thumb:hover {
  background: #cdcdcd;
}

.b {
  border: 1px solid red;
}

.is-scrollable {
  overflow-x: auto;
  scrollbar-color: #353535 #cdcdcd;
  scrollbar-width: thin;
}
</style>
