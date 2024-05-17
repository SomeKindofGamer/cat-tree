addLayer("main", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🐱", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Currency

        }
    },
    color: "#ffd36e",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "cats", // Name of prestige currency
    baseResource: "monies", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    base: new Decimal(5), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        if (player[this.layer].points.gte(30)) {
            if (hasUpgrade('main', 31)) {

            } else {
                Generation = new Decimal(0)
            }
        } else {
            if (hasUpgrade('main', 21)) {
                if (player[this.layer].points.gte(1)) {
                    let decreaseRate = player[this.layer].points.pow(0.25); // Adjust the divisor for desired decrease rate
                    Generation = new Decimal(0.8).div(decreaseRate); // Adjust the initial value and decrease rate as needed
                }
            }

            if (hasUpgrade('main', 31)) {
                if (player[this.layer].points.gte(1)) {
                    let decreaseRate = player[this.layer].points.pow(0.45); // Adjust the divisor for desired decrease rate
                    Generation = new Decimal(0.5).div(decreaseRate); // Adjust the initial value and decrease rate as needed
                }
            }

            if (hasUpgrade('main', 41)) {
                if (player[this.layer].points.gte(1)) {
                    let decreaseRate = player[this.layer].points.pow(0.45); // Adjust the divisor for desired decrease rate
                    Generation = new Decimal(0.6).div(decreaseRate); // Adjust the initial value and decrease rate as needed
                }
            }
        }
        return Generation
    },

    upgrades: {

        11: {
            title: "make a tiktok for your cat",
            description: "+1 monies gain",
            cost: new Decimal(1),
        },

        12: {
            title: "make a youtube for your cat",
            description: "Multiply your monies gain by how much cats you have",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.7434)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x more monies" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('main', 11)) },
        },

        13: {
            title: "make a youtube shorts account for your cat",
            description: "Multiply your monies gain by how much cats you have by even more cause youtube shorts gets milked alot",
            cost: new Decimal(3),
            effect() {
                if (hasUpgrade('main', 14)) {
                    let multthing = new Decimal(0.9)
                    return player[this.layer].points.add(1).pow(multthing.mul(upgradeEffect('main', 14)))
                } else {
                    return player[this.layer].points.add(1).pow(0.9)
                }

            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x more monies" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('main', 12)) },
        },

        14: {
            title: "summon the cat god or something maybe he'll give you monies???",
            description: "i dont know lol just hes nice maybe?",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay2() { return format(upgradeEffect(this.layer, this.id)) + "?" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('main', 13)) },
        },

        21: {
            title: "you got too rich and caused inflation",
            description: "oh god inflation cats are too expensive now",
            cost: new Decimal(30),
            unlocked() { return (hasUpgrade('main', 14)) },
        },

        22: {
            title: "monies cloning machine",
            description: "thank you grandma for giving this to me",
            cost: new Decimal(7),
            effect() {
                if (player.points.gte(10)) {
                    if (hasUpgrade('main', 34)) {
                        return player.points.log(100).add(1)
                    } else {
                        return player.points.log(215).add(1)
                    }
                } else {
                    return 1
                }
            },
            effectDisplay3() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('main', 21)) },
        },

        23: {
            title: "wait we've been starving our cats for this long??",
            description: "unlock cat food",
            cost: new Decimal(10),
            unlocked() {
                return (hasUpgrade('main', 22))
            },
        },

        31: {
            title: "the garden",
            description: "buy a nice cute garden for the cats to explore",
            cost: new Decimal(25),
            effectDisplay4() {},
            unlocked() {
                if (hasMilestone('catfood', 2)) {
                    return (hasUpgrade('main', 23))
                }
            },
        },

        32: {
            title: "fertilizer",
            description: "multiply your monies with how many flowers you gots",
            cost: new Decimal(10),
            effect() {
                return player.garden.points.add(1).pow(0.73241)
            },
            effectDisplay3() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            unlocked() {
                if (hasUpgrade('garden', 13)) {
                    return (hasUpgrade('main', 31))
                }
            },
        },

        33: {
            title: "get a tuxedo cat",
            description: "this cutie will multiply your money by 3.5x",
            cost: new Decimal(12),
            unlocked() {
                if (hasUpgrade('garden', 13)) {
                    return (hasUpgrade('main', 32))
                }
            },
        },

        34: {
            title: "upgrade the money cloning machine!!!",
            description: "this makes it better",
            cost: new Decimal(15),
            unlocked() {
                if (hasUpgrade('garden', 13)) {
                    return (hasUpgrade('main', 33))
                }
            },
        },

        41: {
            title: "pray to the cat god for cheaper cats",
            description: "fine heres cheaper cats I GUESS.",
            cost: new Decimal(17),
            unlocked() {
                if (hasMilestone('garden', 3)) {
                    return (hasUpgrade('main', 34))
                }
            },
        },
    },

    automate() {
        if (hasMilestone('garden', 2) || hasAchievement('a', 23)) {
            buyUpgrade('main', 11)
            buyUpgrade('main', 12)
            buyUpgrade('main', 13)
            buyUpgrade('main', 14)
            buyUpgrade('main', 21)
            buyUpgrade('main', 22)
            buyUpgrade('main', 23)
            buyUpgrade('main', 31)
        }

        if (hasMilestone('garden', 4) || hasAchievement('a', 25)) {
            buyUpgrade('main', 32)
            buyUpgrade('main', 33)
            buyUpgrade('main', 34)
            buyUpgrade('main', 41)
        }
    },

    autoPrestige() {
        if (hasMilestone('garden', 2) || hasAchievement('a', 23)) {
            return true
        } else {
            return false
        }
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return true },

    tabFormat: {
        "Cats": {
            content: ["main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades",
            ]

        },
    }
})

