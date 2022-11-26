import React, { useEffect, useRef, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { set } from "date-fns";
// import {
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   list,
// } from "firebase/storage";

// import { storage } from "../firebase/firebase";

const TodoForm = ({ onSumbit, edit }) => {
  const [input, setInput] = useState(edit ? edit.value : "");
  const [day, setDay] = useState(edit ? edit.date.toDate() : new Date());
  const [fileUpload, setFileUpload] = useState(null);
  const [fileName, setFileName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSumbit(input, day, fileUpload);

    setInput("");
    setFileUpload(null);
    setFileName("");
    setDay(new Date());
  };

  const uploadChange = (e) => {
    setFileUpload(e.target.files[0]);

    setFileName(e.target.files[0].name);
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
              <div className="flex">
                <label
                  htmlFor="upload"
                  className="block p-3 border text-sm w-14 bg-purple-500 text-slate-100 cursor-pointer"
                >
                  <AiOutlineUpload size={30} />
                </label>
                <input
                  type="file"
                  id="upload"
                  name=""
                  style={{ display: "none", visibility: "hidden" }}
                  onChange={(e) => {
                    uploadChange(e);
                  }}
                />
                <p>{fileName}</p>
              </div>
            </div>

            <button
              className="border p-3 ml-2 bg-purple-500 text-slate-100"
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
