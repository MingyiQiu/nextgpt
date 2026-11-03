"use client";

import { useChatStore } from "@/store/useChatStore";
import Logo from "../sidebar/Logo";
import { dummyMessages } from "@/constants/dummyMessages";
import Image from "next/image";
import { useState } from "react";
import TypingIndicator from "../loading/TypingIndicator";
import { FaArrowUp } from "react-icons/fa";

export default function ChatBox() {
  const { selectedChat } = useChatStore();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">
        {!selectedChat ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Logo />
            <h2 className="mt-6 text-2xl font-bold md:text-4xl text-white/90">
              Welcome to NextGPT
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted md:text-base">
              Generate text and images with AI
            </p>
          </div>
        ) : (
          <div className="mx-auto flex flex-col gap-4 md:gap-6">
            {dummyMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-primary" : "border border-border bg-card"}`}
                >
                  {message.content && (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}

                  {message.image && (
                    <Image
                      src={message.image}
                      alt="Generated Image"
                      width={1024}
                      height={1024}
                      className="mt-3 w-full rounded-2xl border border-white/10 object-cover"
                    />
                  )}
                </div>
              </div>
            ))}

            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* input */}
      <form className="mx-auto w-full max-w-4xl">
        <div className="flex items-end gap-2 rounded-full border border-border bg-card p-2 md:gap-3">
          <textarea
            rows={1}
            placeholder="Ask NextGPT anything..."
            className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
          />
          <button className="rounded-full bg-primary p-3 text-sm font-medium transition hover:opacity-90 cursor-pointer">
            <FaArrowUp size={18} />
          </button>
        </div>
      </form>
    </>
  );
}
