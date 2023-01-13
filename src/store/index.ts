import {createStore , Store} from 'vuex';
// 解构赋值
import {useWindowSize,UseWindowSizeReturn} from '@vueuse/core';

export interface State{
  windowSize:UseWindowSizeReturn
}


export const store = createStore<State>({
  state(){
    return {
      windowSize:useWindowSize()
    }
  },
  mutations:{
    
  },
  getters:{
  }
})