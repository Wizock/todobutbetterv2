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
import token from "../tokenFetcher";
const axios = require("axios");

const editData = (id) => {
    console.log(id);
    axios({
        method: "POST",
        url: `/crud/task/edit/${id}`,
        mode: "cors",
        cache: "force-cache",
        credentials: "same-origin",
        "Access-Control-Allow-Origin": "*", // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
};

const deleteData = (id) => {
    console.log(id);
    axios({
        method: "POST",
        url: `/crud/task/delete/${id}`,
        mode: "cors",
        cache: "force-cache",
        credentials: "same-origin",
        "Access-Control-Allow-Origin": "*", // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
};


async function GetUserTodos() {
	const [todoQueries, setTodoQueries] = useState([]);
	await useEffect(() => {
		axios({
			method: "GET",
			url: "/crud/task/show",
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
                                    <Button onClick={(e) => deleteData(todoQuery.id)} size="small">Delete</Button>
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
	const history = useHistory();

    return (
        <div>
            {token !== localStorage.getItem("token") ? (
				
                history.push("/login")
			) : (
                <div>
                <Navbar />

                <GetUserTodos />
                </div>
                )
            }
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

