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
            >Add Provider To View</b-button
          >
        </div>
      </div>
    </section>

    <!-- Providers Container -->
    <main class="provider-list">
      <div class="card"></div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ProvidersMasterView',

  components: {}
}
</script>
