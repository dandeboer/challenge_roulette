class Functionality {
    constructor() {
        this.gameSelector = document.querySelector('#game-selector')
        this.nameInput = document.querySelector('#name-input')
        this.descriptionInput = document.querySelector('#description-input')
        this.personInput = document.querySelector('#person-input')
        this.challengeSubmit = document.querySelector('#challenge-submit')
        this.challengeMeButton = document.querySelector('#challenge-me-button')
        this.smiteChallengeTitle = document.querySelector('#Smite-challenge-title')
        this.smiteChallengeField = document.querySelector('#Smite-challenge-field')
        this.apexChallengeTitle = document.querySelector('#Apex-challenge-title')
        this.apexChallengeField = document.querySelector('#Apex-challenge-field')
        this.challengeName = document.querySelector('#challenge-name')
        this.challengeDescription = document.querySelector('#challenge-description')
        this.challengeContainer = document.querySelector('#challenge-container')
        this.hiddenContainer = document.querySelector('#hidden-container')
        this.defaultOption = document.querySelector('#default-option')
        this.defaultOptionRemoved = false
        this.currentGame
        this.smiteChallenges
        this.apexChallenges
    }

    setup() {
        let thisVar = this
        this.challengeSubmit.addEventListener('click', function (event) {
            event.preventDefault()
            thisVar.challengeValidation(thisVar)
        })
        this.challengeMeButton.addEventListener('click', this.randomChallenge.bind(this))
        this.gameSelector.addEventListener('change', this.selectGame.bind(this))
        this.getChallenges()
    }

    selectGame() {
        if (this.defaultOptionRemoved === false) {
            this.defaultOption.remove()
            this.hiddenContainer.classList.remove('visibility-hidden')
            this.defaultOptionRemoved = true
        }
        if (this.gameSelector.value === 'Smite') {
            this.hideChallenges()
            this.smiteChallengeTitle.classList.remove('display-none')
            this.smiteChallengeField.classList.remove('display-none')
            this.currentGame = 'Smite'
        }
        else if (this.gameSelector.value === 'Apex') {
            this.hideChallenges()
            this.apexChallengeTitle.classList.remove('display-none')
            this.apexChallengeField.classList.remove('display-none')
            this.currentGame = 'Apex'
        }
    }

    hideChallenges() {
        this.smiteChallengeTitle.classList.add('display-none')
        this.smiteChallengeField.classList.add('display-none')
        this.apexChallengeTitle.classList.add('display-none')
        this.apexChallengeField.classList.add('display-none')
    }

    challengeValidation(thisVar) {
        if (thisVar.nameInput.value.length >= 3) {
            thisVar.nameInput.classList.remove('validation-failed')
            let person = thisVar.personInput.value.toLowerCase()
            if (thisVar.descriptionInput.value !== '') {
                thisVar.descriptionInput.classList.remove('validation-failed')
                if (person === 'dan' || person === 'tom' || person === 'seth' || person === 'jason') {
                    thisVar.personInput.classList.remove('validation-failed')
                    thisVar.submitChallenge(thisVar)
                }
                else {
                    thisVar.personInput.classList.add('validation-failed')
                }
            }
            else {
                thisVar.descriptionInput.classList.add('validation-failed')
            }
        }
        else {
            thisVar.nameInput.classList.add('validation-failed')
        }
    }

    submitChallenge(thisVar) {
        let data = { game: thisVar.currentGame, name: thisVar.nameInput.value, description: thisVar.descriptionInput.value, person: thisVar.personInput.value.toLowerCase() }
        fetch('createchallenge/', {
            method: 'POST',
            headers: { 'Content-type': 'application.json', },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                this.submitUiUpdate(thisVar, data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    submitUiUpdate(thisVar, data) {
        thisVar.nameInput.value = ''
        thisVar.descriptionInput.value = ''
        thisVar.personInput.value = ''
        let divElement = document.createElement('div')
        if (data['game'] === 'Smite') {
            thisVar.smiteChallengeField.appendChild(divElement)
            divElement.innerHTML = `<p class='challenge-name'>${data['name']}</p><p class='challenge-description'>${data['description']}</p>`
        }
        if (data['game'] === 'Apex') {
            thisVar.apexChallengeField.appendChild(divElement)
            divElement.innerHTML = `<p class='challenge-name'>${data['name']}</p><p class='challenge-description'>${data['description']}</p>`
        }
        thisVar.getChallenges()
    }

    randomChallenge() {
        if (this.currentGame === 'Smite') {
            getRandom(this.smiteChallenges, this.challengeName, this.challengeDescription)
        }
        else if (this.currentGame === 'Apex') {
            getRandom(this.apexChallenges, this.challengeName, this.challengeDescription)
        }
        function getRandom(game, name, description) {
            let randomChallenge = game['entry' + Math.floor(Math.random() * Object.keys(game).length)]
            name.innerText = randomChallenge['name']
            description.innerText = randomChallenge['description']
        }
    }

    getChallenges() {
        fetch(`getchallenges/`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.smiteChallenges = response.smite
                this.apexChallenges = response.apex
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

new Functionality().setup()