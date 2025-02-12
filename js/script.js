//import
const { createApp, ref, computed, watch } = Vue;

//function random
const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

//function refresh page
function refreshPage() {
    window.location.reload();
}

//dichiarazione dell'applicazione
const myApp = createApp({
    setup() {

        //array log
        const logMessages = ref([]);

        //variable message winner
        const messaggeWinner = ref();

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

        //function attack player
        const handleClickAttack = () => {
            console.log("Hai cliccato attack");
            attackPlayer.value = getRandomValue(1, 20);

            if (healthEnemyTotal.value - attackPlayer.value <= 0)
                healthEnemyTotal.value = 0;
            else
                healthEnemyTotal.value -= attackPlayer.value;

            console.log("Attacco player ->", attackPlayer.value);
            recordLog("player", "attack", attackPlayer.value);

            actionAttackEnemy();
            round.value++;
        }

        //function super attack player
        const handleClickSuperAttack = () => {
            console.log("Hai cliccato super attack");
            attackPlayer.value = getRandomValue(10, 40);

            if (healthEnemyTotal.value - attackPlayer.value <= 0)
                healthEnemyTotal.value = 0;
            else
                healthEnemyTotal.value -= attackPlayer.value;

            console.log("Super attacco player ->", attackPlayer);
            recordLog("player", "super attack", attackPlayer.value);

            actionAttackEnemy();
            round.value++;
        }

        //function medikit player
        const handleClickMedikit = () => {
            console.log("Hai cliccato medikit");
            if (healthPlayerTotal.value + medikit > 100)
                healthPlayerTotal.value = 100;
            else
                healthPlayerTotal.value += medikit;

            round.value++;
            console.log("Vita medicata -> ", healthPlayerTotal.value);
            recordLog("player", "medikit", medikit);

            actionAttackEnemy();
        }

        //function gamer over player
        const handleClickGameOver = () => {
            console.log("Hai cliccato game over");
            healthPlayerTotal.value = 0;
            healthPlayerNow.value = "width:" + healthPlayerTotal.value + "%";
            messaggeWinner.value = "Gamer over";

            recordLog("player", "gamer over", healthPlayerTotal.value);
        }

        //function attack enemy
        const actionAttackEnemy = () => {
            console.log("Il nemico ha attaccato");
            attackEnemy.value = getRandomValue(1, 40);

            if (healthPlayerTotal.value - attackEnemy.value <= 0)
                healthPlayerTotal.value = 0;
            else
                healthPlayerTotal.value -= attackEnemy.value;

            console.log("Attacco nemico ->", attackEnemy.value);

            recordLog("enemy", "attack", attackEnemy.value);
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

        //computed to disable or active button medikit
        const actionMedikitDisabled = computed(() => {
            if (round.value < 3 || healthPlayerTotal.value >= 50)
                return true
            else
                return false
        })

        //watch to check if winner is enemy
        watch(healthEnemyTotal, (healthEnemyTotal, prevHealthEnemyTotal) => {

            if (healthEnemyTotal.value <= 0 && healthPlayerTotal.value <= 0) {
                messaggeWinner.value = "Pareggio";
            }
            else if (healthPlayerTotal.value <= 0) {
                messaggeWinner.value = "Game Over";
            }

        })

        //watch to check if winner is player
        watch(healthPlayerTotal, (healthPlayerTotal, prevHealthPlayerTotal) => {

            if (healthPlayerTotal.value <= 0 && healthEnemyTotal.value <= 0) {
                messaggeWinner.value = "Pareggio";
            }
            else if (healthEnemyTotal.value <= 0) {
                messaggeWinner.value = "Hai vinto";
            }

        })

        //function log
        const recordLog = (who, what, value) => {
            logMessages.value.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }


        return {
            round,
            handleClickAttack,
            handleClickSuperAttack,
            handleClickGameOver,
            handleClickMedikit,
            actionAttackEnemy,
            actionMedikitDisabled,
            healthPlayerTotal,
            healthEnemyTotal,
            playerBarStyle,
            enemyBarStyle,
            attackEnemyDisabled,
            messaggeWinner,
            logMessages
        }

    }

})

//dichiarazione del mount
myApp.mount("#game");