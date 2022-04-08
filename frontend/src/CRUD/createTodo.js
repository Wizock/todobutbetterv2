import React, { useState, } from "react";
import {useHistory} from "react-router-dom";
import Navbar from "./navbarComponent";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import TimePicker from '@mui/lab/TimePicker';
const axios = require("axios");

function CreateTodo() {
	let phaseCounter = 1;
	const token = localStorage.getItem("token");
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [priority,    setPriority] = useState("");
	const [description, setDescription] = useState("");

	const [startingDateValue, setStartingDateValue] = useState(new Date().toLocaleString().split(',')[0]);
	const [dueDateValue, setDueDateValue]           = useState(new Date().toLocaleString().split(',')[0]);
	const [dueTimeValue, setDueTimeValue]           = useState(new Date().toLocaleString().split(',')[1]);
	const [phaseState, setPhaseState ] = useState(phaseCounter);

	
	const FirstPhase = () => {
		return (
			<div>
				<div className=" flex content-center items-center justify-center h-full flex justify-center ">
					<div className=" block p-6 rounded-lg shadow-lg bg-white max-w-sm w-full lg:w-4/10 px-4 ">
						<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 w-full lg:w-4/10 px-4"> Create a Todo Task </h5>
						<div className="text-gray-700 text-base mb-4">
							<div className="flex justify-center">
								<div className="w-full lg:w-4/10 px-4">
									<div className="mt-3 flex items-center justify-center">
										<Stack spacing={3}>
											<TextField id="outlined-basic title" className="title"  label="Task Title" variant="outlined"  />
											<TextField  id="outlined-number priority" label="priority" helperText="1 - 100. Make sure the number is positive" type="number" InputLabelProps={{shrink: true, }}/>
											<TextField  id="outlined-multiline-flexible description" label="Task Description" multiline rows={4} />
										</Stack>
									</div>
								</div>
							</div>
						</div>
						<button  type="button" onClick={()=>{
							setTitle(document.getElementById("outlined-basic title").value);
							setPriority(document.getElementById("outlined-number priority").value);
							setDescription(document.getElementById("outlined-multiline-flexible description").value);

							if (phaseCounter >= 2) { phaseCounter = 0;}
							phaseCounter++;
							setPhaseState(phaseCounter);					

						}}
							className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
							next
						</button>
					</div>
				</div>
			</div>
		);
	};
	const handleChangesetStartingDateValue = (newValue) => {
		setStartingDateValue(newValue);
	};
	const handleChangesetDueDateValue = (newValue) => {
		setDueDateValue(newValue);
	};
	const handleChangesetDueTimeValue = (newValue) => {
		setDueTimeValue(newValue);
	};
	const SecondPhase= () => {
		
		return (
			<div>
			<div className=" flex content-center items-center justify-center h-full flex justify-center ">
					<div className=" block p-6 rounded-lg shadow-lg bg-white max-w-sm w-full lg:w-4/10 px-4 ">
						<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 w-full lg:w-4/10 px-4"> Create a Todo Task </h5>
						<div className="text-gray-700 text-base mb-4">
							<div className="flex justify-center">
								<div className="w-full lg:w-4/10 px-4">
									<div className="mt-3 flex items-center justify-center">
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<Stack spacing={3}>
												<DatePicker label="Initial Date" inputFormat="dd/MM/yyyy" value={startingDateValue} onChange={handleChangesetStartingDateValue} renderInput={(params1) => <TextField {...params1} />}/>
												<DatePicker label="Due Date"     inputFormat="dd/MM/yyyy" value={dueDateValue}      onChange={handleChangesetDueDateValue}           renderInput={(params2) => <TextField {...params2} />}/>
												<TimePicker label="Time Due"                              value={dueTimeValue}      onChange={handleChangesetDueTimeValue}            renderInput={(params3) => <TextField {...params3} />}/>
											</Stack>
										</LocalizationProvider>
									</div>
								</div>
							</div>
						</div>
						<button onClick={()=>{							
							handleSubmit();
						}} type="button"
							className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
							submit
						</button>
					</div>
				</div>
			</div>
			
		);
	};


	function phaseReturns() {
		if (phaseState === 1) {
			return (<FirstPhase />)
		} else if (phaseState === 2) {
			return (<SecondPhase />)
		}
	}
	
	const handleSubmit = () => {
		axios({
			method: "POST",
			url: "http://127.0.0.1:5000/task/create",
			data: JSON.stringify({
				'title': title,
				'description': description,
				'priority': priority,
				'startingDateValue': startingDateValue.toLocaleString().split(',')[0],
				'dueDateValue': dueDateValue.toLocaleString().split(',')[0],
				'dueTimeValue': dueTimeValue.toLocaleString().split(',')[1],
			}),
			mode: "cors",
			cache: "force-cache",
			credentials: "same-origin",
			"Access-Control-Allow-Origin": "*", // include, *same-origin, omit
			headers: {
				
				'Content-Type': 'application/json',
            	Authorization: `Bearer ${token}`,
			},
		})
		console.log({'title': title,
		'description': description,
		'priority': priority,
		'startingDateValue': startingDateValue,
		'dueDateValue': dueDateValue,
		'dueTimeValue': dueTimeValue,});
		history.push('/')							

	};

	return (
		<div>
			{token && token !== "" && token !== undefined ? (
				<div>
					<Navbar />
					{phaseReturns()}
				</div>
			) : (
				history.push("/login")
			)
		}
	</div>);
}
export default CreateTodo;

