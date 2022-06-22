<template>
  <div>
    <table class="table">
      <thead>
        <th>Book ID</th>
        <th>Book title</th>
        <th>Book's publisher</th>
      </thead>
      <tbody>
        <td>1</td>
        <td>Harry Potter 1</td>
        <td>J. K. Rowling</td>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'BookList',
})

export default class BookList extends Vue {
  
}
</script>

<style>
.table {
  text-align: center;
  border: double;
  background-color: white;
  width: 80%;
  margin-left: 10%;
  align-self: center;
}
</style>
