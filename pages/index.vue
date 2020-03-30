<template>
  <div class="container">
    <!-- Page Heading & Controls-->
    <section class="section is-small">
      <div class="level">
        <div class="level-left">
          <h1 class="level-item title is-3">Provider Task List</h1>
        </div>
        <div class="level-right">
          <b-button class="level-item" type="is-info" rounded icon-right="plus"
            >Add Provider</b-button
          >
        </div>
      </div>
      <hr />
    </section>

    <!-- Providers Container -->
    <main class="provider-list-container">
      <div
        class="provider-list-item card"
        v-for="provider in selectedProviders"
        :key="provider.doctor_id"
      >
        <div class="card-header">
          <p>{{ provider }}</p>
        </div>
      </div>
    </main>

    <add-provider-modal></add-provider-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddProviderModal from '@/components/AddProviderModal.vue'

export default {
  name: 'ProvidersMasterView',

  components: {
    AddProviderModal
  },

  computed: {
    ...mapGetters(['selectedProviders', 'allProviders'])
  },

  async fetch({ store }) {
    console.log('fetching doctors')
    await store.dispatch('fetchProviders')
  }
}
</script>
