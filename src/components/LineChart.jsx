import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { Chart as ChartJS } from "chart.js";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < (coinHistory?.data?.history || []).length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i]?.price || 0);
    coinTimestamp.push(
      new Date((coinHistory?.data?.history[i]?.timestamp || 0) * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.length > 0 ? coinTimestamp : ["No Data"],
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice.length > 0 ? coinPrice : [0],
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName || "Unknown Coin"} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change || "N/A"}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName || "Unknown Coin"} Price: $ {currentPrice || 0}
          </Title>
        </Col>
      </Row>
      <Line className="chart" data={data} />
    </>
  );
};

export default LineChart;
