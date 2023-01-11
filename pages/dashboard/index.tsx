import * as React from "react";
import "./index.module.css";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Task, TaskList } from "../../interfaces";
import NavBar from "../../components/HomePage/NavBar";
import withAuthProvider, {
  AuthComponentProps,
} from "../../components/Authentication/AuthProvider";
import {
  CompletedTaskLister,
  DailyCompletedTasks,
  OpenTasks,
  TaskLister,
  TotalCompletedTasks,
  TotalCompletedTasksChart,
} from "./dataCards";

type Props = AuthComponentProps;

type State = {
  isOpen: boolean;
  loading: boolean;
  tasks: Task[];
  taskLists: TaskList[];
  fetchedListCount: number;
};

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
      loading: false,
      tasks: [],
      taskLists: [],
      fetchedListCount: 0,
    };
  }

  componentDidUpdate(previousProps: Props, previousState: State) {
    if (previousProps.isAuthenticated !== this.props.isAuthenticated) {
      if (this.props.isAuthenticated && this.state.tasks.length < 1) {
        this.getTaskLists();
      }
    }
  }

  getTaskLists = () => {
    fetch(`/api/tasks/lists?token=${this.props.accessToken}`, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((data) => {
        this.setState({ taskLists: data });
        this.getTasks();
      });
    });
  };

  getTasks = () => {
    if (this.state.taskLists.length > 0) {
      this.setState({ loading: true });
      this.state.taskLists.forEach((taskList, index) => {
        fetch(
          `/api/tasks?token=${this.props.accessToken}&taskListId=${taskList.id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => {
            response.json().then((data) => {
              if (data) {
                this.setState({ tasks: [...this.state.tasks, ...data] });
                this.setState({
                  fetchedListCount: this.state.fetchedListCount + 1,
                });
                if (index === 0) {
                  this.setState({ loading: false });
                }
              }
            });
          })
          .catch(() => {
            this.setState({ loading: false });
          });
      });
    }
  };

  currentPercentage = () =>
    Math.round(
      (this.state.fetchedListCount * 100) / this.state.taskLists.length
    );

  render() {
    return (
      <>
        <NavBar />
        <Container style={{ marginTop: "100px" }}>
          {this.state.loading && (
            <>
              Loading all your tasks...
              <ProgressBar
                now={this.currentPercentage()}
                label={`${this.currentPercentage()}%`}
              />
            </>
          )}
          <br />
          <Row>
            <Col md={9}>
              <Row>
                <Col md={4}>
                  <OpenTasks
                    loading={this.state.loading}
                    tasks={this.state.tasks}
                  />
                </Col>
                <Col md={4}>
                  <TotalCompletedTasks
                    loading={this.state.loading}
                    tasks={this.state.tasks}
                  />
                </Col>
                <Col md={4}>
                  <DailyCompletedTasks
                    loading={this.state.loading}
                    tasks={this.state.tasks}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={12}>
                  <TotalCompletedTasksChart
                    loading={this.state.loading}
                    tasks={this.state.tasks}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <TaskLister
                isLoading={this.state.loading}
                tasks={this.state.tasks}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4}>
              <CompletedTaskLister
                isLoading={this.state.loading}
                tasks={this.state.tasks}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuthProvider(Dashboard);
