import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

const ServiceCard = ({ title, description, image, delay = 0 }: ServiceCardProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card shadow-md card-hover animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
        <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-primary-foreground/80 text-sm mb-4">{description}</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-rose-light hover:text-white transition-colors"
        >
          View Prices
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
