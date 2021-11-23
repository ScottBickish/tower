<template>
  <div class="card elevation-2 border m-3 p-2">
    <img class="fit" :src="comment.creator.picture" alt="" />
    <p>{{ comment.creator.name }}</p>

    <p>{{ comment.body }}</p>
    <div class="text-end m-3">
      <button
        title="delete comment"
        class="bg-danger rounded"
        v-if="account.id == comment.creator.id"
        @click="removeComment(comment.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { commentsService } from "../services/CommentsService"
export default {
  props: {
    comment: Object
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async removeComment(id) {
        try {
          if (await window.confirm('are you sure you want to delete?')) {
            await commentsService.removeComment(id)

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


<style lang="scss" scoped>
.fit {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>