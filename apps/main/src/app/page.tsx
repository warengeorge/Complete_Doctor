import ArchiveSearch from './components/ArchiveSearch';
import Hero from './components/Hero';
import Offerings from './components/Offerings';
import PitchResources from './components/PitchResources';
import UpcomingEvents from './components/UpcomingEvents';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <PitchResources />
      <UpcomingEvents />
      <Offerings />
      <ArchiveSearch />
    </main>
  );
}