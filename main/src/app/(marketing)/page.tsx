import Hero from "@/components/shared/Hero";

import PitchResources from "@/components/features/resources/PitchResources";
import UpcomingEvents from "@/components/features/events/UpcomingEvents";
import Offerings from "@/components/features/resources/Offerings";
import Testimonials from "@/components/features/resources/Testimonials";
import FAQ from "@/components/features/events/FAQ";
import ContactUs from "@/components/features/events/ContactUs";
import ArchiveSearch from "@/components/features/resources/ArchiveSearch";

// import Profile from './components/Profile';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <PitchResources />
      <UpcomingEvents />
      <Offerings />
      <ArchiveSearch />
      {/* <Profile /> */}
      <Testimonials />
      <FAQ />
      <ContactUs />
    </main>
  );
}
