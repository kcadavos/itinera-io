import { IActivityData } from "@/lib/Interfaces";
import { GetActivityDetailsByActivityId } from "@/lib/services/ItineraryServices";
import { getToken } from "@/lib/services/DataServices";
import React, { useEffect, useState } from "react";

type ActivityDetailsProps = {
  activityId: number;
  index: number;
  iListLength: number;
};

const ItineraryActivityDetailsComponent = ({
  activityId,
  index,
  iListLength,
}: ActivityDetailsProps) => {
  const [activityDetail, setActivityDetail] = useState<IActivityData>();

  useEffect(() => {
    const getItineraryDayData = async () => {
      const activityDetailData = await GetActivityDetailsByActivityId(
        activityId,
        getToken()
      );
      if (activityDetailData != null) setActivityDetail(activityDetailData);
    };
    getItineraryDayData();
  }, [activityId]);

  

  const IconSwitch = (category: string) => {
    switch (category) {
      case "Adventure & Outdoors":
        return "/assets/Icons/Orion_beach.svg";
      case "Culture & History":
        return "/assets/Icons/Orion_binocular.svg";
      case "Food & Drink":
        return "/assets/Icons/Orion_restaurant.svg";
      case "Relaxation & Wellness":
        return "/assets/Icons/Orion_sun-lounger.svg";
      case "Entertainment & Nightlife":
        return "/assets/Icons/Orion_camping.svg";
      default:
        return "/assets/Icons/Orion_camera.svg";
    }
  };

  const TextColorSwitch = (category: string) => {
    switch (category) {
      case "Adventure & Outdoors":
        return "text-[#1A89BC]";
      case "Culture & History":
        return "text-[#4AAAE2]";
      case "Food & Drink":
        return "text-[#F4B400]";
      case "Relaxation & Wellness":
        return "text-[#E67E22]";
      case "Entertainment & Nightlife":
        return "text-[#4A90E2]";
      default:
        return "text-teal-400";
    }
  };
  const BackgroundColorSwitch = (category: string) => {
    switch (category) {
      case "Adventure & Outdoors":
        return "bg-[#1A89BC]";
      case "Culture & History":
        return "bg-[#4AAAE2]";
      case "Food & Drink":
        return "bg-[#F4B400]";
      case "Relaxation & Wellness":
        return "bg-[#E67E22]";
      case "Entertainment & Nightlife":
        return "bg-[#4A90E2]";
      default:
        return "bg-teal-400";
    }
  };

  return (
    <div className="">
      {activityDetail != null ? (
        <div className=" flex justify-between ">
          {" "}
          {/*main div */}
          {/*left column for icons and black line */}
          <div>
            {/*icon generator*/}
            <div
              className={` ${BackgroundColorSwitch(
                activityDetail.category
              )} rounded-full w-18 h-18 p-3 border-2 border-black`}
            >
              <img
                src={IconSwitch(activityDetail.category)}
                className="object-cover "
                alt="Activity Type Icon"
              />
            </div>
            {!(index === iListLength - 1) && (
              <div className="ms-9 w-0.75 h-full bg-black"></div>
            )}
          </div>
          {/*left column for icons and black line */}
          <div className="text-right">
            <p
              className={`ps-5 text-2xl font-semibold ${TextColorSwitch(
                activityDetail.category
              )} `}
            >
              {" "}
              {activityDetail.activity}
            </p>

            <p
              className={`ps-5 text-xl ${TextColorSwitch(
                activityDetail.category
              )}`}
            >
              {activityDetail.address}
            </p>
            <p
              className={`ps-5 text-medium ${TextColorSwitch(
                activityDetail.category
              )}`}
            >
              {activityDetail.details}
            </p>
          </div>
          {/*end of activity detail*/}
        </div>
      ) : (
        <p> Missing activity detail Info</p>
      )}
    </div>
  );
};

export default ItineraryActivityDetailsComponent;
