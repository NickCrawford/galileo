<template>
  <div id="providers-master-view">
    <div class="container">
      <!-- Page Heading & Controls-->
      <section class="section is-small">
        <div class="level">
          <div class="level-left">
            <h1 class="level-item title is-3">Provider Task List</h1>
          </div>
          <div class="level-right">
            <b-button
              @click="isAddModalActive = true"
              class="level-item"
              type="is-info"
              rounded
              icon-right="plus"
              >Add Provider</b-button
            >
          </div>
        </div>
      </section>
    </div>

    <b-modal
      :active.sync="isAddModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <add-provider-modal v-if="isAddModalActive"></add-provider-modal>
    </b-modal>

    <!-- Providers Container -->
    <div class="provider-list-wrapper">
      <main class="provider-list-container">
        <provider-list-item
          class="provider-list-item"
          v-for="provider in selectedProviders"
          :key="provider.doctor_id"
          :provider="provider"
        ></provider-list-item>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddProviderModal from '@/components/AddProviderModal.vue'
import ProviderListItem from '@/components/ProviderListItem.vue'

export default {
  name: 'ProvidersMasterView',

  components: {
    AddProviderModal,
    ProviderListItem
  },

  data() {
    return {
      isAddModalActive: false
    }
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

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/base/_all';

#providers-master-view {
  height: calc(100% - 3.5rem);

  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
}

#providers-master-view .container {
  width: 100%;
  border-bottom: 2px solid $light;
}

#providers-master-view .provider-list-wrapper {
  flex-grow: 1;
  display: inline-block;

  max-width: 100vw;

  overflow-x: auto;
  overflow-y: visible;
}

#providers-master-view .provider-list-container {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;

  width: auto;
  max-width: auto;

  overflow: visible;

  padding-top: 2rem;
  padding-bottom: 2rem;

  @each $size in $desktop, $widescreen, $fullhd {
    @media screen and (min-width: $size) {
      padding-left: calc((100% - (#{$size} - #{$gap * 2})) / 2);
      padding-right: calc((100% - (#{$size} - #{$gap * 2})) / 2);
    }
  }
}

.provider-list-item {
  display: inline-block;

  min-width: 28rem;
  max-width: 33vw;

  &:not(:last-of-type) {
    margin-right: 1.5rem;
  }
}
</style>
