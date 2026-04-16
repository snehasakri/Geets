import { useState, useEffect } from "react"; // ✅ added useEffect
import { useNavigate } from "react-router-dom"; // ✅ added
const API = import.meta.env.VITE_API_URL;
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Layout from "@/components/Layout";

const services = {
  "💇 Hair Services": [
    "Hair Wash",
    "Any Hair Cut",
    "Hair Setting",
    "Hair Spa (Normal)",
    "Hair Spa (With Ampoule)",
    "Hair Spa (Anti-Dandruff)",
    "Hair Colour",
    "Ironing",
    "Tong",
    "Crimping",
    "Hair Style",
  ],

  "💆 Facial & Clean-Up": [
    "Fruits Facial",
    "VLCC Facial",
    "Rich Feel Facial",
    "Wine Facial",
    "Lotus Facial",
    "Cheryl’s Facial",
    "O3 Facial",
    "Fruits Clean Up",
    "VLCC Clean Up",
    "Rich Feel Clean Up",
    "Wine Clean Up",
    "Lotus Clean Up",
    "Cheryl’s Clean Up",
    "O3 Clean Up",
  ],

  "✨ D-Tan & Bleach": [
    "Face D-Tan",
    "Neck D-Tan",
    "1/2 Leg D-Tan",
    "1/2 Hand D-Tan",
    "Only Foot D-Tan",
    "Underarms D-Tan",
    "Back D-Tan",
    "Face Bleach",
    "Neck Bleach",
    "1/2 Leg Bleach",
    "Full Hand Bleach",
    "Only Foot Bleach",
  ],

  "🧖 Waxing": [
    "Full Hand Wax",
    "1/2 Leg Wax",
    "B Wax",
  ],

  "💅 Manicure & Pedicure": [
    "Basic Manicure",
    "Spa Manicure",
    "Manicure",
    "Basic Pedicure",
    "Spa Pedicure",
    "Pedicure",
  ],

  "💆 Massage & Body": [
    "Foot Massage",
    "1/2 Leg Massage",
    "Full Hand Massage",
    "Back Massage",
    "Head Massage",
    "Body Massage",
    "Body Polish",
  ],

  "💄 Makeup & Styling": [
    "Bridal Makeup (HD)",
    "Bridal Makeup (Airbrush)",
    "Party Makeup",
    "Makeup (Basic)",
    "Saree Draping",
  ],
};

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
];

const BookAppointment = () => {
  const navigate = useNavigate(); // ✅ added

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // ✅ OPTIONAL: redirect if not logged in (page-level protection)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ LOGIN CHECK (IMPORTANT)
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login first to book appointment");
      navigate("/login");
      return;
    }

    if (!name || !phone || !service || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ FIX: convert to LOCAL DATE (NO UTC SHIFT)
      const localDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      

      const res = await fetch(`${API}/add-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          date: localDate,
          time,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      if (data.success) {
        setIsBooked(true);
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <Layout>
        <div className="text-center py-20">
          <CheckCircle className="mx-auto text-green-600" size={50} />
          <h2 className="text-3xl font-bold mt-4">Booking Confirmed!</h2>
          <p className="mt-2">Thank you, {name}</p>
          <p>{service}</p>
          <p>{date && format(date, "PPP")} at {time}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Book Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Select onValueChange={setService}>
            <SelectTrigger>
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(services).map(([category, items]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-sm font-semibold text-gray-500">
                    {category}
                  </div>

                  {items.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {date ? format(date, "PPP") : "Pick Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>

          <Select onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default BookAppointment;