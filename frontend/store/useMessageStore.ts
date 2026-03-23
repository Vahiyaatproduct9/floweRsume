import { create } from "zustand";

export type MessageType = "info" | "warning" | "error" | "success";

interface MessageState {
  message: string | null;
  type: MessageType;
  setMessage: (message: string | null) => void;
  setType: (type: MessageType) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  message: null,
  type: "info",
  setMessage: (message) => set({ message }),
  setType: (type) => set({ type }),
}));
