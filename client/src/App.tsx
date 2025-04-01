import "./App.css";
import api from "../src/services/webApi";
import { useEffect, useState } from "react";
import { todo } from "./Interfaces/todo";
import { dependency } from "./Interfaces/dependency";
import ToDoList from "./components/ToDos/ToDoList";
import FilterPanel from "./components/Filters/FilterPanel";
import _debounce from "lodash/debounce";
import CreateToDos from "./components/CreateToDos";
import { valuePair } from "./Interfaces/valuePair";
import getDays from "./utility/DayCalculation";

import Pagination from "./components/Pagination";
import RadionButtonFilter from "./components/Filters/RadioButton/RadionButtonFilter";

import Modal from "./components/Modals/Modal";
import ErrorModal from "./components/Modals/ErrorModal";

import DependencyToDoList from "./components/ToDos/DependencyToDoList";
import STATUS from "./Enums/Status";

const App = () => {
  const todosPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  let [todo, setToDo] = useState<todo>();
  const [todos, setToDos] = useState<todo[]>([]);

  const [parentTodoForDependency, setParentToDoForDependency] =
    useState<todo>();
  const [dependencyToDos, setDependencyToDos] = useState<todo[]>([]);

  const [AddDependencies, setAddDependencies] = useState<dependency>({
    Ids: [],
    Objects: [],
  });

  const [priority, setPriority] = useState<string>("High");
  const [status, setStatus] = useState<string>("Done");
  const [interval, setInterval] = useState<valuePair>({ type: "", value: "" });
  const [searchText, setSearchText] = useState<string>("");

  const [priorityEdit, setPriorityEdit] = useState<string>("");
  const [statusEdit, setStatusEdit] = useState<string>("");
  const [dateEdit, setDateEdit] = useState<string>("");
  const [titleEdit, setTitleEdit] = useState<string>("");

  const [priorityForSave, setPriorityForSave] = useState<string>("High");
  const [intervalForSave, setIntervalForSave] = useState<valuePair>({
    type: "",
    value: "",
  });
  const [titleForSave, setTitleForSave] = useState<string>("");

  const [openDone, setOpenDone] = useState(false);
  const [openEdit, setOpenDEdit] = useState(false);
  const [openDependency, setOpenDependency] = useState(false);
  const [required, setRequired] = useState(false);

  const editToDo = (e: any) => {
    setToDo(e);
    setOpenDEdit(true);
  };

  const editToDoHandle = () => {
    const editableObj = {
      ...todo,
      status: "NotDone",
      priority: "High",
      date: "2025-04-02",
      title: "Unit Testing",
      dependancy: AddDependencies.Ids,
    };

    console.log("Edit object", editableObj);
    api
      .editTodo(editableObj)
      .then((data) => {
        handleEditClose();
        loadView();
        setAddDependencies({
          Ids: [],
          Objects: [],
        });
        console.log(data);
      })
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
    setParentToDoForDependency(e);
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
    api
      .editTodo({ ...todo, status: STATUS.DONE })
      .then((data) => {
        viewDependency(parentTodoForDependency);
      })
      .catch((error) => console.log(error));
  };

  const loadView = () => {
    api
      .getToDosByFilter(priority, status, searchText, interval)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    console.log("Interval changes in use efect", interval.value);
    api
      .getToDosByFilter(priority, status, searchText, interval)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  }, [priority, status, searchText, interval.type, interval.value]);

  const handleInsert = () => {
    if (!titleForSave) {
      setRequired(true);
      return;
    }

    const getBody: any = () => {
      switch (intervalForSave.type) {
        case "Date":
          const bodyDate = [
            {
              date: intervalForSave.value,
              priority: priorityForSave,
              status: "NotDone",
              title: titleForSave,
            },
          ];
          return bodyDate;

        case "Week":
          const bodyWeek = [
            getDays.getDaysByWeek(intervalForSave.value).map((date) =>
              `{
              "date": "${date}",
              "priority": "${priorityForSave}",
              "status": "NotDone",
              "title": "${titleForSave}",
              "dependancy": []
            }`.trim()
            ),
          ];
          return bodyWeek;

        case "Month":
          const bodyMonth = [
            getDays.getDaysByWeek(intervalForSave.value).map((e) =>
              `{
          "date": "",
          "priority": "${priorityForSave}",
          "status": "NotDone",
          "title": "${titleForSave}",
          "dependancy": []
        }`.trim()
            ),
          ];
          return bodyMonth;
      }
    };

    console.log("Body : ", getBody());

    api
      .saveTodos(getBody())
      .then((e) => {
        setTitleForSave("");
        loadView();
        setStatus("NotDone");

        console.log("Data saved", e);
      })
      .catch((error) => console.log(error));
  };

  const handleRequiredClose = () => {
    setRequired(false);
  };

  const handleClose = () => {
    setOpenDone(false);
  };

  const handleOpen = () => {
    setOpenDone(true);
  };

  const handleEditClose = () => {
    setOpenDEdit(false);
  };

  const handleDependencyClose = () => {
    setOpenDependency(false);
  };

  const lastPostIndex = currentPage * todosPerPage;
  const firstPostIndex = lastPostIndex - todosPerPage;
  const currentToDos = todos.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Modal isOpen={openDone} onClose={handleClose}>
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
      </Modal>
      <Modal isOpen={openEdit} onClose={handleEditClose}>
        <>
          <div className="resp-table-caption">Edit a Task</div>
          <div className="resp-table-body">
            <div className="resp-table-row ">
              <div className="table-body-cell-non">
                <RadionButtonFilter
                  setFunction={setPriorityEdit}
                  buttonsProperty={[
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />
              </div>
              <div className="table-body-cell-non">
                <RadionButtonFilter
                  setFunction={setStatusEdit}
                  buttonsProperty={[
                    { label: "Done", value: "Done" },
                    { label: "Not done", value: "NotDone" },
                  ]}
                />
              </div>

              <div className="table-body-cell-non">
                <input
                  type="Date"
                  id="start"
                  name="start"
                  min="2018-03"
                  value={todo?.date}
                  onChange={(e: any) => setDateEdit(e.target.value)}
                />
              </div>
            </div>

            <div className="resp-table-row">
              <div className="table-body-cell-non">
                <label className="title">Title</label>
                <input
                  id="input-box"
                  type="text"
                  className="input-box"
                  value={todo?.title.toString()}
                  onChange={(e) => setTitleEdit(e.target.value)}
                />
              </div>
              <div className="table-body-cell-non">
                <div className="resp-table-row">
                  <div className="table-body-cell-non">
                    <label className="title">Add dependencies</label>
                  </div>
                  <div className="table-body-cell-non icon">
                    <h1 onClick={() => setOpenDependency(true)}>+</h1>
                  </div>
                </div>
              </div>
              <div className="table-body-cell-non">
                <div className="table-body-cell-non">
                  <button className="save-button" onClick={editToDoHandle}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="resp-table-body">
            {AddDependencies.Objects?.map((todo) => (
              <div className="resp-table-row" key={todo._id}>
                <div className="table-body-cell">{todo.date}</div>
                <div className="table-body-cell">{todo.title}</div>
                <div className="table-body-cell">{todo.status}</div>
                <div className="table-body-cell">{todo.priority}</div>
              </div>
            ))}
          </div>
        </>
      </Modal>

      <Modal isOpen={openDependency} onClose={handleDependencyClose}>
        <div>
          Add dependencies are yet to be implemented Sorry for the
          inconvenience.....
        </div>
        <FilterPanel
          setPriority={setPriority}
          setStatus={setStatus}
          setInterval={setInterval}
          setSearchText={setSearchText}
        />
        <DependencyToDoList
          todos={currentToDos}
          setDependencies={setAddDependencies}
          onClose={handleDependencyClose}
        />

        <Pagination
          totalToDos={todos.length}
          toDosPerPage={todosPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Modal>

      <ErrorModal isOpen={required} onClose={handleRequiredClose}>
        <div className="required">* Title is a rerquired field !</div>
      </ErrorModal>

      <FilterPanel
        setPriority={setPriority}
        setStatus={setStatus}
        setInterval={setInterval}
        setSearchText={setSearchText}
      />

      <ToDoList
        todos={currentToDos}
        editToDo={editToDo}
        deleteDoTo={deleteDoTo}
        doneDoTo={doneDoTo}
      />
      <Pagination
        totalToDos={todos.length}
        toDosPerPage={todosPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
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
function useref(arg0: string) {
  throw new Error("Function not implemented.");
}
