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
        this.currentGame
        this.smiteChallenges
        this.apexChallenges
    }

    setup() {
        this.challengeSubmit.addEventListener('submit', this.submitChallenge.bind(this))
        this.challengeMeButton.addEventListener('click', this.randomChallenge.bind(this))
        this.gameSelector.addEventListener('change', this.selectGame.bind(this))
        this.getChallenges()
    }

    selectGame() {
        if (this.gameSelector.value === 'Smite') {
            this.hideChallenges()
            this.smiteChallengeTitle.classList.remove('display-none')
            this.smiteChallengeField.classList.remove('display-none')
            this.currentGame = 'Smite'
        }
        else if (this.gameSelector.value ==='Apex') {
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

    submitChallenge() {
        console.log('submit challenge')
    }

    randomChallenge() {
        if (this.currentGame === 'Smite') {
            getRandom(this.smiteChallenges)
        }
        else if (this.currentGame === 'Apex') {
            getRandom(this.apexChallenges, this.challengeName, this.challengeDescription)
        }
        function getRandom(game, name, description) {
            let randomChallenge = game['entry' + Math.floor(Math.random() * Object.keys(game).length)]
            console.log(randomChallenge['name'])
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