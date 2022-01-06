import * as React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import "./index.module.css";
import {
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { TaskLister } from "../../components/TaskLister";
import { Task, TaskList } from "../../interfaces";
import NavBar from "../../components/HomePage/NavBar";
import withAuthProvider, {
  AuthComponentProps,
} from "../../components/Authentication/AuthProvider";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import styles from "./index.module.css";
import moment from "moment";
import { CompletedTaskLister } from "../../components/CompletedTaskLister";

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

  baseUrl = "https://graph.microsoft.com/v1.0/me/";

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
        this.setState({ taskLists: data.value });
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

  getGroupedTasks = () => {
    let finalObj: any = {};
    if (this.state) {
      this.state.tasks?.forEach((task) => {
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
    return this.state.tasks
      ? this.state.tasks.filter((task) => task.status === status)
      : [];
  };

  getOpenTasks = () => {
    return this.state.tasks
      ? this.state.tasks.filter((task) => task.status !== "completed")
      : [];
  };

  getTasksCompletedOn = (dateTime: string): Task[] => {
    return this.state.tasks
      ? this.state.tasks.filter((task) => {
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
    const sortedDates = Object.keys(groupedTasks)
      .sort(function (a, b) {
        return new Date(b).getTime() - new Date(a).getTime();
      })
      // Setting the cap at 30 days
      .slice(0, 29);

    return sortedDates.map((date) => ({
      name: date,
      tasks: groupedTasks[date].length,
    }));
  };

  rowCount = () => this.chartData().length - 1;
  aspect = () => 15 / this.rowCount();
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
                  <SimpleCard
                    isLoading={this.state.loading}
                    content={
                      <span className={styles.cardText}>
                        {this.getOpenTasks()?.length.toString()}
                      </span>
                    }
                    title="Total open tasks"
                  />
                </Col>
                <Col md={4}>
                  <SimpleCard
                    isLoading={this.state.loading}
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
                    isLoading={this.state.loading}
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
                    isLoading={this.state.loading}
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
                    title="Total completed tasks(last 30 days)"
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
