import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<div className="todo"style={{border: "1px solid red"}}>
				<h1>ToDos</h1>
					<form type="submit">
						<input type="text" placeholder="Name"/>
					</form>
			</div>
		</div>
	);
};
