import { CalendarClock } from "lucide-react";
import { BOOKING_URL } from "@/lib/booking";

/** "Book a 15-min call" — renders nothing until BOOKING_URL is set in lib/booking.ts. */
const BookCallButton = ({ className = "" }: { className?: string }) => {
  if (!BOOKING_URL) return null;
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={`btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold ${className}`}
    >
      <CalendarClock className="w-5 h-5" />
      Book a 15-min call
    </a>
  );
};

export default BookCallButton;
