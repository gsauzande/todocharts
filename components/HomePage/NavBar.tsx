import React, { Component } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import withAuthProvider, {
  AuthComponentProps,
} from "../Authentication/AuthProvider";
import { MicrosoftIcon } from "./MicrosoftIcon";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../../images/logo.png";

type Props = AuthComponentProps;
class NavBar extends Component<Props> {
  render() {
    return (
      <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#ffffff" }}>
        <Container>
          <Navbar.Brand href="/">
            <Image
              src={logo}
              alt="Todocharts navabar logo"
              height="42px"
              width="150px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav justify-content-end">
            <Nav>
              {this.props.isAuthenticated && (
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              )}
              {!this.props.isAuthenticated && (
                <Button variant="light" onClick={() => this.props.login()}>
                  Login{" "}
                  <MicrosoftIcon width="12px" style={{ marginBottom: "2px" }} />
                </Button>
              )}
              {this.props.isAuthenticated && (
                <Button
                  style={{ color: "#FFFFFF", backgroundColor: "#FF2E63" }}
                  onClick={() => this.props.logout()}
                  variant="light"
                >
                  Logout <LogoutOutlined style={{ verticalAlign: "0px" }} />
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withAuthProvider(NavBar);
