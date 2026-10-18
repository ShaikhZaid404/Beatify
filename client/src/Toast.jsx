import React, { useEffect, useState } from "react";

let toastSubscriber = null;

export function notify(message, type = "info") {
  if (toastSubscriber) {
    toastSubscriber(message, type);
  } else {
    console.log(`[Toast ${type}]`, message);
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastSubscriber = (message, type) => {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-3), { id, message, type }]); // Keep at most 4 toasts

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };

    return () => {
      toastSubscriber = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 84,
        right: 20,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 360,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => {
        const isError = t.type === "error";
        const isSuccess = t.type === "success";

        return (
          <div
            key={t.id}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: "rgba(16, 16, 16, 0.94)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${isError ? "#ef4444" : isSuccess ? "#22c55e" : "rgba(255, 255, 255, 0.14)"}`,
              borderRadius: 8,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.55)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              animation: "toastSlideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                flexShrink: 0,
                background: isError ? "#ef4444" : isSuccess ? "#22c55e" : "#38bdf8",
                boxShadow: `0 0 8px ${isError ? "#ef4444" : isSuccess ? "#22c55e" : "#38bdf8"}`,
              }}
            />
            <div style={{ flex: 1, lineHeight: 1.4, wordBreak: "break-word" }}>{t.message}</div>
            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
                padding: "2px 4px",
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
