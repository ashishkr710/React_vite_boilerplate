import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs to use the relativeTime plugin
dayjs.extend(relativeTime);

interface Props {
  timestamp: Date | string;
}

const TimeAgo = ({ timestamp }: Props) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    // Function to update the time ago text
    const updateTimeAgo = () => {
      setTimeAgo(dayjs(timestamp).fromNow());
    };

    // Update the time ago text initially
    updateTimeAgo();

    // Set up an interval to update every minute
    const intervalId = setInterval(updateTimeAgo, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
