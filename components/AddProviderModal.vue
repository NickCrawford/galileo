<template>
  <div>
    <b-field label="Search providers...">
      <b-autocomplete
        v-model="searchText"
        placeholder="e.g. Stephen"
        keep-first
        open-on-focus
        clear-on-select
        max-height="500px"
        icon="magnify"
        :data="filteredProviders"
        field="first_name"
        @select="toggleProviderSelection"
        :autofocus="true"
      >
        <template slot-scope="props">
          <div class="media is-vertical-center">
            <div class="media-left">
              <b-checkbox :value="isProviderSelected(props.option.doctor_id)">
              </b-checkbox>
            </div>
            <div class="media-content">
              {{ props.option.first_name }} {{ props.option.last_name }},
              {{ props.option.degree }}
              <br />
              <small> DOB: {{ props.option.dob }} </small>
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      searchText: '',
      keepFirst: false,
      openOnFocus: false
    }
  },

  computed: {
    ...mapGetters(['allProviders']),
    ...mapState(['selectedProviders']),

    filteredProviders() {
      return this.allProviders.filter(provider => {
        return (
          `${provider.first_name} ${provider.last_name}`
            .toLowerCase()
            .indexOf(this.searchText.toLowerCase()) >= 0
        )
      })
    }
  },

  methods: {
    toggleProviderSelection(option) {
      if (option && option.doctor_id)
        this.$store.dispatch('toggleProviderSelection', option.doctor_id)
    },

    // Returns true if provider is already selected. False otherwise
    isProviderSelected(doctor_id) {
      return this.selectedProviders.indexOf(doctor_id) !== -1
    }
  }
}
</script>

<style>
.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>
