let maxHP = 100;
let currentHP = maxHP;
const monster = document.getElementById('monster');
const healthBar = document.getElementById('health');
const hpText = document.getElementById('hp-text');
const resetIcon = document.getElementById('reset-icon');
const coinCount = document.getElementById('coin-count');
const upgradeContainer = document.getElementById('upgrade-btn-container');
const upgradeDamageBtn = document.getElementById('upgrade-damage-btn');
const spritesContainer = document.querySelector('.sprites-container');
const player = document.getElementById('player');
const statsContainer = document.querySelector('.stats-container');
const damageText = document.getElementById('damage-text');
const coinText = document.getElementById('coin-text');
const companionText = document.getElementById('companion-text');

const armourContainer = document.getElementById('armour-btn-container');
const helmetBtn = document.getElementById('upgrade-helmet-btn');
const chestplateBtn = document.getElementById('upgrade-chestplate-btn');
const bootsBtn = document.getElementById('upgrade-boots-btn');

const helmetImg = document.getElementById('helmet');
const chestplateImg = document.getElementById('chestplate');
const bootsImg = document.getElementById('boots');

let helmetIndex = 1;
let chestplateIndex = 1;
let bootsIndex = 1;

let coins = 0;
let addedCoins = 10;

let upgradeCoinPrice = 10;
let maxCoinUpgrade = 0;

let attackInProgress = false;
let upgradeDamagePrice = 20;
let damage = 10;

let upgradeCompanionPrice = 1030;
let companionDamage = 0;

let displayCompanionBtn = 'flex';

let upgradeHelmetPrice = 0;
let upgradeChestplatePrice = 0;
let upgradeBootsPrice = 0;

let helmetImgContent = `(${upgradeHelmetPrice} coins)`;
let chestplateImgContent = `(${upgradeChestplatePrice} coins)`;
let bootsImgContent = `(${upgradeBootsPrice} coins)`;

let clickSound = new Audio('./audio/click_001.ogg');
let errorSound = new Audio('./audio/error_001.ogg');
let upgradeSound = new Audio('./audio/upgrade_001.ogg');
let backgroundSound = new Audio('./audio/background.mp3');
errorSound.volume = 0.5;


let renderUpgrades = function renderUpgradeButtons() {
    upgradeContainer.innerHTML = `
        <button id="upgrade-damage-btn" onclick="upgradeDamageButton()"> <img id="sword" src="./icon/tools/sword-Photoroom.png" alt=""> <b>(${upgradeDamagePrice} coins)</b></button>
        <button id="upgrade-coin-btn" onclick="upgradeCoinButton()"><span>max : ${maxCoinUpgrade}</span><img id="coin" src="./icon/tools/pouch-Photoroom.png" alt=""><b>(${upgradeCoinPrice} coins)</b></button>
        <button id="upgrade-pet-btn" style="display: ${displayCompanionBtn};" onclick="upgradeCompanionButton()"><img id="companion" src="./icon/tools/pet-Photoroom.png" alt=""><b>(${upgradeCompanionPrice} coins)</b></button>
    `;
}

let renderStats = function renderStatsInfo() {
    statsContainer.innerHTML = `
      <p id="damage-text">Damage: <span id="damage">${damage}</span></p>
      <p id="coin-text">Added Coins: <span id="coin-multiplier">${addedCoins}</span></p>
      <p id="companion-text">Companion Damage: <span id="companion-level">${companionDamage}</span></p>
    `;
}

let renderArmourUpgrades = function renderArmourUpgradeButtons() {
    armourContainer.innerHTML = `
        <button id="upgrade-helmet-btn" onclick="upgradeHelmetButton()" > <img id="helmet" src="./icon/armour/helmets/helmet${helmetIndex}-Photoroom.png" alt=""> <b>${helmetImgContent}</b></button>
        <button id="upgrade-chestplate-btn" onclick="upgradeChestplateButton()" > <img id="chestplate" src="./icon/armour/chestplate/chestplate${chestplateIndex}-Photoroom.png" alt=""> <b>${chestplateImgContent}</b></button>
        <button id="upgrade-boots-btn" onclick="upgradeBootsButton()" > <img id="boots" src="./icon/armour/boots/boots${bootsIndex}-Photoroom.png" alt=""> <b>${bootsImgContent}</b></button>
    `;
}


