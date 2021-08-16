import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import withAuthProvider, {
  AuthComponentProps,
} from "../components/Authentication/AuthProvider";
import NavBar from "../components/HomePage/NavBar";
import { TextDescription } from "../components/HomePage/TextDescription";
import dashboardImage from "../images/dashboard_image.png";
import tasksImage from "../images/tasks.png";
import styles from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

class IndexPage extends Component<AuthComponentProps> {
  render() {
    return (
      <>
        <NavBar />
        <Container className={`${styles.customContainer} mt-3`}>
          <Row className="center-block text-center">
            <Col>
              <TextDescription />
            </Col>
          </Row>

          <Row className="center-block text-center">
            <Col>
              <div className={`${styles.dashboardImageContainer} center-block`}>
                <Image src={dashboardImage} />
              </div>
            </Col>
          </Row>
          <Row className="center-block text-center">
            <Col>
              <Button
                variant="light"
                onClick={() => this.props.login()}
                className={`mt-4 ${styles.callToAction}`}
                size="lg"
              >
                Try now for free
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className={`text-right ${styles.landingPageFont}`}>
              <h2>See your finished tasks organized by date.</h2>
              <p>
                If you'd like to know how many tasks you completed the day
                before or any previous day for that matter Todocharts can help
                you with that.
              </p>
              <p>
                You can also use Todocharts to prepare yourself for a morning
                check-in meeting or simply to track how productive you were.
              </p>
            </Col>
            <Col>
              <span style={{ marginLeft: "100px" }}>
                <Image
                  src={tasksImage}
                  alt="List of tasks grouped by date when they were created"
                  height="500px"
                  width="400px"
                />
              </span>
            </Col>
          </Row>
          <Row className="center-block text-center py-5">
            <footer>
              <a
                href="https://us3.list-manage.com/contact-form?u=7e7780872f87c9211e4360b20&form_id=470b361eb465e14260bf139ce541f7b2"
                className={styles.link}
              >
                Contact us
              </a>
            </footer>
          </Row>
          {/* <Row className="mt-5">
            <Col className="center-block text-center">
              <span>
                <img
                  src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  height="400px"
                />
              </span>
            </Col>
            <Col className={`text-right ${styles.landingPageFont}`}>
              <h2>Charts for tracking your todos</h2>
            </Col>
          </Row> */}
        </Container>
      </>
    );
  }
}

export default withAuthProvider(IndexPage);
