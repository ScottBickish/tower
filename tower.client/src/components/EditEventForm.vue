
  <template>
  <div class="EditEventform" id="EditEventForm">
    <form @submit.prevent="handleSubmit">
      <input
        class="form-control my-2"
        type="text"
        name="title"
        id="title"
        placeholder="title..."
        required
        v-model="editable.name"
      />
      <select v-model="editable.type">
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
        v-model="editable.description"
      ></textarea>
      <input
        type="text"
        class="form-control my-2"
        name="location"
        id="location"
        placeholder="event location"
        required
        v-model="editable.location"
      />
      <input
        type="number"
        name="capacity"
        id="capacity"
        class="form-control my-2"
        required
        v-model="editable.capacity"
      />
      <input
        type="date"
        name="date"
        id="date"
        class="form-control my-2"
        required
        v-model="editable.startDate"
      />
      <input
        type="url"
        name="coverimg"
        id="coverimg"
        class="form-control my-2"
        placeholder="coverimg..."
        required
        v-model="editable.coverImg"
      />
      <button type="submit">Update</button>
    </form>
  </div>
</template>



<script>
import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { eventsService } from "../services/EventsService"
export default {
  props: {
    event: {
      type: Event,
      // default: () => new Event()
    }
  },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.event }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          await eventsService.editEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('EditEventForm')).hide()
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