// Add event listener for the upgrade damage button
function upgradeDamageButton() {
    if (coins >= upgradeDamagePrice) {
        coins -= upgradeDamagePrice;

        damage += 5;

        updateCoinCount();

        if (upgradeDamagePrice - Math.floor(upgradeDamagePrice * 1.36) < 10) {
            upgradeDamagePrice += 15;
        }
        else {
            upgradeDamagePrice += Math.floor(upgradeDamagePrice * 1.45);
        }

        upgradeSound.currentTime = 0;
        upgradeSound.play();

    } else {
        errorSound.currentTime = 0;
        errorSound.play();
    }

    renderUpgrades();
    renderStats();
};

function upgradeCoinButton() {
    if (maxCoinUpgrade < 0) {
        maxCoinUpgrade = 0;
    }
    else if (maxCoinUpgrade > 0) {
        if (coins >= upgradeCoinPrice) {
            coins -= upgradeCoinPrice;
            updateCoinCount();

            addedCoins += 5;

            if (upgradeCoinPrice - Math.floor(upgradeCoinPrice * 1.36) < 10) {
                upgradeCoinPrice += 15;
            } else {
                upgradeCoinPrice += Math.floor(upgradeCoinPrice * 1.4);
            }

            maxCoinUpgrade--;

            upgradeSound.currentTime = 0;
            upgradeSound.play();
        } else {
            errorSound.currentTime = 0;
            errorSound.play();
        }
    }
    else {
        errorSound.currentTime = 0;
        errorSound.play();
    }

    renderStats();
    renderUpgrades();
}

function upgradeCompanionButton() {
    if (coins >= upgradeCompanionPrice) {
        coins -= upgradeCompanionPrice;
        updateCoinCount();

        DogImgElement.style.display = 'block';

        displayCompanionBtn = 'none';

        petBtn.disabled = true;
        petBtn.style.cursor = 'not-allowed';
        petBtn.removeEventListener('click', upgradeCompanionButton);
        clearInterval(companionDamageTimer);
        companionDamageTimer = setInterval(() => {
            dealCompanionDamage(companionDamage);
        }, 2000);

        companionDamage = 1000;

        renderStats();
        renderUpgrades();


        upgradeSound.currentTime = 0;
        upgradeSound.play();

    } else {
        errorSound.currentTime = 0;
        errorSound.play();
    }
}



const monsterImages = [
    'sprites/monsters/monster1-Photoroom.png',
    'sprites/monsters/monster2-Photoroom.png',
    'sprites/monsters/monster3-Photoroom.png',
    'sprites/monsters/monster4-Photoroom.png',
    'sprites/monsters/monster5-Photoroom.png',
    'sprites/monsters/monster6-Photoroom.png',
    'sprites/monsters/monster7-Photoroom.png',
    'sprites/monsters/monster8-Photoroom.png',
    'sprites/monsters/monster9-Photoroom.png',
    'sprites/monsters/monster10-Photoroom.png',
    'sprites/monsters/monster11-Photoroom.png',
    'sprites/monsters/monster12-Photoroom.png',
    'sprites/monsters/monster13-Photoroom.png',
    'sprites/monsters/monster14-Photoroom.png',
    'sprites/monsters/monster15-Photoroom.png',
    'sprites/monsters/monster16-Photoroom.png',
];

let currentImageIndex = 0;

function shuffleMonsterImage() {
    currentImageIndex = (currentImageIndex + 1) % monsterImages.length;
    monster.src = monsterImages[currentImageIndex];

    if (currentImageIndex % 8 === 0) {
        addedCoins += 10;
        renderStats();
    }


    updateCoinCount();
}

function updateHealth() {
    let hpPercent = (currentHP / maxHP) * 100;
    healthBar.style.width = hpPercent + '%';
    hpText.textContent = `${currentHP} / ${maxHP}`;
}


if (currentHP > 0) {
    spritesContainer.addEventListener('click', () => {
        handleAttack();
    });

    document.addEventListener('keydown', (event) => {
        if ((event.code === 'Space' || event.code === 'Enter') && !event.repeat) {
            if (!attackInProgress) {
                attackInProgress = true;
                handleAttack();

                setTimeout(() => {
                    attackInProgress = false;
                }, 50);
            }
        }
    });
}


function handleAttack() {
    if (currentHP > 0) {
        currentHP -= damage;
        if (currentHP < 0) currentHP = 0;
        updateHealth();

        updatePlayerFrame();
    }
    if (currentHP === 0) {
        nextMonster();
    }
}



