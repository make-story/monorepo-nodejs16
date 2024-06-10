<template>
  <div>
    <div>
      <h1>Todo</h1>
      <p>
        전체 할일 : {{ todoList.length }} / 완료된 할일 : {{ countDone }} / 남은
        할일 : {{ todoList.length - countDone }}
      </p>
    </div>
    <div>
      <TodoList
        :todoList="todoList"
        @statusControl="statusControl"
        @listDelete="listDelete"
      ></TodoList>
    </div>
    <div>
      <TodoListAdd @listAdd="listAdd" @listEdit="listEdit"></TodoListAdd>
    </div>
  </div>
</template>

<script>
import TodoList from '@/test/components/TodoList';
import TodoListAdd from '@/test/components/TodoListAdd';

export default {
  components: {
    TodoList,
    TodoListAdd,
  },
  data() {
    return {
      todoList: [],
    };
  },
  computed: {
    countDone() {
      let count = 0;
      this.todoList.forEach(list => {
        if (list.status === 'done') {
          count++;
        }
      });
      return count;
    },
  },
  methods: {
    listAdd(memo) {
      this.todoList.push({ memo: memo, status: 'created' });
    },
    statusControl(index, status) {
      this.todoList[index].status = status;
    },
    listDelete(index) {
      this.todoList.splice(index, 1);
    },
    listEdit(memo, index) {
      this.todoList[index].memo = memo;
    },
  },
};
</script>
