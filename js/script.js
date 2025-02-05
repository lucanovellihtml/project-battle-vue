//import
const { createApp, ref, computed, watch } = Vue;

//function random
const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

//dichiarazione dell'applicazione
const myApp = createApp({
    setup() {

        //variable round
        const round = ref(0);

        //variable health enemy total
        const healthEnemyTotal = ref(100);

        //variable attack enemy
        const attackEnemy = ref();

        //variable health player total
        const healthPlayerTotal = ref(100);

        //variable health player now
        const healthPlayerNow = ref(100);

        //variable medikit
        const medikit = 20;

        //variable attack player
        const attackPlayer = ref();

        //function attack
        const handleClickAttack = () => {
            console.log("Hai cliccato attack");
            attackPlayer.value = getRandomValue(1, 20);
            healthEnemyTotal.value -= attackPlayer.value;
            console.log("Attacco player ->", attackPlayer.value);
            round.value++;
        }

        //function super attack
        const handleClickSuperAttack = () => {
            console.log("Hai cliccato super attack");
            attackPlayer.value = getRandomValue(10, 40);
            healthEnemyTotal.value -= attackPlayer.value;
            console.log("Super attacco player ->", attackPlayer.value);
            round.value++;
        }

        //function medikit
        const handleClickMedikit = () => {
            console.log("Hai cliccato medikit");
        }

        //function gamer over
        const handleClickGameOver = () => {
            console.log("Hai cliccato game over");
            healthPlayerTotal.value = 0;
            healthPlayerNow.value = "width:" + healthPlayerTotal.value + "%";
        }

        //computed to manipulate player bar
        const playerBarStyle = computed(() => {
            return { width: healthPlayerTotal.value + "%" }
        })

        //computed to manipulate enemy bar
        const enemyBarStyle = computed(() => {
            return { width: healthEnemyTotal.value + "%" }
        })

        //computed to disable or active button super attack
        const attackEnemyDisabled = computed(() => {
            if (round.value < 3)
                return true
            else
                return false
        })

        return {
            round,
            handleClickAttack,
            handleClickSuperAttack,
            handleClickGameOver,
            handleClickMedikit,
            healthPlayerNow,
            healthPlayerTotal,
            healthEnemyTotal,
            playerBarStyle,
            enemyBarStyle,
            attackEnemyDisabled
        }

    }

})

//dichiarazione del mount
myApp.mount("#game");