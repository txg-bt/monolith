import React, { useEffect, useState } from "react";
import { Flex, Button, Box } from "rebass";
import axios from "axios";
import { API_URL } from "../../constants";
import PropTypes from "prop-types";
import { Input, Modal } from "@mui/material";
import { InputLabel } from "@mui/material";

function AddOrUpdateRestaurant({ isOpen, onClose, restaurant, refreshData }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const isUpdate = !!restaurant;

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setCity(restaurant.city);
      setAddress(restaurant.address);
      setPhoneNumber(restaurant.phone_number);
    }
  }, [restaurant]);

  async function addFunction() {
    await axios.post(
      `${API_URL}/restaurants/`,
      {
        name,
        city,
        address,
        phone_number: phoneNumber,
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
      `${API_URL}/restaurants/${restaurant.restaurant_id}`,
      {
        name,
        city,
        address,
        phone_number: phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
  }

  async function deleteRestaurant() {
    try {
      await axios.delete(`${API_URL}/restaurants/${restaurant.restaurant_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      alert("Deleted Restaurant");

      refreshData();
      onClose();
    } catch (error) {
      alert("error Deleting");
      return;
    }
  }

  async function addOrUpdate() {
    try {
      const func = isUpdate ? updateFunction : addFunction;

      await func();
    } catch (error) {
      alert(isUpdate ? "Error updated restaurant" : "Error adding restaurant");
      return;
    }

    alert(
      isUpdate
        ? "Restaurant updated successfully"
        : "Restaurant made successfully"
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
            Make a restaurant at {name}
            <Box onClick={onClose} style={{ userSelect: "none" }}>
              X
            </Box>
          </Flex>

          <Flex paddingTop="16px" flexDirection={"column"}>
            {/* name, city, address, phone_number */}

            <Flex paddingTop={"16px"}>
              <Flex width="200px">
                <InputLabel id="name">Name</InputLabel>
              </Flex>
              <Input
                labelId="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                type="text"
              ></Input>
            </Flex>

            <Flex paddingTop={"16px"}>
              <Flex width="200px">
                <InputLabel id="city">City</InputLabel>
              </Flex>
              <Input
                labelId="city"
                value={city}
                onChange={({ target }) => setCity(target.value)}
                type="text"
              ></Input>
            </Flex>

            <Flex paddingTop={"16px"}>
              <Flex width="200px">
                <InputLabel id="address">Address</InputLabel>
              </Flex>
              <Input
                labelId="address"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                type="text"
              ></Input>
            </Flex>

            <Flex paddingTop={"16px"}>
              <Flex width="200px">
                <InputLabel id="phone_number">Phone Number</InputLabel>
              </Flex>
              <Input
                labelId="phone_number"
                value={phoneNumber}
                onChange={({ target }) => setPhoneNumber(target.value)}
                type="tel"
              ></Input>
            </Flex>
          </Flex>

          <Flex
            marginTop="auto"
            justifyContent={"flex-end"}
            paddingTop="16px"
            alignItems="center"
          >
            {!!restaurant && (
              <Button
                backgroundColor="red"
                onClick={deleteRestaurant}
                marginRight="16px"
              >
                Delete Restaurant
              </Button>
            )}

            <Button backgroundColor="blue" onClick={addOrUpdate}>
              {isUpdate ? "Update restaurant" : "Make Restaurant"}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

AddOrUpdateRestaurant.propTypes = {};

AddOrUpdateRestaurant.defaultProps = {
  refreshData: () => {},
};
export default AddOrUpdateRestaurant;
