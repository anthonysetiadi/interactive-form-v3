// Name Field
const nameField = document.getElementById('name')
nameField.focus()

// Job Role Section
const otherJobRole = document.getElementById('other-job-role')
const jobRole = document.getElementById('title')
// Hide Other Job Role section by default
otherJobRole.style.display = "none"

function showOrHideOther() {
  // show element when job role is clicked
  if (jobRole.value === 'other') {
    otherJobRole.style.display = "inherit";
  } else {
    otherJobRole.style.display = "none";
  }
}

jobRole.addEventListener("change", showOrHideOther)

// T-shirt Info Section
const colors = document.getElementById('color')
const colorOptions = colors.children
const shirtColors = document.getElementById('shirt-colors')
const shirtDesign = document.getElementById('design')


// Hide Shirt Colors Element
colors.disabled = true;

// Function to show colors based on theme selected
const showColor = (e) => {
  colors.disabled = false
  for (let i = 0; i < colorOptions.length; i++) {
    const eTarget = e.target.value
    const colorTheme = colorOptions[i].getAttribute('data-theme')
    if (eTarget === colorTheme) {
      colorOptions[i].hidden = false
      colorOptions[i].setAttribute('selected', true)
    } else {
      colorOptions[i].hidden = true
      colorOptions[i].removeAttribute('selected')
    }
  }
}

shirtDesign.addEventListener("change", showColor)

// Register for Activities Section
const activitiesField = document.getElementById('activities')
const activitiesBox = document.getElementById('activities-box')
const totalAmount = document.getElementById('activities-cost')
const activityDates = activitiesBox.querySelectorAll('input')
let total = 0

const totalCost = (e) => {
  const activityCost = e.target.getAttribute('data-cost')
  if (e.target.checked === true) {
    total = total + +activityCost
  } else if (e.target.checked === false) {
    total = total - activityCost
  }
  totalAmount.innerHTML = `Total: $${total}`
}

const activityConflict = (e) => {
for (i = 0; i < activityDates.length; i++) {
  let targetDayAndTime = e.target.getAttribute('data-day-and-time')
  let totalDayAndTime = activityDates[i].getAttribute('data-day-and-time')
    if (targetDayAndTime === totalDayAndTime && e.target !== activityDates[i]) {
      if (e.target.checked) {
      activityDates[i].disabled = true
      activityDates[i].parentElement.classList.add('disabled')
      } else {
      activityDates[i].disabled = false
      activityDates[i].parentElement.classList.remove('disabled')
      }
    }
  }
}

activitiesBox.addEventListener("change", activityConflict)
activitiesField.addEventListener("change", totalCost)

// Payment Info Section
const paymentMethod = document.getElementById('payment')
const creditCard = document.getElementById('credit-card')
const paypal = document.getElementById('paypal')
const bitcoin = document.getElementById('bitcoin')

paypal.hidden = true
bitcoin.hidden = true

paymentMethod.children[1].setAttribute('selected', true)

const displayPaymentMethod = (e) => {
  if (e.target.value === paypal.getAttribute('id')) {
    paypal.hidden = false
    creditCard.hidden = true
    bitcoin.hidden = true
  } else if (e.target.value === creditCard.getAttribute('id')) {
    creditCard.hidden = false
    paypal.hidden = true
    bitcoin.hidden = true
  } else if (e.target.value === bitcoin.getAttribute('id')) {
    bitcoin.hidden = false
    paypal.hidden = true
    creditCard.hidden = true
  }
}

paymentMethod.addEventListener("change", displayPaymentMethod)

// Form Validation
const emailAddress = document.getElementById('email')
const cardNumber = document.getElementById('cc-num')
const zipCode = document.getElementById('zip')
const cvv = document.getElementById('cvv')
const form = document.querySelector('form')
const emailAddressParent = emailAddress.parentElement

const nameValidator = () => {
  const nameValue = nameField.value
  const isValidName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
  if (isValidName) {
    validationPass(nameField)
  } else {
    validationFail(nameField)
  }
  return isValidName
  }
  
// Conditional Error Message for email
const emailCannotBeBlank = `<span id="email-hint" class="email-hint hint">Email address cannot be blank.</span>`
const emailNeedsFormatting = `<span id="email-hint" class="email-hint hint">Email address needs an '@' and '.' symbol.</span>`

const emailValidator = () => {
  const emailValue = emailAddress.value
  const isValidEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)

  function clearEmailHTML () {
    while (emailAddress.nextSibling) {
      emailAddressParent.removeChild(emailAddress.nextSibling)
    }
  }
  if (isValidEmail) {
    validationPass(emailAddress)
  } else if (emailValue === "") {
    clearEmailHTML()
    emailAddressParent.insertAdjacentHTML("beforeend", emailCannotBeBlank)
    validationFail(emailAddress)
  } else {
    clearEmailHTML()
    emailAddressParent.insertAdjacentHTML("beforeend", emailNeedsFormatting)
    validationFail(emailAddress)
  }
  return isValidEmail
}

const registerValidator = () => {
  const registerSectionIsValid = total > 0
  if (registerSectionIsValid) {
    validationPass(activitiesBox)
  } else {
    validationFail(activitiesBox)
  }
  return registerSectionIsValid
}

const cardNumberValidator = () => {
  const cardNumberValue = cardNumber.value
  const isValidCardNumber = /^\d{13,16}$/.test(cardNumberValue)
  if (isValidCardNumber) {
    validationPass(cardNumber)
  } else {
    validationFail(cardNumber)
  }
  return isValidCardNumber
}

const zipCodeValidator = () => {
  const zipCodeValue = zipCode.value
  const isValidZipCode = /^\d{5}$/.test(zipCodeValue)
  if (isValidZipCode) {
    validationPass(zipCode)
  } else {
    validationFail(zipCode)
  }
  return isValidZipCode
}

const cvvValidator = () => {
  const cvvValue = cvv.value
  const isValidCvv = /^\d{3}$/.test(cvvValue)
  if (isValidCvv) {
    validationPass(cvv)
  } else {
    validationFail(cvv)
  }
  return isValidCvv
}

form.addEventListener("submit", e => {
  nameValidator()
  emailValidator()
  registerValidator()
  cardNumberValidator()
  zipCodeValidator()
  cvvValidator()

    if (
    !nameValidator() ||
    !emailValidator() ||
    !registerValidator()
    ) {
    e.preventDefault()
  }

    if (paymentMethod.children[1].selected) {
      if (
      !cardNumberValidator() ||
      !zipCodeValidator() ||
      !cvvValidator() 
      ) {
      e.preventDefault()
      }
    }
  }  
)

form.addEventListener('change', e => {
  nameValidator()
  emailValidator()
  registerValidator()
  cardNumberValidator()
  zipCodeValidator()
  cvvValidator()
  }
)

// Accessibility
const checkBox = document.getElementById('activities').getElementsByTagName('input')
// focus on register for activities box
for (let i = 0; i < checkBox.length; i++) {
  checkBox[i].addEventListener('focus', e => {
    e.target.parentElement.classList.add('focus')
  })
  checkBox[i].addEventListener('blur', e => {
    e.target.parentElement.classList.remove('focus')
  })
}

// Input validation indicators
function validationPass(element) {
  element.parentElement.classList.add('valid')
  element.parentElement.classList.remove('not-valid')
  element.parentElement.lastElementChild.style.display = 'none'
}

function validationFail(element) {
  element.parentElement.classList.add('not-valid')
  element.parentElement.classList.remove('valid')
  element.parentElement.lastElementChild.style.display = 'block'

}




