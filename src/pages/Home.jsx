import Hero from "../components/Hero";
import DashboardLayout from "./DashboardLayout";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <DashboardLayout />
  ) : (
    <>
      <Hero />
    </>
  );
}

export default Home;
