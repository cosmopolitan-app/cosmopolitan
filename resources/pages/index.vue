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
        ></v-text-field>
        <template v-if="visibleDatePicker">
          <v-date-picker no-title @input="onSelectedDate"> </v-date-picker>
        </template>
      </v-col>
      <v-col md="2">
        <v-btn class="red" tile>Search <v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>
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
      visibleDatePicker: false
    }
  },

  computed: {},

  methods: {
    onSelectedDate(d) {
      this.visibleDatePicker = false
      this.dateFilter = this.formatDate(d)
    },

    formatDate(date) {
      const [y, m, d] = date.split('-')
      return `${m}/${d}/${y}`
    }
  }
}
</script>

<style scoped>
.b {
  border: 1px solid red;
}
</style>
