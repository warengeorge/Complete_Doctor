import Hero from './components/Hero';
import PitchResources from './components/PitchResources';
import UpcomingEvents from './components/UpcomingEvents';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <PitchResources />
      <UpcomingEvents />
    </main>
  );
}