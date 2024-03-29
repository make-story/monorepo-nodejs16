/**
 * Dynamic Components
 * https://v2.ko.vuejs.org/v2/guide/components-dynamic-async.html
 */
import ComponentTest1 from './component1';
import ComponentTest2 from './component2';

/**
 * <component> 엘리먼트를 사용하여
 * 여러 컴포넌트 간에 동적으로 트랜지션하고
 * is 속성에 동적으로 바인드 할 수 있습니다.
 */
/*
<component v-bind:is="currentView">
	<!-- vm.currentView가 변경되면 컴포넌트가 변경됩니다! -->
</component>
var vm = new Vue({
	el: '#example',
	data: {
		currentView: 'home'
	},
	components: {
		home: {  },
		posts: {  },
		archive: {  }
	}
})
*/

// 원하는 경우 컴포넌트 객체에 직접 바인딩 할 수도 있습니다.
/*
var Home = {
	template: '<p>Welcome home!</p>'
}

var vm = new Vue({
	el: '#example',
	data: {
		currentView: Home
	}
})
*/

/**
 * keep-alive
 * 트랜지션된 컴포넌트를 메모리에 유지하여
 * 상태를 보존하거나 다시 렌더링하지 않도록하려면
 * 동적 컴포넌트를 <keep-alive> 엘리먼트에 래핑 할 수 있습니다.
 */
/*
<keep-alive>
	<component :is="currentView">
		<!-- 비활성화 된 컴포넌트는 캐시 됩니다! -->
	</component>
</keep-alive>

<keep-alive>
	<component v-bind:is="currentTabComponent"></component>
</keep-alive>
*/

export default {
  template: `
		<div>
			<button @click="cycle">컴포넌트 순환하기</button>
			<component :is="currentView" />
		</div>
	`,
  data() {
    return {
      currentView: ComponentTest1,
    };
  },
  methods: {
    // 동적 컴포넌트 테스트 (dynamic-components)
    cycle() {
      if (this.currentView === ComponentTest1) {
        this.currentView = ComponentTest2;
      } else {
        this.currentView = ComponentTest1;
      }
    },
  },
};
