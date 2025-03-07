import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { v4 as uuidv4 } from "uuid";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { Option } = Select;
import LineChart from "./LineChart";
import Loader from "../components/Loader";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("5y");
  const [coinHistory, setCoinHistory] = useState([]);

  const { data: coinHistoryData } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin || {};

  useEffect(() => {
    setCoinHistory(coinHistoryData || []);
  }, [coinHistoryData]);

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const volume = cryptoDetails["24hVolume"] || 0;

  const stats = [
    { title: "Price to USD", value: `$ ${millify(cryptoDetails?.price || 0)}`, icon: <DollarCircleOutlined /> },
    { title: "Rank", value: cryptoDetails?.rank || "N/A", icon: <NumberOutlined /> },
    { title: "24h Volume", value: `$ ${millify(volume)}`, icon: <ThunderboltOutlined /> },
    { title: "Market Cap", value: `$ ${millify(cryptoDetails?.marketCap || 0)}`, icon: <DollarCircleOutlined /> },
    { title: "All-time-high (daily avg.)", value: `$ ${millify(cryptoDetails?.allTimeHigh?.price || 0)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: "Number Of Markets", value: cryptoDetails?.numberOfMarkets || "N/A", icon: <FundOutlined /> },
    { title: "Number Of Exchanges", value: cryptoDetails?.numberOfExchanges || "N/A", icon: <MoneyCollectOutlined /> },
    { title: "Approved Supply", value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: "Total Supply", value: `$ ${millify(cryptoDetails?.supply?.total || 0)}`, icon: <ExclamationCircleOutlined /> },
    { title: "Circulating Supply", value: `$ ${millify(cryptoDetails?.supply?.circulating || 0)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">{cryptoDetails?.name || "Unknown Coin"}</Title>
        <p>{cryptoDetails?.name} live price in US dollars. View value statistics, market cap, and supply.</p>
      </Col>
      
      <Select
        defaultValue="5y"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      <LineChart
        currentPrice={millify(cryptoDetails?.price || 0)}
        coinHistory={coinHistory || []}
        coinName={cryptoDetails?.name || "Unknown Coin"}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col key={uuidv4()} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Statistics</Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col key={uuidv4()} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
