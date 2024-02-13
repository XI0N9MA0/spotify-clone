import {create} from "zustand";

interface RightSideBarStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useRightSidebar = create<RightSideBarStore>((set)=>({
    isOpen: false,
    onOpen: ()=>set({isOpen:true}),
    onClose: ()=>set({isOpen:false}),
}))

export default useRightSidebar;