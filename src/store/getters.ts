import { useWindowSize } from "@vueuse/core";
import { RootState } from "./rootType";
import { GetterTree } from "vuex";

export const getters: GetterTree<RootState, RootState> = {
  deviceType():string {
    if(useWindowSize().width.value < 768){
      return 'mobile'
    }else{
      return 'desktop'
    }
  }
}