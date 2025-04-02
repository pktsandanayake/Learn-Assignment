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
import getDays from "./components/Filters/helpers/DayCalculation";

import Pagination from "./components/Pagination";
import RadionButtonFilter from "./components/Filters/RadioButton/RadionButtonFilter";

import Modal from "./components/Modals/Modal";
import DependencyToDoList from "./components/ToDos/DependencyToDoList";
import STATUS from "./Enums/Status";
import MessagModal from "./components/Modals/MessagModal";
import debounce from "lodash/debounce";
import STRING from "./Enums/String";
import PRIORITY from "./Enums/Priority";
import FilterPanelDependency from "./components/Filters/FilterPanelDependency";

const App = () => {
  const todosPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageForCompletedToDos, setCurrentPageForCompletedToDos] =
    useState(1);

  const [todo, setToDo] = useState<todo>({
    _id: STRING.EMPTY,
    priority: STRING.EMPTY,
    status: STRING.EMPTY,
    date: STRING.EMPTY,
    title: STRING.EMPTY,
    dependancy: [],
  });
  const [todos, setToDos] = useState<todo[]>([]);

  const [completedToDos, setCompletedToDos] = useState<todo[]>([]);

  const [parentTodoForDependency, setParentToDoForDependency] =
    useState<todo>();
  const [dependencyToDos, setDependencyToDos] = useState<todo[]>([]);

  const [AddDependencies, setAddDependencies] = useState<dependency>({
    Ids: [],
    Objects: [],
  });

  const [priority, setPriority] = useState<string>(PRIORITY.HIGH);
  const [status, setStatus] = useState<string>(STATUS.DONE);
  const [interval, setInterval] = useState<valuePair>({
    type: STRING.EMPTY,
    value: STRING.EMPTY,
  });
  const [searchText, setSearchText] = useState<string>(STRING.EMPTY);

  const [priorityCompleted, setPriorityCompleted] = useState<string>(
    PRIORITY.HIGH
  );
  const [searchTextCompleted, setSearchTextCompleted] = useState<string>(
    STRING.EMPTY
  );
  const [intervalCompleted, setIntervalCompleted] = useState<valuePair>({
    type: STRING.EMPTY,
    value: STRING.EMPTY,
  });

  const [priorityForSave, setPriorityForSave] = useState<string>(PRIORITY.HIGH);
  const [intervalForSave, setIntervalForSave] = useState<valuePair>({
    type: STRING.EMPTY,
    value: STRING.EMPTY,
  });
  const [titleForSave, setTitleForSave] = useState<string>(STRING.EMPTY);

  const [openDone, setOpenDone] = useState(false);
  const [openEdit, setOpenDEdit] = useState(false);
  const [openDependency, setOpenDependency] = useState(false);
  const [required, setRequired] = useState(false);
  const [recordSave, setRecordSave] = useState(false);

  const setPriorityEdit = (e: any) => {
    setToDo({ ...todo, priority: e });
  };

  const setStatusEdit = (e: any) => {
    setToDo({ ...todo, status: e });
  };

  const loadFilteredDoDos = () => {
    api
      .getToDosByFilter(priority, status, searchText, interval)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
  };

  const loadNotCompletedDoDos = () => {
    api
      .getToDosByFilter(
        priorityCompleted,
        STATUS.NOTDONE,
        searchTextCompleted,
        intervalCompleted
      )
      .then((data) => setCompletedToDos(data))
      .catch((error) => console.log(error));
  };

  const editToDo = (e: any) => {
    setToDo(e);
    setOpenDEdit(true);
  };

  const editToDoHandle = () => {
    const editableObj = {
      ...todo,
      dependancy: todo.dependancy.concat(AddDependencies.Ids),
    };

    api
      .editTodo(editableObj)
      .then((data) => {
        handleEditClose();
        loadFilteredDoDos();
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
        loadFilteredDoDos();
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
        if (data.length > 0) {
          handleOpen();
        } else {
          doneDoToComplete(e);
        }
      })
      .catch((error) => console.log(error));
  };

  const doneDoToComplete = (todo: any) => {
    api
      .editTodo({ ...todo, status: STATUS.DONE })
      .then((data) => {
        setRecordSave(true);
        viewDependency(parentTodoForDependency);
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

  const _debounce = debounce(() => {
    loadFilteredDoDos();
  }, 500);

  const _debounceCompleted = debounce(() => {
    loadNotCompletedDoDos();
  }, 500);

  useEffect(() => {
    _debounceCompleted();
    _debounce();
  }, [
    priority,
    status,
    searchText,
    interval,
    priorityCompleted,
    searchTextCompleted,
  ]);

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
              status: STATUS.DONE,
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
              "status":  ${STATUS.NOTDONE},
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
          "status": ${STATUS.NOTDONE},
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
        loadFilteredDoDos();
        setStatus(STATUS.NOTDONE);
        setRecordSave(true);
        console.log("Data saved", e);
      })
      .catch((error) => console.log(error));
  };

  const handleRecordSavedClose = () => {
    setRecordSave(false);
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
                  onChange={(e) => setToDo({ ...todo, date: e.target.value })}
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
                  onChange={(e) => setToDo({ ...todo, title: e.target.value })}
                />
              </div>
              <div className="table-body-cell-non">
                <div className="resp-table-row">
                  <div className="table-body-cell-non">
                    <label className="title">Add dependencies</label>
                  </div>
                  <div className="table-body-cell-non icon">
                    <h1
                      onClick={() => {
                        loadNotCompletedDoDos();
                        setOpenDependency(true);
                      }}
                    >
                      +
                    </h1>
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
        <FilterPanelDependency
          setPriority={setPriorityCompleted}
          setInterval={setIntervalCompleted}
          setSearchText={setSearchTextCompleted}
        />
        <DependencyToDoList
          todos={completedToDos.slice(
            currentPageForCompletedToDos * todosPerPage - todosPerPage,
            currentPageForCompletedToDos * todosPerPage
          )}
          setDependencies={setAddDependencies}
          onClose={handleDependencyClose}
        />

        <Pagination
          totalToDos={completedToDos.length}
          toDosPerPage={todosPerPage}
          setCurrentPage={setCurrentPageForCompletedToDos}
          currentPage={currentPageForCompletedToDos}
        />
      </Modal>

      <MessagModal isOpen={required} onClose={handleRequiredClose}>
        <div className="required">* Title is a rerquired field !</div>
      </MessagModal>

      <MessagModal isOpen={recordSave} onClose={handleRecordSavedClose}>
        <div className="save">Record saved....!</div>
      </MessagModal>

      <FilterPanel
        setPriority={setPriority}
        setStatus={setStatus}
        setInterval={setInterval}
        setSearchText={setSearchText}
      />

      <ToDoList
        todos={todos.slice(
          currentPage * todosPerPage - todosPerPage,
          currentPage * todosPerPage
        )}
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
