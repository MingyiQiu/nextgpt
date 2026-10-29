import { create } from "zustand";

export interface Chat {
  id: string;
  title: string;
}

interface ChatStore {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: null,

  setSelectedChat: (chat) =>
    set({
      selectedChat: chat,
    }),
}));
