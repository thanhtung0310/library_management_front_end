<template>
  <div class="delete">
    <input type="button" value="Delete" @click="deleteData(id)" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";

@Options({
  name: "BookDelete",
  data() {
    return {
      data: null,
      id: null,
      URL: "https://localhost:7123/api/books",
    };
  },
  methods: {},
})
export default class BookList extends Vue {
  id = undefined;
  URL = "https://localhost:7123/api/books";
  deleteData(id: number): void {
    axios
      .delete(this.URL + "${id}")
      .then((response) => (this.data = response.data))
      .catch((error) => console.log(error));
  }
}
</script>
