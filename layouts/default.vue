<template>
  <div>
     <b-navbar type="is-primary">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/images/galileo-logotype.svg"
                    alt="Galileo Health"
                >
            </b-navbar-item>
        </template>
     </b-navbar>

     <nuxt />
  </div>
</template>