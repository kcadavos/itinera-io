"use client";

import {
  useSelectedTripDestinationContext,
  useSelectedTripEndDateContext,
  useSelectedTripIdContext,
  useSelectedTripIsVotingOpenContext,
  useSelectedTripOwnerIdContext,
  useSelectedTripParticipantsIdListContext,
  useSelectedTripStartDateContext,
  useUserIdContext,
} from "@/context/DataContext";
import { getToken } from "@/lib/services/DataServices";
import {
  AddTripReturnTripId,
  EditTrip,
  GetParticipantEmail,
  GetParticipantsId,
} from "@/lib/services/TripDataService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { AddGroupNotification } from "@/lib/services/NotificationService";
import { NotificationTypeEnum } from "@/lib/NotificationInterfaces";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const AddTripComponent = () => {
  const isMobile = useIsMobile(); // uses default 1024px breakpoint
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const { selectedTripId, setSelectedTripId } = useSelectedTripIdContext();
  const { selectedTripDestination } = useSelectedTripDestinationContext();
  const { selectedTripStartDate } = useSelectedTripStartDateContext();
  const { selectedTripEndDate } = useSelectedTripEndDateContext();
  const { selectedParticipantsIdList } =
    useSelectedTripParticipantsIdListContext();
  const { selectedTripOwnerId } = useSelectedTripOwnerIdContext();
  const { selectedTripIsVotingOpen } = useSelectedTripIsVotingOpenContext();

  const { userId } = useUserIdContext();
  const [tripId, setTripId] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [participantsEmailList, setParticipantsEmailList] =
    useState<string>("");
  const [, setParticipantIds] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);
  const [
    startDateGreaterThanEndDateError,
    setStartDateGreaterThanEndDateError,
  ] = useState<boolean>(false);
  const [startDateNotInFutureError, setStartDateNotInFutureError] =
    useState<boolean>(false);
  const [endDateNotInFutureError, setEndDateNotInFutureError] =
    useState<boolean>(false);
  const [notFoundEmails, setNotFoundEmails] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "add") {
      setTripId(0);
      setDestination("");
      setStartDate(null);
      setEndDate(null);
      setParticipantIds([]);
      setParticipantsEmailList("");
      setIsDisabled(false);
    } else {
      setTripId(selectedTripId);
      setDestination(selectedTripDestination);
      const parsedStartDate = parse(
        selectedTripStartDate,
        "yyyy-MM-dd",
        new Date()
      );
      setStartDate(parsedStartDate);
      const parsedEndDate = parse(
        selectedTripEndDate,
        "yyyy-MM-dd",
        new Date()
      );
      setEndDate(parsedEndDate);
      setParticipantIds(selectedParticipantsIdList);
    }
  }, [
    mode,
    selectedTripId,
    selectedTripDestination,
    selectedTripStartDate,
    selectedTripEndDate,
    selectedParticipantsIdList,
  ]);

  useEffect(() => {
    //disable fields if not the owner and in edit mode or selectedTripvoting is closed
    if (
      (userId !== selectedTripOwnerId && mode !== "add") ||
      (selectedTripIsVotingOpen === false && mode !== "add")
    )
      setIsDisabled(true);
  }, [selectedTripOwnerId, userId, selectedTripIsVotingOpen]);

  const CheckStartEndDateAreValid = (): boolean => {
    if (!startDate || !endDate) return false;

    const today = new Date();
    const isStartDateInPast = startDate < today;
    const isEndDateInPast = endDate < today;
    const isStartAfterEnd = endDate < startDate;

    setStartDateNotInFutureError(isStartDateInPast);
    setEndDateNotInFutureError(isEndDateInPast);
    setStartDateGreaterThanEndDateError(isStartAfterEnd);

    return !(isStartDateInPast || isEndDateInPast || isStartAfterEnd);
  };

  const SaveTripDetails = async () => {
    setSubmitted(true);
    setNotFoundEmails([]);

    const { foundIds, emailsNotFound } = await transformParticipantsEmailToId(
      participantsEmailList
    );

    const datesAreValid = CheckStartEndDateAreValid();
    const hasAllFields =
      destination && startDate && endDate && foundIds.length > 0;
    const noErrors =
      datesAreValid && emailsNotFound.length === 0 && hasAllFields;

    setNotFoundEmails(emailsNotFound);
    setParticipantIds(foundIds);

    if (noErrors) {
      const trip = {
        id: tripId,
        destination,
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
        ownerId: userId,
        participantsId: foundIds,
        isVotingOpen: true,
      };

      if (mode === "add") {
        const tripId = await AddTripReturnTripId(trip, getToken());

        if (tripId) {
          console.log("ADDED TRIP ID" + tripId);
          //add is successful create group notification  for participants for added trip and forward the user to the trip dashboard
          setSelectedTripId(tripId);
          sessionStorage.setItem("ItineraSelectedTripId", String(tripId));
          const notificationToAdd = {
            userId: foundIds, // send notifications to all the partificipants that were found
            type: NotificationTypeEnum.TripAdded,
            referenceId: tripId, // referencing the recently added trip
            referenceTable: "trip",
          };

          const addNotificationSuccess = await AddGroupNotification(
            notificationToAdd,
            getToken()
          );

          if (addNotificationSuccess) {
            console.log("Notifications successfully added.");
          } else {
            console.log("Failed to add notifications.");
          }

          router.push(
            isMobile
              ? "/Trip/TripList"
              : "/ItinerarySuggestionPages/UndecidedListPage"
          );
        } else {
          alert(
            "Something went wrong. Trip details were not saved. Please try again."
          );
        }
      } // for edit state
      else {
        const success = await EditTrip(trip, getToken());
        setSelectedTripId(trip.id);
        sessionStorage.setItem("ItineraSelectedTripId", String(trip.id));
        if (success) {
          // send update notification on existing users
          const existingUsers = foundIds.filter((id) =>
            selectedParticipantsIdList.includes(id)
          );
          if (existingUsers.length > 0) {
            const notificationToAdd = {
              userId: existingUsers, // send notifications to existing users
              type: NotificationTypeEnum.TripUpdated,
              referenceId: tripId, // referencing the recently added trip
              referenceTable: "trip",
            };

            const addUpdateNotificationSuccess = await AddGroupNotification(
              notificationToAdd,
              getToken()
            );

            if (addUpdateNotificationSuccess) {
              console.log("Notifications successfully added for update trip.");
            } else {
              console.log("Failed to add notification for update trip");
            }
          }

          // find the newly added IDs and send trip added/invited notification
          const newIdsAdded = foundIds.filter(
            (id) => !selectedParticipantsIdList.includes(id)
          );
          if (newIdsAdded.length > 0) {
            // if new Id was added then proceed to send notification
            const notificationToAdd = {
              userId: newIdsAdded, // send notifications to newly added participants
              type: NotificationTypeEnum.TripAdded,
              referenceId: tripId, // referencing the recently added trip
              referenceTable: "trip",
            };
            const addTripNotificationSuccess = await AddGroupNotification(
              notificationToAdd,
              getToken()
            );

            if (addTripNotificationSuccess) {
              console.log("Notifications successfully added.");
            } else {
              console.log("Failed to add notifications.");
            }
          }

          router.push(
            isMobile
              ? "/Trip/TripList"
              : "/ItinerarySuggestionPages/UndecidedListPage"
          );
        } else
          alert(
            "Something went wrong. Trip details were not edited. Please try again"
          );
      }
    }
  };

  const transformParticipantsEmailToId = async (emails: string) => {
    const tempList = emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
    const results = await Promise.all(
      tempList.map(async (email) => ({
        email,
        id: await GetParticipantsId(email),
      }))
    );

    const foundIds = results
      .filter((r) => r.id != null)
      .map((r) => r.id as number);
    const emailsNotFound = results
      .filter((r) => r.id == null)
      .map((r) => r.email);

    return { foundIds, emailsNotFound };
  };

  useEffect(() => {
    // if in edit mode
    if (mode !== "add") {
      const transformParticipantsIdToEmails = async () => {
        const participantEmailList = await Promise.all(
          selectedParticipantsIdList.map((id) => GetParticipantEmail(id))
        );
        const filtered = participantEmailList.filter(
          (email): email is string => email !== null && email !== undefined
        );
        setParticipantsEmailList(filtered.join(","));
      };
      transformParticipantsIdToEmails();
    }
  }, [selectedParticipantsIdList]);

  return (
    <div className="block pt-5">
      <div
        id="add"
        className="flex flex-col h-full max-h-[90vh] bg-[#ECF0F1] rounded-2xl min-h-[28rem]  min-w-[20rem] lg:min-h-[24rem] lg:max-w-full lg:mt-5 lg:mx-20 xl:mx-40 mx-4 px-4 relative mb-40 lg:mb-0"
      >
        <div className="p-2 pt-8 space-y-4 block lg:hidden">
          {submitted &&
            (!destination ||
              !startDate ||
              !endDate ||
              !participantsEmailList ||
              startDateGreaterThanEndDateError ||
              startDateNotInFutureError ||
              endDateNotInFutureError ||
              notFoundEmails.length > 0) && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                <p className="font-semibold">
                  Please fix the following issues:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {!destination && <li>Destination is required.</li>}
                  {!startDate && <li>Start Date is required.</li>}
                  {!endDate && <li>End Date is required.</li>}
                  {!participantsEmailList && (
                    <li>At least one participant email is required.</li>
                  )}
                  {startDateGreaterThanEndDateError && (
                    <li>Start Date must be before the End Date.</li>
                  )}
                  {startDateNotInFutureError && (
                    <li>Start Date must be in the future.</li>
                  )}
                  {endDateNotInFutureError && (
                    <li>End Date must be in the future.</li>
                  )}
                  {notFoundEmails.length > 0 && (
                    <li>
                      The following user(s) were not found:
                      <strong>{notFoundEmails.join(", ")}</strong>. Please
                      remove them for now and add them later after they sign up.
                    </li>
                  )}
                </ul>
              </div>
            )}

          <div className="flex justify-start">
            <div className="mr-2">
              <img
                src="/assets/Icons/Orion_globe.svg"
                alt="Destination "
                className="w-8"
              />
            </div>
            <input
              disabled={isDisabled}
              type="text"
              value={destination}
              placeholder="*Destination"
              className={`${
                isDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black"
              } rounded-md py-1 px-2 w-full ${
                submitted && !destination ? "border-2 border-red-500" : ""
              }`}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="flex justify-start">
            <div className="mr-2">
              <img
                src="/assets/Icons/Orion_meeting-geotag.svg"
                alt="Start Date"
                className="w-8"
              />
            </div>
            <DatePicker
              disabled={isDisabled}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="*Start Date"
              dateFormat="MM/dd/yyyy"
              className={`${
                isDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black"
              } rounded-md py-1 px-2 w-full ${
                submitted &&
                (!startDate ||
                  startDateGreaterThanEndDateError ||
                  startDateNotInFutureError)
                  ? "border-2 border-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="flex justify-start">
            <div className="mr-2">
              <img
                src="/assets/Icons/Orion_meeting-geotag.svg"
                alt="End Date"
                className="w-8"
              />
            </div>
            <DatePicker
              disabled={isDisabled}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="*End Date"
              dateFormat="MM/dd/yyyy"
              className={`${
                isDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black"
              } rounded-md py-1 px-2 w-full ${
                submitted && (!endDate || endDateNotInFutureError)
                  ? "border-2 border-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="flex justify-start pb-15">
            <div className="mr-2">
              <img
                src="/assets/Icons/Orion_people.svg"
                alt="Participants"
                className="w-8"
              />
            </div>
            <textarea
              disabled={isDisabled}
              value={participantsEmailList}
              placeholder="*Participants e-mail address (separate with comma)"
              className={`${
                isDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black"
              } rounded-md py-1 px-2 pb-36 w-full resize-none ${
                submitted && !participantsEmailList
                  ? "border-2 border-red-500"
                  : ""
              }`}
              onChange={(e) => setParticipantsEmailList(e.target.value)}
            />
          </div>
        </div>

        <div className="p-2 pt-8 space-y-4 hidden lg:block">
          <div className="lg:px-6 lg:pt-8 lg:grid lg:grid-cols-2 lg:gap-6">

            <div className="lg:grid lg:grid-rows-4 lg:px-4">

              <div className="flex justify-start">
                <div className="mr-2">
                  <img
                    src="/assets/Icons/Orion_globe.svg"
                    alt="Destination "
                    className="w-8"
                  />
                </div>
                <input
                  disabled={isDisabled}
                  type="text"
                  value={destination}
                  placeholder="*Destination"
                  className={`${
                    isDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black"
                  } rounded-md py-1 px-2 w-full lg:mb-7 ${
                    submitted && !destination ? "border-2 border-red-500" : ""
                  }`}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="flex justify-start">
                <div className="mr-2">
                  <img
                    src="/assets/Icons/Orion_meeting-geotag.svg"
                    alt="Start Date"
                    className="w-8"
                  />
                </div>
                <DatePicker
                  disabled={isDisabled}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="*Start Date"
                  dateFormat="MM/dd/yyyy"
                  className={`${
                    isDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black"
                  } rounded-md py-1 px-2 w-full ${
                    submitted &&
                    (!startDate ||
                      startDateGreaterThanEndDateError ||
                      startDateNotInFutureError)
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                />
              </div>

              <div className="flex justify-start">
                <div className="mr-2">
                  <img
                    src="/assets/Icons/Orion_meeting-geotag.svg"
                    alt="End Date"
                    className="w-8"
                  />
                </div>
                <DatePicker
                  disabled={isDisabled}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="*End Date"
                  dateFormat="MM/dd/yyyy"
                  className={`${
                    isDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black"
                  } rounded-md py-1 px-2 w-full ${
                    submitted && (!endDate || endDateNotInFutureError)
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-start pb-15">
              <div className="mr-2">
                <img
                  src="/assets/Icons/Orion_people.svg"
                  alt="Participants"
                  className="w-8"
                />
              </div>
              <textarea
                disabled={isDisabled}
                value={participantsEmailList}
                placeholder="*Participants e-mail address (separate with comma)"
                className={`${
                  isDisabled
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black"
                } rounded-md py-1 px-2 pb-36 w-full resize-none ${
                  submitted && !participantsEmailList
                    ? "border-2 border-red-500"
                    : ""
                }`}
                onChange={(e) => setParticipantsEmailList(e.target.value)}
              />
            </div>
          </div>
        </div>

        {!isDisabled && (
          <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <button
              onClick={SaveTripDetails}
              className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 lg:px-5 lg:py-2 cursor-pointer lg:flex lg:justify-between"
            >
              <p className='hidden lg:block mr-2'>Let&apos;s get this trip started</p>
              <img
                src="/assets/Icons/Orion_aircraft-climb_white.svg"
                className="w-10 lg:w-8"
                alt="add"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTripComponent;
