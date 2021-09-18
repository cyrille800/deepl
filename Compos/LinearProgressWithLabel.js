import { Box, LinearProgress, Typography } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

function LinearProgressWithLabel(props) {
  return (
    <>
      <Box
        className={[
          "flex flex-col w-full",
          props.value === 0 || props.value >= 100 || props.value === -1
            ? "hidden"
            : "",
        ].join(" ")}
        sx={{ alignItems: "center" }}
      >
        <Box className="w-full" sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Box>
        <Box sx={{ alignItems: "center" }}>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              Wait ... {props.text}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  
export default LinearProgressWithLabel;
