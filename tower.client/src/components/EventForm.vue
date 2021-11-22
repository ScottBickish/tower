<template>
  <div class="Eventform">
    <form @submit.prevent="createEvent()">
      <input
        class="form-control my-2"
        type="text"
        name="title"
        id="title"
        placeholder="title..."
        required
        v-model="event.name"
      />
      <select v-model="event.type">
        <option>concert</option>
        <option>digital</option>
        <option>convention</option>
        <option>sport</option>
      </select>
      <textarea
        class="form-control my-2"
        name="description"
        id="dscription"
        cols="30"
        rows="10"
        placeholder="event description..."
        required
        v-model="event.description"
      ></textarea>
      <input
        type="text"
        class="form-control my-2"
        name="location"
        id="location"
        placeholder="event location"
        required
        v-model="event.location"
      />
      <input
        type="number"
        name="capacity"
        id="capacity"
        class="form-control my-2"
        required
        v-model="event.capacity"
      />
      <input
        type="date"
        name="date"
        id="date"
        class="form-control my-2"
        required
        v-model="event.startDate"
      />
      <input
        type="url"
        name="coverimg"
        id="coverimg"
        class="form-control my-2"
        placeholder="coverimg..."
        required
        v-model="event.coverImg"
      />
      <button type="submit">submit</button>
    </form>
  </div>
</template>


<script>
import { Modal } from "bootstrap"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { ref } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const event = ref({})
    return {
      event,
      route,
      router,
      async createEvent() {
        try {
          await eventsService.createEvent(event.value)
          Modal.getOrCreateInstance(document.getElementById("EventForm")).hide();
          router.push({ name: 'EventDetailsPage', params: { id: AppState.activeEvent.id } })

        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>