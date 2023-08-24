/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import { Flex, Box } from "rebass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import NavBar from "../../components/NavBar";
import MakeReservationModal from "../../components/MakeReservationModal";
import Reservation from "../../components/Reservation";

function Reservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [activeReservation, setActiveReservation] = useState();

  async function getReservations() {
    try {
      const result = await axios.get(`${API_URL}/reservations/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      setReservations(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("userToken");

    if (!user) {
      navigate("/login", { replace: true });
    } else {
      getReservations();
    }
  }, []);

  function closeModal() {
    setActiveReservation(null);
  }

  function updateReservation(
    restaurant_name,
    reservation_date,
    num_guests,
    status,
    reservation_id
  ) {
    setActiveReservation({
      reservation_date,
      num_guests,
      status,
      reservation_id,
      restaurant_name,
    });
  }
  return (
    <>
      <MakeReservationModal
        isOpen={!!activeReservation}
        onClose={closeModal}
        name={activeReservation?.restaurant_name}
        existingTime={activeReservation?.reservation_date}
        existingGuests={activeReservation?.num_guests}
        reservationId={activeReservation?.reservation_id}
        isUpdate
        refreshData={getReservations}
      />

      <Flex
        width={"100%"}
        height="100vh"
        flexDirection={"column"}
        overflow={"auto"}
      >
        <NavBar />

        <Flex
          width={"80%"}
          paddingLeft={"10%"}
          height="100%"
          flexDirection={"column"}
        >
          {reservations?.map((reservation) => (
            <Reservation
              key={reservation.reservation_id}
              {...reservation}
              updateReservation={updateReservation}
              triggerUpdate={getReservations}
            />
          ))}

          {reservations.length === 0 && (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <Box>No reservations found</Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

Reservations.propTypes = {};

Reservations.defaultProps = {};

export default Reservations;
