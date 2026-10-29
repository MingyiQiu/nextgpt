"use client";

import { useChatStore } from "@/store/useChatStore";
import { useSidebarStore } from "@/store/useSlidebarStore";
import { FiPlus, FiSearch, FiSidebar, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useState } from "react";

export default function Sidebar() {
  const { openMobile, closeMobile, isExpanded, isMobileOpen, toggleExpanded } =
    useSidebarStore();
  const { selectedChat, setSelectedChat } = useChatStore();
  const [search, setSearch] = useState("");
  return (
    <>
      {/* mobile menu button */}
      <button className="fixed left-4 top-4 z-50 rounded-lg bg-card p-2 md:hidden">
        <FiSidebar size={20} />
      </button>

      {/* overlay */}
      {isMobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-linear-to-b from-[#242124]/30 to-[#000000]/30 backdrop-blur-3xl transition-all duration-300 ${isExpanded ? "md:w-72" : "md:w-20"} ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* header */}
        <div
          className={`flex items-center p-5 ${isExpanded ? "justify-between" : "flex-col gap-4"}`}
        >
          {isExpanded ? (
            <Logo />
          ) : (
            <div className="mx-auto">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-violet-600 to-blue-500 font-bold text-white">
                N
              </div>
            </div>
          )}

          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                closeMobile();
              } else {
                toggleExpanded();
              }
            }}
            className="rounded-lg p-2 hover:bg-card"
          >
            {isMobileOpen ? <FiX size={20} /> : <FiSidebar size={20} />}
          </button>
        </div>

        {/* new chat */}
        <div className="px-3">
          <button
            className={`flex w-full items-center rounded-xl bg-primary px-4 py-3 text-white transition hover:opacity-90 ${!isExpanded && "justify-center"}`}
          >
            <FiPlus size={18} />
            {isExpanded && (
              <span className="ml-2 text-sm font-medium">New Chat</span>
            )}
          </button>
        </div>

        {/* search */}
        {isExpanded && (
          <div className="px-3 mt-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 outline-none focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
