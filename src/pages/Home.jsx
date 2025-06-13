import Hero from "../components/Hero";
import DashboardLayout from "../pages/DashboardLayout";
import useAuth from "../hooks/useAuth";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

function Home() {
  const { isloggedin } = useAuth();

  return isloggedin ? (
    <DashboardLayout />
  ) : (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  );
}

export default Home;
