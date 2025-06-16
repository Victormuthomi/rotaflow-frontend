// src/components/Spinner.jsx
import { ImSpinner9 } from "react-icons/im";

const Spinner = ({ size = 24 }) => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner9 className="animate-spin text-blue-500" size={size} />
    </div>
  );
};

export default Spinner;
