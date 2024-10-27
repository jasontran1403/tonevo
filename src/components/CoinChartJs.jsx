import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartDays } from "../configs/Data";
import { API_ENDPOINT } from "../constants";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const CoinChartJs = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(7);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINT}auth/get-mapchain-token-data`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setFlag(true);
        setHistoricData(response.data.prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   const fetchHistoricData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=USD&days=7`
  //       );
  //       setFlag(true);
  //       setHistoricData(data.prices);
  //     } catch (error) {
  //       console.error("Error fetching historic data:", error);
  //     }
  //   };

  //   fetchHistoricData();
  // }, [days, coin]);

  const borderColor = useColorModeValue("#2a8fd3", "#2a8fd3");
  return (
    <Box
      m="2%"
      gap="5"
      style={{
        marginTop: "100px",
        paddingBottom: "20px",
        width: "96svw",
        backgroundColor: "white",
      }}
    >
      {!historicData || !flag ? (
        <Flex justify="center" align="center">
          <CircularProgress
            isIndeterminate
            color="green.300"
            size="150px"
            thickness={1}
          />
        </Flex>
      ) : (
        <>
          <Flex padding="2" marginTop="0.5%" width="100%">
            <Box width="30%">
              <Flex width="100%">
                <Select
                  value={days}
                  disabled
                  // onChange={(event) => {
                  //   setDays(Number(event.target.value)); // Update `days` based on selection
                  //   setFlag(false);
                  // }}
                >
                  {chartDays.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Box>
          </Flex>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in USD`,
                  borderColor: borderColor,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
    </Box>
  );
};

export default CoinChartJs;
