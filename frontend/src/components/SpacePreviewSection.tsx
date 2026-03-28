export default function SpacePreviewSection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      alt: "Open Workspace Environment",
      label: "Open Workspace",
    },
    {
      src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fG9mZmljZSUyMHNwYWNlfGVufDB8fDB8fHww",
      alt: "Modern Private Office",
      label: "Private Offices",
    },
    {
      src: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3",
      alt: "Fully Equipped Meeting Room",
      label: "Meeting Rooms",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Take a look inside</h2>
            <p className="mt-4 text-xl text-secondary">
              Designed for productivity, collaboration, and inspiration. Experience a premium workspace environment.
            </p>
          </div>
          <button className="mt-8 md:mt-0 text-primary hover:text-foreground font-semibold transition-colors flex items-center">
            View full gallery
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-secondary/20 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-primary/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xl font-bold text-background tracking-wide">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
