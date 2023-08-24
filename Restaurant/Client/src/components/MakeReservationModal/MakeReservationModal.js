import React, { useEffect, useState } from "react";
import { Flex, Button, Box } from "rebass";
import axios from "axios";
import { API_URL } from "../../constants";
import PropTypes from "prop-types";
import { Input, Modal } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { InputLabel } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function MakeReservationModal({
  isOpen,
  restaurantId,
  onClose,
  name,
  existingTime,
  existingGuests,
  reservationId,
  isUpdate,
  refreshData,
}) {
  const [time, setTime] = useState(Date.now() + 24 * 60 * 60 * 1000);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const tomorrow = Date.now() + 24 * 60 * 60 * 1000;

    setTime(existingTime ? new Date(existingTime) : tomorrow);
    setGuests(existingGuests || 1);
  }, [existingTime, existingGuests]);

  async function addFunction() {
    await axios.post(
      `${API_URL}/reservations/restaurant/${restaurantId}`,
      {
        reservation_date: time,
        num_guests: guests,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
  }

  async function updateFunction() {
    await axios.put(
      `${API_URL}/reservations/user/${reservationId}`,
      {
        reservation_date: time,
        num_guests: guests,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
  }

  async function makeReservation() {
    try {
      const func = isUpdate ? updateFunction : addFunction;

      await func();
    } catch (error) {
      alert(
        isUpdate ? "Error updated reservation" : "Error making reservation"
      );
      return;
    }

    alert(
      isUpdate
        ? "Reservation updated successfully"
        : "Reservation made successfully"
    );

    refreshData();
    onClose();
  }

  return (
    <>
      <Modal
        open={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Flex
          flexDirection={"column"}
          height="500px"
          width="700px"
          backgroundColor={"white"}
          padding="16px"
        >
          <Flex
            fontSize={24}
            paddingBottom="16px"
            justifyContent={"space-between"}
          >
            Make a reservation at {name}
            <Box onClick={onClose} style={{ userSelect: "none" }}>
              X
            </Box>
          </Flex>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Flex paddingTop="16px" flexDirection={"column"}>
              <Flex alignItems={"center"}>
                <Flex width="200px">
                  <InputLabel id="Select-Time">Select Time</InputLabel>
                </Flex>
                <DateTimePicker
                  labelId="Select-Time"
                  views={["year", "month", "day", "hours", "minutes"]}
                  format="yyyy-MM-dd HH:mm"
                  ampmInClock={false}
                  value={time}
                  onChange={(value) => setTime(value?.getTime())}
                />
              </Flex>

              <Flex paddingTop={"16px"}>
                <Flex width="200px">
                  <InputLabel id="select-label">Number of guests</InputLabel>
                </Flex>
                <Input
                  labelId="select-label"
                  value={guests}
                  onChange={({ target }) => setGuests(target.value)}
                  type="number"
                  error={guests < 1 || guests > 20}
                ></Input>
              </Flex>
            </Flex>
          </LocalizationProvider>
          <Flex
            marginTop="auto"
            justifyContent={"flex-end"}
            paddingTop="16px"
            alignItems="center"
          >
            <Button backgroundColor="blue" onClick={makeReservation}>
              {isUpdate ? "Update reservation" : "Make Reservation"}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

MakeReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  restaurantId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string,
  existingTime: PropTypes.any,
  existingGuests: PropTypes.number,
  reservationId: PropTypes.string,
  isUpdate: PropTypes.bool,
  refreshData: PropTypes.func,
};

MakeReservationModal.defaultProps = {
  refreshData: () => {},
};
export default MakeReservationModal;
