import React, { useEffect, useState } from "react";
import FastAPIClient from "../../client";
import config from "../../config";
import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import DiaryTable from "../../components/DiaryTable";
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { NotLoggedIn } from "./NotLoggedIn";
import Loader from "../../components/Loader";
import PopupModal from "../../components/Modal/PopupModal";

const client = new FastAPIClient(config);

const ProfileView = ({ diaries }) => {
	return (
		<>
			<DiaryTable
				diaries={diaries}
				
				showUpdate={true}
			/>
			
		</>
	);
};

const DiaryDashboard = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState({ title: "", content: "", writedate: "" });
	const [diaryForm, setDiaryForm] = useState({
		title: "",
		content: "",
		writedate: "",
	});

	const [showForm, setShowForm] = useState(false);
	const [diaries, setDiaries] = useState([]);

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(true);

	useEffect(() => {
		fetchUserDiaries();
	}, []);

	const fetchUserDiaries = () => {
		client.getUserDiaries().then((data) => {
			setRefreshing(false);
			setDiaries(data?.results);
		});
	};

	const onCreateDiary = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);

		if (diaryForm.title.length <= 0) {
			setLoading(false);
			return setError({ title: "Please Enter Diary Title" });
		}
		if (diaryForm.content.length <= 0) {
			setLoading(false);
			return setError({ content: "Please Enter Diary Content" });
		}

		if (diaryForm.writedate.length <= 0) {
			setLoading(false);
			return setError({ source: "Please Enter Diary Writedate" });
		}

		client.fetchUser().then((user) => {
			client
				.createDiary(
					diaryForm.title,
					diaryForm.content,
					diaryForm.writedate,
					user?.id
				)
				// eslint-disable-next-line no-unused-vars
				.then((data) => {  // eslint:ignore
					fetchUserDiaries();
					setLoading(false);
					setShowForm(false);
				});
		});
	};

	useEffect(() => {
		const tokenString = localStorage.getItem("token");
		if (tokenString) {
			const token = JSON.parse(tokenString);
			const decodedAccessToken = jwtDecode(token.access_token);
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
				setIsLoggedIn(true);
			}
		}
	}, []);

	if (refreshing) return !isLoggedIn ? <NotLoggedIn /> : <Loader />;

	return (
		<>
			<section
				className="flex flex-col bg-black text-center"
				style={{ minHeight: "100vh" }}
			>
				<DashboardHeader />
				<div className="container px-5 pt-6 text-center mx-auto lg:px-20">
						{/*TODO - move to component*/}
					<h1 className="mb-12 text-3xl font-medium text-white">
						No Smoking Diary
					</h1>

					<button
						className="my-5 text-white bg-indigo-500 p-3 rounded"
						onClick={() => {
							setShowForm(!showForm);
						}}
					>
						Create Diary
					</button>

					<div className="mainViewport text-white">
						{diaries.length && (
							<ProfileView
								diaries={diaries}
								fetchUserDiaries={fetchUserDiaries}
							/>
						)}
					</div>
				</div>

				<Footer />
			</section>
			{showForm && (
				<PopupModal
					modalTitle={"Create Diary"}
					onCloseBtnPress={() => {
						setShowForm(false);
						setError({ fullName: "", email: "", password: "" });
					}}
				>
					<div className="mt-4 text-left">
						<form className="mt-5" onSubmit={(e) => onCreateDiary(e)}>
							<FormInput
								type={"text"}
								name={"title"}
								label={"Title"}
								error={error.title}
								value={diaryForm.title}
								onChange={(e) =>
									setDiaryForm({ ...diaryForm, title: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"content"}
								label={"Content"}
								error={error.url}
								value={diaryForm.url}
								onChange={(e) =>
									setDiaryForm({ ...diaryForm, content: e.target.value })
								}
							/>
							<FormInput
								type={"text"}
								name={"writedate"}
								label={"Writedate"}
								error={error.writedate}
								value={diaryForm.writedate}
								onChange={(e) =>
									setDiaryForm({ ...diaryForm, writedate: e.target.value })
								}
							/>
							<Button
								loading={loading}
								error={error.writedate}
								title={"Create Diary"}
							/>
						</form>
					</div>
				</PopupModal>
			)}
		</>
	);
};

export default DiaryDashboard;
