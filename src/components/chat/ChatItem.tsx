import { Chat } from "@/store/useChatStore";
import { FiTrash2 } from "react-icons/fi";

interface ChatItemProps {
  chat: Chat;
  isExpanded: boolean;
  isSelected: boolean;
  onClick: () => void;
}
export default function ChatItem({
  chat,
  isExpanded,
  isSelected,
  onClick,
}: ChatItemProps) {
  return (
    <div
      className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 transition cursor-pointer ${isSelected ? "bg-card" : "hover:bg-card/60"}`}
    >
      <button className="flex flex-1 items-center min-w-0">
        {isExpanded && <span className="truncate text-sm">{chat.title}</span>}
      </button>

      {isExpanded && (
        <button className="rounded-lg p-1 opacity-0 transition hover:bg-background group-hover:opacity-100 cursor-pointer">
          <FiTrash2 className="text-muted" size={14} />
        </button>
      )}
    </div>
  );
}
