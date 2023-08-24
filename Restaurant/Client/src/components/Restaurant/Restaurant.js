import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Flex } from "rebass";

function Restaurant({
  name,
  city,
  address,
  phone_number,
  restaurant_id,
  makeReservation,
}) {
  function openReservationModal() {
    makeReservation(restaurant_id, name);
  }

  return (
    <Flex
      backgroundColor={"lightgrey"}
      padding="20px"
      marginBottom="16px"
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"}>
        <Flex>Resturant name: {name}</Flex>
        <Flex>City: {city}</Flex>
        <Flex>Adress: {address}</Flex>
        <Flex>Phone Number: {phone_number}</Flex>
      </Flex>

      <Flex flexGrow={0} alignItems={"center"}>
        <Button onClick={openReservationModal} backgroundColor={"blue"}>
          Make a reservation
        </Button>
      </Flex>
    </Flex>
  );
}

Restaurant.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  restaurant_id: PropTypes.string.isRequired,
  makeReservation: PropTypes.func.isRequired,
};

Restaurant.defaultProps = {};

export default Restaurant;