function nextMonster() {
    maxHP += 50;
    currentHP = maxHP;
    updateHealth();


    shuffleMonsterImage();

    incrementCoins();
    maxCoinUpgrade++;
    if (maxCoinUpgrade > 10) {
        maxCoinUpgrade = 10;
    }
    else if (maxCoinUpgrade < 0) {
        maxCoinUpgrade = 0;
    }

    renderUpgrades();
}

updateHealth();

resetIcon.addEventListener('click', () => {
    maxHP = 100; // reset maxHP to initial value
    currentHP = maxHP;
    currentImageIndex = 0;
    monster.src = monsterImages[currentImageIndex];
    updateHealth();
    coins = 0;
    updateCoinCount();
});

function updateCoinCount() {
    coinCount.textContent = `${coins} coins`;
}

function incrementCoins() {
    coins += addedCoins;
    updateCoinCount();
}


//managing dog frames


const dogFrames = [
    './sprites/companion/frame1-Photoroom.png',
    './sprites/companion/frame2-Photoroom.png',
    './sprites/companion/frame3-Photoroom.png',
    './sprites/companion/frame4-Photoroom.png',
    './sprites/companion/frame5-Photoroom.png',
    './sprites/companion/frame6-Photoroom.png',
    './sprites/companion/frame7-Photoroom.png',
    './sprites/companion/frame8-Photoroom.png',
    './sprites/companion/frame9-Photoroom.png',
];

let currentDogFrame = 0;
const totalDogFrames = dogFrames.length;
const DogImgElement = document.getElementById('dogGif');
const petBtn = document.getElementById('upgrade-pet-btn');

const dogFrameDuration = 100;

function updateDogFrame() {
    currentDogFrame = 0
    const dogIntervalId = setInterval(() => {
        DogImgElement.src = dogFrames[currentDogFrame];
        currentDogFrame++;
        if (currentDogFrame >= totalDogFrames) {
            clearInterval(dogIntervalId);
            currentDogFrame = dogFrames.length;
        }
    }, dogFrameDuration);
}

let companionDamageTimer = setInterval(() => {
    dealCompanionDamage(companionDamage);
}, 2000);

function dealCompanionDamage(petDamage) {
    updateDogFrame();
    if (currentHP > 0) {
        currentHP -= petDamage;
        if (currentHP < 0) {
            currentHP = 0;
        }
        updateHealth();
    }
    if (currentHP === 0) {
        nextMonster();
    }
}

DogImgElement.style.display = 'none';

//managing player frames

const playerFrames = [
    './sprites/player/frame2-Photoroom.png',
    './sprites/player/frame3-Photoroom.png',
    './sprites/player/frame4-Photoroom.png',
    './sprites/player/frame5-Photoroom.png',
    './sprites/player/frame1-Photoroom.png',
];

let currentPlayerFrame = 0;
const totalPlayerFrames = playerFrames.length;
const playerFrameDuration = 50;
const playerSwoosh = new Audio('./sprites/player/sword-swoosh (mp3cut.net).mp3');
playerSwoosh.volume = 0.35;

function updatePlayerFrame() {
    const playerIntervalId = setInterval(() => {
        player.src = playerFrames[currentPlayerFrame];
        currentPlayerFrame++;
        if (currentPlayerFrame >= totalPlayerFrames) {
            currentPlayerFrame = 0;
            clearInterval(playerIntervalId);
        }
    }, playerFrameDuration);

    playerSwoosh.currentTime = 0;
    playerSwoosh.play();
}


//Armour fixtures
//
//
//

function upgradeHelmetButton() {
    if (coins >= upgradeHelmetPrice) {
        coins -= upgradeHelmetPrice;
        updateCoinCount();

        damage += 10;

        if (upgradeHelmetPrice - Math.floor(upgradeHelmetPrice * 1.36) < 10) {
            upgradeHelmetPrice += 15;
        }
        else {
            upgradeHelmetPrice += Math.floor(upgradeHelmetPrice * 1.45);
        }

        helmetImgContent = `(${upgradeHelmetPrice} coins)`;

        shuffleHelmetImage();
        renderArmourUpgrades();
        renderStats();

        upgradeSound.currentTime = 0;
        upgradeSound.play();

    } else {
        errorSound.currentTime = 0;
        errorSound.play();
    }
}



