<template>
  <router-link :to="{ name: 'EventDetailsPage', params: { id: event.id } }">
    <div class="selectable card elevation-2 my-2" @click="setActive()">
      <img class="img-fluid fix" :src="event.coverImg" alt="" />
      <h3>{{ event.name }}</h3>
      <!-- <p v-if="alreadyAttending == true" class="color">
        You're attending this event!
      </p> -->

      <h5>Event type: {{ event.type }}</h5>
      <h5>{{ new Date(event.startDate).toDateString() }}</h5>
      <h5>{{ event.location }}</h5>
      <p v-if="event.capacity > 0">Capacity left: {{ event.capacity }}</p>
      <p v-if="event.capacity == 0" class="cancel">This event if full</p>
      <p>{{ event.description }}</p>
      <div v-if="event.isCanceled">
        <h6 class="cancel">This event is canceled</h6>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    event: Object,

  },
  setup(props) {
    return {
      alreadyAttending: computed(() => AppState.alreadyAttending),
      activeEvent: computed(() => AppState.activeEvent),
      setActive() {
        AppState.activeEvent = props.event
      },
      alreadyAttending: computed(() => {
        if (AppState.account.id) {
          let found = AppState.attendees.find(a => a.accountId === AppState.account.id)
          return found ? true : false
        }
        return false
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.fix {
  height: 200px;
  width: 380px;
}
.cancel {
  color: red;
}
.color {
  color: purple;
}
</style>