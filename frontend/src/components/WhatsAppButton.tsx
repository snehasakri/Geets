import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917822991920?text=Hi, I'd like to book an appointment at GEET'S Beauty Salon"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
      aria-label="Book on WhatsApp"
    >
      <MessageCircle size={24} fill="white" />
      <span className="hidden sm:inline font-medium">Book Now</span>
    </a>
  );
};

export default WhatsAppButton;
