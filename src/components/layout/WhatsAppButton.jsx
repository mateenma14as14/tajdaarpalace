import { MessageCircle } from "lucide-react";
import { SITE } from "../../data/site";

/** Persistent quick-contact button, bottom right. */
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-white shadow-soft-lg transition-all duration-300 ease-soft hover:w-auto hover:gap-2 hover:bg-rose-600 hover:px-6 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-6 w-6 shrink-0" strokeWidth={1.5} />
      <span className="hidden whitespace-nowrap text-xs uppercase tracking-[0.14em] group-hover:inline">
        Chat with us
      </span>
    </a>
  );
}
