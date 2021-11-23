<template>
  <div class="active event page">
    <div class="row container-fluid">
      <div class="col-md-10 ms-3">
        <img class="img-fluid" :src="activeEvent.coverImg" alt="" />
        <h3>Event name: {{ activeEvent.name }}</h3>
        <p v-if="alreadyAttending == true" class="color">
          You are Attending this event
        </p>
        <h5>Event type: {{ activeEvent.type }}</h5>
        <h5>
          Start date: {{ new Date(activeEvent.startDate).toDateString() }}
        </h5>
        <h5>Location: {{ activeEvent.location }}</h5>
        <p>Capacity left {{ activeEvent.capacity }}</p>
        <p>{{ activeEvent.description }}</p>
        <div v-if="activeEvent.isCanceled">
          <h6 class="cancel red">This event is canceled</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="row container-fluid">
    <div class="col-md-1" v-for="attendee in attendees" :key="attendee.id">
      <img
        class="pic"
        :src="attendee.account.picture"
        alt="picture"
        :title="attendee.account.name"
      />
    </div>
  </div>
  <div class="text-end m-3">
    <button
      class="bg-danger rounded"
      v-if="
        activeEvent.creatorId == account.id &&
        !activeEvent.isCanceled &&
        account.id
      "
      @click="cancelEvent(activeEvent)"
    >
      Cancel Event
    </button>
    <button
      class="bg-warning rounded ms-3"
      v-if="
        !activeEvent.isCanceled &&
        activeEvent.capacity >= 1 &&
        alreadyAttending == false &&
        account.id
      "
      @click="attendThisEvent(account.id, activeEvent.id)"
    >
      Attend
    </button>

    <Modal id="EditEventForm">
      <template #modal-title> Edit Your Event! </template>

      <template #modal-body> <EditEventForm :event="activeEvent" /> </template>
    </Modal>

    <button
      class="bg-success rounded ms-3"
      v-if="
        activeEvent.creatorId == account.id &&
        !activeEvent.isCanceled &&
        account.id
      "
      data-bs-toggle="modal"
      data-bs-target="#EditEventForm"
      title="edit form"
    >
      Edit Your Event
    </button>
  </div>
  <form @submit.prevent="createComment()">
    <input
      type="text"
      class="form-control"
      placeholder="type comment here..."
      name="comment"
      id="comment"
      required
      v-model="comment.body"
    />
    <button class="rounded bg-success" type="submit">Post</button>
  </form>
  <div class="col col-md 10" v-for="comment in comments" :key="comment.id">
    <SingleComment :comment="comment" />
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { eventsService } from "../services/EventsService"
import { commentsService } from "../services/CommentsService"
import { attendeesService } from "../services/AttendeesService"
export default {
  setup() {
    const route = useRoute()
    const comment = ref({ eventId: route.params.id })

    onMounted(async () => {
      try {
        if (route.params.id) {
          await attendeesService.getEventAttendees(route.params.id)
          await commentsService.getEventComments(route.params.id)
          await eventsService.getActiveEvent(route.params.id)

        }

      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })

    return {

      async attendThisEvent(accountId, eventId) {
        try {
          if (await window.confirm('you want to attend this event?')) {
            await attendeesService.attendThisEvent(accountId, eventId)

          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      attendees: computed(() => AppState.attendees),

      async createComment() {
        await commentsService.createComment(comment.value)
        comment.value = { eventId: route.params.id }
      },
      async cancelEvent(event) {
        try {
          if (await window.confirm("Are you sure you want to cancel this event?")) {
            await eventsService.cancelEvent(event)
          }
        } catch (error) {
          Pop.toast(error)
        }
      },
      route,
      comment,
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
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
.red {
  color: red;
}
.color {
  color: purple;
}
.pic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>