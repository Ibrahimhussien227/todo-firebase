import React, { useEffect, useRef, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

const TodoForm = ({ onSumbit, edit }) => {
  const [input, setInput] = useState(edit ? edit.value : "");
  const [day, setDay] = useState(edit ? edit.date.toDate() : new Date());

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSumbit(input, day);

    setInput("");
    setDay(new Date());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit} className="flex justify-between">
        {edit ? (
          <>
            {" "}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2 w-full text-xl"
              type="text"
              placeholder="Update your item"
              ref={inputRef}
            />
            <div className="p-1">
              <div className="flex gap-4 justify-start items-center">
                <p>Choose a day</p>
                <BsCalendar />
              </div>
              <DatePicker value={day} onChange={(day) => setDay(day)} />
            </div>
            <button
              className="border p-4 ml-2 bg-purple-500 text-slate-100"
              type="submit"
            >
              <MdOutlinePublishedWithChanges size={30} />
            </button>
          </>
        ) : (
          <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2 w-full text-xl"
              type="text"
              placeholder="Add Todo"
              ref={inputRef}
            />
            <div className="p-1">
              <div className="flex gap-4 justify-start items-center">
                <p>Choose a day</p>
                <BsCalendar />
              </div>
              <DatePicker value={day} onChange={(day) => setDay(day)} />
            </div>
            <button
              className="border p-4 ml-2 bg-purple-500 text-slate-100"
              type="submit"
            >
              <AiOutlinePlus size={30} />
            </button>
          </>
        )}
      </form>
    </MuiPickersUtilsProvider>
  );
};

export default TodoForm;
