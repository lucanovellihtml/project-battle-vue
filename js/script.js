//import
const { createApp, ref, computed, watch } = Vue;

//dichiarazione dell'applicazione
const myApp = createApp({
    setup() {

        //variable flag healt enemy
        const flagClickBottonAttack = ref(false);

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
            attackPlayer.value = Math.floor(Math.random() * 30) + 1;
            console.log("Attacco player ->", attackPlayer.value);
            flagClickBottonAttack.value = true;
        }

        //function super attack
        const handleClickSuperAttack = () => {
            console.log("Hai cliccato super attack");
            attackPlayer.value = Math.floor(Math.random() * 50) + 1;
            console.log("Attacco player ->", attackPlayer.value);
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


        return {
            handleClickAttack,
            handleClickSuperAttack,
            handleClickGameOver,
            handleClickMedikit,
            healthPlayerNow,
            healthEnemyTotal,
            flagClickBottonAttack,
        }

    }

})

//dichiarazione del mount
myApp.mount("#game");