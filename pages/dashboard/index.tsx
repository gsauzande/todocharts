import * as React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import moment from "moment";
import "./index.module.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Task } from "../../interfaces";
import NavBar from "../../components/HomePage/NavBar";
import withAuthProvider, {
  AuthComponentProps,
} from "../../components/Authentication/AuthProvider";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import styles from "./index.module.css";
import { HashtagTasks, TaskList } from "../../components";

type Props = AuthComponentProps;

type State = {
  isOpen: boolean;
  taskLists: Task[];
};

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
      taskLists: [],
    };
  }

  baseUrl = "https://graph.microsoft.com/v1.0/me/";
  getAPIData = (url: string, accessToken: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const todoListUrl = this.baseUrl + url;
      fetch(todoListUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((data) => {
          resolve(data.json());
        })
        .catch((err) => reject(err));
    });
  };

  getTasks = () => {
    this.getAPIData("todo/lists", this.props.accessToken).then((data) => {
      if (data.value) {
        data.value.forEach((todoList: any) => {
          const url = `todo/lists/${todoList.id}/tasks`;
          this.getAPIData(url, this.props.accessToken).then((result) => {
            this.setState({
              taskLists: result.value,
            });
            this.getGroupedTasks();
          });
        });
      }
    });
  };

  getGroupedTasks = () => {
    let finalObj: any = {};
    if (this.state) {
      this.state.taskLists.forEach((task) => {
        if (task.completedDateTime) {
          const date = task.completedDateTime.dateTime.split("T")[0];
          if (finalObj[date]) {
            finalObj[date].push(task);
          } else {
            finalObj[date] = [task];
          }
        }
      });
    }
    return finalObj;
  };

  getTaskByStatus = (status?: string): Task[] => {
    return this.state.taskLists
      ? this.state.taskLists.filter((task) => task.status === status)
      : [];
  };

  getTasksCompletedOn = (dateTime: string): Task[] => {
    return this.state.taskLists
      ? this.state.taskLists.filter((task) => {
          if (!task.completedDateTime) return false;
          return moment
            .utc(task.completedDateTime.dateTime)
            .local()
            .isSame(dateTime, "day");
        })
      : [];
  };

  renderTasks = (tasks: Task[]) => {
    if (this.props.isAuthenticated) {
      return tasks.map((task) => {
        return (
          <>
            <Form.Check type="checkbox" />
            <span className={styles.taskText}>{task.title}</span>
            <br />
          </>
        );
      });
    }
  };

  chartData = () => {
    const groupedTasks = this.getGroupedTasks();
    return Object.keys(groupedTasks)
      .reverse()
      .map((date) => ({
        name: date,
        tasks: groupedTasks[date].length,
      }));
  };

  rowCount = () => this.chartData().length - 1;
  aspect = () => 15 / this.rowCount();

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated && this.state.taskLists.length < 1) {
      this.getTasks();
    }

    return (
      <>
        <NavBar />
        <Container style={{ marginTop: "100px" }}>
          <Row>
            <Col md={9}>
              <Row>
                <Col md={4}>
                  <SimpleCard
                    content={
                      <span className={styles.cardText}>
                        {this.getTaskByStatus("notStarted")?.length.toString()}
                      </span>
                    }
                    title="Total open tasks"
                  />
                </Col>
                <Col md={4}>
                  <SimpleCard
                    content={
                      <span className={styles.cardText}>
                        {this.getTaskByStatus("completed")?.length.toString()}
                      </span>
                    }
                    title="Total completed tasks"
                  />
                </Col>
                <Col md={4}>
                  <SimpleCard
                    content={
                      <span className={styles.cardText}>
                        {this.getTasksCompletedOn(
                          moment().format()
                        ).length.toString()}
                      </span>
                    }
                    title="Total completed tasks today"
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={12}>
                  <SimpleCard
                    content={
                      <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                          width={200}
                          height={60}
                          data={this.chartData()}
                          margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis dataKey="tasks" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="tasks"
                            stroke="#08D9D6"
                            fill="#08D9D6"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    }
                    title="Total completed tasks"
                  />
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <TaskList taskLists={this.state.taskLists} />
              <HashtagTasks />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuthProvider(Dashboard);
