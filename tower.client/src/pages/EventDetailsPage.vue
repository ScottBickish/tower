<template>
  <div class="active event page">
    <div class="row container-fluid">
      <div class="col-md-10 ms-3">
        <img class="img-fluid" :src="activeEvent.coverImg" alt="" />
        <h3>Event name: {{ activeEvent.name }}</h3>
        <h5>Event type: {{ activeEvent.type }}</h5>
        <h5>
          Start date: {{ new Date(activeEvent.startDate).toDateString() }}
        </h5>
        <h5>Location: {{ activeEvent.location }}</h5>
        <p>Capacity left{{ activeEvent.capacity }}</p>
        <p>{{ activeEvent.description }}</p>
        <div v-if="activeEvent.isCanceled">
          <h6 class="cancel red">This event is canceled</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="text-end m-3">
    <button
      class="bg-danger rounded"
      v-if="activeEvent.creatorId == account.id && !activeEvent.isCanceled"
      @click="cancelEvent(activeEvent)"
    >
      Cancel Event
    </button>
    <button class="bg-warning rounded ms-3" v-if="!activeEvent.isCanceled">
      Attend
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
  <!-- {{ comments }} -->
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
export default {
  setup() {
    const route = useRoute()
    const comment = ref({ eventId: route.params.id })
    onMounted(async () => {
      try {
        if (route.params.id) {
          await commentsService.getEventComments(route.params.id)
          await eventsService.getActiveEvent(route.params.id)
        }

      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })
    return {

      async createComment() {
        logger.log(comment.value)
        await commentsService.createComment(comment.value)
        comment.value = {}
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
      account: computed(() => AppState.account)
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
</style>