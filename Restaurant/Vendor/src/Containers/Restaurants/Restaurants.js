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
import AddOrUpdateRestaurant from "../../components/AddOrUpdateRestaurant";

function Restaurants() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  async function getRestaurants() {
    try {
      const token = localStorage.getItem("userToken");

      const result = await axios.get(`${API_URL}/restaurants/vendor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  function closeModal() {
    setIsAddOpen(false);
    setActiveRestaurant(null);
  }

  function addRestaurant() {
    setIsAddOpen(true);
  }

  return (
    <>
      <AddOrUpdateRestaurant
        isOpen={!!activeRestaurant || isAddOpen}
        onClose={closeModal}
        restaurant={activeRestaurant}
        refreshData={getRestaurants}
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
          {restaurants?.map((restaurant) => (
            <Restaurant
              key={restaurant.restaurant_id}
              {...restaurant}
              onEdit={() => setActiveRestaurant(restaurant)}
            />
          ))}
          <Flex width={"100%"} justifyContent={"center"}>
            <Button backgroundColor={"blue"} onClick={addRestaurant}>
              Add Restaurant{" "}
            </Button>
          </Flex>
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
