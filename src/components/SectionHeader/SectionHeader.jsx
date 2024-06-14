import PropTypes from "prop-types";

const SectionHeader = ({ title, desc }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-[3rem] sm:text-[3.45rem] lg:text-5xl font-bold mt-4">{title}</h1>
      {desc && <p className="sm:max-w-[25rem] mx-auto text-gray-500 mt-2">{desc}</p>}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default SectionHeader;
