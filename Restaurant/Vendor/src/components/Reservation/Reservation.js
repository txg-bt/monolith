import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex } from "rebass";
import { format } from "date-fns";
import axios from "axios";
import { API_URL } from "../../constants";

function Reservation({
  restaurantId,
  restaurant_name,
  reservation_date,
  num_guests,
  status,
  reservation_id,
  refreshReservations,
}) {
  function computeColor() {
    if (new Date(reservation_date) < new Date()) {
      return "lightgrey";
    }

    if (status === "pending") {
      return "yellow";
    }

    if (status === "accepted") {
      return "green";
    }

    if (status === "rejected") {
      return "red";
    }
  }

  async function startUpdate(newStatus) {
    try {
      await axios.put(
        `${API_URL}/reservations/restaurant/${restaurantId}/${reservation_id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      alert("Reservation updated");
      refreshReservations();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      backgroundColor={computeColor()}
      padding="20px"
      marginBottom="16px"
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"}>
        <Flex>Resturant name: {restaurant_name}</Flex>
        <Flex>
          Reservation date:{" "}
          {format(new Date(reservation_date), "yyyy-MM-dd HH:mm")}
        </Flex>
        <Flex>Number of guests: {num_guests}</Flex>
        <Flex>Status: {status}</Flex>
      </Flex>

      {status === "pending" && (
        <Flex flexGrow={0} alignItems={"center"} flexDirection={"column"}>
          <Button
            onClick={() => startUpdate("accepted")}
            backgroundColor={"blue"}
          >
            Accept reservation
          </Button>

          <Button
            onClick={() => startUpdate("rejected")}
            backgroundColor={"red"}
            marginTop={"16px"}
          >
            Reject Reservation
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

Reservation.propTypes = {};

Reservation.defaultProps = {};

export default Reservation;
