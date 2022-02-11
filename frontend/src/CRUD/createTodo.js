import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbarComponent";
// import { DatePicker } from '@appbaseio/reactivesearch';

const axios = require("axios");


// function updateCurrentState() {
// 	const token = localStorage.getItem("token");

// 	axios({
// 		method: "GET",
// 		url: "http://127.0.0.1:5000/get_user",
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

function CreateTodo() {
	const token = localStorage.getItem("token");
	const history = useHistory();

	return (
		<div>
			{token && token !== "" && token !== undefined ? (
				<div>
					<Navbar />
					<div className="flex justify-center">
						<div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
							<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
								Card title
							</h5>
							<div className="text-gray-700 text-base mb-4">
								<div className="flex justify-center">
									<div className="mb-3 xl:w-96">
										<label
											htmlFor="exampleText0"
											className="form-label inline-block mb-2 text-gray-700">
											Text input
										</label>
										<input
											type="text"
											className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											id="exampleText0" 
                                            placeholder="Text input"
                                        ></input>
                                        <div class="flex items-center justify-center">
											<div class="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
												<input type="text"
												class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
												placeholder="Select a date" data-mdb-toggle="datepicker" />
												<label for="floatingInput" class="text-gray-700">Select a date</label>
											</div>
										</div>
										{/* <DatePicker componentId="DateSensor" dataField="mtime" /> */}
									</div>
								</div>
								due_time urgency
							</div>
							<button
								type="button"
								className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
								Button
							</button>
						</div>
					</div>
				</div>
			) : (
				history.push("/login")
			)}
		</div>
	);
}

export default CreateTodo;
