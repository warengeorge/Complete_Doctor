import ArchiveSearch from './components/ArchiveSearch';
import Hero from './components/Hero';
import Offerings from './components/Offerings';
import PitchResources from './components/PitchResources';
import UpcomingEvents from './components/UpcomingEvents';
// import Profile from './components/Profile';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactUs from './components/ContactUs';

export default function Home() {
  return (
    <main className=''>
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
