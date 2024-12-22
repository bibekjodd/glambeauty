'use client';

import { MILLIS } from '@/lib/constants';
import { bookAppointmentKey } from '@/mutations/use-book-appointment';
import { useAvailableStaffs } from '@/queries/use-available-staffs';
import { useServices } from '@/queries/use-services';
import { createStore } from '@jodd/snap';
import { useIsMutating } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { CalendarIcon, ChevronsUpDownIcon, Dot, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import Avatar from '../utils/avatar';
import BookAppointmentDialog from './book-appointment-dialog';

const useSelectAppointmentDialog = createStore<{
  isOpen: boolean;
  referredServiceId: string | null;
}>(() => ({ isOpen: false, referredServiceId: null }));

const onOpenChange = (isOpen: boolean) =>
  useSelectAppointmentDialog.setState((state) => ({
    isOpen,
    referredServiceId: isOpen ? state.referredServiceId : null
  }));

export const openSelectAppointmentDialog = (referredServiceId?: string) =>
  useSelectAppointmentDialog.setState({
    isOpen: true,
    referredServiceId: referredServiceId || null
  });

export const closeSelectAppointmentDialog = () => onOpenChange(false);

export default function SelectAppointmentDialog() {
  const { isOpen, referredServiceId } = useSelectAppointmentDialog();

  const [date, setDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });
  const [time, setTime] = useState(9);
  const [serviceId, setServiceId] = useState<string | null>(referredServiceId || null);
  const { data: services } = useServices();
  const [staffId, setStaffId] = useState<string | null>(null);

  const fullDate = useMemo(() => {
    const selectedDate = new Date(date);
    const minutes = Math.round(time) > time ? 0.5 : 0;
    selectedDate.setHours(time);
    selectedDate.setMinutes(minutes);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    return selectedDate.toISOString();
  }, [date, time]);

  const {
    data: availableStaffs,
    isLoading: isLoadingStaffs,
    refetch: refetchAvailableStaffs
  } = useAvailableStaffs({
    date: fullDate,
    serviceId: serviceId
  });

  useEffect(() => {
    setStaffId(null);
  }, [availableStaffs, fullDate]);

  const canSelectStaff = date && time && serviceId;
  const isBookingAppointment = !!useIsMutating({ mutationKey: bookAppointmentKey });
  const disabled = !serviceId || !time || !date || !staffId || isBookingAppointment;

  let selectedStaff = availableStaffs?.find((staff) => staff.id === staffId);
  let selectedService = services?.find((service) => service.id === serviceId);

  const clearValues = () => {
    if (!referredServiceId) setServiceId(null);
    setStaffId(null);
    selectedStaff = undefined;
    selectedService = undefined;

    closeSelectAppointmentDialog();
  };

  useEffect(() => {
    if (!isOpen) return;
    setServiceId(referredServiceId);
  }, [isOpen, referredServiceId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-screen flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">Book an Appointment</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />

        <div className="flex h-full flex-col space-y-7 overflow-y-auto px-2 pb-7 scrollbar-thin">
          <section className="flex flex-col space-y-2">
            <Label htmlFor="service">Select the service</Label>

            <Select value={serviceId || ''} onValueChange={setServiceId}>
              <SelectTrigger id="service">
                <SelectValue placeholder="No service selected" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {services?.map((service) => (
                    <SelectItem key={service.id} value={service.id} className="">
                      <div className="flex items-center justify-between space-x-3 font-medium">
                        <span className="mr-auto font-medium">{service.title}</span>
                        <span className="font-semibold">Rs. {service.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <section className="flex flex-col space-y-2">
            <Label htmlFor="date">Select date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  id="date"
                  className="flex h-9 w-full items-center rounded-md border px-4 text-sm ring-ring focus:ring-1"
                >
                  <CalendarIcon className="size-3.5" />
                  <span className="ml-2 mr-auto">{dayjs(fullDate).format('MMMM DD, ha')}</span>
                  <ChevronsUpDownIcon className="size-3 opacity-50" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="pb-4">
                <div>
                  <section className="flex flex-col space-y-2">
                    <Label>Select time </Label>

                    <Select
                      value={time.toString()}
                      onValueChange={(val) => setTime(Number(val) || 9)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {new Array(9).fill('nothing').map((_, i) => (
                            <SelectItem key={i} value={(i + 9).toString()}>
                              {(i + 9) % 12 || 12} {i + 9 >= 12 ? 'pm' : 'am'}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </section>

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      if (date) setDate(date);
                    }}
                    fromDate={new Date(Date.now() + MILLIS.DAY)}
                    toDate={new Date(Date.now() + MILLIS.DAY * 29)}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </section>

          <section className="flex flex-col space-y-2">
            <Label htmlFor="stylist">Select a stylist</Label>

            {canSelectStaff && isLoadingStaffs && (
              <div className="flex h-9 w-full items-center justify-between rounded-lg border border-border px-3 text-sm">
                <span>Finding available staffs...</span>
                <Loader2 className="size-4 animate-spin text-gray-700" />
              </div>
            )}
            {!canSelectStaff && (
              <div className="flex h-9 items-center rounded-lg border border-border px-3 text-sm">
                <span className="text-amber-600">
                  Select the service and date first to select the staff
                </span>
              </div>
            )}
            {!isLoadingStaffs && availableStaffs?.length === 0 && (
              <div className="flex h-9 items-center rounded-lg border border-border px-3 text-sm">
                <span>No any staffs available on the selected date</span>
              </div>
            )}
            {canSelectStaff && (availableStaffs?.length || 0) > 0 && (
              <Select value={staffId || ''} onValueChange={setStaffId}>
                <SelectTrigger id="stylist">
                  <SelectValue placeholder="Select a stylist" />
                </SelectTrigger>

                <SelectContent>
                  {availableStaffs?.map((staff) => (
                    <SelectItem
                      key={staff.id}
                      value={staff.id}
                      disabled={!staff.active || staff.activeAppointments !== 0}
                      className="w-full font-medium"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar src={staff.image} variant="sm" />
                        <span className="font-medium">{staff.name}</span>
                        {(!staff.active || staff.activeAppointments !== 0) && (
                          <>
                            <Dot className="size-4 scale-150 text-amber-500" />
                            <span>Unavailable</span>
                          </>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </section>
        </div>

        <DialogFooter className="sm:flex-col-reverse sm:space-x-0">
          <DialogClose asChild>
            <Button variant="text" className="mt-1">
              Cancel
            </Button>
          </DialogClose>

          {selectedService && selectedStaff ? (
            <BookAppointmentDialog
              date={fullDate}
              refetchAvailableStaffs={refetchAvailableStaffs}
              service={selectedService}
              staff={selectedStaff}
              clearValues={clearValues}
            >
              <Button disabled={disabled}>Select Appointment</Button>
            </BookAppointmentDialog>
          ) : (
            <Button disabled={disabled}>Select Appointment</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