function upgradeChestplateButton() {
    if (coins >= upgradeChestplatePrice) {
        coins -= upgradeChestplatePrice;
        updateCoinCount();

        damage += 15;

        if (upgradeChestplatePrice - Math.floor(upgradeChestplatePrice * 1.36) < 10) {
            upgradeChestplatePrice += 15;
        }
        else {
            upgradeChestplatePrice += Math.floor(upgradeChestplatePrice * 1.45);
        }


        chestplateImgContent = `(${upgradeChestplatePrice} coins)`;

        shuffleChestplateImage();
        renderArmourUpgrades();
        renderStats();

        upgradeSound.currentTime = 0;
        upgradeSound.play();

    } else {
        errorSound.currentTime = 0;
        errorSound.play();
    }

}

function upgradeBootsButton() {
    if (coins >= upgradeBootsPrice) {
        coins -= upgradeBootsPrice;
        updateCoinCount();

        damage += 5;

        if (upgradeBootsPrice - Math.floor(upgradeBootsPrice * 1.36) < 10) {
            upgradeBootsPrice += 15;
        }
        else {
            upgradeBootsPrice += Math.floor(upgradeBootsPrice * 1.45);
        }


        bootsImgContent = `(${upgradeBootsPrice} coins)`;

        shuffleBootsImage();
        renderArmourUpgrades();
        renderStats();

        upgradeSound.currentTime = 0;
        upgradeSound.play();

    } else {
        errorSound.currentTime = 0;
        errorSound.play();
    }

}

const helmetImages = [
    './sprites/armour/helmet1-Photoroom.png',
    './sprites/armour/helmet2-Photoroom.png',
    './sprites/armour/helmet3-Photoroom.png',
    './sprites/armour/helmet4-Photoroom.png',
    './sprites/armour/helmet5-Photoroom.png',
    './sprites/armour/helmet6-Photoroom.png',
    './sprites/armour/helmet7-Photoroom.png',
    './sprites/armour/helmet8-Photoroom.png',
    './sprites/armour/helmet9-Photoroom.png',
    './sprites/armour/helmet10-Photoroom.png',
];

function shuffleHelmetImage() {

    helmetIndex++;

    helmetImg.src = helmetImages[helmetIndex];


    if (helmetIndex === helmetImages.length) {
        upgradeHelmetPrice = `.`;
        helmetImgContent = `Maxed`;
        helmetBtn.disabled = true;
    }
}

const chestplateImages = [
    './sprites/armour/chestplate1-Photoroom.png',
    './sprites/armour/chestplate2-Photoroom.png',
    './sprites/armour/chestplate3-Photoroom.png',
    './sprites/armour/chestplate4-Photoroom.png',
    './sprites/armour/chestplate5-Photoroom.png',
    './sprites/armour/chestplate6-Photoroom.png',
    './sprites/armour/chestplate7-Photoroom.png',
    './sprites/armour/chestplate8-Photoroom.png',
    './sprites/armour/chestplate9-Photoroom.png',
    './sprites/armour/chestplate10-Photoroom.png',
];

function shuffleChestplateImage() {

    chestplateIndex++;

    chestplateImg.src = chestplateImages[chestplateIndex];


    if (chestplateIndex === chestplateImages.length) {
        upgradeChestplatePrice = `.`;
        chestplateImgContent = `Maxed`;
        chestplateBtn.disabled = true;
    }
}

const bootsImages = [
    './sprites/armour/boots1-Photoroom.png',
    './sprites/armour/boots2-Photoroom.png',
    './sprites/armour/boots3-Photoroom.png',
    './sprites/armour/boots4-Photoroom.png',
    './sprites/armour/boots5-Photoroom.png',
    './sprites/armour/boots6-Photoroom.png',
    './sprites/armour/boots7-Photoroom.png',
    './sprites/armour/boots8-Photoroom.png',
    './sprites/armour/boots9-Photoroom.png',
    './sprites/armour/boots10-Photoroom.png',
];

function shuffleBootsImage() {

    bootsIndex++;

    bootsImg.src = bootsImages[bootsIndex];

    if (bootsIndex === bootsImages.length) {
        upgradeBootsPrice = ".";
        bootsImgContent = `Maxed`;
        chestplateBtn.disabled = true;
    }
}


document.addEventListener('click', (event) => {
    if (!spritesContainer.contains(event.target)) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
});


backgroundSound.loop = true;
backgroundSound.volume = 0.2;

window.addEventListener("load", () => {
  backgroundSound.play().catch(() => {

    alert("Autoplay blocked. Waiting for user action...");
    
    const resumeAudio = () => {
      backgroundSound.play();
      document.removeEventListener("click", resumeAudio);
      document.removeEventListener("keydown", resumeAudio);
    };

    document.addEventListener("click", resumeAudio);
    document.addEventListener("keydown", resumeAudio);
  });
});