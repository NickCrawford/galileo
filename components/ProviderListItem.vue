<template>
  <div class="provider-list-item card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">
            {{ provider.first_name }} {{ provider.last_name }},
            {{ provider.degree }}
          </p>
        </div>

        <div class="media-right">
          <b-tooltip label="Remove from view">
            <b-button
              @click="removeProviderFromSelected"
              type="is-text"
              rounded
              icon-right="close"
            />
          </b-tooltip>
        </div>
      </div>

      <provider-task-list :providerID="provider.doctor_id" />
    </div>
  </div>
</template>

<script>
import ProviderTaskList from '@/components/ProviderTaskList.vue'

export default {
  name: 'ProviderListItem',

  components: {
    ProviderTaskList
  },

  props: {
    provider: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeProviderFromSelected() {
      this.$store.commit('DESELECT_PROVIDER', this.provider.doctor_id)
    }
  }
}
</script>
