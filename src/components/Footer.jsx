function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      <p className="text-sm sm:text-base">
        &copy; {year}{" "}
        <span className="font-semibold text-blue-400">RotaFlow</span>. All
        rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
