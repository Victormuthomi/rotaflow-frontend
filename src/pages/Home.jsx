import Hero from "../components/Hero";
import Dashboard from "./Dashboard";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <>
      <Hero />
    </>
  );
}

export default Home;
