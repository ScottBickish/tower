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
          <h6 class="cancel">This event is canceled</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="text-end m-3">
    <button class="bg-danger rounded">Cancel Event</button>
    <button class="bg-warning rounded ms-3">Attend</button>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { eventsService } from "../services/EventsService"
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        await eventsService.getActiveEvent(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })
    return {
      route,
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
.fix {
  height: 200px;
  width: 380px;
}
</style>