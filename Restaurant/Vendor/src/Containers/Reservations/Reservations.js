/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import { Flex, Box } from "rebass";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import NavBar from "../../components/NavBar";
import Reservation from "../../components/Reservation";

function Reservations() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  const [reservations, setReservations] = useState([]);

  async function getReservations() {
    try {
      const result = await axios.get(
        `${API_URL}/reservations/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

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

  return (
    <>
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
              restaurantId={restaurantId}
              refreshReservations={getReservations}
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
