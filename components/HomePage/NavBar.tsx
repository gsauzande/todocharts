import React, { Component } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import withAuthProvider, {
  AuthComponentProps,
} from "../Authentication/AuthProvider";
import { MicrosoftIcon } from "./MicrosoftIcon";
import { LogoutOutlined, UndoOutlined } from "@ant-design/icons";
import logo from "../../images/logo.png";
// import "bootstrap/dist/css/bootstrap.min.css";

type Props = AuthComponentProps;
class NavBar extends Component<Props> {
  onRefreshTasksClick = () => {
    fetch(`/api/tasks/refresh?token=${this.props.accessToken}`, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((data) => {
        console.warn("done");
      });
    });
  };
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
              <Nav.Link href="https://blog.todocharts.com/">Blog</Nav.Link>
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
                <>
                  <Button className="m-2" onClick={this.onRefreshTasksClick}>
                    Refresh Tasks{" "}
                    <UndoOutlined style={{ verticalAlign: "0px" }} />
                  </Button>

                  <Button
                    className="m-2"
                    style={{ color: "#FFFFFF", backgroundColor: "#FF2E63" }}
                    onClick={() => this.props.logout()}
                    variant="light"
                  >
                    Logout <LogoutOutlined style={{ verticalAlign: "0px" }} />
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withAuthProvider(NavBar);
