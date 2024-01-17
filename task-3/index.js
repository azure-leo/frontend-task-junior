document.addEventListener("DOMContentLoaded", function(){
	const form = document.getElementById("registrationForm")
	const submitButton = document.getElementById("submitButton")

	const validateName = (name) => /^[A-Za-zА-Яа-яёЁ]{2,30}$/.test(name)

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

	const validatePassword = (password) => {
		if (password.length < 8) {
			console.log("Error occurs in < 8")
			return false
		}

		if (!/\d/.test(password)) {
			return false
		}

		if (!password.match(/[A-ZА-Я]/)) {
			console.log("Error occurs in 1 Capital")	
			return false
		}

		if (!password.match(/[a-zа-я]/)) {
			console.log("Error occurs in min 1 strochnyaa")	
			return false
		}

		if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
			console.log("Error occurs in symbol")
			return false
		}

		return true
	}
	
	const validateBirthdate = (birthdate) => {
			const today = new Date()
			const dob = new Date(birthdate)
			let age = today.getFullYear() - dob.getFullYear()
			const m = today.getMonth() - dob.getMonth()
			if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
					age--
			}
			return age >= 18
	};


	const validateForm = () => {
		let isValid = true
		document.querySelectorAll("#registrationForm input").forEach(input => {
			const id = input.id
			const value = input.value
			let error = ""

			switch(id) {
				case "firstName":
				case "lastName":
					if (!validateName(value)) error = "Неверное имя или фамилия"
					break
				case "email":
					if (!validateEmail(value)) error = "Неверный адрес электронной почты"
					break
				case "password":
					if (!validatePassword(value)) error = "Неверный пароль."
					break
				case "confirmPassword":
					if (value !== document.getElementById("password").value) error = "Пароли не совпадают."
					break
				case "birthdate":
					if (!validateBirthdate(value)) error = "Вам должно быть не менее 18 лет."
					break
			}

			document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1)).textContent = error
			if (error) isValid = false
		})

		submitButton.disabled = !isValid
	}

	document.querySelectorAll("#registrationForm input").forEach(input => {
		input.addEventListener("blur", validateForm)
	})

})