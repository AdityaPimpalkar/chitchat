import React from "react";

const ChatHeader = ({ user }) => {
  let status = "Offline";
  if (user.lastSeen) {
    status = formatDate(user.lastSeen);
  }

  function formatDate(dateVal) {
    let lastSeenDate = new Date(dateVal);
    let today = new Date();

    let sMonth = padValue(lastSeenDate.getMonth() + 1);
    let sDay = padValue(lastSeenDate.getDate());
    let sYear = lastSeenDate.getFullYear();
    let sHour = lastSeenDate.getHours();
    let sMinute = padValue(lastSeenDate.getMinutes());
    let sAMPM = "AM";

    let iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
    } else if (iHourCheck === 0) {
      sHour = "12";
    }

    sHour = padValue(sHour);

    if (lastSeenDate.getFullYear() === today.getFullYear()) {
      if (sDay === padValue(today.getDate())) {
        return `Last seen today at ${sHour}:${sMinute}${sAMPM}`;
      }
      if (sDay === padValue(today.getDate() - 1)) {
        return `Last seen yesterday at ${sHour}:${sMinute}${sAMPM}`;
      }
    }
    return (
      "Last seen " +
      sDay +
      "/" +
      sMonth +
      "/" +
      sYear +
      " at " +
      sHour +
      ":" +
      sMinute +
      " " +
      sAMPM
    );
  }

  function padValue(value) {
    return value < 10 ? "0" + value : value;
  }

  return (
    <div className="flex">
      <div className="flex flex-row justify-start items-center text-left w-full bg-purple-900 lg:h-12 xl:h-16 2xl:h-20">
        <img
          className="border-2 rounded-full mx-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
          src={user.image}
          alt="user"
        />
        <div className="flex flex-col">
          <div className="lg:text-sm xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
            {user.username}
          </div>
          <div className="w-full flex flex-row items-center lg:mt-auto xl:mt-0">
            <span
              className={
                user.connected
                  ? "lg:h-2 lg:w-2 rounded-full bg-green-400 lg:mr-1 2xl:h-3 2xl:w-3"
                  : "lg:h-2 lg:w-2 rounded-full bg-red-700 lg:mr-1 2xl:h-3 2xl:w-3"
              }
            ></span>
            <span className="italic lg:text-xs xl:text-sm 2xl:text-base">
              {user.connected ? "online" : status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
