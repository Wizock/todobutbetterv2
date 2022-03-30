import React, {forwardRef, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Navbar from "./navbarComponent";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';

import TimePicker from '@mui/lab/TimePicker';
const axios = require("axios");

function CreateTodo() {
	//get todays date

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const token = localStorage.getItem("token");
	const history = useHistory();
	const [startingDateValue, setStartingDateValue] = useState(new Date());
	const [dueDateValue, setDueDateValue]           = useState(new Date());
	const [dueTimeValue, setDueTimeValue]           = useState(0);



	return (
		<div>
			{token && token !== "" && token !== undefined ? (
				<div>
					<Navbar />

					
					<div className=" flex content-center items-center justify-center h-full flex justify-center ">
						<div className=" block p-6 rounded-lg shadow-lg bg-white max-w-sm w-full lg:w-4/10 px-4 ">
							<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 w-full lg:w-4/10 px-4"> Card title </h5>
							<div className="text-gray-700 text-base mb-4">
								<div className="flex justify-center">
									<div className="w-full lg:w-4/10 px-4">
										<div className="mt-3 flex items-center justify-center">
										<Stack spacing={3}>
											<TextField id="outlined-basic" label="Task Title" variant="outlined" />

											<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker label="Initial Date" value={startingDateValue} onChange={(newValue) => {setStartingDateValue(newValue);}}renderInput={(params) => <TextField {...params} />}/>
											<DatePicker label="Due Date" value={dueDateValue} onChange={(newValue) => {setDueDateValue(newValue);}}renderInput={(params) => <TextField {...params} />}/>
											<TimePicker label="Time Due" value={dueTimeValue} onChange={(newValue) => { setDueTimeValue(newValue); }} renderInput={(params) => <TextField {...params} />}/>
											</LocalizationProvider>
										</Stack>
										</div>
									</div>
								</div>
							</div>
							<button type="button"
								className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
								Button
							</button>
						</div>
					</div>
				</div>
			) : (
				history.push("/login")
			)
			}
	</div>);

}
export default CreateTodo;

// function updateCurrentState() {
// 	const token = localStorage.getItem("token");

// 	axios({
// 		method: "GET",
// 		url: "http://127.0.0.1:5000/task/create",
// 		mode: "cors",
// 		cache: "force-cache", // *default, no-cache, reload, force-cache, only-if-cached
// 		credentials: "same-origin",
// 		"Access-Control-Allow-Origin": "*", // include, *same-origin, omit
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${token}`,
// 		},
// 	}).then((response) => {
// 		console.log();
// 	});
// }
