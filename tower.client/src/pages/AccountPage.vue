<template>
  <!-- <div class="row container-fluid justify-content-center"> -->
  <div class="text-center">
    <h1>Welcome {{ account.name }}</h1>
    <h4>Here are the events you are attending</h4>
  </div>
  <!-- </div> -->

  <div class="row container-fluid">
    <div
      class="col-12 col-md-4 card elevation-2 my-2"
      v-for="attendee in myAttendance"
      :key="attendee.id"
    >
      <img class="img-fluid fix" :src="attendee.event.coverImg" alt="" />
      <h3>{{ attendee.event.name }}</h3>

      <h5>Event type: {{ attendee.event.type }}</h5>
      <h5>{{ new Date(attendee.event.startDate).toDateString() }}</h5>
      <h5>{{ attendee.event.location }}</h5>
      <p v-if="attendee.event.capacity > 0">
        Capacity left: {{ attendee.event.capacity }}
      </p>
      <p v-if="attendee.event.capacity == 0" class="cancel">
        This event if full
      </p>
      <p>{{ attendee.event.description }}</p>
      <div v-if="attendee.event.isCanceled">
        <h6 class="cancel">This event is canceled</h6>
      </div>
      <button class="rounded" @click="returnTicket(attendee.id)">
        Return Ticket
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { accountService } from "../services/AccountService"
import { attendeesService } from "../services/AttendeesService"
export default {
  name: 'Account',
  setup() {
    watchEffect(async (account) => {
      try {
        await accountService.getMyAttendance(account)
      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })
    return {
      attendees: computed(() => AppState.attendees),
      myAttendance: computed(() => AppState.myAttendance),
      event: computed(() => AppState.events),
      account: computed(() => AppState.account),
      async returnTicket(attendee) {
        try {
          if (await window.confirm('are you sure you want to remove yourself from this event?')) {
            await attendeesService.returnTicket(attendee)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.pic {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
.fix {
  height: 200px;
  width: 380px;
}
.cancel {
  color: red;
}
.color {
  color: rgb(112, 5, 14);
}
</style>
