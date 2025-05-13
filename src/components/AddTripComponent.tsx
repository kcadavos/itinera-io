'use client';

import {
  useSelectedTripDestinationContext,
  useSelectedTripEndDateContext,
  useSelectedTripIdContext,
  useSelectedTripOwnerIdContext,
  useSelectedTripParticipantsIdListContext,
  useSelectedTripStartDateContext,
  useUserIdContext
} from '@/context/DataContext';
import { getToken } from '@/lib/services/DataServices';
import { AddTripReturnTripId, EditTrip, GetParticipantEmail, GetParticipantsId } from '@/lib/services/TripDataService';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

const AddTripComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const { selectedTripId, setSelectedTripId } = useSelectedTripIdContext();
  const { selectedTripDestination } = useSelectedTripDestinationContext();
  const { selectedTripStartDate } = useSelectedTripStartDateContext();
  const { selectedTripEndDate } = useSelectedTripEndDateContext();
  const { selectedParticipantsIdList } = useSelectedTripParticipantsIdListContext();
  const { selectedTripOwnerId } = useSelectedTripOwnerIdContext();

  const { userId } = useUserIdContext();
  const [tripId, setTripId] = useState<number>(0);
  const [destination, setDestination] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [participantsEmailList, setParticipantsEmailList] = useState<string>('');
  const [participantIds, setParticipantIds] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);
  const [startDateGreaterThanEndDateError, setStartDateGreaterThanEndDateError] = useState<boolean>(false);
  const [startDateNotInFutureError, setStartDateNotInFutureError] = useState<boolean>(false);
  const [endDateNotInFutureError, setEndDateNotInFutureError] = useState<boolean>(false);
  const [notFoundEmails, setNotFoundEmails] = useState<string[]>([]);

  useEffect(() => {
    if (mode === 'add') {
      setTripId(0);
      setDestination('');
      setStartDate(null);
      setEndDate(null);
      setParticipantIds([]);
      setParticipantsEmailList('');
    } else {
      setTripId(selectedTripId);
      setDestination(selectedTripDestination);
      const parsedStartDate = parse(selectedTripStartDate, 'yyyy-MM-dd', new Date());
      setStartDate(parsedStartDate);
      const parsedEndDate = parse(selectedTripEndDate, 'yyyy-MM-dd', new Date());
      setEndDate(parsedEndDate);
      setParticipantIds(selectedParticipantsIdList);
    }
  }, [mode, selectedTripId, selectedTripDestination, selectedTripStartDate, selectedTripEndDate, selectedParticipantsIdList]);

  useEffect(() => {
    if (userId !== selectedTripOwnerId && mode !== 'add') setIsDisabled(true);
  }, [selectedTripOwnerId, userId]);

  useEffect(() => {
    if (userId === 0) router.push('/Trip/TripList');
  }, [userId]);

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

    const { foundIds, emailsNotFound } = await transformParticipantsEmailToId(participantsEmailList);

    const datesAreValid = CheckStartEndDateAreValid();
    const hasAllFields = destination && startDate && endDate && foundIds.length > 0;
    const noErrors = datesAreValid && emailsNotFound.length === 0 && hasAllFields;

    setNotFoundEmails(emailsNotFound);
    setParticipantIds(foundIds);

    if (noErrors) {
      const trip = {
        id: tripId,
        destination,
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
        ownerId: userId,
        participantsId: foundIds,
        isVotingOpen: true
      };

      if (mode === 'add') {
        const tripId = await AddTripReturnTripId(trip, getToken());

        if (tripId) {
          setSelectedTripId(tripId);
          router.push('/Trip/TripList');
        } else {
          alert('Something went wrong. Trip details were not saved. Please try again.');
        }
      } else {
        const success = await EditTrip(trip, getToken());

        if (success) router.push('/Trip/TripList');
        else alert('Something went wrong. Trip details were not edited. Please try again');
      }
    }
  };

  const transformParticipantsEmailToId = async (emails: string) => {
    const tempList = emails.split(',').map(email => email.trim()).filter(email => email.length > 0);
    const results = await Promise.all(tempList.map(async email => ({ email, id: await GetParticipantsId(email) })));

    const foundIds = results.filter(r => r.id != null).map(r => r.id as number);
    const emailsNotFound = results.filter(r => r.id == null).map(r => r.email);

    return { foundIds, emailsNotFound };
  };

  useEffect(() => {
    if (mode !== 'add') {
      const transformParticipantsIdToEmails = async () => {
        const participantEmailList = await Promise.all(selectedParticipantsIdList.map(id => GetParticipantEmail(id)));
        const filtered = participantEmailList.filter((email): email is string => email !== null && email !== undefined);
        setParticipantsEmailList(filtered.join(','));
      };
      transformParticipantsIdToEmails();
    }
  }, [selectedParticipantsIdList]);

  return (
    <div className="block">
      <div id="add" className="flex flex-col h-full max-h-[90vh] bg-[#ECF0F1] rounded-2xl min-h-[28rem] min-w-[20rem] lg:min-h-[25rem] lg:max-w-[20rem] mx-4 px-4 relative mb-40">
        <div className="p-2 pt-8 space-y-4">

          {(submitted && (!destination || !startDate || !endDate || !participantsEmailList || startDateGreaterThanEndDateError || startDateNotInFutureError || endDateNotInFutureError || notFoundEmails.length > 0)) && (
            <div role="alert" aria-live="assertive" className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">Please fix the following issues:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {!destination && <li>Destination is required.</li>}
                {!startDate && <li>Start Date is required.</li>}
                {!endDate && <li>End Date is required.</li>}
                {!participantsEmailList && <li>At least one participant email is required.</li>}
                {startDateGreaterThanEndDateError && <li>Start Date must be before the End Date.</li>}
                {startDateNotInFutureError && <li>Start Date must be in the future.</li>}
                {endDateNotInFutureError && <li>End Date must be in the future.</li>}
                {notFoundEmails.length > 0 && <li>The following user(s) were not found: <strong>{notFoundEmails.join(', ')}</strong>. Please remove or wait for them to sign up.</li>}
              </ul>
            </div>
          )}

          <div className="flex justify-start">
            <div className="mr-2">
              <img src="/assets/Icons/Orion_globe.svg" alt="Destination " className="w-8" />
            </div>
            <input
              disabled={isDisabled}
              type="text"
              value={destination}
              placeholder="*Destination"
              className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} rounded-md py-1 px-2 w-full ${submitted && !destination ? 'border-2 border-red-500' : ''}`}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="flex justify-start">
            <div className="mr-2">
              <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="Start Date" className="w-8" />
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="*Start Date"
              dateFormat="MM/dd/yyyy"
              className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} rounded-md py-1 px-2 w-full ${submitted && (!startDate || startDateGreaterThanEndDateError || startDateNotInFutureError) ? 'border-2 border-red-500' : ''}`}
            />
          </div>

          <div className="flex justify-start">
            <div className="mr-2">
              <img src="/assets/Icons/Orion_meeting-geotag.svg" alt="End Date" className="w-8" />
            </div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="*End Date"
              dateFormat="MM/dd/yyyy"
              className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} rounded-md py-1 px-2 w-full ${submitted && (!endDate || endDateNotInFutureError) ? 'border-2 border-red-500' : ''}`}
            />
          </div>

          <div className="flex justify-start pb-15">
            <div className="mr-2">
              <img src="/assets/Icons/Orion_people.svg" alt="Participants" className="w-8" />
            </div>
            <textarea
              value={participantsEmailList}
              placeholder="*Participants e-mail address (separate with comma)"
              className={`${isDisabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} rounded-md py-1 px-2 pb-36 w-full resize-none ${submitted && !participantsEmailList ? 'border-2 border-red-500' : ''}`}
              onChange={(e) => setParticipantsEmailList(e.target.value)}
            />
          </div>
        </div>

        {!isDisabled && (
          <div className="flex justify-center absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <button
              onClick={SaveTripDetails}
              className="bg-[#E67E22] hover:bg-[#d56b0f] border-4 border-white text-xl text-white rounded-[2.5rem] p-3 cursor-pointer"
            >
              <img src="/assets/Icons/Orion_aircraft-climb_white.svg" className="w-10" alt="add" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTripComponent;