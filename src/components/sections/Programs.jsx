export default function Programs() {
  const programs = [
    {
      title: "Strength Training",
      subtitle: "Build Power",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    },
    {
      title: "Fat Loss",
      subtitle: "Burn Calories",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    },
    {
      title: "Muscle Gain",
      subtitle: "Get Bigger",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    },
    {
      title: "Home Workout",
      subtitle: "No Gym Needed",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712",
    },
  ];

  return (
    <section
      id="programs"
      className="bg-[#020202] py-32 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Heading */}
        <div className="mb-24 text-center">
          <p className="text-sm uppercase tracking-[6px] text-gray-500">
            PROGRAMS
          </p>

          <h2 className="mt-5 text-6xl font-black text-white">
            Choose Your
            <br />
            Training Style
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
            Every body is different. Pick a program that matches your
            goals and let AI guide your transformation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group relative h-[500px] cursor-pointer overflow-hidden rounded-[32px] border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
            >
              <img
                src={program.image}
                alt={program.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-10 left-10">
                <p className="text-sm uppercase tracking-[4px] text-gray-300">
                  {program.subtitle}
                </p>

                <h3 className="mt-3 text-5xl font-black text-white transition-transform duration-500 group-hover:translate-x-2">
                  {program.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}