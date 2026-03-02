import { useState } from "react";
import "./styles/App.css";

export default function App() {
	//global submission tracker
	const [submitted, setSubmitted] = useState([false, false, false]);

	// General
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	// Education
	const [education, setEducation] = useState([]);
	const [school, setSchool] = useState("");
	const [title, setTitle] = useState("");
	const [dateStart, setDateStart] = useState("");
	const [dateEnd, setDateEnd] = useState("");

	// Experience
	const [experience, setExperience] = useState([]);
	const [company, setCompany] = useState("");
	const [position, setPosition] = useState("");
	const [desc, setDesc] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");

	//take args index, status, use arrow function to call setSubmitted
	const toggleStatus = (index, newValue) => {
		setSubmitted(
			submitted.map((item, i) => (i === index ? newValue : item)),
		);
	};

	//helper for setting name/email/phone
	function input(desc, prop, setter) {
		return (
			<label>
				Enter {desc}:
				<input
					type="text"
					value={prop}
					onChange={(e) => setter(e.target.value)}
				/>
			</label>
		);
	}

    function unpackGeneral()
    {
        return (
			<>
				<p>Name: {name}</p>
				<p>Email: {email}</p>
				<p>Phone: {phone}</p>
			</>
		);
    }

	function submitEducation() {
		//loose equality: == converts, strict: === takes into account type
		if (
			school === "" ||
			title === "" ||
			dateStart === "" ||
			dateEnd === ""
		) {
			console.log("Missing input field, try again!");
			return false;
		} else {
			//use javascript container {}, push to education array
			const newEntry = {
				id: crypto.randomUUID(),
				school: school,
				title: title,
				dateStart: dateStart,
				dateEnd: dateEnd,
			};
			setEducation([...education, newEntry]);

			//clear input after saving
			setSchool("");
			setTitle("");
			setDateStart("");
			setDateEnd("");

			return true;
		}
	}

	function unpackEducation() {
		//for editing specific entry, pass current item in education array as parameter (unique id)
		const editEntry = (item) => {
			//reset all mutable entries
			setSchool(item.school);
			setTitle(item.title);
			setDateStart(item.dateStart);
			setDateEnd(item.dateEnd);

			//use filter on array: Take each object, keep it if it isn't the current id
			setEducation(education.filter((edu) => edu.id !== item.id));

			//unlock form for current item
			toggleStatus(1, false);
		};

		const deleteEntry = (item) => {
			//simply create array of education without the current one in it
			//again, DO NOT "EDIT" state, make copy without.
			setEducation(education.filter((edu) => edu.id !== item.id));
		};

		//for displaying items
		const educationNode = education.map((item) => (
			<ul key={item.id}>
				<li>ID: {item.id}</li>
				<li>School: {item.school}</li>
				<li>Degree: {item.title}</li>
				<li>Start: {item.dateStart}</li>
				<li>End: {item.dateEnd}</li>
				<button onClick={() => editEntry(item)}>Edit Node</button>
				<button onClick={() => deleteEntry(item)}>Delete Node</button>
			</ul>
		));

		return educationNode;
	}

	const submitExperience = () => {
		if (company === "" || position === "" || from === "" || to === "") {
			console.log("Experience fields missing!");
			return false;
		}
		const newJob = {
			id: crypto.randomUUID(),
			company,
			position,
			desc,
			from,
			to,
		};
		setExperience([...experience, newJob]);

		// Reset fields
		setCompany("");
		setPosition("");
		setDesc("");
		setFrom("");
		setTo("");
		return true;
	};

	function unpackExperience() {
		const editJob = (item) => {
			setCompany(item.company);
			setPosition(item.position);
			setDesc(item.desc);
			setFrom(item.from);
			setTo(item.to);
			setExperience(experience.filter((exp) => exp.id !== item.id));
			toggleStatus(2, false); // Index 2 for Experience
		};

		return experience.map((item) => (
			<ul key={item.id}>
				<li>
					<strong>Company:</strong> {item.company}
				</li>
				<li>
					<strong>Role:</strong> {item.position}
				</li>
				<li>
					<strong>Responsibilities:</strong> {item.desc}
				</li>
				<li>
					<strong>Dates:</strong> {item.from} to {item.to}
				</li>
				<button onClick={() => editJob(item)}>Edit Job</button>
				<button
					onClick={() =>
						setExperience(
							experience.filter((e) => e.id !== item.id),
						)
					}
				>
					Delete
				</button>
			</ul>
		));
	}

	return (
		<>
			<h1>Job Application</h1>
			<div className="FieldContainer">
				<h2>General Information</h2>
				{!submitted[0] ? (
					<div>
						{input("Name", name, setName)}
						{input("Email", email, setEmail)}
						{input("Phone Number", phone, setPhone)}
						<button onClick={() => toggleStatus(0, true)}>
							Submit General
						</button>
					</div>
				) : (
					<div>
						<button onClick={() => toggleStatus(0, false)}>
							Edit General
						</button>
					</div>
				)}
			</div>

			<div class="FieldContainer">
				<h2>Education</h2>
				{!submitted[1] ? (
					<div>
						{input("School", school, setSchool)}
						{input("Title", title, setTitle)}
						{input("Start Date", dateStart, setDateStart)}
						{input("End Date", dateEnd, setDateEnd)}
						<button
							onClick={() => {
								if (submitEducation()) toggleStatus(1, true);
							}}
						>
							Submit Education
						</button>
					</div>
				) : (
					<button onClick={() => toggleStatus(1, false)}>
						Add Additional Education
					</button>
				)}
			</div>

			<div className="FieldContainer">
				<h2>Practical Experience</h2>
				{!submitted[2] ? (
					<div>
						{input("Company Name", company, setCompany)}
						{input("Position Title", position, setPosition)}
						{input("Responsibility Description", desc, setDesc)}
						{input("From Date", from, setFrom)}
						{input("Until Date", to, setTo)}
						<button
							onClick={() => {
								if (submitExperience()) toggleStatus(2, true);
							}}
						>
							Submit Experience
						</button>
					</div>
				) : (
					<button onClick={() => toggleStatus(2, false)}>
						Add Additional Experience
					</button>
				)}
			</div>

			<hr />
			<h2>Current Data:</h2>
			<h3>General</h3>
			{unpackGeneral()}
			<h3>Education</h3>
			{/* use (), this is not a reference to functioncall, this is a functioncall */}
			{unpackEducation()}
			<h3>Experiences</h3>
			{unpackExperience()}
		</>
	);
}

/**
We're able to call the functions that return jsx within the default export in order to render them!

Deployment
- npm run build
- builds a file parseable by web technologies, saves it to "dist" folder
 */ 
