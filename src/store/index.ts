import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { rootState } from "./state";
import { RootState } from "./rootType";
import { mutations } from "./mutation";
import { getters } from "./getters";
// 解构赋值

export const key: InjectionKey<Store<RootState>> = Symbol("state");

export const store = createStore({
	state: rootState,
	mutations: mutations,
	getters: getters,
});

export function useStore() {
  return baseUseStore(key);
}
