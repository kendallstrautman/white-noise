import React from "react";
import appInfo from "../../config/app_info";
import PropTypes from "prop-types";

const Info = props => {
  return (
    <section
      className={`info ${
        props.visibleTab == "info" ? "--isActive" : "--isHidden"
      }`}
    >
      <p>{appInfo.description}</p>
    </section>
  );
};

Info.propTypes = {
  visibleTab: PropTypes.string.isRequired
};

export default Info;