addLayer("catfood", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🥫", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Currency

        }
    },
    branches: ["main"],
    color: "#ff7575",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "cat food", // Name of prestige currency
    baseResource: "cats", // Name of resource prestige is based on
    baseAmount() { return player.main.points }, // Get the current amount of baseResource
    type: "catfood", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: new Decimal(1.5), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        if (hasUpgrade('main', 23)) {

        } else {
            Generation = new Decimal(0)
        }

        if (hasMilestone('catfood', 2)) {
            if (hasMilestone('garden', 3)) {

            } else {
                Generation = new Decimal(0)
            }
        }

        if (hasMilestone('garden', 4)) {
            Generation = new Decimal(1.075)
        }
        return Generation
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let visible = false
        if (hasUpgrade('main', 23)) {
            visible = true
        }
        if (player[this.layer].points.gte(1)) {
            visible = true
        }
        return visible
    },

    milestones: {
        0: {
            requirementDescription: "Give your cats food (1)",
            effectDescription: "2x monies",
            done() {
                return player.catfood.points.gte(1)
            }
        },

        1: {
            requirementDescription: "Give your cats better tasting food (2)",
            effectDescription: "2.5x monies",
            done() {
                return player.catfood.points.gte(2)
            },
            unlocked() {
                if (hasMilestone('catfood', 1)) return true
            }
        },

        2: {
            requirementDescription: "Premium Cat Food (3)",
            effectDescription: "3x monies and unlock 1 new cat upgrade",
            done() {
                return player.catfood.points.gte(3)
            },
            unlocked() {
                if (hasMilestone('catfood', 1)) return true
            }
        },

        3: {
            requirementDescription: "Flower Cat Food (4)",
            effectDescription: "Unlock 1 new cat upgrade",
            done() {
                if (hasMilestone('garden', 3)) {
                    return player.catfood.points.gte(4)
                }
            },
            unlocked() {
                if (hasMilestone('garden', 3)) return true
            }
        },

        4: {
            requirementDescription: "Amazing Cat Food (5)",
            effectDescription: "Automate cat upgrades 32, 33, 34, 41 and get 3x monies",
            done() {
                if (hasMilestone('garden', 3)) {
                    return player.catfood.points.gte(5)
                }
            },
            unlocked() {
                if (hasMilestone('garden', 3)) return true
            }
        },
    },

    tabFormat: {
        "Cat Food": {
            content: ["main-display",
                "resource-display",
                "catfood-prestige-button",
                "blank",
                "milestones",
            ]

        },
    }
})

