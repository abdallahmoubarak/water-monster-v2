import { userTypes } from "@/hooks/hookTypes";
import { styles } from "@/utils/styles";
import { timeChanger } from "@/utils/time";
import { useEffect, useRef } from "react";

export default function Message({ message, currentUser }: messageProps) {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef!.current!.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={scrollRef}
        className={`bubble first ${
          message?.from?.id === currentUser?.id ? "me" : "other"
        }`}>
        <div className="content">{message?.content}</div>
        <div className="time">{timeChanger(message?.createdAt)}</div>
      </div>
      <style jsx>{`
        .bubble {
          ${styles.borderRadius1rem};
          ${styles.borderRadius1rem};
          padding: 0.4rem 1rem;
          max-width: 60%;
          overflow-wrap: break-word;
          -webkit-hyphens: manual;
          -ms-hyphens: manual;
          hyphens: manual;
          position: relative;
          border: 1px solid lightgray;
          ${styles.userSelect};
        }
        .content {
          padding-bottom: 0.2rem;
        }
        .other {
          align-self: flex-start;
          background: #e4f0f5;
          background: white;
          border-top-left-radius: 0.1em;
        }
        .me {
          align-self: flex-end;
          background: #e4f0f5;
          background: #f6f8fa;
          background: #f5ffe4;
          border-top-right-radius: 0.1em;
        }

        .time {
          font-size: 0.7rem;
          color: ${styles.primaryColor};
          text-align: right;
        }
      `}</style>
    </>
  );
}

type messageProps = {
  message: { content: string; createdAt: Date; from: { id: string } };
  currentUser?: userTypes;
};
