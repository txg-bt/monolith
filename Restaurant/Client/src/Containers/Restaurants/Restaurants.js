/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex, Box } from "rebass";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import Restaurant from "../../components/Restaurant";
import NavBar from "../../components/NavBar";
import MakeReservationModal from "../../components/MakeReservationModal";

function Restaurants() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  async function getRestaurants() {
    try {
      const result = await axios.get(`${API_URL}/restaurants?city=${search}`);

      setRestaurants(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("userToken");

    if (!user) {
      navigate("/login", { replace: true });
    } else {
      getRestaurants();
    }
  }, []);

  function openReservationModal(restaurant_id, name) {
    setActiveRestaurant({ restaurant_id, name });
  }

  function closeModal() {
    setActiveRestaurant(null);
  }

  return (
    <>
      <MakeReservationModal
        isOpen={!!activeRestaurant}
        onClose={closeModal}
        restaurantId={activeRestaurant?.restaurant_id}
        name={activeRestaurant?.name}
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
          <Flex width={"100%"} justifyContent={"center"} flexShrink={0}>
            <Flex py="16px" width="50%" flexShrink={0}>
              <Input
                placeholder="Search by city"
                fullWidth
                onChange={({ target }) => setSearch(target.value)}
                value={search}
              />

              <Button
                backgroundColor={"blue"}
                onClick={getRestaurants}
                flexShrink={0}
              >
                Search
              </Button>
            </Flex>
          </Flex>

          {restaurants?.map((restaurant) => (
            <Restaurant
              key={restaurant.restaurant_id}
              {...restaurant}
              makeReservation={openReservationModal}
            />
          ))}

          {restaurants.length === 0 && (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <Box>No restaurants found</Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

Restaurants.propTypes = {};

Restaurants.defaultProps = {};

export default Restaurants;