addLayer("garden", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌼", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Currency

        }
    },
    branches: ["main", "catfood"],
    color: "#86ff6e",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "flowers", // Name of prestige currency
    baseResource: "cats", // Name of resource prestige is based on
    baseAmount() { return player.main.points }, // Get the current amount of baseResource
    type: "garden", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: new Decimal(1.45), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        if (hasUpgrade('main', 31)) {
            Generation = new Decimal(1)
        } else {
            Generation = new Decimal(0)
        }
        return Generation
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let visible = false
        if (hasUpgrade('main', 31)) {
            visible = true
        }
        if (hasUpgrade('garden', 11)) {
            visible = true
        }
        if (player[this.layer].points.gte(1)) {
            visible = true
        }
        return visible
    },

    milestones: {
        0: {
            requirementDescription: "These flowers make this place alot better (1)",
            effectDescription: "3x monies",
            done() {
                return player.garden.points.gte(1)
            }
        },

        1: {
            requirementDescription: "The cats love these flowers! (2)",
            effectDescription: "Unlock Flower Upgrades",
            done() {
                return player.garden.points.gte(2)
            },
            unlocked() {
                if (hasMilestone('garden', 1)) return true
            }
        },

        2: {
            requirementDescription: "These flowers are bringing cats over! (3)",
            effectDescription: "Automate cats and cat upgrades",
            done() {
                return player.garden.points.gte(3)
            },
            unlocked() {
                if (hasMilestone('garden', 2)) return true
            }
        },

        3: {
            requirementDescription: "Flower Flavored Cat Food (4)",
            effectDescription: "Unlock Cat Food 4 and 5 milestones and 2x monies",
            done() {
                return player.garden.points.gte(4)
            },
            unlocked() {
                if (hasMilestone('garden', 2)) return true
            }
        },

        4: {
            requirementDescription: "plant a golden flower (5)",
            effectDescription: "1 new flower upgrade and 1.075x easier cat food requirement",
            done() {
                return player.garden.points.gte(5)
            },
            unlocked() {
                if (hasMilestone('garden', 3)) return true
            }
        },
    },

    upgrades: {

        11: {
            title: "pray to the flower gods that you'll plant more flowers if they give you more monies",
            description: "x3.451 monies gain",
            cost: new Decimal(1),
        },

        12: {
            title: "make a tiktok about planting",
            description: "x5 monies gain",
            cost: new Decimal(2),
        },

        13: {
            title: "invent your own flower type",
            description: "grow cats in your garden! (unlock 2 new cat upgrades) (oh and these upgrades wont automate sorry)",
            cost: new Decimal(3),
        },

        21: {
            title: "THE PORTAL",
            description: "UNLOCK THE PORTAL",
            cost: new Decimal(5),
            unlocked() {
                if (hasMilestone('garden', 4)) return true
            }
        },

    },

    tabFormat: {
        "The Garden": {
            content: ["main-display",
                "resource-display",
                "garden-prestige-button",
                "blank",
                "milestones",
            ]

        },
        "Flower Upgrades": {
            content: ["main-display",
                "resource-display",
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasAchievement('a', 22)
            }
        },
    }
})

