import React, {forwardRef, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Navbar from "./navbarComponent";
import DatePicker, {CalendarContainer} from "react-datepicker";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {format} from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
const axios = require("axios");

const ButtonInput = forwardRef(({value, onClick}, ref) => (
	<button
		onClick={onClick}
		ref={ref}
		type="button"
		className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500">
		{format(new Date(value), "dd MMMM yyyy")}
	</button>
));

function CreateTodo() {
	const token = localStorage.getItem("token");
	const history = useHistory();
	const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date().setMonth(startDate.getMonth() + 1))

    useEffect(() => {
        if (startDate > endDate) setStartDate(endDate)
    }, [endDate])

    useEffect(() => {
        if (startDate > endDate) setEndDate(startDate)
    }, [startDate])

	const [dueDateStart, setDueDateStart] = useState(new Date(startDate.getDate));
	const [dueDateEnd, setDueDateEnd] = useState(new Date().setMonth(dueDateStart.getMonth() + 1))

	useEffect(() => {
		if (dueDateStart > dueDateEnd) setDueDateStart(dueDateStart);
	}, [dueDateStart]);

	useEffect(() => {
		if (dueDateStart > dueDateEnd) setDueDateEnd(dueDateEnd);
	}, [dueDateEnd]);


	return (
		<div>
			{token && token !== "" && token !== undefined ? (
				<div>
					<Navbar />
					<div className="flex justify-center">
						<div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
							<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2"> Card title </h5>
							<div className="text-gray-700 text-base mb-4">
								<div className="flex justify-center">
									<div className="mb-3 xl:w-96">
										<label htmlFor="exampleText0" className="form-label inline-block mb-2 text-gray-700"> Text input </label>
										<input type="text" className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"id="exampleText0" placeholder="Text input"></input>
										<div className="flex items-center justify-center">
											<div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
												<input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Select a date" data-mdb-toggle="datepicker"/>
												<label htmlFor="floatingInput" className="text-gray-700"> Select a date </label>
											</div>
										</div>
										<div className="flex items-center justify-center">
											<div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
												<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} nextMonthButtonLabel=">" nextYearButtonLabel=">" previousMonthButtonLabel="<" popperClassName="react-datepicker-right" customInput={<ButtonInput /> }
													renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled,nextMonthButtonDisabled,}) => (
														<div className="flex items-center justify-between px-2 py-2">
															<span className="text-lg text-gray-700">
																{format( date, "MMMM yyyy")}
															</span>
															<div className="space-x-2">
																<button onClick={ decreaseMonth }
																	disabled={ prevMonthButtonDisabled }
																	type="button" className={`${ prevMonthButtonDisabled && "cursor-not-allowed opacity-50"} inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 `}>
																	<ChevronLeftIcon className="w-5 h-5 text-gray-600" />
																</button>
																<button
																	onClick={ increaseMonth }
																	disabled={ nextMonthButtonDisabled}
																	type="button" className={` ${ nextMonthButtonDisabled && "cursor-not-allowed opacity-50" } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500`}>
																	<ChevronRightIcon className="w-5 h-5 text-gray-600" />
																</button>
															</div>
														</div>
													)}
												/>
											</div>
										</div>
										<div className="flex items-center justify-center">
											<div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
										<DatePicker selected={dueDateStart} onChange={(date) => setStartDate(date)} selectsStart startDate={dueDateStart} endDate={dueDateEnd} nextMonthButtonLabel=">" nextYearButtonLabel=">" previousMonthButtonLabel="<" popperClassName="react-datepicker-right" customInput={<ButtonInput /> }
													renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled,nextMonthButtonDisabled,}) => (
														<div className="flex items-center justify-between px-2 py-2">
															<span className="text-lg text-gray-700">
																{format( date, "MMMM yyyy")}
															</span>
															<div className="space-x-2">
																<button onClick={ decreaseMonth }
																	disabled={ prevMonthButtonDisabled }
																	type="button" className={`${ prevMonthButtonDisabled && "cursor-not-allowed opacity-50"} inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 `}>
																	<ChevronLeftIcon className="w-5 h-5 text-gray-600" />
																</button>
																<button
																	onClick={ increaseMonth }
																	disabled={ nextMonthButtonDisabled}
																	type="button" className={` ${ nextMonthButtonDisabled && "cursor-not-allowed opacity-50" } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500`}>
																	<ChevronRightIcon className="w-5 h-5 text-gray-600" />
																</button>
															</div>
														</div>
													)}
												/>
												</div>
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
