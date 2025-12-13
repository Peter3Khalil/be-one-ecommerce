import Hero from '@components/hero';
import NewArrivals from '@components/new-arrivals';
import TopSelling from '@components/top-selling';

const Home = () => {
  return (
    <div>
      <Hero />
      <NewArrivals />
      <TopSelling />
    </div>
  );
};

export default Home;
