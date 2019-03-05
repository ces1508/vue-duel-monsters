new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    attacks: 0,
    turns: []
  },
  computed: {
    canUseSpecialAttack: function (){
      return this.attacks % 2 === 0
    }
  },
  methods: {
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    playerHealt: function () {
      return this.playerHealt
    },
    monsterHealt: function () {
      return this.monsterHealt
    },
    startGame: function () {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns = []
    },
    leaveGame: function () {
      this.gameIsRunning = false
    },
    attack: function () {
      this.PlayerAttack()
      if (this.gameEnded()) return ;
      this.monsterAttack()
    },
    specialAttack: function () {
      this.PlayerAttack(10, 20)
      if (this.gameEnded()) return ;
      this.monsterAttack()
    },
    PlayerAttack: function (min = 3, max = 10) {
      let damage = this.calculateDamage(min, max)
      this.monsterHealth -=  damage
      this.attacks ++
      this.addTurn(true, `le has inflingido ${damage} puntos de daño al monstruo`)
    },
    monsterAttack: function () {
      let damage = this.calculateDamage(5, 12)
      this.playerHealth -= this.calculateDamage(5, 12)
      this.addTurn(false, `el mostruo te ha hecho ${damage} puntos de daño`)
      this.gameEnded()
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
        this.addTurn(true, 'te has curado 10 puntos de salud')
      }
      this.monsterAttack()
    },
    gameEnded: function () {
      if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
        this.monsterHealth > this.playerHealth ? this.anotherGame('has perdido') : this.anotherGame('has ganado')
        return true
      }
      return false
    },
    anotherGame: function (message) {
      if (confirm(`${message} deseas iniciar otro juego`)) return this.startGame()
      this.gameIsRunning = false
    },
    addTurn: function (isPlayer, text) {
      this.turns.unshift({ isPlayer, text})
    }
  }
})