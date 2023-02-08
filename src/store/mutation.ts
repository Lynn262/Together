import { RootState } from "./rootType";

const COLLAPSE = "COLLAPSE";

export const mutations = {
  [COLLAPSE](state: RootState, payload: boolean) {
    //true:收缩侧边栏
    //false:展开侧边栏
    state.asideWidth = payload ? 60 : 200;
  },
};
