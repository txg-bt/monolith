import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button } from "rebass";

function NavBar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");

    window.location.reload();
  }

  const isOnRestaurantPage = window.location.pathname === "/";

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

      {!isOnRestaurantPage && (
        <Button backgroundColor={"blue"} onClick={() => navigate("/")}>
          Back to restaurants
        </Button>
      )}
    </Flex>
  );
}

export default NavBar;
