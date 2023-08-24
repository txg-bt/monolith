import React from "react";
import PropTypes from "prop-types";
import { Button, Flex } from "rebass";
import { useNavigate } from "react-router-dom";

function Restaurant({
  name,
  city,
  address,
  phone_number,
  restaurant_id,
  onEdit,
}) {
  const navigate = useNavigate();

  function seeReservations() {
    navigate(`/reservations/${restaurant_id}`);
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

      <Flex flexGrow={0} alignItems={"center"} flexDirection={"column"}>
        <Button onClick={onEdit} backgroundColor={"blue"}>
          Edit Restaurant
        </Button>

        <Button
          onClick={seeReservations}
          backgroundColor={"blue"}
          marginTop="16px"
        >
          See reservations
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
  onEdit: PropTypes.func.isRequired,
};

Restaurant.defaultProps = {};

export default Restaurant;
