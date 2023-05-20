import React from "react";
import img from "../assets/patint.avif";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
const SeconedSection = () => {
  return (
    <Container className="my-4 TextImageComponent">
      <Row>
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <p>
            <h2>Example Title</h2>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              ipsum euismod, lacinia quam vel, lobortis elit. Sed sed tellus
              quis neque consequat bibendum a quis massa. Suspendisse potenti."
            </p>
          </p>
        </Col>
        <Col xs={12} md={6}>
          <Image src={img} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default SeconedSection;
