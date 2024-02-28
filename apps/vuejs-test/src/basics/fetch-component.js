import axios from 'axios';

export default {
  props: ['url'],
  data() {
    return {
      response: null,
      loading: false,
    };
  },
  created() {
    axios
      .get(this.url)
      .then(response => {
        this.response = response.data;
        this.loading = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  // render는 컴포넌트를 그리는 것
  render() {
    return this.$scopedSlots.default({
      reponse: this.response,
      loading: this.loading,
    });
  },
};

/*
// 부모 컴포넌트
<template>
  <div>
  	<fetch-data url="https://jsonplaceholder.typicode.com/users/" v-slot:default="{ response, loading }">
      <div> 
        <div v-if="!loading">
        {{ response }}
        </div>    
        <div v-else>
          Loading...
        </div>
	    </div>
    </fetch-data>
  </div>
</template>

<script>
import FetchData from '경로';

export default {
  components: {
    FetchData
  }
}
</script>
*/
