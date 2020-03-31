import Vue from 'vue';

export const state = () => ({
  tasks: {},
  providers: {},
  selectedProviders: []
})

export const mutations = {
  SET_PROVIDER(state, {
    doctor_id,
    providerData
  }) {
    Vue.set(state.providers, doctor_id, providerData);
  },

  SET_PROVIDER_TASKS(state, {
    doctor_id,
    taskArray
  }) {
    Vue.set(state.providers[doctor_id], 'tasks', taskArray);
  },

  SET_TASK(state, {
    task_id,
    taskData
  }) {
    Vue.set(state.tasks, task_id, taskData);
  },

  SELECT_PROVIDER(state, doctor_id) {
    state.selectedProviders.push(doctor_id);
  },

  DESELECT_PROVIDER(state, doctor_id) {
    let index = state.selectedProviders.indexOf(doctor_id)
    state.selectedProviders.splice(index, 1)
  }
}

export const actions = {
  /* 
   * Fetch a list of all doctors from the API and put in our store.
   */
  async fetchProviders({
    commit
  }) {

    const {
      data
    } = await this.$axios.get('/reference/getDoctors')

    data.forEach(({
      doctor_id,
      ...providerData
    }) => {

      commit('SET_PROVIDER', {
        doctor_id: doctor_id,
        providerData
      })
    });
  },

  /* 
   * Fetch a list of all tasks assigned to a specific provider
   */
  async fetchTasksForProvider({
    commit
  }, doctor_id) {

    const {
      data
    } = await this.$axios.get(`/tasks/${doctor_id}`)

    data.forEach(({
      task_id,
      ...taskData
    }) => {

      commit('SET_TASK', {
        task_id,
        taskData
      })
    });

    // Set References to the tasks in the provider object
    commit('SET_PROVIDER_TASKS', {
      doctor_id,
      taskArray: data.map(task => task.task_id)
    })
  },

  // Add or remove a provider from the list of selected providers
  toggleProviderSelection({
    state,
    commit
  }, doctor_id) {
    state.selectedProviders.indexOf(doctor_id) === -1 ? commit('SELECT_PROVIDER', doctor_id) : commit('DESELECT_PROVIDER', doctor_id);
  }
}
export const getters = {
  /*
   * Returns all providers in Array form.

   * Example return value:
   * [
   *   {
   *    "doctor_id": "doctor1"
   *    "first_name": "Martha",
   *    "last_name": "Powell",
   *    "dob": "04/08/1966",
   *    "degree": "MD"
   *   }, ...
   * ]
   */
  allProviders: (state) => Object.keys(state.providers).map(doctor_id => ({
    doctor_id,
    ...state.providers[doctor_id]
  })),


  /*
   * Returns only the selected providers in Array form.
   */
  selectedProviders: (state) => state.selectedProviders.map(doctor_id => ({
    doctor_id,
    ...state.providers[doctor_id]
  })),

  // Retrieve tasks for a single provider.
  providerTasks: (state) => (doctor_id) => {
    if (state.providers[doctor_id] && state.providers[doctor_id].tasks) {
      return state.providers[doctor_id].tasks.map(task_id => ({
        task_id,
        ...state.tasks[task_id]
      }))
    }
  }
}
