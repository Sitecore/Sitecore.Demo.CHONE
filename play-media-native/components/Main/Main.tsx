import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useQuery } from "react-query";
import { Stacks } from "../../navigators/Stacks";
import { getAllEvents } from "../../api/queries/getEvents";
import { getAllAthletes } from "../../api/queries/getAthletes";
import { getAllSports } from "../../api/queries/getSports";

export const Main = () => {
  const [connected, setConnected] = useState(false);

  // Prepare API data
  //
  useQuery("events", getAllEvents);
  useQuery("athletes", getAllAthletes);
  useQuery("sports", getAllSports);

  return (
    <NavigationContainer>
      <Stacks connected={connected} setConnected={setConnected} />
    </NavigationContainer>
  );
};