addLayer("portal", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌼", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Currency

        }
    },
    branches: ["garden"],
    color: "#5b1d75",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "essence", // Name of prestige currency
    baseResource: "flowers", // Name of resource prestige is based on
    baseAmount() { return player.garden.points }, // Get the current amount of baseResource
    type: "essence", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: new Decimal(1.45), // Only needed for static layers, base of the formula (b^(x^exp))
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        let Generation = new Decimal(1)
        if (hasUpgrade('garden', 21)) {
            Generation = new Decimal(1)
        } else {
            Generation = new Decimal(0)
        }
        return Generation
    },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let visible = false
        if (hasUpgrade('garden', 21)) {
            visible = true
        }
        if (hasUpgrade('portal', 11)) {
            visible = true
        }
        if (player[this.layer].points.gte(1)) {
            visible = true
        }
        return visible
    },

    milestones: {
        0: {
            requirementDescription: "THIS IS JUST THE START (1)",
            effectDescription: "Unlock Essence Upgrades",
            done() {
                return player.portal.points.gte(1)
            }
        },
    },

    upgrades: {

        11: {
            title: "Forge this essence into a money generator",
            description: "very much monies (CURRENT ENDGAME)",
            effect() {
                if (player.points.gte(5)) {
                    return player.points.log(10).add(1)
                } else {
                    return 1
                }
            },
            effectDisplay3() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            cost: new Decimal(1),
        },

    },

    tabFormat: {
        "THE PORTAL": {
            content: ["main-display",
                "resource-display",
                "portal-prestige-button",
                "blank",
                "milestones",
            ]

        },
        "ESSENCE UPGRADES": {
            content: ["main-display",
                "resource-display",
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasAchievement('a', 22)
            }
        },
    }
})

addLayer("a", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "yellow",
    resource: "achievements",
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "how cute!",
            done() { return player.main.points.gte(1) },
            tooltip: "Get 1 cat", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        12: {
            name: "got a new friend!",
            done() { return player.main.points.gte(2) },
            tooltip: "Get 2 cats", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        13: {
            name: "more friends :3",
            done() { return player.main.points.gte(5) },
            tooltip: "Get 5 cats", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        13: {
            name: "meow meow meow",
            done() { return player.main.points.gte(15) },
            tooltip: "Get 15 cats", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        14: {
            name: "starving cats is wrong!",
            done() { return player.catfood.points.gte(1) },
            tooltip: "Get 1 cat food", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        15: {
            name: "they better enjoy this premium cat food",
            done() { return player.catfood.points.gte(3) },
            tooltip: "Get 3 cat food", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        21: {
            name: "how pretty",
            done() { return player.garden.points.gte(1) },
            tooltip: "Get 1 flower", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        22: {
            name: "already looking better!",
            done() { return player.garden.points.gte(2) },
            tooltip: "Get 2 flowers", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        23: {
            name: "finally automation!",
            done() { return player.garden.points.gte(3) },
            tooltip: "Get 3 flowers", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        24: {
            name: "is this supposed to taste good?",
            done() { return player.catfood.points.gte(4) },
            tooltip: "Get 4 cat food", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        25: {
            name: "FULL automation i think",
            done() { return player.catfood.points.gte(5) },
            tooltip: "Get 5 cat food", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        31: {
            name: "THE PORTAL!",
            done() { hasMilestone('garden', 4) },
            tooltip: "UNLOCK THE PORTAL!", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

        32: {
            name: "This is just the start.",
            done() { return player.portal.points.gte(1) },
            tooltip: "Get 1 Essence", // Showed when the achievement is completed
            onComplete() { player.a.points = player.a.points.add(1) }
        },

    },

    tabFormat: [
        ["display-text", function() { return "<MA style='font-size: 25px; font-family: url(\"fonts/cabin.ttf\")'>Achievements ~ " + player.a.achievements.length + " / " + (Object.keys(tmp.a.achievements).length - 2) }],
        "blank",
        "blank", ["row", [
            ["achievement", 11],
            ["achievement", 12],
            ["achievement", 13],
            ["achievement", 14],
            ["achievement", 15],
        ]],
        "blank", ["row", [
            ["achievement", 21],
            ["achievement", 22],
            ["achievement", 23],
            ["achievement", 24],
            ["achievement", 25],
        ]],
        "blank", ["row", [
            ["achievement", 31],
            ["achievement", 32],
            ["achievement", 33],
            ["achievement", 34],
            ["achievement", 35],
        ]],
        "blank",
        "blank",
    ],
    layerShown() { return true }
})