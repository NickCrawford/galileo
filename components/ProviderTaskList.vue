<template>
  <div class="provider-task-list">
    <b-message v-for="task in providerTasks" :key="task.task_id">
      <p>
        <b-tag type="is-info">
          {{ task.priority }}
        </b-tag>
        &nbsp;&nbsp;<strong>{{ task.task_id }}</strong>
      </p>
    </b-message>
  </div>
</template>

<script>
export default {
  name: 'ProviderTaskList',

  props: {
    providerID: {
      type: String,
      required: true
    }
  },

  created() {
    this.$store.dispatch('fetchTasksForProvider', this.$props.providerID)
  },

  computed: {
    providerTasks() {
      let providerTasksArray = []
      if (this.$store.state.providers[this.$props.providerID]) {
        providerTasksArray = this.$store.getters['providerTasks'](
          this.$props.providerID
        )
      }

      if (providerTasksArray && providerTasksArray.length > 1)
        providerTasksArray.sort((a, b) => b.priority - a.priority)

      return providerTasksArray
    }
  }
}
</script>
