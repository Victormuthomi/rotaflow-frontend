function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      <p>&copy; {year} Rotaflow. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
