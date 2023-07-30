import throttle from "lodash.throttle";
const refs = {
	form: document.querySelector(".feedback-form"),
	input: document.querySelector('.feedback-form  input'),
	textarea: document.querySelector('.feedback-form textarea'),
}
const LOCALSTORAGE_KEY = "feedback-form-state";

updateForm();

refs.form.addEventListener("input", throttle(saveInput, 500));
refs.form.addEventListener("submit", submitForm);
console.log(refs)


function saveInput(e) {

	e.preventDefault();

	const saveMessegeInput = {
		inputText: refs.input.value,
		messageText: refs.textarea.value,
	}
	// console.log(saveMessegeInput)

	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saveMessegeInput))
}

function submitForm(e) {
	e.preventDefault();

	const { email, message } = e.currentTarget.elements;
	console.log({ email: email.value, message: message.value });

	if (refs.input.value === "" || refs.textarea.value === "") {
		return alert("Заповніть пусті поля");
	}
	updateForm()
	localStorage.removeItem(LOCALSTORAGE_KEY);
	refs.input.value = "";
	refs.textarea.value = "";

}

function updateForm(e) {
	let loadMassegeInput = localStorage.getItem(LOCALSTORAGE_KEY);
	if (!loadMassegeInput) return;
	{
		refs.input.value = JSON.parse(loadMassegeInput).inputText ?? "";
		refs.textarea.value = JSON.parse(loadMassegeInput).messageText ?? "";
	}
}
