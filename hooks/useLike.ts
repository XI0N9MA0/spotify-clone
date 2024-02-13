import {create} from "zustand";

interface LikeStore{
    isLiked: boolean;
    setIsLiked: (state: boolean) => void;
};

const useLike = create<LikeStore>((set)=>({
    isLiked: false,
    setIsLiked: (state)=>set({isLiked: state})
}))

export default useLike;