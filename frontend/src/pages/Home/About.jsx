import Footer from "../../components/Home/Footer";


function About() {
  return (
    <div className="block w-full min-h-screen px-4 py-20 mt-8 bg-transparent text-[var(--text-color)]">
      <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-transparent rounded-xl shadow-xl space-y-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#63b2b5] ">About This Blog</h1>

        {/* Mission */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#5f9ea0] ">Our Mission</h2>
          <p className="leading-relaxed">
            Our mission is to deliver honest, insightful, and thought-provoking content
            about politics, society, and real-life events. We believe in the power of
            awareness and independent thinking to make a better world.
          </p>
        </section>

        {/* What We Cover */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#5f9ea0] ">What We Cover</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Local and international political analysis</li>
            <li>Social issues and community challenges</li>
            <li>Life experiences and personal perspectives</li>
            <li>Commentary on current events and news</li>
          </ul>
        </section>

        {/* Author */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#5f9ea0] ">Meet the Author – Ali</h2>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src="https://i.pinimg.com/564x/92/78/cc/9278cc5f8956fe47c03174a9e544cd6e.jpg"
              alt="Author Ali"
              className="w-24 h-24 rounded-full object-cover border border-gray-600"
            />
            <div>
              <p>
                Hi, I’m <strong>Ali</strong>, the founder of this blog. I’m passionate about
                political analysis, truth-telling, and independent journalism. I started this
                blog to share the untold stories that matter.
              </p>
              <p className="mt-2">
                I believe in the power of words to shape ideas and open minds.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#5f9ea0]">Stay Connected</h2>
          <p>
            Thank you for reading! If you support thoughtful discussion and real news,
            consider sharing this blog or contacting us directly.
          </p>
        </section>

      </div>
      <Footer />
    </div>
  );
}

export default About;
