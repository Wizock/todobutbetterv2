import { compose } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import Navbar from "./navbarComponent";
const axios = require("axios");

function GetUserTodos() {
	const [todoQueries, setTodoQueries] = useState([]);
	const history = useHistory();
	const token = localStorage.getItem("token");
	useEffect(() => {
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/task/show",
			mode: "cors",
			cache: "force-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin",
			"Access-Control-Allow-Origin": "*", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			setTodoQueries(response.data);
		});
	}, []);

	let styles = {
		background: {
			backgroundColor: "#22273d",
			minHeight: "100vh",
		},
		cardCSS: {
			minWidth: 25,
			minHeight: 25,
			maxWidth: 310,
			maxHeight: 225,
			display: "flex-column",
			"margin-top": 10,
			color: "#fff",
			backgroundColor: "#383535",
		},
		text_color: {
			color: "#fff",
		},
		main: {
			marginLeft: "10px",
			marginRight: "10px",
			maxHeight: "85vh",
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			justifyContent: " start",
		},
	};
	return (
		<div style={styles.background}>
			<div>
				<div style={styles.main}>
					{todoQueries.map((todoQuery) => (
						<div id={todoQuery.id} key={todoQuery.id}>
							<Card variant="outlined" sx={styles.cardCSS}>
								<CardContent>
									<Typography sx={{ fontSize: 14 }} gutterBottom>
										{todoQuery.title}
									</Typography>
									<Typography variant="h5" component="div">
										{todoQuery.dueDateValue}
									</Typography>
									<Typography sx={{ mb: 1.5, color: styles.text_color }}>
										{todoQuery.description}
									</Typography>
									<Typography variant="body2">
										well meaning and kindly.
										<br />
										{'"a benevolent smile"'}
									</Typography>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}


function MainPage() {
    return (
        <div>
            <Navbar />
            <GetUserTodos />
        </div>
    );
}

export default MainPage;



{/* <div>
    <p> {todoQuery.startingDateValue}</p>
    <p> {todoQuery.dueTimeValue}</p>
    <p> {todoQuery.priority}</p>
    <p> {todoQuery.taskOwner}</p>
</div> */}

