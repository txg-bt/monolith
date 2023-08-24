import React from "react";
import { Flex, Button } from "rebass";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const isOnRestaurantPage = window.location.pathname === "/";

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");

    window.location.reload();
  }

  function seeReservations() {
    navigate("/reservations");
  }

  return (
    <Flex
      position="sticky"
      top={0}
      left={0}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding="16px 24px"
    >
      <Flex alignItems={"center"}>
        <Flex paddingRight={"16px"}>
          Connected as {localStorage.getItem("username")}
        </Flex>

        <Button backgroundColor={"red"} onClick={logout}>
          Logout
        </Button>
      </Flex>
      {isOnRestaurantPage ? (
        <Button backgroundColor={"blue"} onClick={seeReservations}>
          See all your reservations
        </Button>
      ) : (
        <Button backgroundColor={"blue"} onClick={() => navigate("/")}>
          Back to restaurants
        </Button>
      )}
    </Flex>
  );
}

export default NavBar;
