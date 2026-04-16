import Layout from "@/components/Layout";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-custom px-4 text-center">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Book your appointment or visit us at our salon
            in Karve Nagar, Pune.
          </p>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="section-padding">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="animate-fade-up">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                Visit Our Salon
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-accent">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      Sudarshan Apartment,<br />
                      Shahid Mitra Mandal Chowk,<br />
                      Karve Nagar, Pune, India - 411052
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-accent">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+917822991920"
                      className="text-primary hover:underline"
                    >
                      +9178229 91920
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-accent">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:"
                      className="text-primary hover:underline"
                    >
                      geetsbeautysalonspa@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-accent">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Working Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Sunday: 10:00 AM - 9:00 PM<br />
                      
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-primary rounded-2xl text-center">
                <MessageCircle className="mx-auto text-primary-foreground mb-3" size={32} />
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                  Quick Booking on WhatsApp
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Send us a message for instant appointment booking
                </p>
                <a
                  href="https://wa.me/917822991920?text=Hi, I'd like to book an appointment at GEET'S Beauty Salon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="animate-fade-up delay-200">
              <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7159559694!2d73.81739!3d18.4970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfb0c8a9a1d1%3A0x8a3c2f2e2e2e2e2e!2sKarve%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GEET'S Beauty Salon Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Do I need to book an appointment?",
                a: "While walk-ins are welcome, we recommend booking an appointment via WhatsApp to avoid waiting times, especially for bridal and spa services.",
              },
              {
                q: "Is parking available?",
                a: "Yes, there is street parking available near Sudarshan Apartment. We can also guide you to the nearest parking area.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept cash, UPI, and all major cards. Digital payments via Google Pay, PhonePe, and Paytm are also accepted.",
              },
              {
                q: "Is this salon only for women?",
                a: "Yes, GEET'S Beauty Salon is exclusively for women, providing a comfortable and private environment for all our clients.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
