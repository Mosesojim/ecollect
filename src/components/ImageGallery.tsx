import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ImageGallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800",
      alt: "Community park cleanup",
      className: "md:col-span-2 md:row-span-2",
      caption: "Community Cleanups",
    },
    {
      src: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=600",
      alt: "Hands sorting recyclables",
      className: "md:col-span-1 md:row-span-1",
      caption: "Smart Sorting",
    },
    {
      src: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=600",
      alt: "Recycling facility",
      className: "md:col-span-1 md:row-span-1",
      caption: "Eco Processing",
    },
    {
      src: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800",
      alt: "Volunteers picking up plastic",
      className: "md:col-span-2 md:row-span-1",
      caption: "Youth Initiatives",
    },
    {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
      alt: "Recycling bins",
      className: "md:col-span-1 md:row-span-1",
      caption: "Scheduled Collections",
    },
    {
      src: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&q=80&w=600",
      alt: "Plastic bottles sorting",
      className: "md:col-span-1 md:row-span-1",
      caption: "Plastic Recovery",
    },
  ];

  return (
    <section className="py-12 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Impact in Action
          </h2>
          <p className="text-current opacity-80 text-lg leading-relaxed">
            See how our dedicated teams and community members are working
            together every day to clean our neighborhoods, sort recyclables, and
            build a sustainable future.
          </p>
        </div>
        <Link
          to="/services"
          className="group flex items-center gap-2 text-[#8CC63F] font-bold hover:text-brand-text transition-colors whitespace-nowrap"
        >
          Join Our Mission
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`relative group overflow-hidden rounded-xl bg-brand-primary ${image.className}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
              <h3 className="text-white font-bold text-xl drop-shadow-md">
                {image.caption}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
