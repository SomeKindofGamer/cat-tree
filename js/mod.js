let modInfo = {
    name: "The Cat Tree",
    id: "KITTIES",
    author: "Shoober",
    pointsName: "monies",
    modFiles: ["layers.js", "tree.js"],

    discordName: "Shoober's Trees Server",
    discordLink: "https://discord.gg/reRV6Wj359",
    initialStartPoints: new Decimal(0), // Used for hard resets and new players
    offlineLimit: 1, // In hours
}

// Set your version in num and name
let VERSION = {
    num: "1.1",
    name: "Cat Tree",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v1.1</h3><br>
		- THE PORTAL.<br>
        - Flower Upgrades!<br>
        - More achievements<br>
        - Fixed bug where all the prestige buttons would say +0<br>
        - Fixed bug where garden upgrade would always be visible<br>
    <h3>v1.0.1</h3><br>
		- fixed bug where 1 flower wouldn't give its boost<br>
        - garden upgrade now says the debuff<br>
	<h3>v1.0</h3><br>
		- what<br>
		`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
    return true
}

// Calculate points/sec!
function getPointGen() {
    if (!canGenPoints())
        return new Decimal(0)
    let gain = new Decimal(1)
    if (hasUpgrade('main', 11)) gain = gain.add(1)
    if (hasUpgrade('main', 12)) gain = gain.times(upgradeEffect('main', 12))
    if (hasUpgrade('main', 13)) gain = gain.times(upgradeEffect('main', 13))
    if (hasUpgrade('main', 22)) gain = gain.times(upgradeEffect('main', 22))
    if (hasUpgrade('main', 32)) gain = gain.times(upgradeEffect('main', 32))
    if (hasUpgrade('main', 33)) gain = gain.mul(3.5)
    if (hasMilestone('catfood', 0)) gain = gain.mul(2)
    if (hasMilestone('catfood', 1)) gain = gain.mul(2.5)
    if (hasMilestone('catfood', 2)) gain = gain.mul(3)
    if (hasMilestone('catfood', 4)) gain = gain.mul(3)
    if (hasMilestone('garden', 0)) gain = gain.mul(3)
    if (hasMilestone('garden', 3)) gain = gain.mul(2)
    if (hasUpgrade('garden', 11)) gain = gain.mul(3.451)
    if (hasUpgrade('garden', 12)) gain = gain.mul(5)
    if (hasUpgrade('portal', 11)) gain = gain.times(upgradeEffect('portal', 11))
    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
    return {}
}

// Display extra things at the top of the page
var displayThings = []

// Determines when the game "ends"
function isEndgame() {
    return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
    return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}