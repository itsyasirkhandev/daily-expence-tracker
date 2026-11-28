"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MAX_MESSAGE_LENGTH = 500;
const controlClass =
  "min-h-11 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:active:translate-y-0";

type Message = { id: number; text: string };

export function Guestbook() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [invalid, setInvalid] = useState(false);
  const [status, setStatus] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  function addMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = text.trim();
    if (!body) {
      setInvalid(true);
      input.current?.focus();
      return;
    }

    const message = { id: nextId.current++, text: body };
    setMessages((current) => [message, ...current]);
    setText("");
    setStatus(`Message ${message.id} added to this tab.`);
    input.current?.focus();
  }

  function removeMessage(id: number) {
    setMessages((current) => current.filter((message) => message.id !== id));
    setStatus(`Message ${id} deleted.`);
    input.current?.focus();
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription id="guestbook-note" className="max-w-prose">
          Messages stay in this tab and disappear when you reload. Use sample text, not personal or
          financial information.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={addMessage} autoComplete="off" noValidate>
          <label htmlFor="guestbook-text" className="mb-1 block font-medium">
            Message
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            {/* No name: the browser cannot submit the text even before hydration. */}
            <Input
              ref={input}
              id="guestbook-text"
              className={`${controlClass} min-w-0 border-muted-foreground`}
              aria-describedby={invalid ? "guestbook-note guestbook-error" : "guestbook-note"}
              aria-invalid={invalid || undefined}
              maxLength={MAX_MESSAGE_LENGTH}
              required
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setInvalid(false);
              }}
            />
            <Button type="submit" className={controlClass}>
              Add message
            </Button>
          </div>
          <div role="alert">
            {invalid ? (
              <p id="guestbook-error" className="mt-2 font-medium">
                Enter a message that isn’t blank.
              </p>
            ) : null}
          </div>
        </form>
        <p role="status" className="sr-only">
          {status}
        </p>
        {messages.length === 0 ? (
          <p className="text-muted-foreground">No messages yet.</p>
        ) : (
          <ul className="divide-y">
            {messages.map((message) => (
              <li key={message.id} className="flex items-start gap-3 py-2">
                <p className="min-w-0 flex-1 pt-2 [overflow-wrap:anywhere]">{message.text}</p>
                <Button
                  type="button"
                  variant="outline"
                  className={controlClass}
                  onClick={() => removeMessage(message.id)}
                >
                  Delete<span className="sr-only"> message {message.id}</span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
