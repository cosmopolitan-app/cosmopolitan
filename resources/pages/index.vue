<template>
  <v-container>
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
        <v-btn class="red" tile>Search <v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>
    </v-row>
    <br />
    <v-row justify="center">
      <v-col class="col-sm-12 col-md-6">
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
          libero distinctio eaque ducimus nulla ex consequatur alias vitae,
          ratione earum dolores saepe itaque temporibus deserunt autem provident
          id sed?
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
            <v-card-subtitle>{{ formatSubtitle(e.subtitle) }}</v-card-subtitle>
            <v-card-text>
              {{ e.text }}
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-row>
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
      events: [
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          title: 'Headline',
          subtitle: 'An Event',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
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

    formatSubtitle(subtitle) {
      return subtitle.length > 27 ? subtitle.substring(0, 24) + '...' : subtitle
    }
  }
}
</script>

<style scoped>
.b {
  border: 1px solid red;
}
</style>
