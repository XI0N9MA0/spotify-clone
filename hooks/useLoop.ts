import {create} from "zustand";

interface LoopStore{
  isLoop: boolean;
  setIsLoop: () => void;
};

const useLoop = create<LoopStore>((set)=>({
  isLoop: false,
  setIsLoop: () => set((state) => ({ isLoop: !state.isLoop }))
}))

export default useLoop