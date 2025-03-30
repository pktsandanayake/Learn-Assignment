import "./App.css";
import api from "../src/services/webApi";
import { useEffect, useState } from "react";
import { todo } from "./Interfaces/todo";
import ToDoList from "./components/ToDos/ToDoList";
import FilterPanel from "./components/Filters/FilterPanel";
import _debounce from "lodash/debounce";
import CreateToDos from "./components/CreateToDos";
import { valuePair } from "./Interfaces/valuePair";
import getDays from "./utility/DayCalculation";

import EditToDoModal from "./components/Modals/EditToDoModal";
const App = () => {
  const [todos, setToDos] = useState<todo[]>([]);
  const [dependencyToDos, setDependencyToDos] = useState<todo[]>([]);

  const [priority, setPriority] = useState<string>("High");
  const [status, setStatus] = useState<string>("Done");
  const [interval, setInterval] = useState<valuePair>({ type: "", value: "" });
  const [searchText, setSearchText] = useState<string>("");

  const [priorityForSave, setPriorityForSave] = useState<string>("High");
  const [intervalForSave, setIntervalForSave] = useState<valuePair>({
    type: "",
    value: "",
  });
  const [titleForSave, setTitleForSave] = useState<string>("");
  const editToDo = (e: any) => {
    api
      .editTodos(e)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const deleteDoTo = (e: any) => {
    api
      .deleteTodo(e)
      .then((data) => {
        loadView();
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const doneDoTo = (e: any) => {
    api
      .getToDosByDependency(e)
      .then((data) => {
        setDependencyToDos(data);
        if (data.length > 0) handleOpen();
      })
      .catch((error) => console.log(error));
  };

  const viewDependency = (e: any) => {
    api
      .getToDosByDependency(e)
      .then((data) => {
        setDependencyToDos(data);
      })
      .catch((error) => console.log(error));
  };

  const doneDoToComplete = (todo: any) => {
    todo.status = "Done";
    api
      .editTodos(todo)
      .then((data) => {
        viewDependency(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const loadView = () => {
    api
      .getToDosByFilter(priority, status, searchText)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    api
      .getToDosByFilter(priority, status, searchText)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  }, [priority, status, searchText]);

  const handleInsert = () => {
    const getBody: any = () => {
      switch (intervalForSave.type) {
        case "Date":
          return [
            {
              date: intervalForSave.value,
              priority: priorityForSave,
              status: "NotDone",
              title: titleForSave,
            },
          ];

        case "Week":
          return [
            getDays.getDaysByWeek(intervalForSave.value).map((e) =>
              `{
              "date": "${e[2]}-${e[1]}-${e[0]}",
              "priority": "${priorityForSave}",
              "status": "NotDone",
              "title": "${titleForSave}",
              "dependancy": []
            }`.trim()
            ),
          ];
      }
    };

    api
      .saveTodos(getBody())
      .then((e) => {
        setStatus("NotDone");
        loadView();
        console.log("Data saved", e);
      })
      .catch((error) => console.log(error));
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "block",
          padding: 30,
          margin: "auto",
        }}
      >
        <EditToDoModal isOpen={open} onClose={handleClose}>
          <>
            <div className="resp-table-caption">
              You have Following Dependencies
            </div>
            <div className="resp-table">
              <div className="resp-table-header">
                <div className="table-header-cell">Date</div>
                <div className="table-header-cell">Title</div>
                <div className="table-header-cell">Status</div>
                <div className="table-header-cell">Priority</div>
                <div className="table-header-cell">Action</div>
                <div className="table-body-cell"></div>
                <div className="table-body-cell"></div>
              </div>
              <div className="resp-table-body">
                {dependencyToDos?.map((todo) => (
                  <div className="resp-table-row" key={todo._id}>
                    <div className="table-body-cell">{todo.date}</div>
                    <div className="table-body-cell">{todo.title}</div>
                    <div className="table-body-cell">{todo.status}</div>
                    <div className="table-body-cell">{todo.priority}</div>

                    <div className="table-body-cell">
                      <span className="icon">
                        <img
                          src={require("../src/components/Filters/Images/done.png")}
                          onClick={() => doneDoToComplete(todo)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        </EditToDoModal>
      </div>
      <FilterPanel
        setPriority={setPriority}
        setStatus={setStatus}
        setInterval={setInterval}
        setSearchText={setSearchText}
      />
      <ToDoList
        todos={todos}
        editToDo={editToDo}
        deleteDoTo={deleteDoTo}
        doneDoTo={doneDoTo}
      />
      <CreateToDos
        setPriority={setPriorityForSave}
        setInterval={setIntervalForSave}
        setTitle={setTitleForSave}
        handleInsert={handleInsert}
      />
    </div>
  );
};

export default App;
