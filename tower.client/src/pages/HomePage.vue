<template>
  <div>
    <button class="m-2 rounded" @click="sort = 'sport'">Sport</button>
    <button class="m-2 rounded" @click="sort = 'digital'">Digital</button>
    <button class="m-2 rounded" @click="sort = 'convention'">Convention</button>
    <button class="m-2 rounded" @click="sort = 'concert'">Concert</button>
  </div>
  <div class="row container-fluid" v-if="sort.length > 0">
    <div class="col col-md-4" v-for="event in events" :key="event.id">
      <SingleEvent :event="event" />
    </div>
  </div>
  <div v-else class="row container-fluid">
    <div class="col col-md-4" v-for="event in allEvents" :key="event.id">
      <SingleEvent :event="event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"

export default {

  setup() {
    const sort = ref('')
    onMounted(async () => {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })
    return {
      sort,
      name: 'Home',
      events: computed(() => AppState.events.filter(e => e.type === sort.value)),
      allEvents: computed(() => AppState.events)

      // events: computed(() => {
      //   AppState.events.filter(e => {
      //     if (e.type === sort.value) {
      //       events == sort.value
      //     }
      //   })
      //   return events
      // })

    }
  }
}
</script>

<style scoped lang="scss">
</style>
