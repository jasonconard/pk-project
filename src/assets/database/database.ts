import { GameDatabase } from '../../app/modules/database-editor/shared/database';

/**
 * The game's database (elements, weapon types, states, skills, items, characters, enemies, groups). Written by the database editor's export (editor →
 * Éditeurs → Base de données → Exporter); the database saved in the browser replaces this one.
 */
export const CODE_DATABASE: GameDatabase = {
  "elements": [
    {
      "id": "el-physical",
      "name": "Physique",
      "color": "#bec3d2",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnklEQVR42mNgGGjAiC4gIiTzH5+GN++eMOKUFBGS+f/r7Kr/uOhL0yr+o1vARKkXmIh1Ot4wEBGS+f9sdx8DAwMDg5RrEU7F+1piGJxqlqCEAwu6IphB2MCNk+dwewEGpFyL8LqCoAG4XIDNdpR0gBwOuAxA9z9KGLx594RRyrXo/76WGJJiASMQ6xgq8ChfQjgMKMoLxCQmvHmBHAAA/fxG5Q+D01sAAAAASUVORK5CYII=",
      "physical": true,
      "weathers": []
    },
    {
      "id": "el-fire",
      "name": "Feu",
      "color": "#f08c32",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVR42mNgwANEhGT+MxAATPg036kSI2gIEyEbCBnChM92fi85gt5iwqWZWG8x4dKMbDtM05t3TxhV2l6heAurF5A1w9gwTeiuY8Ln9I9SMzAMIRiIMMUwzeiGkByNhAzBaQD/swysbHTASCgGUFyy7REDAwMDg0rbK4Y3754worgAFkXICglpZmBgYGBBVgQxhOE/AwMDwx0sLoBZgNULxOREZJupBgCxP1aciFf8igAAAABJRU5ErkJggg==",
      "weathers": [
        {
          "weather": "heatwave",
          "percent": 25
        },
        {
          "weather": "rainy",
          "percent": -25
        },
        {
          "weather": "snow",
          "percent": -25
        }
      ]
    },
    {
      "id": "el-ice",
      "name": "Glace",
      "color": "#8fd8ff",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42mNgwANEhGT+iwjJ/GcgB4gIyfxf9ez//1XP/uM1hAldEzLfjeslVoOxGiAiJPN/2pXHKAp2fRPH0IyuBquzYX7/8OEFCp+Qd1AMgWmG0bg0s2DzF7Fh8ObdE0ZGmL+wKcYGkMMlS0eWgRGbC6ZdeYziApimLB1ZFMPevHvCyAJjYHPirm/iGC5DVkswFmCBSFQsoCvAlhKJMgRbdKKL40zK2PyHnhrxhgFVcyOxAACfpazfE0O7wAAAAABJRU5ErkJggg==",
      "weathers": [
        {
          "weather": "snow",
          "percent": 25
        },
        {
          "weather": "blizzard",
          "percent": 50
        },
        {
          "weather": "heatwave",
          "percent": -25
        }
      ]
    },
    {
      "id": "el-wind",
      "name": "Vent",
      "color": "#6ec86e",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkElEQVR42mNgGGjAiE1QREjmP7rYm3dPGIkyQERI5n/UtiAMhcu81mE1hBGb5mVe61AUwQzEZQhcMwxjk8s7kYdVjgWHs/9j8wJ6GL1594SREZefcYFlXutQvMSIK9TxAVg4vXn3hJGRUOhjiwlkL7AQqxlXmmCBCSzzWvcfn5NJSonYvIU3DRAyhNRApi8AAEusVh8vb/ZCAAAAAElFTkSuQmCC",
      "weathers": [
        {
          "weather": "tornado",
          "percent": 50
        }
      ]
    },
    {
      "id": "el-thunder",
      "name": "Foudre",
      "color": "#ffd650",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVR42mNkIAKICMn8R+a/efeEEcZmIUbz6yMmcL6ozRkUeSZSNSPbjtcAYjTjtfn/tYD//68F/P/w4cV/9DBABoz4bP4oNYNBRckEQxPOQETXzMDAwIDsDWyByIgvutANwBYOjAMeiNTVjGwA3TRjTYkqSibEBxi6C0h2NqUAAOEXcmOWAvBRAAAAAElFTkSuQmCC",
      "parts": [
        "el-fire",
        "el-wind"
      ],
      "weathers": [
        {
          "weather": "storm",
          "percent": 25
        },
        {
          "weather": "thunder-rain",
          "percent": 25
        }
      ]
    },
    {
      "id": "el-light",
      "name": "Lumière",
      "color": "#f0f0e8",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuUlEQVR42qVTSwrDIBQcQ/eFEDfFE2Tt0kPkGD1Sj9FDZJm1J5BSUCQ9weuiJJgYPyUDgp8346gjkEHXCupaQbmaBgXYUSIn0ux3RAXCusgB6SFpu2sFkR42a5dw4LxhXIHsKMEVaE/+zU9w3rCiRdIDzfN7bSln7OjsdpT43B6R8PV1B1fTVmCxFuKIHIos4Go67+D0HSTJSwqP+lXkmnGUAwBg/TP5xs4bxnqTTmIxIH/WVf3G0/gCfJ2NGOkx1EMAAAAASUVORK5CYII=",
      "weathers": [
        {
          "weather": "sunny",
          "percent": 10
        },
        {
          "weather": "darkness",
          "percent": -25
        }
      ]
    },
    {
      "id": "el-dark",
      "name": "Ténèbres",
      "color": "#aa64dc",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVR42mNgoBAw4pIQEZL5jy725t0TDPUsuDROCzoAF9t1bhfDhgdthF0gIiTzH10jAwMDw4YHbVhtZ2BgYGCiRDOKAciAWM1wA9Btx6cZPXCZSIkyESGZ/3funUExhCQD3rx7wqiiZILiMhZsCt2M3CDeYGj7j+4NdD4jrlhAj39kjTAvvHn3hJEFn5NhLoG5BsYOUKiCG4w3IeGKYuQYYiQmKcNA1joHDO9QnJkoBgDurGvY46Sn2AAAAABJRU5ErkJggg==",
      "weathers": [
        {
          "weather": "darkness",
          "percent": 25
        },
        {
          "weather": "blood-moon",
          "percent": 25
        }
      ]
    }
  ],
  "weapons": [
    {
      "id": "wp-sword",
      "name": "Épée",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR42mNkIBOICMn8Z2BgYGAiV/Ode2cYyDIApvnc5Vfk2fzhw4v/+w5f+g/zwqhmNMXIiki2WURI5v+JaRr/YQaR5WxkQ8jyM7ohZGmelmLznyxDkDWT7BIRIZn/UTaYitFjhugoJAUAALvxgEVzTYQuAAAAAElFTkSuQmCC"
    },
    {
      "id": "wp-bow",
      "name": "Arc",
      "ranged": true,
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAr0lEQVR42mNgoBAw4pMUEZL5D2O/efcEq1oWfBqbghQYGBgYGOrWPcBpCQs2zega79w7wyAgIEHYAHTNSM7+j8sFTNgE0TQTB0SEZP5PS7H5jxxwMPDhwwucLmDEpgEd3Ll3hkFFyQRD/M27J4yMIkIy/1dt3EaSax2F6xgYGBgYRG3OUO4CisOAqIDEZwDWaGwKUmAgxmsYBrx594QRlvpghhAyiJHYvIArYVGcGwHM/l5U1/kuZgAAAABJRU5ErkJggg=="
    },
    {
      "id": "wp-fist",
      "name": "Poings",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnklEQVR42mNgGGjAiC4gIiTzH5+GN++eMOKUFBGS+f/r7Kr/uOhL0yr+o1vARKkXmIh1Ot4wEBGS+f9sdx8DAwMDg5RrEU7F+1piGJxqlqCEAwu6IphB2MCNk+dwewEGpFyL8LqCoAG4XIDNdpR0gBwOuAxA9z9KGLx594RRyrXo/76WGJJiASMQ6xgq8ChfQjgMKMoLxCQmvHmBHAAA/fxG5Q+D01sAAAAASUVORK5CYII="
    },
    {
      "id": "wp-staff",
      "name": "Bâton",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVR42mNkIAGICMn8h7HfvHvCyMDAwMBIiuZpQQfg/Kx1Dgxv3j1hZCJJc5MyhhwTKV5gqLvLQDYQEZL5vyrlzv9VKXf+I4cF8f5PsfkvIiRDmWaynD2qmZ6ao2w0yNMMM4BszZQCAMTpRf4v18mFAAAAAElFTkSuQmCC"
    }
  ],
  "states": [
    {
      "id": "st-poison",
      "name": "Poison",
      "color": "#aa64dc",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42mNgoCUQEZL5LyIk859szatS7vxPMZqG1xAWXJqnBR1gYGBgYHAzcmNgYGBg2MDQ9v/NuyeM6GqZcGl26+GBi7kZuTEEKFQxYHMJCy7Nu0q+oCjE5RImbF5A14wPsGDzd9Y6BwYGBgYGXHxkVzBRGtVYYwFmEy4+3lhABlnrHODOxwUYccU/1sA9t4thw4M2BuRYYMSWDgIUquDRBtPIwMCAoRmrATBDsIljS4kDDwBXxFMZGUA4rAAAAABJRU5ErkJggg==",
      "turns": 0,
      "staysAfterFight": true,
      "endsOnHit": false,
      "effects": [
        {
          "kind": "hp",
          "percent": -10
        }
      ]
    },
    {
      "id": "st-burn",
      "name": "Brûlure",
      "color": "#f08c32",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVR42mNgwANEhGT+MxAATPg036kSI2gIEyEbCBnChM92fi85gt5iwqWZWG8x4dKMbDtM05t3TxhV2l6heAurF5A1w9gwTeiuY8Ln9I9SMzAMIRiIMMUwzeiGkByNhAzBaQD/swysbHTASCgGUFyy7REDAwMDg0rbK4Y3754worgAFkXICglpZmBgYGBBVgQxhOE/AwMDwx0sLoBZgNULxOREZJupBgCxP1aciFf8igAAAABJRU5ErkJggg==",
      "turns": 3,
      "staysAfterFight": false,
      "endsOnHit": false,
      "effects": [
        {
          "kind": "hp",
          "percent": -5
        },
        {
          "kind": "stat",
          "stat": "str",
          "percent": -25
        }
      ]
    },
    {
      "id": "st-sleep",
      "name": "Sommeil",
      "color": "#4d96ff",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVR42mNgoBAw4pMUEZL5j0vuzbsnjAwMDAwshGywabmCIXakRoc454kIyfxHxgHTPvxHdxVeF8CcScg7RLkEm+0ogYhN8s27J4wiQjL/cYXDm3dPGFlwBRhyQBEVaIQCCxdgQnYucqBRPbAIugA5sGxarhAdbQRjgWH4AwDjmUVJJe+U1QAAAABJRU5ErkJggg==",
      "turns": 3,
      "staysAfterFight": false,
      "endsOnHit": true,
      "effects": [
        {
          "kind": "skip",
          "chance": 100
        }
      ]
    },
    {
      "id": "st-paralysis",
      "name": "Paralysie",
      "color": "#ffd650",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVR42mNkIAKICMn8R+a/efeEEcZmIUbz6yMmcL6ozRkUeSZSNSPbjtcAYjTjtfn/tYD//68F/P/w4cV/9DBABoz4bP4oNYNBRckEQxPOQETXzMDAwIDsDWyByIgvutANwBYOjAMeiNTVjGwA3TRjTYkqSibEBxi6C0h2NqUAAOEXcmOWAvBRAAAAAElFTkSuQmCC",
      "turns": 4,
      "staysAfterFight": false,
      "endsOnHit": false,
      "effects": [
        {
          "kind": "skip",
          "chance": 30
        },
        {
          "kind": "stat",
          "stat": "agi",
          "percent": -50
        }
      ]
    },
    {
      "id": "st-strength",
      "name": "Force +",
      "color": "#d64040",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeklEQVR42mNgoCUQEZL5LyIk8x+fGhZ8mg/pqTAwMDAw2F1i+P/m3RNGbOqYCGlmYGBgOKSnwoDLJUyENBMyhIkYzfgMYUTWjK4YGdhduoPCh4UJC7oANsOwqcEbiKQA+hiw7d4L8g3ApxlvSiSkESMa0dMDsbEw8AAABU0w82mz9rcAAAAASUVORK5CYII=",
      "turns": 3,
      "staysAfterFight": false,
      "endsOnHit": false,
      "effects": [
        {
          "kind": "stat",
          "stat": "str",
          "percent": 25
        }
      ]
    }
  ],
  "skills": [
    {
      "id": "sk-fireball",
      "name": "Boule de feu",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVR42mNgwANEhGT+MxAATPg036kSI2gIEyEbCBnChM92fi85gt5iwqWZWG8x4dKMbDtM05t3TxhV2l6heAurF5A1w9gwTeiuY8Ln9I9SMzAMIRiIMMUwzeiGkByNhAzBaQD/swysbHTASCgGUFyy7REDAwMDg0rbK4Y3754worgAFkXICglpZmBgYGBBVgQxhOE/AwMDwx0sLoBZgNULxOREZJupBgCxP1aciFf8igAAAABJRU5ErkJggg==",
      "note": "Une petite boule de feu.",
      "element": "el-fire",
      "mp": 4,
      "cast": 0.5,
      "target": "enemy",
      "use": "fight",
      "effects": [
        {
          "kind": "damage",
          "stat": "mag",
          "power": 40
        },
        {
          "kind": "addState",
          "state": "st-burn",
          "chance": 30
        }
      ],
      "learn": [
        {
          "id": "el-fire",
          "level": 2
        }
      ]
    },
    {
      "id": "sk-ice-lance",
      "name": "Lance de glace",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42mNgwANEhGT+iwjJ/GcgB4gIyfxf9ez//1XP/uM1hAldEzLfjeslVoOxGiAiJPN/2pXHKAp2fRPH0IyuBquzYX7/8OEFCp+Qd1AMgWmG0bg0s2DzF7Fh8ObdE0ZGmL+wKcYGkMMlS0eWgRGbC6ZdeYziApimLB1ZFMPevHvCyAJjYHPirm/iGC5DVkswFmCBSFQsoCvAlhKJMgRbdKKL40zK2PyHnhrxhgFVcyOxAACfpazfE0O7wAAAAABJRU5ErkJggg==",
      "element": "el-ice",
      "mp": 6,
      "cast": 1.5,
      "target": "enemy",
      "use": "fight",
      "effects": [
        {
          "kind": "damage",
          "stat": "mag",
          "power": 60
        }
      ],
      "learn": [
        {
          "id": "el-ice",
          "level": 3
        }
      ]
    },
    {
      "id": "sk-storm",
      "name": "Orage",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVR42mNkIAKICMn8R+a/efeEEcZmIUbz6yMmcL6ozRkUeSZSNSPbjtcAYjTjtfn/tYD//68F/P/w4cV/9DBABoz4bP4oNYNBRckEQxPOQETXzMDAwIDsDWyByIgvutANwBYOjAMeiNTVjGwA3TRjTYkqSibEBxi6C0h2NqUAAOEXcmOWAvBRAAAAAElFTkSuQmCC",
      "element": "el-thunder",
      "mp": 12,
      "cast": 3,
      "target": "enemies",
      "use": "fight",
      "effects": [
        {
          "kind": "damage",
          "stat": "mag",
          "power": 80
        },
        {
          "kind": "addState",
          "state": "st-paralysis",
          "chance": 20
        }
      ],
      "learn": [
        {
          "id": "el-fire",
          "level": 5
        },
        {
          "id": "el-wind",
          "level": 3
        }
      ]
    },
    {
      "id": "sk-heal",
      "name": "Soin",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtElEQVR42mNgoBAwInNEhGT+w9hv3j0hSo4RWUHUtiC4hmVe6+AK8cmhKGjSqGJgYGBgqLvRBlfIwMDAgKwZ3RAWdAmYZlwaGRgYGI5sOAdnM+HSTCxgwSUBcz4h1zDBQhVdAwMDA8Ode2cY7tw7g+H8R7MewAORCTlqsBmCTzPedABzAQMDA4OKkgmKQcgGsGBzNj4xdMMwDEBWgMsFOA1ATnnYFKMnb4JAREjmPy7DBg8AAPIqYzz2395TAAAAAElFTkSuQmCC",
      "element": "el-light",
      "mp": 3,
      "cast": 0.5,
      "target": "ally",
      "use": "both",
      "effects": [
        {
          "kind": "heal",
          "resource": "hp",
          "power": 40
        }
      ],
      "learn": [
        {
          "id": "el-light",
          "level": 1
        }
      ]
    },
    {
      "id": "sk-venom",
      "name": "Venin",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42mNgoCUQEZL5LyIk859szatS7vxPMZqG1xAWXJqnBR1gYGBgYHAzcmNgYGBg2MDQ9v/NuyeM6GqZcGl26+GBi7kZuTEEKFQxYHMJCy7Nu0q+oCjE5RImbF5A14wPsGDzd9Y6BwYGBgYGXHxkVzBRGtVYYwFmEy4+3lhABlnrHODOxwUYccU/1sA9t4thw4M2BuRYYMSWDgIUquDRBtPIwMCAoRmrATBDsIljS4kDDwBXxFMZGUA4rAAAAABJRU5ErkJggg==",
      "element": "el-dark",
      "mp": 5,
      "cast": 1,
      "target": "enemy",
      "use": "fight",
      "effects": [
        {
          "kind": "damage",
          "stat": "mag",
          "power": 20
        },
        {
          "kind": "addState",
          "state": "st-poison",
          "chance": 60
        }
      ],
      "learn": [
        {
          "id": "el-dark",
          "level": 2
        }
      ]
    },
    {
      "id": "sk-double",
      "name": "Coup double",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR42mNkIBOICMn8Z2BgYGAiV/Ode2cYyDIApvnc5Vfk2fzhw4v/+w5f+g/zwqhmNMXIiki2WURI5v+JaRr/YQaR5WxkQ8jyM7ohZGmelmLznyxDkDWT7BIRIZn/UTaYitFjhugoJAUAALvxgEVzTYQuAAAAAElFTkSuQmCC",
      "element": "el-physical",
      "mp": 0,
      "cast": 0.5,
      "target": "enemy",
      "use": "fight",
      "effects": [
        {
          "kind": "damage",
          "stat": "str",
          "power": 30
        },
        {
          "kind": "damage",
          "stat": "str",
          "power": 30
        }
      ],
      "learn": [
        {
          "id": "wp-sword",
          "level": 2
        }
      ]
    },
    {
      "id": "sk-lullaby",
      "name": "Berceuse",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVR42mNgoBAw4pMUEZL5j0vuzbsnjAwMDAwshGywabmCIXakRoc454kIyfxHxgHTPvxHdxVeF8CcScg7RLkEm+0ogYhN8s27J4wiQjL/cYXDm3dPGFlwBRhyQBEVaIQCCxdgQnYucqBRPbAIugA5sGxarhAdbQRjgWH4AwDjmUVJJe+U1QAAAABJRU5ErkJggg==",
      "element": "el-wind",
      "mp": 7,
      "cast": 3,
      "target": "enemies",
      "use": "fight",
      "effects": [
        {
          "kind": "addState",
          "state": "st-sleep",
          "chance": 50
        }
      ],
      "learn": [
        {
          "id": "el-wind",
          "level": 4
        }
      ]
    }
  ],
  "items": [
    {
      "id": "it-potion",
      "name": "Potion",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxklEQVR42mNkwAFEhGT+I/PfvHvCiE0dEwMe0BSkwNAUpIBPCQMLPkmN+GkQxjovBpKAiJDM/32HL/3/8OHF/w8fXvzfd/jSf3QvEeWCc5dfMZAM0G0n5ApGdM2rNm5jkKjNw2r4i+ZJDGH+XigxwoRLs9SGFRgGSNTmMazauA0lirFGo9SGFQzPAiKI8jJWA3Bp3nbvBWkJiZBmrAZgU4hLM85YOBcdhlWx0dJVGLHAiC0drNq4DasB6JqxGoAtJxLKkRQBACP0azKCeXhmAAAAAElFTkSuQmCC",
      "note": "Rend un peu de PV.",
      "kind": "consumable",
      "price": 50,
      "use": "both",
      "target": "ally",
      "effects": [
        {
          "kind": "heal",
          "resource": "hp",
          "power": 50
        }
      ]
    },
    {
      "id": "it-remedy",
      "name": "Remède",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtElEQVR42mNgoBAwInNEhGT+w9hv3j0hSo4RWUHUtiC4hmVe6+AK8cmhKGjSqGJgYGBgqLvRBlfIwMDAgKwZ3RAWdAmYZlwaGRgYGI5sOAdnM+HSTCxgwSUBcz4h1zDBQhVdAwMDA8Ode2cY7tw7g+H8R7MewAORCTlqsBmCTzPedABzAQMDA4OKkgmKQcgGsGBzNj4xdMMwDEBWgMsFOA1ATnnYFKMnb4JAREjmPy7DBg8AAPIqYzz2395TAAAAAElFTkSuQmCC",
      "note": "Guérit le poison.",
      "kind": "consumable",
      "price": 30,
      "use": "both",
      "target": "ally",
      "effects": [
        {
          "kind": "removeState",
          "state": "st-poison"
        }
      ]
    },
    {
      "id": "it-strength-seed",
      "name": "Graine de force",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAk0lEQVR42mNgoCUQEZL5LyIk8x+fGhZ8ml8fMWFgYGBgELVh+P/m3RNGbOqYKHUlI7KNyBIw22FA1OYMCh/mIhZ8mtDlPkrNYOB/loFiGCMuf+MCojZnGJDDgwndWehOxaeZKoHIhM8LojZnUPz7+ogJRmAzEXIuIW+h2P7/WsD//9cCsKY+XPJY0wGuVEeMmiEIAHoYUTTGvTIdAAAAAElFTkSuQmCC",
      "note": "Fait monter la Force pour toujours.",
      "kind": "consumable",
      "price": 0,
      "use": "field",
      "target": "ally",
      "effects": [
        {
          "kind": "statUp",
          "stat": "str",
          "amount": 1
        }
      ]
    },
    {
      "id": "it-fire-crystal",
      "name": "Cristal de feu",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVR42mNgwANEhGT+MxAATPg036kSI2gIEyEbCBnChM92fi85gt5iwqWZWG8x4dKMbDtM05t3TxhV2l6heAurF5A1w9gwTeiuY8Ln9I9SMzAMIRiIMMUwzeiGkByNhAzBaQD/swysbHTASCgGUFyy7REDAwMDg0rbK4Y3754worgAFkXICglpZmBgYGBBVgQxhOE/AwMDwx0sLoBZgNULxOREZJupBgCxP1aciFf8igAAAABJRU5ErkJggg==",
      "note": "Fait progresser dans le Feu.",
      "kind": "consumable",
      "price": 200,
      "use": "field",
      "target": "ally",
      "effects": [
        {
          "kind": "xp",
          "id": "el-fire",
          "amount": 100
        }
      ]
    },
    {
      "id": "it-short-sword",
      "name": "Épée courte",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR42mNkIBOICMn8Z2BgYGAiV/Ode2cYyDIApvnc5Vfk2fzhw4v/+w5f+g/zwqhmNMXIiki2WURI5v+JaRr/YQaR5WxkQ8jyM7ohZGmelmLznyxDkDWT7BIRIZn/UTaYitFjhugoJAUAALvxgEVzTYQuAAAAAElFTkSuQmCC",
      "kind": "equipment",
      "price": 120,
      "slot": "weapon",
      "weapon": "wp-sword",
      "bonuses": [
        {
          "stat": "str",
          "amount": 5
        }
      ],
      "resists": [],
      "growth": []
    },
    {
      "id": "it-short-bow",
      "name": "Arc court",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA6UlEQVR4nGNgoCYQEZL5T0gehmFijMiSd+6dYVBRMmF48+4JijiMHWLABjdszYVfYHUsyJpv7JrAADUErqkpQAKuqW7DC4ZLF7Yx6Bl4oVjCADPkw4cX/0+sqgA7cVqSCRgjO/vZo0sozscAIlCFyJph4rg0M6ELwJxs5OECNxSns7G5YBqSs0HeIehsGAApOtITgOFsWJgw4ABM2ASRne2TsYRhy4wYgmmEAdkF6M6GeQenISJCMv8znJTwRhVeQ0SgBhAKMGyGoIQBMVH1TS6OYdW2XZhhQlRUISW2fSeuERe9+AwCyQEAkNG0LXMGG+sAAAAASUVORK5CYII=",
      "note": "Un arc léger : on tire de loin.",
      "kind": "equipment",
      "price": 140,
      "slot": "weapon",
      "weapon": "wp-bow",
      "bonuses": [
        {
          "stat": "str",
          "amount": 4
        },
        {
          "stat": "agi",
          "amount": 1
        }
      ],
      "resists": [],
      "growth": []
    },
    {
      "id": "it-wood-shield",
      "name": "Bouclier de bois",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVR42mNgoBAwwhgiQjL/SdH45t0TRgYGBgYWZEERuz5URYeKGBgYGBhsWq6giB+p0YGzmQjZ9PqICV55JpqGAcx2UZszxIUBLueiiyMbiGJA4IEFGIH1+ogJg2ZVFJqRZ6gXBkzIfkKOHpzxf6gI7n/quoAYV6DbjtUFuAzBphkvEBGS+S8iJPP//7WA/6TmEwxDGGgJANNlQzOwlpsWAAAAAElFTkSuQmCC",
      "kind": "equipment",
      "price": 100,
      "slot": "armor",
      "bonuses": [
        {
          "stat": "end",
          "amount": 4
        }
      ],
      "resists": [
        {
          "element": "el-fire",
          "level": "weak"
        }
      ],
      "growth": []
    },
    {
      "id": "it-ice-amulet",
      "name": "Amulette de glace",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42mNgwANEhGT+iwjJ/GcgB4gIyfxf9ez//1XP/uM1hAldEzLfjeslVoOxGiAiJPN/2pXHKAp2fRPH0IyuBquzYX7/8OEFCp+Qd1AMgWmG0bg0s2DzF7Fh8ObdE0ZGmL+wKcYGkMMlS0eWgRGbC6ZdeYziApimLB1ZFMPevHvCyAJjYHPirm/iGC5DVkswFmCBSFQsoCvAlhKJMgRbdKKL40zK2PyHnhrxhgFVcyOxAACfpazfE0O7wAAAAABJRU5ErkJggg==",
      "note": "Protège du froid.",
      "kind": "equipment",
      "price": 400,
      "slot": "accessory",
      "bonuses": [],
      "resists": [
        {
          "element": "el-ice",
          "level": "resist"
        }
      ],
      "growth": [
        {
          "id": "el-ice",
          "percent": 50
        }
      ],
      "wearers": [
        "ch-jason"
      ]
    },
    {
      "id": "it-rusty-key",
      "name": "Clé rouillée",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqklEQVR42qVSsQ0DIRAzLyZA0DFABqBkiEyXeVJQJBJ1lAHoQKxwKSKUPE948riCEzY+3wGTYHVBCk3f95QD6wnwmhydWT1QFtQTWVpkZT2U9QCA6MzGVVPg86NHyoGlHFgR6WGZDZHXhegMlAWV87DA2zIoOrMi3q/P/yxJoUkKTfQ40+1yol6AzQz25n4oxOLqkECdye4UWnvRa42POOitNPvV82y4w3gByqZLHVlQDd0AAAAASUVORK5CYII=",
      "note": "Elle ouvre sûrement quelque chose.",
      "kind": "key",
      "price": 0
    },
    {
      "id": "it-music-box",
      "name": "Boîte à musique",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVR42mNgoDYQEZL5LyIk859YcRZ0RYf0VBgYGBgY7C4x/H/z7gkjPnEGBgYGRmw2IRTfYWBgYGBA5iNrRjEA3XkwTTAAMwwGYAaheGFa0AGEhnUOKDYjy2Wtc4CzmSgNdJxeQPc7OoB5gQldIEChiiFAoQpDA7I4ckBieMHNyI3BzciNgVhxisOAYgNY0AV2ndsFZ2+79wKrONZYwBUT2AB6ahxYAACaX0tXuMm9iQAAAABJRU5ErkJggg==",
      "note": "Un joli cadeau.",
      "kind": "gift",
      "price": 300
    }
  ],
  "characters": [
    {
      "id": "ch-hugo",
      "name": "Hugo",
      "note": "Le héros.",
      "team": true,
      "startsInTeam": true,
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhGlDQ1BJQ0MgUHJvZmlsZQAAeJx9kT1Iw0AcxV9TS1UqDnYQcchQnVoUFXHUKhShQqkVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi5uak6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrHFA1y0gn4mI2tyoGXxFAED2IYkxipj6XSiXhOb7u4ePrXYxneZ/7c/QpeZMBPpF4lumGRbxBPL1p6Zz3icOsJCnE58RRgy5I/Mh12eU3zkWHBZ4ZNjLpeeIwsVjsYLmDWclQiaeII4qqUb6QdVnhvMVZrdRY6578haG8trLMdZrDSGARS0hBhIwayqjAQoxWjRQTadqPe/iHHH+KXDK5ymDkWEAVKiTHD/4Hv7s1C5MTblIoDgRebPtjBAjuAs26bX8f23bzBPA/A1da219tADOfpNfbWuQI6N8GLq7bmrwHXO4Ag0+6ZEiO5KcpFArA+xl9Uw4YuAV619zeWvs4fQAy1FXyBjg4BEaLlL3u8e7uzt7+PdPq7weEJHKu25fWtQAAAyRJREFUeNpV0d1rW3Ucx/H37+QszWPbJUvCtK1utWrpWrpeiKizjI55o+BNykAUb7qCoH/CQhD0yqtJkYEOxRtTRK06LMKMD910Is41SbvZdm1Z+pDspAnN4+k55+tFO9TP9ffzhRcfOIgkEgCkP5qguPSVtErXZa84J5Xbl2Vv64rsbl6V3Ozb+7ci/C+pVByU4odLL1HfnBVp/SHW9vciu/MijTsi1axIMydiZmT9xofy3yc6QDyeIjGt6I4hnto1ynmTjr5xHKtBvZBB7CZWq4rjmHSPnGF+9h2UUoik0FKpOEopnh7ppdPbIJ+5Qlt7F83yEls3P6W2lcep67gPHcOu67RWf+FILHpgiKDHIwUA3LqgOVUEnfK961h2hFjfK7jaOnC5NOy9Ov7DT2BWFilkpw7w6X0CgK5ZYpl1Wg0TSwxig5NotHB25qmagj98HBp53P4ghmE96KPBjwC4pKJqu7C4PELd6qbN7WfpboHP5kqUqzbiWHz78yK//raGx/+cApguDqCTBlDcNyrUHQ/CoxwK9mBbDRoNwfI9jDcURmwHPfYk+bXbhCcSKKUYHx9HU0lIJC7w8ruQXW9S1WwCLh/KpTM8dIzXzz5EtNODtSe88EyM54e7OA04jvPvjAO5JAD+3VvKKd6TzNXTDDbO0nFiiFa5idetUV5bxecd4M5fCwf+NAAawDQpJCWc/xi8tge/L0RpdRlzY52F3AarRZ2SE2RlPkN27qd9/9T+ErqIoJRCTUPg6CiO+3GioRDr2zto2Swnnx2lJhqHu3pJz3zN5OUZHnQAdKUUZ157H9u0ZCE3j9MexrSadLZ7ufv3CoVShWhPD/d1N2POjAKYnLwEJIAkauzVi/T2PyW/p7/BqNS5ODnE6CM2y4tLuB2T7c0CgdAR3vrcwHD3MNR/VH3xwRsAJBIJdJ+/U2yzhj8YoGiU+e5WmVMn+4j1ewlFIwwEgyjH4lzzBu99uYphdMiL5z9hKXtNJZNJ9Fplh4bXw/G+AVotk5srVSYuTHFu7ATRcITHBoeplQ12Nv/E6/JR3NogEAyjubwyeOpN9Q/wvYVlGIC1iwAAAABJRU5ErkJggg==",
      "portrait": "data:image/png;base64,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",
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABhElEQVR42mNkIAKICMn8Rxd78+4JIzF6GYkx+NlROww5KetDRFnEiM9wbAZjswifJUyUGA7zHbYgxGsBMjh38gZJ4gSDCNn1507eYPApesXwbHcfZtC4FjFs6RNjMDLXwBtULPhcjstwBgYGuLiUdREDvuDEGUTIhku5FjGEnXRDcT0KH5qisAEWbOlbyvrQfwYSAL5UhD+Z4gge9LggOZmigxsnzzF8U7ZDwTdOnmOgSk7G5wtCridoAUpxgWSRlGsR0eURIyGDNTwW4Q++HXF4LWPEZTjM4EeXNzDI6QZgqEEXv7EjDqslTOQYzsDAwCCnG8Dw6PIGOF/DYxHWMglrTt5X/IbBqVcEzt8yTQszI2ZdQ1GPK8KZCIUtwSRMQB0LMYYguxY9mG48XYc3TzDhSt+kAKeaJaSVRbDIDnCTZGBgOIk/iAjkByZSXLps/lQGUgETKYa/efeEkVRLmBhoDIa+BTjLIjctHhSxXde+MLx594QRnxxJGW3XtS8M5MihAwAaIsSBeg6/sgAAAABJRU5ErkJggg==",
      "sheet": {
        "image": "data:image/png;base64,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",
        "frame": {
          "w": 48,
          "h": 48
        },
        "anchor": {
          "x": 24,
          "y": 45
        },
        "mirror": true,
        "anims": [
          {
            "id": "idle",
            "frames": 6,
            "ms": 160,
            "loop": true
          },
          {
            "id": "walk",
            "frames": 8,
            "ms": 100,
            "loop": true
          },
          {
            "id": "attack",
            "frames": 6,
            "ms": 80,
            "loop": false,
            "hit": 3
          },
          {
            "id": "heavy",
            "frames": 8,
            "ms": 90,
            "loop": false,
            "hit": 6
          },
          {
            "id": "cast",
            "frames": 6,
            "ms": 140,
            "loop": true
          },
          {
            "id": "magic",
            "frames": 6,
            "ms": 100,
            "loop": false,
            "hit": 3
          },
          {
            "id": "hurt",
            "frames": 4,
            "ms": 90,
            "loop": false
          },
          {
            "id": "death",
            "frames": 7,
            "ms": 130,
            "loop": false
          }
        ]
      },
      "levelStart": 1,
      "levelMax": 99,
      "xpCurve": "normal",
      "stats": {
        "hp": {
          "start": 42,
          "max": 920,
          "curve": "linear"
        },
        "mp": {
          "start": 18,
          "max": 410,
          "curve": "early"
        },
        "str": {
          "start": 6,
          "max": 82,
          "curve": "linear"
        },
        "mag": {
          "start": 9,
          "max": 96,
          "curve": "late"
        },
        "end": {
          "start": 5,
          "max": 74,
          "curve": "linear"
        },
        "agi": {
          "start": 8,
          "max": 88,
          "curve": "early"
        },
        "luck": {
          "start": 4,
          "max": 60,
          "curve": "linear"
        }
      },
      "growth": {
        "el-fire": {
          "level": 2,
          "affinity": "fast"
        },
        "el-wind": {
          "level": 1,
          "affinity": "normal"
        },
        "el-ice": {
          "level": 0,
          "affinity": "never"
        },
        "el-light": {
          "level": 0,
          "affinity": "slow"
        },
        "wp-sword": {
          "level": 3,
          "affinity": "fast"
        },
        "wp-bow": {
          "level": 0,
          "affinity": "never"
        }
      },
      "equipment": {
        "weapon": "it-short-sword",
        "armor": "it-wood-shield"
      }
    },
    {
      "id": "ch-jason",
      "name": "Jason",
      "team": true,
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhGlDQ1BJQ0MgUHJvZmlsZQAAeJx9kT1Iw0AcxV9TS1UqDnYQcchQnVoUFXHUKhShQqkVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi5uak6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrHFA1y0gn4mI2tyoGXxFAED2IYkxipj6XSiXhOb7u4ePrXYxneZ/7c/QpeZMBPpF4lumGRbxBPL1p6Zz3icOsJCnE58RRgy5I/Mh12eU3zkWHBZ4ZNjLpeeIwsVjsYLmDWclQiaeII4qqUb6QdVnhvMVZrdRY6578haG8trLMdZrDSGARS0hBhIwayqjAQoxWjRQTadqPe/iHHH+KXDK5ymDkWEAVKiTHD/4Hv7s1C5MTblIoDgRebPtjBAjuAs26bX8f23bzBPA/A1da219tADOfpNfbWuQI6N8GLq7bmrwHXO4Ag0+6ZEiO5KcpFArA+xl9Uw4YuAV619zeWvs4fQAy1FXyBjg4BEaLlL3u8e7uzt7+PdPq7weEJHKu25fWtQAAAttJREFUeNplkk9sk3UYxz/Pb23f/tlG2dYWEcfGyMayxAOgxIOGedF4NBkHOXDRo/FiorfOk4k3r5IAV9aQSGI0RANL9ORsEAiMMbqudFs7trXrv3Xv+/Z9Hw8NMvE5Psn383yf7/MIB0pVERFuX/me8TcnNBQKAtBu2+QeL8v7l75ARFBV/lcvmndvXlOn9Ldq5ZHq8/uqWw9Uq4vqlu/p8u0b+uFJUE2/Ip6bA+DHb79Ey3dVN++pXVhQ59mC2oUFtQt/qlZyqn5ZszcuK4DeuQNAAICZGQBGho8ooSBuax9jBHhp1W5WscTh6PFjnAE4fx4Ao4CIABA0Ptgu6iu+56EKPj2YoIWoh9ouQSvCzMWLiAjpdBojBwB2q4V2HIwq6vt0WhXYWqReXEIx+PUyfdJk8twpAGanpjAA/vXrABRXS/z16zw7lV1MxyWf2+a7uTIruTIGm5//WOeX+TyJxhoAGTLdDDKZDACFjaqEoyUdqo8x2GsROzJK8sw7vD65xV5lk8jw2zjVNUJXP0dEuHAhg7z6A3Nff6YffPwRVvIoeB2svhBu06HRcBhI9bL+ZJlj730ixhh83++u0PXTddFYW2W7uI4VieKp0Nxt06o3KN3Psl/bo73flXied+CMwPzDhwCMjxynVnyGbbs4rR221zcQEyIYj1ErLpJf2haA+dlZAHpeAKzmBG4iS8cJzU4lUjzf2KAvMUBieIRYPMVQMsnTpQLvfvrVN6rK6PQ0wMsMAAZ6Q7w1HtBzI6NMxE9yOPEag2MpDsVjlHbrPCisyu9PbA6vrPBDNvtfwNlwmKedjp6OhDl7AsLDQ8Sjh9AWdPwIj+w8O4GK/HTL/XdgGpA3LIugqlrGUPU8+sUwTYixZJTUZJJld4taJIyT3+NmroplIOIjj90uSE5YlkZEiBlDW5Wa59FBSZkeTvcniUda9J6K8tutTYphYdD0EARavk9/ICD/AElfWcQdUOjrAAAAAElFTkSuQmCC",
      "portrait": "data:image/png;base64,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",
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAjCAYAAACU9ioYAAACDklEQVR4nK2WMWvCQBTHXw7pUByKOIhIdSjSLiKdxcmhFAeHDh06iFuXIp06SRGH0qGUfoDSD1CKgxQHp9K5BEfpYETEQaQF6eBQy7vkrrnr5WK0/yV5L3e//O/l5RIDNIpGEgt2PpkODVhChg5kdW5pbHVNyJ8/LAU2VDAGksXAOijxgm3G08IRlcxk4eWmLJTCE+jl7GvUE2I/KFElVaBlRXTuvKRzSXQT8SEEyfsC0cnuyZOQwxjzvkDLdVc8Z/HecV2YIMeyeD+564gwnQtdP4bkgQhyw6xBS4FM+C95Mh0aeFdVwZPbRYCPhH0E0L4tBjtxtwC2BAU5Tt0u85UON8DmTVxwnrwIh/mkq9lMAFNtDSnswAnbzvEouwGP5pzfQKghE8KLdzHIVewdhun1fgdylfc/4+ulGNSaQJ0qHcpCeOtsTJ3LK+maz1Avl7hLbWOrdNpsaK+TIDCsX7JQ5TFzm0lFeE5Zw2VdfkbTkMkeCnUkfvULKhJ0grxsS9r2AgP9RNYFJAtVp35j2jb0oZjOm+GlojSGLRt7cCWHDcXbwV5BWSG02dZ8FnW65u1iL5cC5Z0jnfr9Dvf69pdPzuH40aC7wB6sl2L/91Bwp6m53K0MxJU0LyvKa2RVd93+VNgH1wIiRAUDr80hPLfbZD9O4G30zWOeA3Hb9wQ6gxY4aVVpfzi9pPvp/AGPIwn56NvIWAAAAABJRU5ErkJggg==",
      "sheet": {
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAMACAYAAAAt6LBOAACD8ElEQVR4nO29D5hdVXnvvyaGgGEUjCOGIWQihAEUh7kpf+RfBEwxN4021QiKVNJgbwG9PGm0Nhaay41YU6pcftQiXoEbWtQqEcc2zY02AkaQIt50HGiREDCThCFCjKAhQBKZ3/PdZ94z66zsfc4+5+y913rP+X6e5zz77H32mfmuvd/1vmu9a+11jCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghgdCR5x/vmjJtVN7v3LU91/+VB9r1E9IMtP/WpyNPwxlef2O0Pzw0aGYvXaXGkLTrb5UKTP1+aBX7J7XpyMN4xHBcxJBCNiLt+luhAlO/P1rB/kl6OvIynsndvWbPyKbyVoMRadffChWY+v3RCvZP6mOCydnwbeMBPX39ZsMNiyq6xyGgXX9cBba3oWsH1O+PVrB/4jEA1DIcbWjTr70CU39YaLN/4jEAVOv2xhFaJdCuvxUrMPUXRyvaP/HcA5B8YT3HQ0OLfu0VmPrDRIv9k0ADAAz9hEvurjiGfRzXgHb92isw9ftFu/2TAgOAbdR4L/snfnBFxXnufiho19+KFZj6i6MV7Z8UFAAwJUzmOQti5N+eX9nawX5oU8m062+FCkz9/mgF+yeNkdkNRD4TeU23dTO8dc2BJz8/LTgDagX99oNH1VqZIVZg6veLdvsnnlNA0oqIy2/2TJ8fGU20NSZI49GuH4h2uxKjAruvUKF+f7SC/RPPPQB5j5aEXRFso5+9eH20FQPC90IwJu36k1px0I6KK61S7KMMoWi2oX5/tIL9k/rJ5MbBCJZ1dpb3V+7eXWFIEYdvj4xn7tjuurHtwv5JZvXgXq8VQrv+ZiqwfJf621d/K9g/CSgAgPk3TTVnL95ccez+22cecAwG1Ddjilk+sMObEbWa/rQVGHrxXd+VmPrD0q/N/knjTDQ5seaqHUaMCsaEfRiPW1GWrxowKxYtMKGhWT80lirwqpoVOESo3z+a7Z8E8iBYHFcMXGc0o0W/VGC84HiwlQosr5CfRKX+MNFi/yTAAIDub8+cJeV9aU2gC6kB7frjKvDQ4FqjCer3RyvYPykoBZSmErzQ1Wv6+udF71csmGqWDxjvg3mtrF8qsFRc2SL/TP35o12/dvsnOQSAuAEkTWjX32wr9AWjD+rPjna0f+JxDMDtRtazimIIhKZfewWmfl2EZv9EWQAg4VRgdOEP26ln3XpA/YS0UABAZSjlD3XOI9aun5BmoP3rJpNB4MGxB1+SmO+cI62gUGZAaNffzhWY+punne2/3SlkFtB1MQ+/yBORGghdv/YKTP1hE7r9E48BAK2WdQ0+0HJ9efqYv9aPdv2NVmA4H5nCFzrUnx/tYP8k5x6AvTJg74ze8vFNW0oDXO4xnD+ydWgUFQAG5BvN+hutwKi8JoAKTP3+Hahm+ycKHwSzF5LybfytoL+RCmyMCWYZAurXSSj2T5TNAkJFGbh2sdGKdv2tUoGp3w+tYv/E4zTQoS27VK8jrlk/uu9YwZH6/aBdv3b7J54DAIxGs/Fo16/d+VC/X7TbP8l5DKBzb2nWw6zuCWbjyKvl/fIx4/8XnNpZf+iVl/r9ot3+iacAIINbMBKNUL9fqN8v2vWT+sklitf6oYvQWw/U7xfq94t2/YQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjQdBS1qqDGFQS16yekGWj/rU+uy0EPr78x2h8eGjSzl65SY0ja9bdKBaZ+P7SK/ZPadORhPGI4LmJIIRuRdv2tUIGp3x+tYP8kPR15Gc/k7l6zZ2RTeavBiLTrb4UKTP3+aAX7J/UxIW/Dt40H9PT1mw03LKr5q0NFo11/XAW2t6FrB9Tvj1awf1I/uf34p2s42tCmX3sFpv6w0Gb/xGMAqNbtjSO0SqBdfytWYOovjla0f+K5B0CKQ3sFpn5C/MAAQAghbUpmAQCzA9Kel/bcItGun5BmoP23J5kEAEwJk3nOabq/IKSpZNr1t0IFpn5/tIL9kwBSQKEZdrvo116BqT8MtNo/CSAASCWoZUShPkiiXX8rVGDq90cr2D+pn8xuoj2jATMc7NYOEMNyH4nH90IwJu36RQu027o1VWDq90cr2D+pn0xuHIxgWWdneX/l7t1lI3KBAc01xqwb21/YP8msHtzrtUJo199MBZbvUn/76m8F+yeeA4C9D2OCEcUB4zGOAfXNmGKWD+zwZkStoL+RCgy9+K7vSkz9/vVrtn/SOBNNRrgVQPY3z9wbbWdunmQGY4xq+aoBs2LRAuMb7frtCgvtSYOSUoFDg/r9ot3+iecAEIdtPBrRpL+RChzSk6jUHx6a7J8ofBJYKgm6kBoJXX+aCjw0uNaECvWHTej2TwoMAGj1XDFwXfRKa/wX3/9N09c/L8ofrlgw1WuLSLv+Ziow8s/U397629H+SQYBwB0AA1gYC0ZdjVByodr1N1OB5dwQoH4/tIr9kwBTQGlyh/Wsolg0GvQ3U4F75iwxvqH+cNFg/6Q5uBpoC1OrAiP/fNjOcNetp35C2iQAaJ9HrF0/Ic1A+2/jaaCY3uZ2abEfN2/YBd/BABIMyBfa9WeB9gpM/Y1D+29fMn0OQPvAkFb92isw9YfhQLXaP/EYANBqWdfg9K/rjSkbv6/Wj3b9jVbg6wfXRlP4QoL6i6eV7J946gHYKwP2zugtH9+0pTTA5R7D+SNbh0ZRAWBAvtGsv9EKjMprAqjA1O/fgWq2fxLwUhC1wEJSvo2/FfQ3UoGNMcE8tEP9OgnF/omyWUCoKAPXLjZa0a6/VSow9fuhVeyfeJwGOrRll+p1xDXrR/cdKzhSvx+069du/8RzAIDRaDYe7fq1Ox/q94t2+yc5jwF07t0cbWd1TzAbR14t75ePGf+/4NTO+kOvvNTvF+32TzwFABncgpFohPr9Qv1+0a6f1E8uUbzWsrChtx6o3y/U7xft+gkhhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhJCg6ShyZUGuIkjazX606yetbT8deQsfXn9jtD88NGhmL12lriJor8Ba9Wu3H+36tduPdv1dBdlPbr8HIMJdpCCh3wztFVizfu32o12/dvvRrr+rQPvpyFv85O5es2dkk6pKoL0Ca9av3X6069duP9r1dxVsPxPyEg/hSfT09ZsNNyyq+ctDodwALdq169duP9r1a7cf7fq7PNhPbj/+KVHLjV4ho70Ca9ev3X6069duP9r1+7CfCUV0uzTeBI0VWLN+7fajXb92+9Guv8uT/eTWA3BzVqGjvQJr16/dfrTr124/2vX7sp9CAgAu9gmX3F1xzN0PGQ0VuJX1a7cf7fq12492/T052s+EvC403tv7J35wRcW57n7IaK/AWvRrtx/t+rXbj3b9wx7sJ7MAgClJMs/WvvDCt+dXRuEbp68KbjqW9gqsWb92+9GuX7v9aNe/05P9ZGp8yKchr2YLF4a3rjng2OzF64OqAHYeEcYTV46Q5xO3gn7t9qNdv3b70a5/Q8H2MyGPKJaUc+uZPt+Y56eVXoEi2t2bgBtgv8zh202IaNav3X6069duP9r17/RgP5k/CIatFMIuCMSXL/zh26PoFRraK7B2/fXaj9v68T2jo1n99t/wgXb70a6/qwH7adZeMuv+QMiyzs7y/srdu6MtujQCCrbh9jll57+wf5JZPbg3mG6YfTFFt92SsLth9g3QrN/+rs9y1Gs/c40x66x1XfB9n/bUrP5QytCo/YRiQ+1m/wubtJeJJidQmPk3TTVnL15VcSzEln/cDZABmcobsL7yBpQrrP8g0Kh+CWKhlCOt/cD4QyaNfuSre+YsCeKaN2M/8n2fNkT7b4zcAgBYc9WOSDRAYbAP5NjFq75pzKIFQV34dnJAoVPLfsBKE57tpNX/pQXXVASBocG1ZsWiBUaz/axYMNUsHzDe70kj+lcEor0e+2/WhxbyIJhW5Abgdf/tM8vH5Rhey1cNRN0w3/nnRvWHqLsac63usQ2cpxauGLjOaKAe+4HzQV0Y2rLLaNO/M0DtReE9ACB/hcirzRFpxnVAmpyni+2EfNlSPf8PAaxnzpLyvvQCRrYOjfb1zzN9M6YYjQFY9Gu0/xFF2uNoxu5zTQFVuwEvdPWaw3bqWKgp7Q0IqftYywFJN1K22soAJyRzvldaDlULIfUCmgmYsB+k4WQfAWz1YClVocn+NWh3bR8+tNnANTGPAZhWJusbEIIDesGrkubtJ7oX5RzuDi8zaOrRL05IApjvxlC90wlbLQBrtv+xMSS9KaAQaPYG+KadAnBcKsVnIG6F1GUWAdgn7Wj/WcEA0Ia4zlNjKk6mUWrFHQvQhmYb0qw9axgAiEq0O1ApgzgglMVnCqtZtOtvVzIbBB6MmRlgM3/sHKm4mHmivQK3CiFU3rT2E+dAfY7DSP68Ef2C1npg12VthKZ9sA77ydKHFjYL6LrFm8vv51rbUB5I8nUDsqJeBxRaBajHfuLwHcC06280gMF+QpgI0WgDIpQGUL32I9pBM9ozCQD4x3isup7vXD/m/EO/8HnfAJ8OKJTK24j9iP7u6X1NL4jlUz+uv1b7sQm9DHH6r1du//ChzTIx665w74ze8rFNW0qDK+6xMSMJZvaEzxsQgv4QKq+9pozYC2wlwXaEUZyvWT+eIg9BezMBzDetYv9ddfhPeXitWe25p4DE2duFEEIwft83wGMANiEF4VrOE4ztj8r1x7o5IdlQteuepD+Uh49c+4m7/nH2g+uPMvi+B0n275YhZPtvhGaXryj8SWCpBKZFCGn9kLhgW6MFGpQDrdZYsPVHrf4x5xmKdptq+oHox9PXcP6h6Ld75rWcvwSwkMpg208K5x+c/ddLFkuHZxYA4qKvCIur2GI8Gi+8ENrvGdSDXYFD0p8UBMR5yjlY/TAUx5NUB1z9s7rHZ12Hdt1tkpx/1+FdRgJEiLaj3f53OraP673z+Z0HnGc3IJrVXmgPoHNvaSAGFQHitSC6RftGk90NKKoVZwfkLA2oSCcq1x6ateiWwGU7/1CpVoaS/l1m+uQJZuPIq0HaTq0GhAb7T+V/Mrz+E/N2lEkipSAaLnYcGown6X5ICzpU/bZugHugwYHG6ZZrjGtvf6b92oeqP6kcQJZ+1mL/nZON2fl8/DlZaS+sBwDBWiqBixsEtOiuhrYyyD3QplvQqhvQ/v0R1wjNUnumF8Gdj63lIrdaGUDc3HgtZdF6D7TqbrUyANo/IYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYSQYOkocmU7rmpH2s1+tOsnrW0/HXkLH15/Y7Q/PDRoZi9dpa4iaK/AWvVrtx/t+rXbj3b9XQXZT0de4kW4ixQk9JuhvQJr1q/dfrTr124/2vV3FWg/HXmLn9zda/aMjP+gt4ZKoL0Ca9av3X6069duP9r1dxVsPxPyEg/hSfT09ZsNNyyK/dWeEG+AFu3a9Wu3H+36tduPdv1dHuwnt1/alqjlRq+Q0V6BtevXbj/a9Wu3H+36fdjPhCK6XRpvgsYKrFm/dvvRrl+7/WjX3+XJfnLrAWhDewXWrp/4Rbv9aNfvCwYAQghpUzINABidTnte2nNJ+6DdfrTrJ+1nP5kFAExJknm2abpfILTpWNorsGb92u1Hu37t9qNd/05P9pN5Cii0C9suFVi7fu32o12/dvvRrt+X/UzI4ybUKkTID2NorcCtoF+7/WjXr91+tOvf6cF+MjVAe0QdI+x2tAVSMDtSh1YJUAZot3VrqsCa9ddrP65+fN9nmZrVH0oZtNqPdv1dDdhPs/aS2QWAkGWdndH7lbt3lwvgAvFzx96vG9uGciN83IBQHJDvcjRqP6IZ31/YP8msHtzrxZ6a1R9KGdo1AHcFoL0R+2nWXiaaDIFwgPm4PXOWxJ4j4kPDvQGC2x2ruAHlCus/CDSqX4JYCOWwdSflc0O1n0b1+3Y8WdiPfN+nDdH+GyPTACA34EsLrikHARzbPHNvdHzm5klm0Crk0OBa09c/L5hK0I4OKCTEfqQssp9kPyAU22lU/1g9icqA+rBi0QKj2X5WLJhqlg8YL/ekWf0rPGpv1H6WrxowZtGChoNXpgHgioHrIucvSBBYaCZF4kPHxw0IwYGagLG1V8O383TrwcqxHnBa/doDMF7LVw2N+rwHzehf7lm7q1nI234ynQVkp33sQFALRN4QHJHdghA0VeA40uiH89QKKozYDnKhPmzJTj8A6fmmQXrLI1uHRtEb7psxxYQQwOq1f9EfGmn0jwSoHfYT54/iaMbuJ+QhGgYkRgTjhkCX68fSP6FS1A3wjTiqEMogdiO2k6by2s7KJ652TfrdANZoAAYhBLB6WGaV27f2OP9ZzX4khd4ME4owIASBOGcaWj7axw3IEle7JgfUyPfmjrW2ZRGwUg53RzCzytLqf6Gr1xy209+qlbhetu3Ejd2FbD+tYP/LYvxnUuM5SzJ/EhgFSZoBFCo+b0Be+tNoFwcUMmlSb3CgvgKxuwplPc4zFOpdSTMpAPuilex/meM/kxrPQa8GWm8QQKutXW9A3qQZPPXZ+swK3KeQ7Eg79QQw3z2YarSL/TdKprOAbOPBzB/bkVZLEUnXnRCbelrPsLVQ7Kge5ykOyNavJYUVh3b9oVHPhAKvAaBietXggTl+d/qVFvK+ASHhs/La6QRs56a0Gd/jMLhemMcv+9C9eyz1MGjSpQ9DS0NoD8AaGbRs3U5Npa0HQfUANOLrBmQFNLo5zbTaQ6m8or+RyQG+W8/NTmjwrd8NvghiaQKY7wCctf3vDKT3Uo89NaM9kwCAf4zHquv5zvVja1mEduGLvgE+dYcyFde1H1kjKo3z6Z7eFz3KbzzSiP3bzjME+2km+IIQytAq9l+PDw2mByBravTO6C0f27SlNLjiHhszkmDmzPu8ASHoD6Hy2mvKiL3AVhJsRxjF+Zr1Yw2aELSL/aQNviG1/lvF/rvq8J/y8Fqz2nNPAYmztwshhGD8vm+AxwBsQgrCtZwnGNsfleuPR/dDsqFq1z1JPx4+Wj3oP2/u2k/c9Y+zH1x/lMH3PUiyf7cMIdt/Iwxt2WVUjQFIJTAtQrM3IO9gW6MFGpQDrdZYsPVHrf4x5xmKdptq+oHoxzx1OP9Q9Ns981rOXwJYSGWw7SeF8w/O/usli6XDMwsAcdFXhMVVbOk6arzwgs+125vFrsAh6U8KAuI85RwsvheK40mqA67+Wd3jj92Edt1tkpx/1+FdRgJEiLaj3f53OraP673z+Z0HnGc3IJrVXmgPoHPv5mgrFWHjyKtGA6JbtG802d2AolpxdkDO0oCKdKJy7WX1SaNAtwQu2/mHSrUylPTvMtMnT4jqbYi2U6sBocH+U/mfDK//xLwdpYYLXOtix6HBeJLuh7SgQ9Vv6wa4BxocaJxuuca49vZn2q99qPqTyuEuXa3B/jsnG7Pz+fhzstJeWA8AgrVUAhc3CGjRXQ1tZZB7oE23oFU3oP37I64RmqX23H4UXtNFbrUygLi58VrKovUeaNXdamUAtH9CCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCHB0lHUqnYaV7TTrF+z9lYpA/WT0OnI03CG198Y7Q8PDZrZS1epMSTN+jVrb5UyUD/RQkcexiOG4yKGFLIRadavWXurlIH6iSYm5GU8k7t7K7agp6/fbLhhUeyPNYSAZv1uxbV1h669Fa4/oH7StgEgqeWwZ6T0o9ihG5Fm/XEVN44QtbfC9QfUTzSS2y9tu4ajDa36RbdW/QL1+0W7flJgAKiWN4wjtFaEZv2atbdKGaifaCW3HoBNz5wlFVttpNUfaoVIoz9U7e1y/UPUj0Hfeo4TfeQeAE645O7x6WTrb4z2NZFWPyrvwv5JwVXiNPpHtg4Fqb1drn+o+tHSd/ViH8dJa5BZALBbBXgv+yd+cEXFee5+KDSjHw50aHCtWT241/ioxEnaa+mHbry6p/d1+NKelf1gauLyVQPeytDu+olOMpvPa+cRYTzVWglJ84nxN3zNMW5UvzhQ+++gEsOhFlWWerUffv6F0Xtbty/tWdoP7kVf/zzjowzUTzQyMcs/JoZjG8/w1jUxZ0474Mi48/EXBOrRjxa/MabC+Qt9M6aY1YM7jG/trv7DZy01h5/fa+Bkkq6xD+1Z2E8IZaB+0rYpIDgUtAriBoh6ps835vlppa0xQbYe6tGPFjQcf5zzj7ryAzvMigVTC+vKV9M+e/H68guOHy8Abe4Lx4vWXm8ZatmPj+ufpf1r1R/S2AXxlAKS95giBqQlYbcipBLHVQB0gVcsWuAtBVFNP3RvuH1O1Iqu1oKWv4UKjIpcRDmStGPWyZpbLjGzFvyl2Tjwmap/Y8/0j5TfXzjvgmhbdAoiC/tBUC76+re7fp+pQxJACggGsKyzs7wvC0eJIUVdxsO3R8Yz1xizrkq+30f3t5b+2UvXm5Edj5vuqccbY9YH1eKpph2v2ZevMubyO1P8pfFzxPkURaP2k/S3ilHdvvrBOo/jdSTQMQABxjT/pqnm7MUlQxLuv32mOXvx5ujzlbt3ex30rUc/WtFoQWNbbyu6aOKu/XjwKn0uXDFw3QHfD+FZjTT2I8COZPDyhbGplr7LUI9+uQeiWYN+S2dUf0szmIZGTdR7D7NOkwIDAFhz1Y6yocOYsH/dmPEA+WylKbV4xGgk/7l8wHg1pAr9l99Z4URDbEVXu/bQjZbb9YNrzdfOLs0ACp1a9iPOP+m+yLV3W9RF2VQa/QIcvluOJP1FlSNOvx28vrTgmoog4HsCAQksAKRFWm8wJBMoaPmgcmLmD/L/GlrRNtA7uHt3pH1IURBIQwM9syBbqFrKAXuH8xckCBStgygNAHPHWm7AdqQwJHThQwVaPzXmQGUmDVgZmLOvde0lCGCrSXuc/QAMcNfTM/Pt/F39cg80lGPuWOPG7gUgIIg9oddLdOGlByADYagIqAD1LETlGwkCIG4aaEgDxHHMreFAQtbu2g/K0D31+HJL2Ocsmkb1yzGUA3YVun4JYHF1NpT0LSnwOQB3BkEjjshnyqQR/QgCeMHhxP29oipvo9c+BO1Z2E/cJAIfU3Cb0S/7olWLfhdNjThS8GqgtfAdBBqlL8GRDm3ZZUJHs/ZaaC9D6PolFUT0E0QAAFq7jOiyiyOVB2IwG0IDmrUnob0MWvS7QQDvQ01bEQUBQDO2IwWaKoFm7UloL4Mm/ewJ6CaTQWBMMazG/BTnCD5aEVno97WKo2btWZYhyp17WkaknfWPaQ1+4gDx2ANIegBGS/4zjX5UhBDXQtGsvVXK0A76iU4yMbZGpw66C0qh9Y8A4GMt9Ea+F0Jl1ay9VcrQzvrlNwyY/2/jFJA9ha13Rm/5+KYtm6KteyzJSHw4/yz1+8ANotr0a7/+gPrD7LkTRYPAIXeBCSHJcClovQQTAAANiBA9+By4Ji0YAEIEhi1dYdB1eJeK5RIE6veLdv3VYK9dPwwAhJCGofPXTaY3TwaROveOTxvbOPKqmdVdGWdwLETDgf44rUBDGajfL62gX3P9JZ5XA5WHQlyDIYSED+tv+5FLFK+V4wy59ZD0C1K+flmqXqjfL9r1a6+/hBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCSPB0FLWqoMYVBDXr16y9VcpA/aStl4MeXn9jtD88NGhmL12lxpA069esvVXKQP1ECx15GI8YjosYUshGpFm/Zu2tUgbqJ5qYkJfxTO7urdiCnr5+s+GGRcH+KLZm/W7FtXWHrr0Vrj+gftK2ASCp5bBnZFPFfqhGpFl/XMWNI0TtrXD9AfUTjeT245+u4WhDq37RrVW/QP1+0a6fFBgAquUN4witFaFZv2btrVIG6idaya0H0I5orhCatbdKGbTrJ/pgAMiw8i7sn6SyEo9sHVKrvRWufyvoJ20eADBFLO15ac8tkmb0w4EODa41qwf3Gh+VuFHt0I1X9/S+Dl/abW1pz4s7F1MTl68a8FaGdtdPdNLhI4+YNJ8Yf8PXHONG9YsDtf8OKjEcalFlqVf74edfGL23dfvSnqX94F709c8zPspA/cS0ewqomZZBCF3gevSjxe86f6FvxhQTgvaeOUvKL/BCV2/k/OFk4nT70i5k1bL0VQbqJ9rINILDeWN2AGYJNNL699X6rFc/nGiSA5W/s2LBVLN8YEehvYBI31grDk4f78X510PR2rOwHyAB2cf1b3f9PnvvpHEmmowdEIwDRgRsQ5LWhawpEp8DHRo1ixaY1YPFG5OtH9gVQZwojkkLOiRE+7LOzrJWcf5rbrnEzFrwl2bjwGeq/o090z9Sfn/hvAtM0aS9/kn245tW0l9v/R1vvDEItGUAgAHA+azcvTtyQmJESV3KucaYdQktBnR/Vw/uMEVi6wdSBpuRHY+b7qnHG2NKx0OZrWE7f9leMXBd9L7cA7j8zhR/afwcaX2Gcv3tXo1tP0l/qxjVradfaKb+kjbtAYjzl0qQ1NKB8YTYbRT9cZUWrWi0oLENsRVt6wZfWnBNFATE4Ujwkmu/zgkUNo2kjPK8/jZuSkvsTc59Ieac0PXLPXB7bkUj9VZ01VN/fffeSQABQJBKIAaFriGYuXmSGbSMTM5daUotHjEatDxLLVAThCFJhRzvAVQjTUs7f+eD/ZVzlpSvvTj/6wfXmk/VSF/5ckBpgC7bAaGcSfdFejBui9qnTbn67eNuOZL051UO135kf/PMvYn1d8xWyvXUR++dBBYAkrq9yzon1ToviJSKBC44UBtUziHLgdZqRRedRoEOtPyl8toVF9celRfaEQTWVQkCPrSnuf4gznk20DPLtWFRr/5QywFsG0pCgkCeOoiCAODmQOMCQbUKgPPQhfeFPYaRVAHEgUoQkJa2b+zBXzcd5ALtCGQYyA5Bez3X322BAgxw19Mzy8tpNqLftp9QylEPkmoUe0LDgbRxD8BO/8Cw7TyopBbcLnzSeT6oVnkFCQLXxzxI5XMgL412myQH4nNwu5EydE89vtwS9j2Nspl7gHLAkfrSb4+loE6m0e/2fkNL35ICHgRzZxAA7CP/bDty1/nLexiKe16RLYk4/bVAEMALDifu7xVVeRvRDkLQ3mwZ5iZMIii6DM3ql33RGoJ+BAI8j1NLv11v61lNlLT4YnDSepDUBF7VKokbBHyTpvUD+hIc6dCWXcYXmrXXW4YkfJdBu36hUf1ED7mvBgrHn6aFpLXLiC67OFJ5IMbncgrtoj0J7WXQrt/HE+QkoADQbOvHN43otx2pz0qgWXuW9uOzDNr114v03ItO3ZKABoErZjeMPTw4aKrnEJPwMXiXhX5fqzhq1p5lGaLcefQgUvFlaAX9bk5/bsKsK5cxrZwGqpTcngNolFDyn/WCiqD1KUjN2lulDCHorzZNm7QmmRhbo1MHbWOX2Q8IAD7WQm/keyE4G83aW6UM7axffsPA1wqyJIAegD2FrXdGb/n4pi2boq17LMlIfDj/LPX7wA2i2vRrv/6A+vX23NudCWF1gf39FgAhpDF8/44HaYEAAGhAhOjB58A1acEAECIwbOkKg67Du4L5LYA0UL9ftOuvBnvt+mEAIIQ0DJ2/bjL/TWAMGHXu3Vw+tnHkVTOruzLO4FiIhgP9cVqBhjJQv19aQb/m+ks8PwcgD4W4BkMICR/W3/YjlyheK8cZcush6RekQvplqWpQv1+069defwkhhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhJDg6ShqVUGuIEiILrTXX+r3vBz08Pobo/3hoUEze+kqdTdCswFp1q5dv2bttv7HN9wR7T/zxOPm3Mv+Sk15tPufrgL1d+QhXoS7SEFCvwmaDUizdu3OR7T/xwPfiPaf3fKUOe/Dn1ah3S6DXHsXuRchl0W7/+kqWH9HXuInd/eaPSObylstN0GzAWnWrt35QLs4fhcJBEnav/bk/tGLj53YEdL1P+RN083Lz20tbzXcB+3+p8uD/gl5Ox9bPOjp6zcbblhU81eHQrgB9laTdld36NrjnD8cj82Rxx1v7rvtL4LUbzv/g6ccVbEFR8w4xtz71c/Faofzv+DI/dHWBBh8becf8n3Q7n+6POnP7cc/XeGho9mA4gJXHCFqj2t5JuE6n827R0dDbfm/suvpiv2kIICW//eemRhtTUC4jl8b2vyPL/0T8k49aHJErWBAolurfnE8tRwQnP+bXvNyEEGgmuNPg2/nXy31FkdovQDt/qfLo/7cegA2PXOWVGxDQ7MBZaX95sf2jmpyPu+YfrR57reHmJmdHR0h5v3jqJYKCpnjZ19asU0i1HKl9T9ddejfsif/hgfy/fUcDzIAnHDJ3eMzUtbfGO1rIw8DCk3/8rOOMdockO38Q7z2bzvrooptEiFqF97/l/eUZ2Rhi/2kMlz+vlnBlSWt/+maMm10Yf+k1PpnTM6/4YHGmqsX+zgeXACwoxLey/6JH1xRcZ67Hzp5GVBI+tGaCVF7WgeENFBozueKLzxYng6KLfbj2PSb0dGll82t0I5jpmAwu8d+L/tvueDyivPcfQGzUhbd+B3j6z4063927tresWzNk8ZXPcjLf9bqqWQSAHDxZK65IFHq2/MruyvYT5rK5LMCN3MDRrYOjQ4NrjWrB/d6MaAk7dX0/2T7tsg48EJrxpf2as6nlgOC48cLPYFb7t7oxflgiqf9Xvanzb644jx3H04er97XdXTccNs6I0EAx6a85pVCgwDqoTxrYafawOfPqRxLwn61qaA+7kNW/gfUqgd5pH6y1F9vTyWzbgwuGHLLbvdkeOuaA09+ftoBBZAWNG6Ajzm6di4dF7haN8u+AXD+3dP7vJajXu2TL/xMrHH4ugf2OACcizgflzUHzza/8+hXzCG/e0W07+b/JQ0BJ1Tktbcf/EKeP4kXpp1Zfg/H7/4dBAEEgx8Nbzvg87zB/8fYinvtn9nxwwNP/s0RsQEAwRhjM1/4+HnmE1+8t3Abasb/iHM/ZdrRZsWCqWb5wA51+r2mgCSKxQ1Q9EyfH4mOtsYE+yCGaLdvAm6A+wJo8bvOX+ibMaVI2Ynao/05S8q6nzvh/ZHzh5EntQx8aAfS6ncdEPL+cEJ4nXXkxMj5w8kkDf4e132YKRpp9dvO/9nnHo5y//brzJ6jyy9UePuF78D5g6Kdv90LsHtfwrkX3lp+RftVHgTDcTh/BAEfvYA4/zN78fryq5b/2blrewecP4JAKPrT+M9GtWbaA5D3iGS2M7KjmNyEuBsAh7pi0QKvvQA3CkM7Lry0rLF/+KylJs7x23+n6FZEnHY4/5Edj5vuqfEt6iR8tYDcFiic/5NPP2GOPeq41H/nD2970PT/+18U2gKFdszusQMAHP7Ptm82mONfi1OOeE35PYIDKNr+7fqL+wDkXti9AAkCcfokHYe/VXQvIAv/s2UsHeqr/jaqv5me+8SsxC/r7BwXOZbPkoIYM82Yw7dH4ucaY9aNfSdOLFqgqwd3mKKRGwDt9g2InP/WNWb20vVmw+1zIuff1z/PhESSdnDrkweZFQ+M56mTmNdzUPk9egg+9KNl6Tqfge0TzRce+nnNv4HegfCOy+41RWvHUg8IAgCBAGmhE6bNjP3O5V/9sbnlw6fFfnbTpz9grvrcXaZIUIbPnnp6eV/GA+ReGHOEMa97NnL+l570dnPHo48ktjh9jCE16n9Mwt+q9f8wZfrKEyd1+NIP1iX4z3rJJAC4oDDzb5pqzl5cObBx/+0zzdmLN0efr9y9OzEIFE2tGwDnP96SLkXgUGac1NL+0WP3peoBLLfeS+snBOezYNr+unoAQFqfRWj//LxStxzIwm8IBHiPHgCCAHL6dy76I3PzvSXbSXL+oYD7cc6fvdHMvrByYHjDN+eZ2ReujT6/+uGHou3CL1xZ/vxXYzO1aj0vkDdp/I+wcvfu8iy558ZmytWa7p2l829EvxnXGfnPKG21amjURNmTZJ8aF7g68nBCLijMmqt2mMHdu6Po694AIAOqaF376H65+ks3oHSx19xySaq/s2f6R8rvL5x3QbTNuwy1tAN8vvBnj0Ute/vcKwauO+DvwfiLvP5uAAAl57O2vI/P3/Wt1VHu3z7Xdj4CnE9R6Qc3AIBT/9sbzDsX/EPFMQQApHbsc//r1X94wN9D2kh6AEWn39x74N6PH/7NL82ml/ZErX9Qb2pOyKNcjfqflbt3N5QizbocafVDr1t/UV/Fdw5cu7jueptLD6AeJPoimpmAwAWXiz3/8jtTGsqdXlrRVbWPGc81046Opn6uPuFEEzpwNuKQxPl8ad48829bt5nvv3+hCZmH//evyo4ewQD7aP0jCPzoitLsJQ0g4NrXGvub5o2nPtOm5g5Iz00/utBePxo+L3/vvPK+WwduTZkijUmTeslewOl/acE15X3pCTT69woPAHOtVr8dzVCQF0yYoOsF54+ZP+ihpGlFh8gpioJAHOgBaAgCcaAHoCkIyDU+5Iv/aMzwx8r7cPqfOP0tDaXmQNFOE7aORtDk7w4Zc9YxUUMIvYDI6Z91TOoUqZsm9eH85475FvE/CATwP+KX0OisFy89ABmIQSBYiWmKdaxl4wtc9E/1zytfbAH6tTDXCgLYatIOMAApQQDbq2c/ZLRw5XlzykEA20+ujZnfHSAvf/yDxvzZG8v7Q5e9N7oPcP5xzwH4mgVUiz3v7quoB1j6ZOeu7R3dU48vt+R9zgKqtwEd5zNl+uryAZO6dzIx7/xVrSAAoejCaAgCQIIASJoKGsoAcRwyiyDJQELWDuB8tOq3g0DcXH9fM2iq5f+TKM0GOtDRFO38m/I/Uw4cMC3a+Teq3yXN4LW31UBrMRYEvPzvRm4AggBeGHiJ+3tFGVCjxoNucNwj7T6MvxHng/GAuGWgi3Q+cQPA9QQBd6kH/D0fA8B58MRIqMncdAxt2WVCRlJBWRBEAAAajb4vIQiEbkDglIQgoEE7QAooLghodj5bnv2N0Q6W4vDxNHZWLOyf5O1p+GaCQKOz94IJAFpBGkiCgDyRp8GAAPKdEgS0aQfIN0sQkHWAtDgfpICkFyDrAM044nWmFQgp998IywPM/SfRbE8gk0FgzK+txvwU5wihDr6kCQIyOKxJvwQBefpXk3Y7CKBHoM35SBCQ5R98pX8wv78a55g31jwHQWzVkt8vdCG+LP1P15RpoyvnH+tlGZpm9I9pDXsa6HXWQ0m18JGCyMKA4Px9rKSZhXY4f18rsWbhfOD8i14FFDz10stVPz81xTlw/rIKaKiB67YV22qeA+233J1+9kmRpPE/O3dt76j2FK1P6vGf9ZLZk8CNfM9d0AitfwSAopdSlpkx9SKzmOy/VfQTnFq1y/+UWT31gidSfV97DOg2ApaE8H3ts66/Pmln/SNNrp7QkXVBemf0lvc3bSn9mIR7LE6kz98D0GxAmrVr169Ze1J53vW74zObvv+vpWcV3GMh62/U/2jVLwHA62qgWeCzCyb/U6MBuS1J7fo1OaC4OeTv++D4Qmh3/2PpR27ijhGSFc00nHOfBQRR4ojEGSW1nEKp2NX0a6MV9Esg0Kpfg9OPC76y0qR9/XFOiA/bxTV+RH9a/6ONKG3e5O+nTMj7BhglpNUfqgG1gv40Lf2QHZDb0o/Tj3NC1E/0UcqaNJcyL+Q5ADcKdx3epaoSxLWiqd9vL0CbfrcXEJL+WsHXvf6nvuOc4PRXa/xo9z/VaLaRnekYQOfe8elKs7onmI2mMqcvn3dONmb65AM/901a/fgMUH+2TN43Pt3wPeeebP75vspphfI5PgPu5745ZP8z5fcXL7zAfG319yr0yef4DLifh3zt7XMmH5J8Tqi2r8H/xNXTjSOvpipbowQzCEwIIe3MzrGHuqSBVgSZTwOtNUui2ue+oX6/UL8/0mij/mKolZ4KVTchhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhJCUdBS1qh1XsCNEF9rrL/XXpiNP4cPrb4z2h4cGzeylq9TdCM0GpFm7dv2atdv6H99Q+hWzZ5543Jx72V+pKY92/9NVoP6OPMSLcBcpSOg3QbMBadau3fmI9v944BvR/rNbnjLnffjTKrTbZZBr7yL3IuSyaPc/XQXr78hL/OTuXrNnZFN5q+UmaDYgzdq1Ox9oF8fvIoEgSfvXntw/evGxEztCuv6HvGm6efm5reWthvug3f90edA/IW/nY4sHPX39ZsMNi4L8UWb3BthbTdpd3aFrj3P+cDw2Rx53vLnvtr8IUr/t/A+eclTFFhwx4xhz71c/F6sdzv+CI/dHWxNg8LWdf8j3Qbv/6fKkP7cfn3SFh45mA4oLXHGEqD2u5ZmE63w27x4dDbXl/8qupyv2k4IAWv7fe2ZitDUB4Tp+bWjzP770T8g79aDJEbWCAYlurfrF8dRyQHD+b3rNy0EEgWqOPw2+nX+11FscofUCtPufLo/6i/v5+YDRbEBZab/5sb2jmpzPO6YfbZ777SFmZmdHR4h5/ziqpYJaAe3l6qpD/5Y9YTU8GoUBIEM0V4DlZx1jtGE7f83XXrN2uwyXv2+W2rJ0TZk2urB/Umr9Myb7a3gEGQAwOp32vLTntrIBhQRaM1q1A6SBtDqfTb8ZHV162dwK7ThWtA7M7kl7Xty5mJWy6MbvGF/3oVn/s3PX9o5la540vupBXv6zVk8lkwCAiydzzdOkIEDcVCafFbiZGzCydWh0aHCtWT2414sBNaL9J9u3RcaBF1ozvrQ343zg+PFCT+CWuzd6cT6Y4pn2PPtcOHm8el/X0XHDbeuMBAEcm/KaVwoNAqiH8qxFmhQcSJoK6uM+ZOV/QK16kEfqJ0v99fZUMk0BNdOy99mCbuYGwPl3T+/rwAv7RTvSRrRPvvAzZeMQA/GhPY3zOX72peX3/++kP462h/zuFebftm6LUkCSBsLfKdr54H/Kg14ubzvrouhl5/8PPvuS6PWj4W0Gjh8v+TsSBM7sOdrs+u3B0ecm0EBci+O6DzM+yCqz0DdjipfUj4/MyISsHVGtQoT8IEY9NwAtfnH+9RhQkdp75iwpv8BzJ7w/cv6nTDs60ZB9aE9yPuL8ZXvWkRMj548B4KTBXx/Ox+0FwPHL4LAEArzg3OWFIGW/cC6CAPDh/CUQ1woCtR4Ew/FPfPFe84WPn+elF9Cs/9m5a3vH8oEdZsWCqar0N6o1M0OzBWCWid3iBFKwassSwKGuWLQg6ob5CBAoA7Tbul1QjsPPv9DEOX7778CAYEhFlcNdAkKc/siOx0331FK3PS1Fa49bAkKc/pNPP2GOPeq41H/nD2970PT/+18YOKGir70A5w+H/7Ptmw3m+NfilCNeU36P4ACKtn+3DJhpJekeuRc4Vm1ZDknH4W8hAPi8B3Y9lrqAY9X8z5axdKjP+is66/Gfkj1pxG9OzEr8ss5Os3L3boMtRKIQSdFsrjFm3ZRpo3Fi0QJdPbjDFI3cALnASQYE59/XP8+EhGjHtRetCAR4f+uTB5kVD9TOU8/rOaj8Hj0EH/o/e+rpZWeDQID3A9snmi889POafwO9A+Edl91ritb++XnzzX+9+g8rgsAJ02bGfufyr/7Y3PLh02I/u+nTHzBXfe4uUyQoA6791Q8/FO3jvZ2Wc4PypSe93dzxqIltcfpI4dr+B4gPEtxGkfgfk/C3av0/TJm+8sRJmTaeoVloxn/WSyYBAIjzl5uQlJeGeLvgIaSCahlQZUu6dDyUGSe285ftFQPXlT//6LH7UvUAllvvpfVTtPOX7cIvXFn+fMG0/XX1AIC0Pot0/uD/fvYfykFAegAIAsj5o2V/5XlzzM33rk90/j6B85d7AOKezZCgLLj36lcx5xSF+B8h7tkYaRQJy8bqvJz7XMw5cWTp/AXxPaKrHv8Zpa1WDY2aKHuS7FPjAldmAUCQmyAFQtcEzNw8yQxahZRzV5pSJRLRkn9bPmAKDQ5JBgRjWHPLJWbjwGeibTX2TP9I+f2F8y4wRWHrBl9acE05CIjzx6yfa8Za9utiAoVQy/jzwHY8YPUnbi47FnH+GPT90rxSz+uORx85wPkIRTsfcf6CHQTsHgCcv/0du7cg2IPGIYJrW2r9P1JOzV09u9RrcJEA7DaUfDb4YNtznTo/UpEiHbd9aQAlNfSyLoddh21ftHnm3kT/ORasyn6yVvYkLnBlHgBscbZDWdY5qdZ5QbSoXaRFkC6XfqfxgRu8sL9yzpKK4Avnf50VBJJI0wLKu/WJfTgWzOgBR287KHL+V6xdWw4CSRTdAv3k2jUVQQD7eGFGD+h+ZqK5c9EfmUtW/Z9oWw0ZO/CJpIHeNWN1NNguIADD+QtpU3MHpOemH51rw04anrB/afhIShN3xK0Dt6ZMkcakSXNvoNrOPwkJAo3+j8wCgJtCiQsEdvR1wXkvGP+4BiTA+WPmz6fG8v+1WtFFplEAdKDlL8EgzngkCKyrEgR8aAdozaPlL8Fg29H7ys5fkCBwh+WYXOD8i0oBATh/CQKyHTlyf9n5CxIEbh4b5I0Dzt/HGACQMQAJxN9//8IoAB/3598yL3/8g9E+6Lvtn4w5/S0NpeZAXk7THoMUUAdWzj82Ojb5u0PmR2cdU3b+cPrLzzomdYrUTZOGkLqWnj78EsYlUW/rZWJe6R84UDsPJy1LtwuWdF7RJBmQ7UTh/K+3goDo9409+Oumg1xQAaRVFIJ2d/DXTQe5IAigNYrWaVL6oWhs518NBAEZD8D5oWFfewnAcP42Q5e9N+oJwPm7TtDnLCBQre7ueXdfxblw/jt3be/onnp8uSXvcxaQPRaBepmm9e82PhtJn0/IegQbYB/pB9uRu85f3kOoe14jkSxvAxIkCCDqygCM+/KlPS5vmERI2sX5iAOKa/2Hrl+cf1zr3wbOH0EgFO0yA6heEATi8uNFO/84/5OGuQmTULoKdv5x+hEIMKWzln7bb9azIGTui8GJA5KWKV7VbpIbBIqkEQNCEMALzy3E/b2iDKhR40cvIO6Rdh/G34jzQS8gbhnoIp0P/letFn8cGAxGEHCXesDfk/SP7/RCmgBcjSdG/CZz0zSAqjG0ZZcJgUb1B7UaqN0yrYZvo2/EgPoSgoBPA0qr/ZSEIODb+NM6H6SA4oKAT+dTq/Vfiy3P/sZoJxo38LQURBYs7J/k7Wn4LKi38TYhtOirDTwRLEFAnsjTYkDId0oQ0KYdIN8sQUCWI9bifLDcg/QCoB2zhmYc8Trfsppu/YOic/9Z+5/lBT8F3wySOWk0dZ7JIHDF/NSxh9cGTfUcVkjLEDRrQBIE5AlhX/ob0S5BQKbK+bz2jTgfCQIyZdGX82mk9S9BQJZ/8JX+2fTSHmtHNqV7kRYEsVVLfj9aDbToMmThf7qmTBvFjCEfy9BAv5vTx7477z+OMa3+p4FmhY8URBYGBOff6HocvrXD+fvQnpXzgfNH679o5/PUSy9bO7IpBYK0wPmj9Y+F4LS0OuMorcZa7MObWbIzWg3X78oE1abJ50XTAQAXLGldjTTftSPwwLWLjVZCMKB21K7d+YwtBe1NO/5v0ro+ab5bbb8IsvI/WvVL5qHRzEmmBYYT753RW97ftKXUpHOPxYlsZkW7Zml0XZ8QHI5m7dr1a9aeVJ53/e74zKbv/2vpWQX3WMj6G/U/WvVLAPC6Gqj2Vqj8T40G5PaitOvX5IDi5pC/74Pjy1Dc/Y+lBdXijhGSFc00nHOfBgpR4ojEGRW1wFIe+rXRCvolEGjVr8HpxwVfeUDNvv44J5SVcG3iGj+iP63/0Ub03E6Tv58yIe8bYJSQVn+oBtQK+tO09EN2QG5LP04/zglRP9FHKWvSXMo89x4AcKNw1+FdqipBXCua+v32ArTpd3sBIemvFXzd63/qO84JTn+1xo92/1ONZhvZmY4BdO7dXH4/q3uC2Wgqc/ryeedkY6ZPPvBz36TVj88A9WfL5H3byu/fc+7J5p/vq5zZI5/jM+B+7ptD9j9Tfn/xwgvM11Z/r0KffI7PgPt5yNfePmfyIcnnhGr7GvxPXD3dOPJqqrI1SjCDwIQQ0s7sHHuoSxpoRZD5NNBasySqfe4b6vcL9fsjjTbqL4Za6alQdRNCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCElJR1Gr2mlcwY76/UL9ftGun9SmI0/D+fk9X4z2tz36iJl91ZfVGJLof+K+W6P9kcd/Zt75J59Xp/+x+78a7f/iyc3m3Ev/hzr92q+/dvsfXn9jtD88NGhmL12lRj9JT0cexiOG7yIVIWQjgn5xPC7iiELXL47fRQJB6Pq1X3/t9i+O30UCQcj6SX1MyMv4Xzt1ZsUWHH3S282Gm/4k2N/jtJ3Pa9/8loot6D7+BPODL38yaP3i/A9+47SKLXjzsTPNfXf8z6D1a7/+2u1fnP/k7t6KLejp6zcbblgUrH7iMQAktXxe2jH+e5YhV4KkludLv/h5xX6oTiip5f/KL7dX7IcaBOq9/rdv2hecfu32H9fy3zMy/mPqgEGgtcgkACy686nRWoavDdfxuFz05QdMyLiOv5Wu/0Mnf8x8YPq+YILAz/eMtpz9u47f5Sfbx39EnrRxAIDzv+UDU838mzak/k5oraBqeec40Aq90nw7GP13bt6XmPePI7ReQL3X/w9e/r65a+tB5lPvGE8P+XT+R77mJfNwHQ4xRPtPyvvHgV7Anm/+ZTD6iccAsOqSYzouv2uH+duThkzohNJizJolp/l3hEVz+k//zoTAWyZ3dDzz29eark3f8S2FED8poDVXzTYanH9IaYOQ+fN/fjqXa/Tk7gNTJa3AqdOO9i2BkOICALp+bvcPU9zs97L/lvM/Hr0Ed78oFvce1CFpgzj9mGJov5f94879aPQS3H0fxOnHFE/7veyfePaHo5fg7sc5/2XvemMuQeDYzo4O0d5q1z9L+//yz/bmFiiTrj+meNrvZb9nzpLoJbj7RDcdzcx2gCHLnGD7OIwfec4kas2HRl4VXet6tdWba4YjsfXbDx4hz5+Ez/no9mwfOHJbv/3gF/L8SdR6HgDO/6/fcxSvvyf7z4uLV20e/UrfuKOHI7f12w9+Ic+fBJ8HaB0mNjPVDe/fcv7HR8UQxPBt49+2bV3MXzqq5qBaXkHABg7nuHM/WtYvjsd2PiPP3BfzzakmhKmeeH/i2R8u6xfHbzv/X/ziwZi/9Kaq/ycP598q1z9v+8+T7y091xhrsBcOv2fOkrJ+cfy28x/euibmL40/W0LafAwAlUC6k2jV2F1h4eij5xrzwlGl7dh5Sa0HGVTL2/nbTkj0o1VppyKE7iPPNebXU0vbsfNCaf0gCIh+tOrtVJDw5jefYczuN5W2Y+eFol/79c/a/osGQaCsf+mqilSQ0DN9vjHPTyttx85b8cBTxYslfgMAjDYuf3n1EW8uv5dKIBUBRh+1gg57OtrOvrSyRRE3lSwv5w/9cfnjFW87qfxenJA4IjidqBX6+h3R9p0furOm/ryA/rj8/cpzzzcPbi1NQ5QgIIEATj/qBXQ+F23Pff8XverP8vp/7K7hA3LZeVKU/eepPy5/v6yzs/xegkB5DGD6/FIv4PDt0Xb24vWR8//osfvMzY/tLfT6k+zpaLYrfOsHP2M+++wvzGd/9JTZs6DUwsQ+wFznMoc9HRn/ew89NNr9pxdfjLYfescbzNf/7VeFtojsfPPXP3ajWf4fj1Y4IewDPHFa5vU7IufzobccU/rez0stoMvmHW9uW/t44folFfSda24z7/z7O0zXhFfMzlcPNj/4yKVm2X33RJ9hrn+Zzuci5//R00r36NYfl1JD//3ic8zffu2HvP5N2r8dBDTYv+T7v7TgGrNy9+6KIID9SP8Ni8a/dPj2yPmX+jDGnPnAU2b5WceYhf2TzOrBvcH0aEiOYwBOS2jUNnpx/gDH5/7Nm805l5ZWQBR+eEefOedS/88LjLVER22nY4Pj517zJjP7Q6UVKIUNXz/PzP7QvdH7h7ZuM6dP9zP9b6wnMIqWPzhj+tFRDwDOH+D4Gf99innn+0srgAo/+NZC8873rzatcP19Emf/P73mLnPydR9QY//I/dtO3wbH59801Zy9uLQCqHD/7TPN2YtLPct1Z5UCMdFNU1Hb7v7ZlcEFlWHdn/0itqX02YuOMY8O/6rwVpCrP8kZATij+657Lralev0fn2Yef/qFwluhrn4JBnEgGDz4t7uinoF9HvZvXPp75skdvy68F9BK1x9PweNpeDwQKUFAm/0nBQOAYLDmqh2xPYUVC6aaoS272Atox0Fg3PBmbvpPB9eZq7/hbzCpWf0bh75vPvWVHxut+n8y9AOz5IZ/Mb5oleuPByGTnH8r2//Q4FqzfGBHtqKI3uWgG+WknjcYzRx/1GFGM8dOfb3RTAjXv17n30r23zdjim8JpMgxgEbBABi6vTKA9mujCwxAIu0gA5i/MbrAADDSPjKAXBqG1IP266/d/ueOpX1kAPkF34KI/x4A8ojV8v+hA/3V8s8a9FfL/4dOK1x/7fZfLf9PWhtvKaBfT5lpXr9L75rpv5nyFvO6XdV/MyBkXnz9NHPor/X+ZoD266/d/l/o6jWH7az+mwEkfIIYAyCEEFI8DACEENKmZDII/MiLpScHk5hr3lw+BwNheJweU+B8LAsdx2N79lT9/FzrHAxEYjkDTEH0vSyxsHnPS1U/P8M6BwPBWE4CU0CrLQtdJNqvv3b7Hxx78jeJ+dY5GAjGchKYAsplofVTSA/gb658smJfHocHeBAGc6FDfojkS38xXLEvyxEAPIiEuegh6/+Hv366Yl+WgwB4EAzPAoSsX/v1127/1409/SvIchAAD4LhWYCQ9ZMcewC48f9k6l8Q6jMmDKD/68bUrf/PTDj6b/3xg3Xrv9yEQStcf+32v66BBd2uz0cOKZiOrKeUvf3Ek8v7jzz202jrHkP39+T+ucG1fqD/7LPHp1Tef39pUTX3GNIPs/reFVzrE/p/773jDyT9yz/dFW3dY0j/nNL3zuBa/61w/bXbf++M3vL+pi2lWT7uMaR/+vrnsfXfAngdBMYaKJrBGjSawRpAmtF+/bXbP9YAIrrxFgB8LIObJT6WIc4SH8tAZ4n266/d/rkMdGvgJQCsvPxDqo3/75Zdqdr53LHyGtXOX/v1127/KxYtoPNvEbwEAM3GDzQ7H6DZ+bfC9ddu/3T+rUMuAaBz31PR64yZr6vYt4+FzOR9W6PXBafPrNi3j4XMa/c/Hb0WzjuzYt8+FjLar792++/cuzl6zeqeULFvHyOtQaZ3E60CmfmgEeiXmSda9cvMH420wvXXbv8y84e0B7l042r9UHTo3Ufq9wv1+0W7fkIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISRoOopaVVDjCoLU7xfq94t2/cTzctA/v+eL0f62Rx8xs6/6shpDEv1P3HdrtD/y+M/MO//k8+r0P3b/V6P9Xzy52Zx76f9Qp1/79ddu/8Prb4z2h4cGzeylq9ToJ+npyMN4xPBdpCKEbETQL47HRRxR6PrF8btIIAhdv/brr93+xfG7SCAIWT/x+ItgtvG/durMii04+qS3mw03/UnNH5wIwfm89s1vqdiC7uNPMD/48ieD1i/O/+A3TqvYgjcfO9Pcd8f/DFq/9uuv3f7F+U/u7q3Ygp6+frPhhkXB6iceA0BSy+elHZsr9kOtBEktz5d+8fOK/VCdUFLL/5Vfbq/YDzUI1Hv9b9+0Lzj92u0/ruW/Z6TyJyIZBFqLTALAojufGq1l+NpwHY/LRV9+wISM6/hb6fo/dPLHzAem7wsmCPx8z2jL2b/r+F1+sn1bYVpIwAEAzv+WD0w182/akPo7obWCquWd40Ar9Erz7WD037l5X2LeP47QegH1Xv8/ePn75q6tB5lPvWM8PeTT+R/5mpfMw3U4xBDtPynvHwd6AXu++ZfB6CceA8CqS47puPyuHeZvTxoyoRNKizFrlpzm3xEWzek//TsTAm+Z3NHxzG9fa7o2fce3FEL8pIDWXDXbaHD+IaUNQubP//npXK7Rk7sPTJW0AqdOO9q3BEKKCwDo+rndP0xxSwPOS3tulizuPahD0gZx+jHFMA04L+25eRGnH1M804Dzqp0L57/sXW/MJQgc29nRIdpb7fpnaf9f/tne3AJl0vXHFM804Ly055Lw6WhmtsNbzv94eU5wtfnP9c6HRl4VXWuTc675uHM/WqE/bR7a53x0e7bPiWd/uEJ/2nGAWs8DwPn/9XuO4vX3ZP95cfGqzaNf6Rt33j1zllToTzsOwOcB2rQH4Bo53tstiSxa9jKoFjezImvgcGz9vluWtXCdPN7b+tP2AmqRh/Nvleuft/3nyfeWnluxD4dv62fLvv1oegzArgRo1dSqBLVaPzKolkcPoJYTQquylhMK7WlUOwigVV8rCIT2NLD265+1/ReNHQTQqq8VBKT1v+KBp4qSSEIJADBadHtdrj7izeV1T6QSuBVBjsmaKELcVLK8nD/0I+3gsuJtJ5XXnREn5DoiOSZr0ghFToWDfqR9XFaee755cGtpGqIEATcQyDFZE8iX/iyv/8fuGj4gl50nRdl/nvqR9nFZ1tlZXvdHgoAbCOSYOP+PHrvP3PzY3kKvPwmgB+BWgls/+Jlo+7VD5lVUAtvo3crw3kMPLQ9Gfegdb/DqhL7+sRvLW9sJ2U7HdUYfessxZf2XzTveaxD4zjW3mXf+/R2ma8IrFUHAdvpuMPjoaWeU9f/3i89Re/2/8SdnGR/XP87+sdVi/3YQ+NKCa8pbOwjYTt8NBj866xhz65MHmeVnHWMW9k/i8wCKabiljZuOlk8cn332F4nfg/GDf3rxxWiLCvD1f/tV4V1i6EfLM47l//Fo4vfgfMCSH/zAnD796MgB3bb2cS/60fIXEAR+8JFLo/fL7rsn8Xtw/uDWHz8YbREA/vZrP1R3/b/+81IKwuf1t+3/p9fcZU6+7gOq7B8t/zhW7t6d+L25Y9t1Y1sEgNWDe4NJaZH6mGgaBDf8s8ZEkd+uCDB+e/+pY/ZG22OemmQeefFAwzqp5w3mQ6jQ/2ZGizQi/K/l/1HSbzsiOB97f7hnX7TtGT7IPLZnT/k4nD84/qjDxpxQ8fqX3XdPpB+BwHb+dmB4uruk/6iRg8zmPS8d8HeOnfp6CQKqrr/g8/qL/eMpeDwNf7m5K3omRov9rzSllrsdCOD87f3NM0v6Z26eZAZjAkPfjCnGmF1m9eC0QvWTAAaBccOjijDW4qnm/OP46eA6c/U3/A0miX5pcVZzPnFsHPq++dRXfmx865cWfzXnH8dPhn5gltzwL8YXrXL94fTxNHw15x+y/UuLv5rzj2NocK1ZPrCjILUk6NVAXedfD2gF+cZ1PvWAVqhvXOdfD+gF+Eb79Xedvzb7d51/PZR6AaStA4Br/LVaP6HhOp9arc/QcJ1/rdZ/aGi//trt33X+tVr/pDVoOgBUGwyuhgyG+abaYGQ1ZDDSN+5gcFpkMNg3rXD9tdt/Iy1/GQwmusn0F8Hqaf185oFvmZP7wzSjNK3PP/vOV8ysvneZEEnT+r/81pXmlL53mhDRfv2123+a1v/1g2tNX/+8AlURNQGAEEJIGwYAbblPF225Zxdtuf9Wu/7a7Z+5//ai4ecAbCrmN4899PiIKRmSBirmlz8mm5Ij0kDF/P6xh343m/1GC9qvv3b7r5jfP/bQ76Ai/URxCuizFx0TzYXW+hDJ9X98WjQXXav+G5f+XvQsgFb92q+/dvtfsWBq9CyAVv3tTtM9ANz4fxp7orAeSiuo+Af6vz72RGc9/JkJR/+tP36wbv2XmzBoheuv3f7XNbCWz/X5yCEF05H1lLK3n3hyef+Rx34abd1jeAISMyBCa/1A/9lnj0+pvP/+0hO27jE8gYoZKKG1PqH/995bWo8G/Ms/3RVt3WN4AhgzgEJr/bfC9ddu/70zesv7m7ZsirbusaGxGUBs/evHawro0eFfGc08/vQLRjNP7vi10Yz266/d/oe27PItgWgNAL5WQcwKX6tQZoWvVUCzQvv1127/XAW0NfASAFZe/iHVxv93y65U7XzuWHmNauev/fprt/8VixbQ+bcIXgKAZuMHmp0P0Oz8W+H6a7d/Ov/WIZcA0Lnvqeh1xszXVezbx0Jm8r6t0euC02dW7NvHQua1+5+OXgvnnVmxbx8LGe3XX7v9d+7dHL1mdU+o2LePkdYg07uJVoHMfNAI9MvME636ZeaPRlrh+mu3f5n5Q9qDXLpxtX4jNPTuI/X7hfr9ol0/IYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQEjQdRa0qqG0FQc3aW6kcmvVr1t4K+onn5aAf33BHtP/ME4+bcy/7KxWGJNr/44FvRPvPbnnKnPfhT6vQHleOR370rWh/57Zhc95FS9WUoxVsaHj9jdH+8NCgmb10lQrtraCfpKcjD+ORSusilThUI4J2cfwuEghC1e6WQxy/iwSCkMuh3YbEcbqIIw1VeyvoJx5/EcyuuIe8aXrFFhx53PHmvtv+ouYPToTg/A+eclTF50fMOMbc+9XPBam9mvM/+A1HVn5+dI+59xs3BFsO1/nb9qPBhsR5Tu7urdiCnr5+s+GGRUFqbwX9xGMASGq1vfzc1uArsO38XcevKQjYzt91/BqCQFwDIo5QbSiu5bxnpPInFkN1otr1k8bI7ReeXcevhVd2PV2x1corv3qmYqsNsR+tduQ6zma5eNXmUc36SQsHgGo529BbcNXy/pp6AdXy/hp6AVnb0B1P7BuNe1903jyORlrRX1s0s0OzftJmPYBW4m1nXVSx1crbz3x/xVYbx8++tGJbjUuPO6hDnP+CaftzDwLV6JmzpGKrBQz61nOctEkAQOSXl2lxrvjCg+UpodhiXyOfvPnh8pRQbLGviff/5T3lKaHYYj8NCAQD2yeWA0LRnHDJ3ePTKdffGO03ys2P7S20vqGl7+rFPo6TNg0A0lWXlwQBTM8T8F720VqzW2zufghgiqf93t6fNvviinPd/ZDAFE/7vb3ffcbCinPd/RBIsiHwlgsurzjX3a9GEc7fbhXjveyf+MEVFee5+/U4/48euy+3IJC3fhImHVnkasWh2w/tIEebRGhzue1xADh/5PmTCPl5AHscAM4fef4kktJAPstl21YtG0pqRPzb1m1mZmdH4WWw8+hwntVayfaDVfVcczj/K0+c1BGK/hDrAKmPiSYDUGlRIaXS2hX3mR0/jPnGESY0xPG7zv/Z55xUyaEmaMTxu85/5y//vfz+vPdcZ/784+MBYHpXZ/n9x669I2ph+qrccTbk2tG5F95qLn/frPL+cd2HRduzPvX35k2vedls3j06mhQEqn3WLOI4bec5vHXNAefNXrreLOyfFL3vmzHFLB8wqa55Xs6/Xv3GTMtTBimQhgwqrhew+hM3m6sffiiameEGgCOnnlOu2NhHBS7awUiqKun/4nPM7okLAEe86dTxtNChvzTnLfh8sK2fqByY3RMTAOD4bR569EfR9vSTziwf+7trSy3rj11bur8+7pNrQ0Dsxub/Dd0bbX+n77yKHsAD13/EfOKL9x6gH84fAeK53x6SSy8B2jE7xnWgPdPnl50r9mcvXh99NjS41qxYtMAKBDsO0Fwk9egP1f5JfTR8E+0gIM5fQAUGUond1hsQA8LfyduY7BSPO5MH/9sezEYQAHYgsHsBtvMvQns9VJTjGzeUjlmBwO0FSNkRCI7tnl4ukxsIiiqjrd+1oTg7Ev0IBD3TjqvQ/4WPl4ICAoEbBPJy/vIeThSII7Vb0eL8RdPI1qHRvv550bEVC6ZGWwQCXw2kevWHWA9Iepq6abjxnz319Mj5YytIMJBKHPG6Z6NKe+lJb49273j0kWiLrvwtd2/M1eCT5vr/38/+g/nk2jXm8/Pml49h3w4EADn/ewc+GTn/K8+bY26+t1QJll4219xw27ogWkMo4/9aOB7c/nT1NyoCAcAaQPf+8zUVPQF8B+dKb2Dyr5+pGCNAICgiCIgtVbMhjBvd982PVvQExP6kN9D5/NaKMQIEAjcI5KF9Wed4Gm3l7t0VjjTi8O2R85xrjFlnfRe9gO7pfRXBC4GgyCBQr34zVgYJwEhnrR7cG0Q9IAWPASz8wpXm6tnjrX+plOf82RvN7AtLqzcKG745z8y+cK0JGQSDU//bG8w7F3y64hicPxDnHxJx03Hh2P/LpYebc9+ztOKYOH87WEQDx2OOf8/rj4yCAI4hCMD5jwWBQlt5cTaEY+L87WAR9UTHHP/uw6dHQUDGpeD8x4JAYfrhTOffNNWcvXh8oBfcf/tMc/bizdHnAlr/di8gDVv2jI7OmJzfQHct/aR1aCoAoEIdP/vS2GlpP/ybX5YrKSoy9uH83VYeBvBKvQCTWwXF333bWRcdoNNu+ds8/L9/Vf4MwQD77vnoKcw44nXSC/DSBRbHL614l3+/4/myo0cwwP6S+b9vblzzncS/CeePIBCXHsuLpP8RZ0PoQUrvMQ44fwQB0f+n3942av7d6okWxJqrdpQdPZwp9q+LcZ7RzJudm6KewGE7N5UfGCv1AuLrRJ7Ov5p+N3itNKXUz/JVQ6Nm0QKzepCpoLbrATTjJNBtxwCePaMjL+IM85Nr1zTs3H78yP3mtLefHQUA32v9r7/hmw39nXLQiAkeuF5PjmwdlUFizBr66y9+K/MKbqcR60W+4/ZAAXQOb39i1JiXze9cdm/ujYxmgfN/oau3HASQAqoWBHxxxcB15ksLrinvS+8FWlcPlgaxSZtNA20WmcZXNFm0cNELCHnNnzjQCxDnX825yMAwAsHdt3wh81SQPZEgzokngV6AOP9qWmRgGIHgK9d+ovBUUBxzrRw7WGktD4HeAIJAqMwd651IL8DuDRCdFBoApOJKpR+vBuGDwV+kfWQw+UUPGuKcf6Pr+tRKBbmBAP/bfnag6MXfXGqlgtxAgP9XRE8zDTIQ7AainjlLRu2BYbT+Q+0FCC94VUK8Lwbnzt7QBLQnjQOECJyA7fDxXhyDPahbTxBI2wPC//nrL34rk5kervPHYG0jNoQgUI/+PGabuTNo6gkCrnZowwvOH6kVHBvassvkSaP6SWvgbTVQma2hkRdff5Q59NdPew0CtvMv8n8bxWjSjyCAnkCoaSBgj1kQnXA5aIVIS9G3DpIvGFzFE8KYZ98OK++SNh0EJu1FtenDZJxoiuWAiR60CrEXEGIPhXgIAJte2lP183PMG8vnIG+LnC+mgIawLPRTL71c9fNTrXMwEIylJDAFNLQfhxl+uXo5/kuKc4rEXUqgHhsKjUFrVk8c81OcU+065T2/vhH9MvlZ24/cEA8poNtWbKvYl+UginpUvxm+8f9V/qYugoBw06c/YK763F3BarcZ+LLuOdquDWki7gGwevBtX7X0F710BQnsQbA7Hi0tZ1sPVxn/QPvN966vW/sic60JCZTjxjXfaSilEkKlbdSG5LvZK6rv/69rMD/vW3uz+q/PXg4pmMynxL3rd8enVX7/X0sLq7nH5Ang0Fr/0P++D46npe7+x9JURfvYsqv/OHoCOMTWP/R/6I/Gfynr6//nlmjrHgtJcyP2E7L+3hnjD3Jt2lKaIeMeawX99hPAbP3rxessoCdG9D5GsuXZ3/iWQIh38n5OgbRoAChiGei8CGkZ6FpAo/QEpDegaUoh9EtPQHoD2vRLS1pa05r0V4PLQOvHyzRQrMui0fkjJTTj0F8E6fzj0j+haaw3/aNNv5ZUTxZlxS+Z0fnrx0sPQKPzl7GAEJ1/vb2A9150iepewKnvOEd1L6Dr8C5V+uOnptL5twK5BIDJ+7ZFr/ece3LFvn0sZA7Z/0z0unjhBRX7cizUynvI/l+UX3/0h39wgE757I2TXoz93Deunbj65LOph/w69nPfdO7dXH7N6p5wgD75bPrkXbGfh4JdhqRy0fm3BhPybKlpA/pl5g8h7YbbUyGtTy5RvFbLJvTWg1b9catL1vO5b6g/DLTaPyGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEKKCjqJWFdS2gqBm7a1UDs36NWtvBf3E83LQj28ora3/zBOPm3Mv+ysVhiTa/+OBb0T7z255ypz34U+r0B5Xjkd+9K1of+e2YXPeRUvVlKMVbGh4/Y3R/vDQoJm9dJUK7a2gn6SnIw/jkUrrIpU4VCOCdnH8LhIIQtXulkMcv4sEgpDLod2GxHG6iCMNVXsr6CcefxHMrriHvGl6xRYcedzx5r7b/iLIn8Jznf/BU46q+PyIGceYe7/6uSC1V3P+B7/hyMrPj+4x937jhmDL4Tp/23402JA4z8ndvRVb0NPXbzbcsChI7a2gn3gMAEmttpef2xp8Bbadv+v4NQUB2/m7jl9DEIhrQMQRqg3FtZz3jFT+xGKoTlS7fhLQj8LHOX4tvLLr6YqtVl751TMVW22I/Wi1I9dxNsvFqzaPatZPWjgAVMvZht6Cq5b319QLqJb319ALyNqG7nhi32jc+6Lz5nE00or+2qKZHZr1kzbrARDik0uPO6hDnP+CaftzDwKEtE0AQOSXV/aSCMk2EAxsn1gOCJq5+bG9rG8kUyY221U/fvalozI9D93yWuC80MAUT6R20pwXMpjiidROmvNCJC8bKsL5Y4okUiNpzmvU+X/02H3GPLZ39MoTJ3Vo00/CpCOLXO3xsy+NtmlzuKHN5a5nHCDk5wHqGQewHwyrOO6xXPWMA9gPhtn829ZtZmZnR+FlqCePbj9YVc81vzkn59+o/hDrAMm5BxAHKi2CQNoWXIik7QWETtpegPDnH3+/md7VWd7/2LV3RD06X5W7Xhu6/H2zzHHdh0Xvz/rU35s3veZls3n36GhSEKj2WVGtaGFh/yTTN2OKWT5gUl3zvJx/o/qJfjqyaqmt/sTN5uqHH4pmZlSrwL5a/zJekfR/8Tlm91QLAiG3/ivKgdk9VYKAtP4fevRH0f7pJ51Z/uzvri315j52ben++rhPaW3o/w3dG+3/Tt95FT2AB67/iPnEF+89QD+cPwLEc789JJdeArRjdkw1J2q3/ocG15oVixZE70uBYMcBmoukHv0h1wGSnoZvoh0E4PwFCQLArsSSt3XXc8HfyduY7BTP2866qOIz/G97MBtBANiBQHL/7ppARWivh4pyfOOG0jErEEju314TCN9BIDi2e3q5TG4gKKqMtv60NoTvIBD0TDuuQv8XPl4KCggEbhDIy/nLezhRYDtSyZ27a+qMbB0a7eufFx1bsWBqtEUg8NVAqld/iPWAFJACwg3HAPBnTz39gM9QQVGBkwbrLj3p7eaOR0vdXnThb7nbFGZAdq7//372H8wn164ZTTPgC+d/5Xlzovc337s++s7Sy+aaG25bF4TxoxL+r4UXmT9d/Y2qA75w/kvm/370/sY134m+gx7AkyNbozJN/nXpwbG3n/l+I4EAaaEigjS2sCc0IgTXhmBbsB8AG8L56AEMb38i+n7n81srxqUQCD7xxXvL+vNy/ss6x9NocJJwokkDpnONMetiVtqUVBACAd4XGXgb0S8BGKms1YMMAm05BrDwC1dW9ACkAscN0AGpvKHw+Xnzy+8/uXZNuZXvIs4/RMR5wvlLEIgb4AXi/G2igeMxx7/n9UdGQQDHEATQAygqCIjtYFuP/UQ90THHv/vw6VEQkHEp9ADcIJAHK3fvLr+HM7UHeV3naZ+H1r/dC0jDlj2jozMmZxvIGtFP2jwAxPUCpAIL247eF22P3naQ2fTSngP+Bgbw8u4F4O++7ayLRqs5/7hjI0fuj7bdz0w0T7308gHnzjjidV57AeL44fRd7GM7ppbKMXXHRDP88oHlsIHzRxCIS4/lBf6H2IwdBNLakA2cP4KA6P/Tb28bNf9eSiflid2ChjOV/c0z90bbmZsnmUHLyQrRzJudm6LxgMN2lpZf6JmzpGovIGvn36h+Sf0sXzU0ahYtYC+gHXsAuOFXP1zqileruHEgd4vuOwJA3sQZpp3+cYOB7fzj+PEj95vT3n52FAB8r/W//oZvJp5rO/84opSRkzaS6yVpIaSIMFvor7/4rcwruO38BduWatkQzrt69kOx+ktpoZfN71x2b+GpRtd51gLO/4Wu3nIQwDhA0amgRvRL7wVaVw+WBrFJm00DBa7zrweZxlc00sKF80f6J65HUAv0AkKY6z9n6YXlvH1cjyCJas5FBoYRCO6+5QuZp4KqTSRIa0vVtMjAMALBV679RCGpoHpAS3vlnCUVvQEEAS3YvQbS5gHArbC1Wm6hkZT6CYk45y9OH6141/HXav2nBYEA/xu9gKxwpxLLWJLt/LOyIQQC/L88e5pw5vIgFZx6mtazG4h65iyJelxIB3VP7+tA67+oXkAj+q8YuM68kKcoEv5icHFd+DSEMBgsrf968TUgDCdQdvhjzl8cQz2tfntAOG2OH//nr7/4rUymJyY98VtvLxI2VI/+W+7emPn0SncGDYAjXT1YcqBJIHHoaoc2vOD8kVrBsaEtu0yeNKMfYxVEN7msBpqm5XbV126qeIAnFNK0/hfddG2U//cZBGznH0dWrX/3f5ucwIydesaPGqHo1E+a3H8SCALoCfikln574JrohMtBK0RaiqZFcJ0/KYHBVTwhjHn2Ia+8ix6DPMVMdJF5kltb7t8m1Nx/veTR+s8SmT7cijaUJdEUywETPWgVMuPTVhkEtJGJh6iYmz3WI9xkSpU4dCrm9489/PuUKTlQTVTM798ydizgcrhLCWi2IcyPd3Pi2I+b99/Idcp7fn0z+jkOoBvvTcSxqXkqF5e66dMfMFd97i6V2kn25PVESFH21ah+af2zHrTpg2Cyrk89XGX8A+2yrk89LDLXmpBAObCuT6PfzV5RMTYk381eUX3/317Xp97vZq+oOP3XZy+HFEzmU+Le9bvj0yq//69roq17TJ4ADq31D/3v+2BpETFw9z+Wpirax5Zd/cfRDKAQW//Q/6E/ury8//X/c0u0dY+FpLkR+wlZf++M8Qe5Nm0p5bLcY62g334CmK1/vXidBfTEiN7HSLY8+xvfEgjxTt7PKZAWDQCltVmyfzCnCMYWgFOhHRqlJyC9gZCnFMbpl56A9Aa06ZeWtLSmNemvRmkZ6L0q6gEJaBAY67Jodf7yAFho2uPSP6FprDf9o02/llRPFmXFL5nR+evHSw9Aq/MXtGl3ewHvvegS1b2AU99xjupeQNfhXar0x09NpfNvBXIJAJP3bYte7zn35Ip9+1jIHLL/meh18cILKvblWKiV95D9vyi//ugP/+AAnfLZGye9GPu5b1w7cfXJZ1MP+XXs577p3Lu5/JrVPeEAffLZ9Mm7Yj8PBbsMSeWi828NJuTZUtMG9MvMH0LaDbenQlqfXKJ4rZZN6K0HrfrjVpes53PfUH8YaLV/QgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghRAUdRawoyNUDi6UVrn0rlIGQ0OnIq+I+Pbwx2t//yiump/cMNRVZs+MR7cPrb4z2h4cGzeylq1SVpRXKQIgWOrKuvOL4XSQQhFqJtTse6BftLlKW0MvRCmUgRBMdeTn/CRMnmVf371URBLQ7Hlv/5O5es2dkU3mrpRzuPXD1aygDIW35k5C284fjT2LiwQeb4U0PBvVbqHGOx6anr99suGFRUJrTBC/XeYZcDjeAJRFyGQjRSOY/Ci+tfrf1HyKt6Hhcx68N0a+9HIS0RQColvfX0gvQ6niqpa60BLJWKAMhWsm8B6AFOp7wQc6fEKI4ABzVM6vqfqviO1D0zFlSdV8DCLonXHJ3xTF3nxDiOQBgdo/93t5HekicPrb1pIu0OlA4/4X9kwoJAnYrGe9lH70b0YxtPb2dokkqAzjxgysqznX3CSEeAwCm5MmDXnaeX7CdvgSDUKaCVnM8jTrQka1Do0ODa00R4BrKswp2q9nVLGUJcRpltTKAb8+vTAPdOH1VcGUgRCsdmeXTNz1Y4fiF/ftfPOBYz7Hn1KzA+Jt5V3J7HADO0XY8rtOXYGBrkha+HIPz7+ufZ9D6Xz24txAnBQ0Ym7C1R+XZuubAk5+flsp5FnHt05QhqRyzF69nACAklBSQ9ALs1I/r8OWV1iEM/uS7haZQXOez4fY5kfORF/ZdjQgQeMHxi/NfsWBqYc7fbkHHDZjCUfZMnx9to/2Uzr+o9FWaMgCUAcErehFCwusByHv0BIDdG7B7AWla/y/teX70lzueNv2nvDt3R1qtBS2OEyAA2PvSO3ihq9cctnNTuYeAALB8YEdhAcC+9igHkLLYrWfRXksXAtmKRQsKDWLVyhBXDldX0T0WQlqFic3+AVS+/3zwe+V9GQ+QQFA6do4ZfvKH5R5AKBVWHA9an67jQatzw+2mwvEs6+w0VwxcV3b8wLfzh6ayxrFcupTFmGnGHL490j7XGLMuoGufvgw4tr4cgKNyWGWQHsvqwbDKRUhbBAAXBINDj5hoeo49o+KYOH+8f+sZFyQ6IrT+j552kkEKKCTHI+cmOX5QpPOPAxrn3zTVnL24clD1/ttnmrMXb44+X7l7d+K1t8cwQioDjkkPBkGMEJINHVn3AFwQDF58dr95+dVXzayz5kYBQEAgALYzQgDY/csd5sST5+TqTN0AAEqOZ3N5XxwmkJk9cJCC7fjdchRBXBnc8qy5aocZ3L07cpz2uVIuWzMCwMC1i732YpLKAL2ufnvwvei0FSGtQOY9gHqQ6aFH9cyKUjHbtj9q0Pp/7KfjufYigaMRJyOOB6BFDAdjO32fjj8LZAyjZ86SUQlwMogdIkj9uEEAVA6+l+4HISTAALDxgXXlVr/dE5BA8KoJ0/GgZSnYTkaT4xcHCmwnWh7MNrqIemeGy3IQomotIAQBgEBgLwvx6msmlVv/ead/GnGeeAHokpdRhpQBgcB+shnjGtKK9j2OkSaIYSBeBuMJIZ4CQK38f60gAEeDIADnP+G34S8fHRK1cudJ2IEMQUCmsWoqgxDy8haEaMD7aqDS2kQgKKr134zz9L3IW5bIdUYgCL31b98D6b34DF6EtALeA4BM+wwx9dPq2AOoGpw/IaTFAgAhzfQCNPVeCGm5WUCY31+NQ6ucw9Z/c2B+fzXmVzknlNZ/o2WQaauEkICngf5yR/LgLtb7wRO/Ppx/M85TC9dZD7W54LkGPN8Qesu5WhmA7wBGSNsGAFS6WWfNbWhQFI4fi73J3zHKHI9vcM2wJk4j35XlquXvGIVluD57OYS0HZlWfsyQeejH95T3Tz/t/GjrHkPF970oWTOzeUIMWFKm3hmltYrApi2lGTJxx0IsQ1r90M7lHwhRvBSE70ob9//rcaCa8X3tm4XOn5Bs4CygKs7fdS5xx0jx0PkTkg0MAHUEBe0BTCMog93r6jq8i86fkIxgAKjhPDv3bi6/ZnVPaKkngQkh7U0uYwATRvdF24cf+q459fR3l/etY8H9ehMcvABHv1HhSpNJZYg7Htr1T1uGzsnGTJ8cdhkIacsAgAp5+mnnj8LJtwIojxsI6HQIIa1CLs6sVpokRCfqag5RY6Nl0FS2VigDIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkgiua2oaK/eyJUbi6UVrn0rlIGQ0OnIq+I+Pbwx2t//yiump/cMNRVZs+MR7cPrb4z2h4cGzeylq1SVpRXKQIgWOrKuvOL4XSQQhFqJtTse6BftLlKW0MvRCmUgRBMdeTn/CRMnmVf371URBLQ7Hlv/5O5es2dkU3mrpRzuPXD1aygDIW35o/C284fjT2LiwQeb4U0PBvXD6nGOx6anr99suGFRUJrTBC/XeYZcDjeAJRFyGQhp2wBgI61+t/UfIq3oeFzHrw3Rr70chLRFAKiW99fSC9DqeKqlrrQEslYoAyFaybwHoAU6HkJIu9O2ASBvGCgIIW0RADC7J+15ac/V7vwX9k8qJAhgZkza89KeWzStUAZC2jIAYEqePOiVJv8PQpkKmofjGdk6NDo0uNYUAa6hPKuQJoUFQptG2QplIMS0ewoo65Z93q3nLBwPNNo64fz7+ueZFYsWmNWDewtzUlm3in2kr9iyJ0RpAJBeQK0gkPZBMDigwZ98N6gUStIgMl5w/GXnv2Bqoc5fAlmtcqR9iKrI9FVeZSCEFPwgGLYSBNxAIMfSpoq2bX/U+HY8PXOWRC93WQhp9csMohe6es1hOzcZOH8fyLWXcrhlkWNpeztFpa+yLAMH3AlpjImmSVD5/vPB70Xv33rGBeXjbhCA89/4wLro/ayz5o6G0IqzHY+LOHgJAmBZZ6e5YuC6suMHcP4CWv/LB3YU1kKFfmgCK3fvjsqBqapJLem5xph1U6YFce2TyiC4ZUDZoN84ZZAey+rBsMpFSFsEANvx44Gwo3pmxZ4jzl9AxY2rsC/teX706GknGaSAinA84nRs5+4ijgfnXuw4fgkQRTt/QfQjYEFLUitZylDt2ksaCw61SGzHn0Y/ISSgACA9gBdGdpaDAI7tPajUM5+0r8O8/OqrB3znrWdcEJ3gOqPHfrrenHjynNydKRyPtD5rcf3gWnO9MeZrZ18Y7SNYwOGK4/fh/IHo/9KCa8pBAMc2zywtxTFz8yQzaDlY+c5KU+r9uJp9BDL7Htj3pFoZJIjhtXzV0KiJBt7ZCyCk8DGAw7q7KvYRBKRXAOefBM7DS/Lq0vr3ieT+5SUtz0/1zyvn+eGkpOUvztKX43F7LQgC0qKG40xCBrDl2kvrPxRs518N0d03Y0pByghpHTIJAHbaB72AepFA4As4THHqSH/ghVZoXO/ATlf4dPyCPUaBXkC9SCDQBu4NB38JCSAAjKVzop6A9Abg0PtPeXfid3C+HThefc0kM+G3pVZfEekfIGMA4uzTpIPE6ft2/G4Z0BOQ3gAcOqaiJmH3YOyZTMDXOIatP03rP2m8hhBSUACwZwDFYaeC4gaE4WgQBMT54z3y/0ViO/20aYfQZs/EYaeCbObaz27MWVJ2/jKe4bsMtYKXlAF6NfZcCGnJJ4ERCJJmAFVDWpvi/Ito/ddyntUcT4hpB5TFbtGnRa6zPZgdSs8mTRC2ey6EEM+rgTYSBGTgtyjnn4Sm1n9WQcB+ejkk508IUTQNVMC0T8zft4NAtRQRyTaALTSTDnhwrdUJsfdCSNsEgIr5/a8c+NCXO//fhq3/5qiYGz944ANT7tz5EFv/0Cg5fWFuDe2yZEVI01YJMe3eA6iXX+54Ouox+HD+cc5z0IT/O8ZZgRVLMd01lJZzo0/6+g5ghLRtAEClw7o+jXwXjl+mibLy1g+uGdbEaeS7pbVz9nq/9s2UAU9lE0KaI9PKjxkyD/34nvL+6aedH23dY6j4SevRFEUzs3lCDVgoU++M0lpFYNOW0gyZuGMhliGtfmhHCqvo310gpNXwlgLyXWnj/n89DlQzvq99s9D5E5IN/FH4Ks7fdS5xx0jx0PkTkg0MAHUEBe0BTCMog93r6jq8i86fkIxgAKjhPDv3bi6/ZnVPCPJJYEIICWYMYMLovmj78EPfNaee/u7yvnUsuHXb4eAFOPqNY+vlayKpDHHHQ7v+acvQOdmY6ZPDLgMhbRkAUCFPP+38UTj5VgDlcQMBnQ4hpFXIxZnVSpOE6ERdzSFqbLQMmsrWCmUghBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCEkktxUV7dUbuXIjIYSER0dejv/p4Y3R/v5XXjE9vWeoCgQMXoSQdqAja8cpjt9FAkHIDlUc//D6G6P94aFBM3vpquh9yLoJIaQROvJy/hMmTjKv7t+rJghAvzh+FwkEIeomhBCvPwpvO384/iQmHnywGd70YHA/rG47/8ndvRVb0NPXbzbcsCg43YQQ4j0A2Eir3239h0pSy3/PyKaKfQYBQkirMSHPvL+mXkCS49cKrq+8fGshhLRJD0AT1fL+cWjoBYjTR7nwEr0hayaEtGgAOKpnVtV9kh2247eDlh0IvAokhLReAMDsHvu9vY/0kDh9bOtJF/mkZ86S2K1MCw29N2MPYmvpvbgwjUVI4AEAUyPlQS87zy/YTl+CQUhTQTHF034v+3CmcPrlZwLG9uFEQyNuFlMcWoIA01iEKEsBSavfdv5g+Mkfmv37Xyy/sJ+GIio7gpDbooeTjLZjzt/uAcARhdoDcAextQ5mt0saq1XKQXSTSQCQXoCd+rHpOfac8itt5Rj8yXcLqyTS6hfnDzbcPscMb11TsRVC6b202kB2uzyPAf0L+yepLQd0X37+Map7ZNBvSHYPgmErQcAOBBMnHhq1+uWFIFDLgW7b/qgpCukF2KkgYfbi9aZn+vxoG+3zaeDc4PMYurjlnqdU1wPt+oN6DuA/H/yekReCgB0IouUfxlr+sg2p8ooWCQLl3sD0+RWtfwkC2kgazA7tPrhoTWGlpW/GFKO1F4BG0M2LT1Hdi4F+E3gdKIKOrAKAzaFHTDQ9x55f3sfnbz3jggPex7WmX9rz/OjR004ySAH1n/LuXFvc0L6ss7O8v3L37mhbMdB7+PbI+c8d210XYAoIeiV9FZfOsgezZd8EVI5601itsD7TyNah0RWLFpjVg3vVlgFpFLakdZPLcwAvPru/3CMYfvKe6NjGB+A6S8hnSTM7Hvvp+tydfxwIBvffPjNyLOXX4vXRMagfL0EyRbcoqg1kJw1mC+3e+gmhF6AVBDDo12pD0G9YB/w+CYxpoXhJIJDWv0/WXLUjCgQSDLA9e/Hm8jG8kozG5+BeXMtf02B2qzyPUQ/LB3aYFQumqnRC3dP7OqAfNqRVv1FSB1omAKAXgPSPpIDcQBAqc630UDWGBtcaH1QbyI4bzJbvmIDQ9DyG/YBatecT4s4L5XmGNFrsz93zpQWNXLoPW7J11XNenH7TxhTeA5BUEIKAvSzEq6+ZZND6R/rnxJPnBOegbOJ6AZLT9dGtTxrIThrMDu3aankeQxwg/r8EINna9iDn2b1GvOT5hnrHO7LUj+1/rrqm7LTjWvCyD834/PPTT4jOh25sX9y4elRa0Ffe/pPCewBp9cvnol/2fetvmQAQNwBcTxDAzUAQgPOf8Nuwl4+WXsAVA9dFrwPyof3zovfSLS5Kl+toZOxCAkE0WCrTWMcGs0M1+JCfx7AdP/TJw2m41nJcHP/cDP9nVvdK9MN5QjucIPTbx2398n/hPO0tvpe2BZ21fmyh862LroucuByHHeC4vW/r/+TWn3XY+g+dtbAjbQ+mK9C60jKrgcrFRyAosvXvzgCqF6k8MCRpTYQwqBc3kB0FhrEgkGYg2wchP49hz7SKG2CPeiOHb68ITo38D/c1q3uCwatZJyROEdrhPHEMThD65brjOPTbLWVs4TztLb6Hrd2Ctv+PvYX2rMYIRI+tP+54M/rjCK233HIBQAZ+NaR+5jqzaJDzR8sfBo7BvKJb/2kHsoU0A9m+CPV5DHearY09LhFpX7w+0oggi+uOHqP9gu3Y9mPTO6P3gFdW+iXtYbeApQeAbdSCHlg0Cv3Y3rlre8fPBs4dhWZ8H84TW2jHNq4Ffeas80ehGVvZx+cXnDS9qTECsQtbf9wWuu0t9NczBnDmmF53C/2mhfEeALTyQlevOWxn6WGlkJy/Rmqlsczz0ypSWEWnseKcf9zMJAkECALuzDH7lRQE8kCcv7R8xflLDwBbXMu3LlgV5fixhRM9YcF9He4YgOzjfDeH/qON90T72MJ5yv73Ht3aVA+gmn7ZF/3Yt/UnjQEUqT90Jjb7B15+9dWqnx9a5RxNrX9hruX8i6zI7QQczfybppqzF1cO9KJVDcdadOs/CXuGEnoo0QA10kBjAQtliGO+KV5/Usu5Z86S0uJ7W9dELfyoBf38tOi70D/fTI3Oc7evn7U2GvdCCxqNn9gW9N7NUQt640h1H1EN5PZtp+9uy2MAA4uiICBbOY6eAIKBu5XU7c2LTxlFEBCn726hH0HAtChNFQwX2X7Aqx5mnTU3etoX+HjoK81g3TW3zzTXWQ7n+rFpnjLgi5Y/8Nn6rzWWgUqMlNDg7t1RakJaqZL/jft7Pu5FmjIgJeE+uZ33k+L24nQHrEtkzVCS/D9SVvKUcrUyXXz/N83AtYsj20lDI+W00z/VnOcBTnRsoNUeQI3bivN0/07Stl79JPAeAG7qrLPmNtQ9kqUe5O+YABHnv87K97uOH4Tq/Ksx5rgqKub48gSssGnWJnLHAOplaMuuqp9jEBU004K2nX7cvjHG+Xx+OTjEzaKRfbEVd9aNvR/p726uBZ0UvGptRUdS8JIeQFeNoNXqPYCmU0C2o8BFe+jHpaUfwOmnldYDco/hO/2nvNurk8H/Xpcyt4ene2HsoTj+rBh7cK18DdAiJeNEM2fGUiSyLLUbCNDat8cIpPWPdBV6LXGg5zLZudaxg757Nzet/9BZC8tOdHTH0GjH1L7UztN0xjtPyaFjLSDbWbrpE3H+zfQA4nL+acYE7FlAolv27TGAnU4PxS4H9pvVHzreBoFDuKDQYL9wzJ2FAeePBbvwguOXdE8I+hsB4xfyQo8GFQFbOH+0SENfnEyew3CfxcgbOP6kFUrjpq4mOX9BrnVWzwykmUUD/QfMnll1zSj02/tx8//dLZw/9F8y9vfzmkUjs46SejD2GIHsS8s/qQeDz+X3AC6xgpfoliAm+kOuD82SacHq6QGYAIF+uyW2aUupwrvHQtGfJgWE/PnrZ91U3peZS0AGsWUWEwgt/++OAbirmhb1zEiaNE+a3L+AstgrzCZN+8zC3mqNBcg2be5ftnCed1bpAdgtaRImnAZaxfmH4uirgcFd9yXzzjHQCOf/qf550QstfZmLjhccvz2FVUN5a5Hl06dOKiiV80+LGyRgb3GvLO6JnaNPGhOA84d+mfdfrQVt70sLGt+DXplSKftZUet5APtJYNGZZntJwnMCrTz104Y9gBoBIOTAEDeTad1Y2kqeTLZnmcgYhhDCWEZcD0AW3pPjCGRpwVgNyCOVJU7B7g3Yjl/sJe3APIJ1kb8xkdQTcHPcjfYATEHYOX+7XK7+tPtdLZzj9xIAJozuKx879fR3m4cfKk33tI+FdsHLsxYsZPZF3PFQ9FdrqdiBALhTDkMog+sw4fxF9/JVA9H21xuvqpoCkmuA70nQy3t6qL3v/q+ke+IGhqIDQKvoB7WmmCbN6kkKYqZNybzguNC2w2cAKI5a3Va7HKGUIakXg96KTJO0B0vlWQY7JaNldlbS/QlVrwvn97ceHT4cUahGk9QyqtVi0kDIZWg03+ren5DKRAghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBASSyFrpnOVRkIIaZPfA8D26eGN0f7+V14xPb1nqAoEDF6EkHYg818EE8fvIoEgZIfq/uSf+3N/ftURQki2dOTl/CdMnGRe3b9XTRCAfvvnBm0kEISomxBCGqXytw4zcP5w/ElMPPhgM7zpwYZ/AaoI5z+5u7diC3r6+s2GGxYFp5sQQrwHABtp9but/1BJavnvGdlUsc8gQAhpNSbkmffX1AtIcvxawfWVl28thJA26QFoolrePw4NvQBx+igXXqI3ZM2EED9M9PR/SUEBDUErCgalgexRDmQTQjLtAWB2T9rz0p5LmnP+9iC2lt6LC9NYhAQeANCilAe90uT/QUhTQdEyTnte2nNDmMUUh5YgwDQWIcrGALJu2RdR2RGE5EGvWsB5gtCfB5BBbK2D2bbjd9NYGoJXWlqlHEQ3mQQA6QXUCgJpHwRD5Rj8yXcLqyShtuzbbSC7XZ7HgP6F/ZPUlgO6Lz//GNU9Mug3JLsHwbCVIOAGAjmWNlW0bfujpiikF1ArCPBp4Hzh8xi6uOWep1TXA+36g3oO4D8f/J7BK87pSzCA89/4wLroFVLlFS0SBNxAIMfSpopINmhNYaWlb8YUo7UXgEbQzYtPUd2LgX7DVFzzawGlvYBw/MKss+ZG27jW9Et7nh89etpJBimg/lPenWuLG9qXdXaW91fu3h21LuNAAIBqlCKkXgDKAM0yRlENO7iF1JupN43VCj2yka1DoysWLTCrB/eqLQPSKGxJ6yaT5wDs1v9bz7igvL/3oFJsmLSvw7z86qsHfOetZ1wQneBWgMd+ut6cePKcQioGnL6AYJDU0i+FrHTOrMgKPZbCSuVAo8FU5Y6z1XoBqwd3GK0BbODaxaZryl6Vz5ZAf/f0vo6i62vbPAhmO/8kZAmJo3pmjUruH61/BICicHsAsr95Zmkto5mbJ5lBK0iAJKORwb3Vg8UbFRx7ml4ACYflAzvMigVTzfIBo84J2c5ToxOFfhNYb75tl4JAIKhnPaG8sZ1/PQwNrjU+aIWBbE3PY9gPqFVLgbrnxX0HQcAH9eiPOx8taDnuw55sXfWcF6fftDGZBACkfQ7r7opeaVv/+M5RPbPK+6++ZpKZ8NuS4y0q/dMo6CW4hiM5XXTri0b7QLaW5zHEAWLMxX65jjTJsc61XvZ+kfqx/c9V10ROG9qlBR93HrBb+NCK7SVTpkXpE9kv2omKfltfGv3G0W886W+ZACAzgGzQksfgbZoBYVx8BAFx/nhfZPpH0j5XDFwXvdK2/uVc2/n39c8rt+iKdEwykG2nsmynL8FABrHxCtXgfbfsq2E7fgQheQE3ENiO3nX69f7PrO6V6IfzhO4XN66OttiX47b+S2K2xtpKC1r2i9CPLXS+ddF1HdAv+6hv2Mp54uRFn7t/567tHbb+nVXqa6h1JSs6sggAaM3bKRw4cjcwuIPAmAkkF15m/hQ5+CuOEwGg4qnTOUui6Xl2AHDHABC+8B2ci7SP5ENL+dziA0Ca82wHFNpMpnpmNPlIY1XTZY+92L2sWg7/+sG15lNjjYbx+XGVzOoutc82jrzaVHnFKcJpHjprYeJWnKvtRO9MsXXHAmR7wUnTR7/36FaVYwTtgvcxAB/OvxZpc/9w/mj5+3L+gvQApBcg7xHI8HJ7ByG2bEJNY9UKSvZxeUgNrySnnkTvjN4DXllgO3/s207f3ZcegZ0WsZ19tRb0mbPOH4VmbGUfnyMINBu8RGeard0TEH0mRQ/mzDG97hb6TQvjPQBo5YWuXnPYztLDSj6df9YD2T6w01j2VFw3jSUUncZqdHZVf2dn4qso7JY/9u0Wf9w+egASBKATzv7z00+InL69Lzl06QH8aOM90T62cJ6yLz0AH/pFn+i394vS3/IBAKkd5PSR9pEX9nHcfmlp/adt+cP5IwVEsgGpOHlJEIh7FT1omvRgYJpgIUHYF1GKdqxFnLYFLVt8F/rhLLHvbotqQUN/Uo8laV/SWKL3k1t/Fjl9ez+uB2PGdEsQEP1a/JKXMQD7Cd96wBgAnvYFeT/xG4cMdgG7BHNr5G2BDPii5Q98tv7dp2hlDAMkjWNIeZOeZfBxL+p9HqNaGfJanC7t8hSSqpL7ENcTu/j+b9YcA7BppJxpc/9JYwHypK9sbWeKba0xAM3PCbQLTT0Ihps666y5DUV4WepB/o7xSJpWpT1oZ6d9gE/n38j3ZEkLt2KOL08QRoUNKY3VyNpE0C1laKQs9iBwo6RpMcftwzag1Q4Cm81e83kz3oJGfbCDAL5vO/1If3dpIDgL/fVsRUdSEJMngS9JOZBtWpSmnwS2HQUu2kM/vqf82emnnR9t3WNRfvGUd3t1Mvjf6+pwoOss5w9Cy/m7pHE0Yw+ula8BHu0nzjLnc5ZEvQBZlrpWIHDHK+Q+uIHga2dfWHFe7KDv3s1N6z901sKyEx3dMTTaMbUvdQ/AdJ4w7jTv+VnkROE8sY1znnb6JMqhjzn/ZnoAtXL+cftl/WOrfop+7Nv6jTUGYD8nEDcGEHJdV/mbwCFcUFcDbrRdETdtKVV291gI2htF0ljXj6WypLWDHs3Qll3BLE4WUuu/3h4A0j8yxbjMAY847C1kPMOeRYMypJlFA/1wmtCP78sWtmFvcT6CwLqkMYC9m6McejM9GPyfRtJX0tLH92Urto6g4E51PdMJXrJt9R5ApgWrpwdgAkRbAJBK6I4BuNM+kW8W4vLOPtNZSWWoNY5R5PMM7jhLrdy/OH/3PrgPEKKcko5LmvaZhb3V+xyAm+uXbVKaJakHYLekSZhwGmgV5x+Ko68GHIjMRhKHAkeJFxy/DDbKyziO357CGlp5G2n9Z/n0qZMKqnpOI88oIKiss+wt7pXFPbHn9Sfl/KXlb7eY42bR2N+HfjsIQK9MqZT9rKj1PIA7/9/Wb2/jZjuZKttWx1sKiGQfBNyUguvwXXwPYgu1WtfSg7nYOY40lj2GATCIDbIeyJbxAFev7fibWVcm73sg+uN6AtAsOXPb6WMMwO4BXGHMAT2HpFk+WZdH/l5czt/Wj/PK+sdy/va++/2dMWMAeehvqxTQhNF95WOnnv5u8/BDpeme9rHQLnB51oKF5C7jjoeiv9mHbIxn4tIrksYSxy8DpkkpILkGSBthMb68B+jdax43llTt+1JeOwXkc/kQbfpBrSmmtaakShC4ZGwMwLQpmRccF9h2+AwAxVGt4oZaBncMIK4nk4SkT+znMUAI5arn/oSq14Xz+1uPXG5erRZEqEaT1DKq1WLSQMhlaDZtIt8PqUyEEEIIIYQQQogJiv8fJ8RciSSc6nwAAAAASUVORK5CYII=",
        "frame": {
          "w": 48,
          "h": 48
        },
        "anchor": {
          "x": 24,
          "y": 45
        },
        "mirror": true,
        "anims": [
          {
            "id": "idle",
            "frames": 6,
            "ms": 160,
            "loop": true
          },
          {
            "id": "walk",
            "frames": 8,
            "ms": 100,
            "loop": true
          },
          {
            "id": "attack",
            "frames": 6,
            "ms": 85,
            "loop": false,
            "hit": 3
          },
          {
            "id": "heavy",
            "frames": 8,
            "ms": 95,
            "loop": false,
            "hit": 6
          },
          {
            "id": "cast",
            "frames": 6,
            "ms": 140,
            "loop": true
          },
          {
            "id": "magic",
            "frames": 6,
            "ms": 100,
            "loop": false,
            "hit": 3
          },
          {
            "id": "hurt",
            "frames": 4,
            "ms": 90,
            "loop": false
          },
          {
            "id": "death",
            "frames": 7,
            "ms": 130,
            "loop": false
          }
        ]
      },
      "levelStart": 1,
      "levelMax": 99,
      "xpCurve": "fast",
      "stats": {
        "hp": {
          "start": 36,
          "max": 800,
          "curve": "linear"
        },
        "mp": {
          "start": 24,
          "max": 520,
          "curve": "early"
        },
        "str": {
          "start": 5,
          "max": 70,
          "curve": "linear"
        },
        "mag": {
          "start": 10,
          "max": 105,
          "curve": "linear"
        },
        "end": {
          "start": 4,
          "max": 66,
          "curve": "linear"
        },
        "agi": {
          "start": 9,
          "max": 92,
          "curve": "linear"
        },
        "luck": {
          "start": 6,
          "max": 72,
          "curve": "late"
        }
      },
      "growth": {
        "el-ice": {
          "level": 2,
          "affinity": "fast"
        },
        "el-light": {
          "level": 1,
          "affinity": "normal"
        },
        "el-fire": {
          "level": 0,
          "affinity": "slow"
        },
        "wp-bow": {
          "level": 2,
          "affinity": "fast"
        },
        "wp-sword": {
          "level": 0,
          "affinity": "slow"
        }
      },
      "equipment": {
        "weapon": "it-short-bow",
        "accessory": "it-ice-amulet"
      }
    }
  ],
  "enemies": [
    {
      "id": "en-slime",
      "name": "Gluant",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACV0lEQVR42sWTvU9TYRjFf++97+1tUUor0JYigYqILYJAkagESAwOyOAfIDHGqAODo4urcdGVP8DZxETj4GaYMBowTgJtKaiApXwV6del974OZTCauPJMz0nOOcN5zgPHPeJPEI/HmZufB6U4G+tSsk4CUNgr8u3r0hE3Dsz9azAKzAChQBvh4SYVHm8kOtKBLiQ/ZtdZfJ0m+2VTrCSXGB2FmZm/DIQGdTLE1aeDauLuGEP2EC+XX7Fd3sZ0m/javLx9/J7EiyWxf7gJqqrTYsRAgO54GX5yRY3cusykOclOeYddew/T7cJwG+TS+wzc66H5ZovyqgYAYsSQFhYnIkH8Wq0K9wbJrm9x/80UNEA4EsIpOCTmU9QGTxLqCHIq6mMnnFWeXFBYeQstJZPklzP03u4m3B8k9WmVxLMVouY5hEewtrDB2vMM7a4IZatEz0Qnnp46DvIWSZFEKgO6r/Wr8KUA+WwBXWroaAhNoEmBJqu7AmzHQbd1OsZaKacPlLkohCYPJf4WP43d9eS3ijRHmzj9KMRCLkFprYy/0Udgqp50ZQWXcuFySZr6Aki/iZI68kw8qgYf9rKbyqEbGrZt03X9PB+nP/Ph3RxC1+icaCc8HmJ/4xfuWjeFn0V8Qz6cXUvJw7LNQamI11uDrRyEEBS3i/TducDAg4ugFLblUDmoUFPrwVVjYBg6mkdDNwzk1vdtZqfniNxoxdq3EJoAAcpRqKNbC0E1BwWaEBQPy5QWShRzhWqR6uublV7nwqlUEEL8t/vKcTA8Jk6uQiazKo79GfkNR3bib9uMBT8AAAAASUVORK5CYII=",
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAABFGc6jAAABWklEQVR4nGNkIBKIGyj8xyb+8sIDRmL0sxBrQfgMP7jYhXMPEApmMfwnxkIWUiwAgTbzJoYqhjoGJxUjhn13zjEwpBFnISMuS7BZAAJ73m5gePTpBcOdV89Q5GG+vDnrElbLWAhZoiImBWfPuz8DRfwOkmUGRgoQBsiHsxj+o1vGhM1H2CwB+QSfPCHAhMs36IaAgotYoJ6mh5FK8foIHzATM8LqIFyAkRjfwECTyRQwXXcmB6t41LYgnAmDZB89eHsFhX8HmiDQxYnyESlBcgctmePyEQs+A5AtS1LMYLjy9RTDqVfnUIILOcjILoKQXXtF7BSKWBQRhiMDJlwlATp48eMZGIOKHhCGgSgdHwy1sMyLnMxZkMMVnruRALKh2MSXXdlClI9YQDaCbMZmCQhIcEgRbdgF5FIdCkBmg4okcIoAWSZoR3xxQgp4f+gZOOWhJG9aWAQrXAGVyqbZnbz5TgAAAABJRU5ErkJggg==",
      "sheet": {
        "image": "data:image/png;base64,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",
        "frame": {
          "w": 48,
          "h": 48
        },
        "anchor": {
          "x": 24,
          "y": 45
        },
        "mirror": true,
        "anims": [
          {
            "id": "idle",
            "frames": 6,
            "ms": 160,
            "loop": true
          },
          {
            "id": "walk",
            "frames": 8,
            "ms": 100,
            "loop": true
          },
          {
            "id": "attack",
            "frames": 6,
            "ms": 90,
            "loop": false,
            "hit": 3
          },
          {
            "id": "heavy",
            "frames": 8,
            "ms": 100,
            "loop": false,
            "hit": 6
          },
          {
            "id": "cast",
            "frames": 6,
            "ms": 140,
            "loop": true
          },
          {
            "id": "magic",
            "frames": 6,
            "ms": 100,
            "loop": false,
            "hit": 3
          },
          {
            "id": "hurt",
            "frames": 4,
            "ms": 90,
            "loop": false
          },
          {
            "id": "death",
            "frames": 7,
            "ms": 130,
            "loop": false
          }
        ]
      },
      "level": 3,
      "stats": {
        "hp": 60,
        "mp": 12,
        "str": 7,
        "mag": 3,
        "end": 6,
        "agi": 4,
        "luck": 2
      },
      "resists": {
        "el-fire": "weak",
        "el-ice": "null",
        "el-wind": "resist",
        "el-dark": "absorb"
      },
      "xp": 12,
      "money": 8,
      "drops": [
        {
          "item": "it-potion",
          "chance": 30
        },
        {
          "item": "it-strength-seed",
          "chance": 5
        }
      ],
      "actions": [
        {
          "skill": "sk-double",
          "weight": 3
        },
        {
          "skill": "sk-venom",
          "weight": 2
        },
        {
          "skill": "sk-lullaby",
          "weight": 1,
          "condition": {
            "kind": "hpBelow",
            "percent": 50
          }
        }
      ],
      "weathers": [
        {
          "weather": "drizzle",
          "effect": "stronger"
        },
        {
          "weather": "fog",
          "effect": "appears"
        },
        {
          "weather": "storm",
          "effect": "appears"
        }
      ],
      "times": [
        "evening",
        "night"
      ]
    },
    {
      "id": "en-bat",
      "name": "Chauve-souris",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABc0lEQVR42u2SzU/TcByHn1/btYOWUTZRgaow2Awaiuwi2wWzQDgSD17kj/Hf4D/gyJWXhMCFCy9GSTTGyEuYQoLDZFSzlrZfTnDj5pHn+nlOTz5wDwC+Ny2+VxcAhXand7P5Xl18b1oADDvnMuK+ptcqIiD7jXUFUCgMECVtAEw9S7P5EyFlzKtL9dE85+EBP1o7GGV3Uvo6yuScLqryHku35fPFmqo+fCdXaQhARrNYjRaUn5+RSmGOfK4HIyhTdifFCNotSt4wfQ962f62zWg8xVO3Jr4KUXoeAEkuMIsfxJYMOSfLq5GXnP4+Z/W4hcpks7wpvZU4ueJvFPCia5bO+DFPKiaffm0CMN4/xclexD/jjC+XK9img6Fn2Pi+pIyiXWFtf1HdhEoGdXnWMUFnY5TudgmAZqPNWfyV48uP7B4t37rPCzUUgKY0kjRBUxqC4PQ4DFk1MQ0LgCgOOQy3VPAnQKFIJUXXdFJJ7y/8P7gGHsSAzbPyR+EAAAAASUVORK5CYII=",
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAUCAYAAAAOTSQ2AAABu0lEQVR4nMWWIU/DQBTHX5cp5NIQREMmpxEI1DIxhZjaR0AgplD7AJWIiRk8YoJUTCGWKrIgMVQ2BEHIgkBgR96Vtz1e73p3Gw3/pOm79u7e7967vmsAABC2ojUYtPp4DaAGhRU+yW8TO3UOusZOGaRrHWDYirTPXfrYfJLfJhqX52OYzmMgm2s6LwOGrWg9aI8hgdgIaOpDYNJP4WvLMJqloOA4lIQswM0R9JEJTPoczfoqrQENmgzvKwdgO/tKN+8H7eJ5kselfUlR4+91YKZsEdwmclIcCm2KICpjkBwI71V7TILpUstljByXXOHi8TccRodHimxS9v5g3DZSFDVnOAnZOTwDH/VOu1YoI5wPoC5yNvHI2cThjHtOila+S+TkeJeUluD4BD666WfwvHyC68+hts3Fa6pNGzgkxlomO+BXxr9OTP1CpBVBqtpFUe0rG4urnJMz8La1qMojiGrY8VEbXPTylpdqocvRh2rYOtRx8K8c57TC/acau6w6yWOVLqnJ8kJdVSn10c4pC9n5icI9OLo9UfZV707d9wHbC07+MPLjq+4fVW/I8Oei9l/M63xC2FRHlL4BlQMxsI31MzEAAAAASUVORK5CYII=",
      "sheet": {
        "image": "data:image/png;base64,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",
        "frame": {
          "w": 48,
          "h": 48
        },
        "anchor": {
          "x": 24,
          "y": 45
        },
        "mirror": true,
        "anims": [
          {
            "id": "idle",
            "frames": 6,
            "ms": 110,
            "loop": true
          },
          {
            "id": "walk",
            "frames": 6,
            "ms": 80,
            "loop": true
          },
          {
            "id": "attack",
            "frames": 6,
            "ms": 80,
            "loop": false,
            "hit": 3
          },
          {
            "id": "heavy",
            "frames": 8,
            "ms": 90,
            "loop": false,
            "hit": 6
          },
          {
            "id": "cast",
            "frames": 6,
            "ms": 120,
            "loop": true
          },
          {
            "id": "magic",
            "frames": 6,
            "ms": 100,
            "loop": false,
            "hit": 3
          },
          {
            "id": "hurt",
            "frames": 4,
            "ms": 90,
            "loop": false
          },
          {
            "id": "death",
            "frames": 7,
            "ms": 120,
            "loop": false
          }
        ]
      },
      "level": 5,
      "stats": {
        "hp": 45,
        "mp": 20,
        "str": 6,
        "mag": 8,
        "end": 4,
        "agi": 12,
        "luck": 6
      },
      "resists": {
        "el-light": "weak",
        "el-dark": "absorb",
        "el-wind": "resist"
      },
      "xp": 18,
      "money": 6,
      "drops": [
        {
          "item": "it-remedy",
          "chance": 20
        }
      ],
      "actions": [
        {
          "skill": "sk-venom",
          "weight": 3
        }
      ],
      "weathers": [],
      "times": [
        "night"
      ]
    },
    {
      "id": "en-snow-slime",
      "name": "Gluant des neiges",
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACvElEQVR42q2TS2hcZRzFf993v7n3pnMzoYkNNjbJFDo0RkQwqBgfFUFFSH1g48ZCoVC77bZVqCAUfICCLlx1by1FSlEKjRFcdeGrTVo6pjZJ2zw6YW7uzNy5M/f1d2EWIt3p2Z5z4HA4B/5fnMS2C/dlLGOhtcXJM2eoNgS/K3I3ElH3Ex9857CUy6PESYptDEGjyRdffqoAtNZcrWXsLiFBumWYnp5Ga83kU/vk3LnzstkI5d84/c1Fee2tQzI8PAzAzPUa34nABBN/R1RFuVZdFBGRRETCKJaw3ZVmFEscJyIi8styW8bGHpd/ptXePg/b83h1aj9WzwO0OglZN8VvZ8xvJHiORZQqbq8FuAXDS1NvcOH7H+kf2YOIoLTW5HnO599elvFnnmQ0rLOaO9wKoWsZ9niKUtphIdIMWV0eqQzw2elZTh15USml0JbrMvXu+6LHx3nQpNRMkbmsiPQXyZXmSlMxF7u0+jyWnAHO/h6w4FSYeP2YWK6LSdptjLF5aMijsRlxtWPj/1nl+p1lHn3uBbYpiHKhemmG3p1ldu0e4ZXJXhYrH7O+cEX02GPPyvDkJDUfLt9L8EoW5z86jjP3A8YxWAVD7e5tZj88yqjt03YMrVaI74cUbBvt7Cpz+Inn2bG4iupxUYB2XJrtaKtnwTKGDE0jSnh5eZ2W32a9FmIshc4aAfN5gt9XwuTQqCe8/d4n7DhwhPnZGU69+TROwWb6qwv4zgjVwQFMj0PBKFAK04ng5/o2Kv0dikYRJrB/Yoh6MsSvKxVOnP0JpWDA3smgDdWVFhtBRC4WeQpWb+/2D4JNRWHwYaJU8Bspa37KZpBycyMjaGX4rYy1jRi6GTeWmqzULW5d/JrV3y6hALb3laU0spc8T1BAnEMu4BqQrd0pBXEq9LgGSxnqS39Qry+o/3zgvwCkaE4X5R5BFgAAAABJRU5ErkJggg==",
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAABFGc6jAAABiElEQVR4nGNkIBJIa3n9xyb+9No2RmL0MxJrwf1LW+Filx99hLP9fKKIspCRFAuwgctQS4m1EMOSX3/+k4TP3vsAxriCmCqW/EKzEJtlTLiCA4YJiYEAshgugGIRyCWgODn5k4vhIxc/GMMAjI8udvnRR7B6GOg99IbBvmwSRiplQbcZ4jouFL6uHMJwFB9wQS3++Zugr+ApBOSC6rUbwGwNQVYURfzfPoINDNOSBfNXXXuMIg8Tbzp6D0wfOfkITB/syoOnQqxxhA6Qg+vZK1RLbrz/jVUcHWAEHUwzsq8cd+yH++TIG0z1TUfvMcy5/Zsh8+QRiI8Y5IizCN2y/R6ODDYiDAx6fxkYLr1HDS7kIJtubgOmGaBBR5RFyMECAnpQS2FiTVDDiQVM6AkBF/j0G4I9ZFnBGAbClFATDgjYmEOCDjmZw30ESikwBcgA2VBs4qvuIXyNDzCCbATZjM0SmIuJNewIlrgBAVAyB6dxkGUy9qlEGUYqeHJwNjgvoWRYWlgEqzYA+lc15mouc8sAAAAASUVORK5CYII=",
      "sheet": {
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAMACAYAAAAt6LBOAABZx0lEQVR4nO3dD2xc133g+0OJlFxaNk1HVRJLZGQl3jKKpZc0flGxUaNqXxCrjqKXP42wUYNFdmNj4RRrFO8VBgpjnSZFEKwQF4UXsbGwsy9etE6hPCeOIjlKkK5KVW4fkyjdSqmsxBblkJadyEok0rZsiqL58LvD3/DM4b0zd2buvefcme8HuJrhnSH5O/ee8zt/7h3KGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASuHi5fl53zEAADwk/8tX5ufpBACgC5H8gRKi4QJAF2LqDqAsenwH0Ikk+V+3oodj26XWbrwttvM/e/KJUtSJsseP9HI5oVQgdGP90bjPHD9Y3XdiYqr6fNfOPUGXo+zxo3mZnshOqUBlTUBlj7/M9Udit+OOo2WRcoRWhrLHD8+VRzZZ+663HRu/GG36fhMQjckth8Zsxx1a7Cpt/CZAzdYfU7LY3XKEVIayx48SVZ4QG3LaMrjJ1ASi7B1wmRNQK/U/pDKUPX6UsPKEVInK3gDK3gGX+fiXvf6XPX60b1m7P0DWBXVrtM9+LMu6Z5JNwwNm/4FHE9fbQ45fYg8lfomhlfoTQvwaT9r43X0+ad1pN/4QzgE8dABagcZm+s1U/0C0Kf3a3SeVR96v7jty3my7+34vFaiVBmA/htIAytoBd0L9kXNvx6/H1o5fz4N+Le/XfT7jF3o824lfNpRXbzvfXKkw/TVfy8hs6XvkbQsNemY2mCSkDWBksK8mfjvx2I2imoAW9vms/HYCiot/82C6+CUBje418z7u6ihr/ZFjf89jj5uxGVM99qKaRPsHzO6NQ9G+fScna7733vduiB4//+S42bpl2Bwdm/B2DuzOtJX40aUzgMUGsJh8hD2KkAokmzuSkwp06y03R98rDUAUPQpKE7+9T+PXR/m+0OM/fqGylTX+kOtPPXasz5+rTZ6N9hd9/IV9/JuNP8TjjwJnAHHcCnTUGiSfujBb3f/w05XnoZH4t6425oY15RwB2cffHcXJrODUhbDLUK/+2PtDrT/bDx2uHnM3dqn/cswl9jvHjkb7jppKEg05fqk3MpgoQ/wouAOQSmGPIuo1AFGGCjQ9F24HZo/e4mhjVXYZ9o0vxqxlKHoZolH8zSZQs2Wr12UUt/4f3rF9yXu0I7Y73Qe3bK3sGJswPqWJf+TNi/GfemEyqkehxI8AZgB2JZIKJCPozXOLiSikBuAmoLQdmLxv94Y+YwJLQC455nFl0M4rtE647QQaAD227nKKCnGm1Wr89iAC5ZfZEpCdYDYvVCTdV6YGYCcg3a9LJvd6TkBxo2f7uNudsPualsHElEH+9T2Krif0+tOoHDJwKEPibHQe0Hl6s57Ci+mFerRjqJKQDk3OJjaEIpcg0iyfSHwa9/pVCyOiBgnI990cbgN245fjX5YkasevtP6UNX67zpehM7j9pr5oGVTbcdmOP3KeAUiy0zsA6lV8d38IFb9e7FLh48pg7/PdGJo99qHFn1SGMsXfbBnsgVAIbaBR/HoNzN0fyrGHpw5ARtAyyo1LQOLavvRJXiqgy+cIupXKHVeGvDQ69lnF7+sc1Is/btRc5LFPq5lz4Cv+evWonfh9z35RQAcgJ1dO8ultd8S+/ohpz3OjD+X+Z2ZPj52ItrJpdOyzEuI5aLde5YF6VHy9QfZaOmF5feijiAqU9wdWiriNMs+fX+ZzUGQCyroMRSfPsscPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoENdvDw/7zsGAICH5H/5yvw8nQAAdCGSP1BCNFwA6EJM3QGURY/vADqRJP/rVvRwbLvU2o23xXb+Z08+UYo6Ufb4kV4uJ5QKhG6sPxr3meMHq/tOTExVn+/auSfocpQ9fjQv0xPZKRWorAmo7PGXuf5I7HbccbQsUo7QylD2+OG58sgma9/1tmPjF6NN328CojG55dCY7bhDi12ljd8EqNn6Y0oWu1uOkMpQ9vhRosoTYkNOWwY3mZpAlL0DLnMCaqX+h1SGssePElaekCpR2RtA2TvgMh//stf/sseP9i1r9wfIuqBujfbZj2VZ90yyaXjA7D/waOJ6e8jxS+yhxC8xtFJ/Qohf40kbv7vPJ6077cYfwjmAhw5AK9DYTL+Z6h+INqVfu/uk8sj71X1Hzpttd9/vpQK10gDsx1AaQFk74E6oP3Lu7fj12Nrx63nQr+X9us9n/EKPZzvxy4by6m3nmysVpr/maxmZLX2PvG2hQc/MBpOEtAGMDPbVxG8nHrtRVBPQwj6fld9OQHHxbx5MF78koNG9Zt7HXR1lrT9y7O957HEzNmOqx15Uk6jTcbm0E9u6ZdgcHZvwdg7szrSV+FF+Pe00AGE3ADFwqTJaSCKJad/4bPVraQBidO9dhd1a1k78py4sxi6Iv3mdHH8jxI+OugbgatR47eQfIol/6+pKR1VGjTrfMsdfdm7yLAutN2WNHzl2AJ1YKabnwi2rPXprNsnHdb6yDCGKWotuFH89cce/6PjTxNTO+4qWJq7jFxbft3tDczMGdMEMwK1E7ghaXg+lAbgJKC4uqfCy2eR9cZXfdwJyuXGrUI5/K3GFVH9aiS/k2JuNP/QZPAq8CJxUSTYvrCuGXvGVxumuh7rx+678caNnO8ZG8SfxfTGyLPWk1XLIwMF33emm84AcZwBppvDTs5Vtx1BftCnfI+g0yyfSCNavMtHmxp8klFmAjuSajT80GnenxG8n/zIsodx+U18UZ1mPP3KeAchoUZOeLamy6P4QRkH1YtdOK+41dWjSbxmaPfahxZ9UhjLF32wZdL/EHkIbaBS/ew3Mjh9d3AHI6FZGuXEJSFzblz7J6+1jNp/3pLdSuePKkJdGxz6r+H2dg3rxxy2hFHns02rmHPiKv149aid+n20XBXUAcnLlJJ/edkfs64+Y9jw3+lDu9xKfHjsRbWXT6NhnJcRz0G69ygP1qPh6g4A+CJZ9KMX8nfe81+jzLkPZ4y97/cmrDEUnz7LHDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAVc/iUwBYau3G2+bj9p89+QT5o+RyOYFUGKD8bUFjP3P8YHXfiYmp6vNdO/cEW45OOO5FxN5TdIUJ/SSUueJ0krKfh7K3BYnfjj2OlCe0TqDMx31tiWOPgr98Zb7udmz8YrQlNW6fJCa3DBqvxhxi3DaN0d1MiZT9PMTFX8a20Ch+uxyhlKHMx31tWWNPW+HjKk0IBWmlwYYQdytJM7S4O/E8NNMOQkugZS1DOznIeFbq/NlKZQmpN2u1svuOu9WkGUzF6bDzkEVbCKEcrZbBZ/xlPu5rA8ify9othKxR6dZon/24aXjAlJHELdv+A48mrlMXuUbbaJ3Wjlnj9h17s2vNIZ8HW7NtwH3ukxxDOZattmsf50FjbiX/qP2e64/v/Lms3YY7NtNvpvoHok3p1+4+CV7er+47ct5su/t+LydA42/nBPiuPK0INXG204h9k+N4z2OP19TttG1AnvtsB278emzt+PU8xO2T79EyFFmnGuWft6ytbKEe+7WB5M/edgpRqSz9NV+7PVO1sWqBZmaDacB6QEcG+2ritw+83SCqJ2Bhn5wA36Nm+1jqsU+7zzcdwbV7DqQRjO418z7ujtDkKaQMbhvYunppGxjpt8/HYvvxwY1/ylSOscSqbr3l5uhx38nJ6j45B/e+d0P0/PNPjhsf6uWf4xcq+wYu1cs//cYHe+YyMjiQOn9KhzY2vhj/1i3D5ujYRFv1f1m7IwZtuHYDFbs3DkWb25NJpZEKJd8rBRBF98Bp4rf3afw6otBRj4/YVdKorN7oLapA1ijP56hT2SOaNOdAH+1zEEryjIv/hjVDUX2324CQfZpYtR0UPSuLi1+4sYrnzy0m/82D8fuLGhClbb+Sf9xjv3tDXxDHfiym/jbKn9Kp2fkzC21fA3DZB9uuHOLUhdnY/SHR+PUE2PaNz0YnQEc+PrVSgTR+uwL5XIKLSz5aDhk5S6KJOw9Cz4PvQURS/Da3vmsCdff7mlEm2X7ocLTJyP+oFZrUIx35P/z0rLlz7Kj5azNhQmAv+8QdY4091GM/VXD+bGsJSIOyG4BUGOFWGmVXGnHUVBpwSCT56IGOK4PslzL4UC/x2Mkz1PjTlEFMzy0+t8uhjcAuRxZT4azVaweShNx2YLZsLbQM9jmIa8fSSR3esX3J99mdsS79PLgQewhklJx07LXuhJyDthecP9vuANzKI5UmGr3NLa7DJVWaiOeKk9SBnXqhceW50xjzh2bYW+JxYy9b/BpXXCfwhq8tbQhaBpnGG4+NOC55Ci1Hs8kzFPa50LZrv+ZzvT+Je+xF08d+bCKY+IuOPZMOwB2ZbV4oTIiVxm287kmonoALi/vtJR+flScp9tjKf2Hx9Xrxy78+R54ao5LkLslHy2G/puW4N4ByxNFYTznJU4XUDpLYx7tMGsUd+rE/VSf+PGPvzaIBu6YXyrJjqJKYDk0ujtx0DU6FNH3Xk6Bxr1+1kFitE+CWIYT43cqj8VfL0KACuWWQfb7Ogx7bJedANFkOn3XJPgdK24FvadqwG3+nxn50YQA3uveuQup81vG3W+dbmgHIL9SLb40qvb3fTf6+1Iv/2r7FDszer+LKUGQCbTZ2fa1RhbLLIPJMoM3Wn7jXkxpFUZ1AK2VwB0Q+xcVP7N0Xf2+zvZc0rLiKLyQBpU3ycReNfI/cWjnAbjmKSKBx2qkcoZyLVstQ5AXIRm2g2TIUffG0XvzNxO7jom+ZY88y/izL0FQHIMlAksLpbXfEvv5Im8E8N/pQIdOw02Mnoq1sGh3/rK2r/J5MO4Eiy1D2+MtW/4tov2Vtu6HG39LJyut+66JGm0XcL55nWYq83z2vchRVhjLGX8SF+Dx+blFr6Hn83LMdkHtCuP0ZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALzo8fNrAZTF2o23zcftP3vyCfJHyeVyAqkwQPnbgsZ+5vjB6r4TE1PV57t27gm2HJ1w3IuIvafoChP6SShzxekkZT8PZW8LEr8dexwpT2idQJmP+9oSxx4Ff/nKfN3t2PjFaEtq3D5JTG4ZNF6NOcS4bRqju5kSKft5iIu/jG2hUfx2OUIpQ5mP+9qyxp62wsdVmhAK0kqDDSHuVpJmaHF34nloph2ElkDLWoZ2cpDxrNT5s5XKElJv1mpl9x13q0kzmIrTYechi7YQQjlaLYPP+Mt83NcGkD+XtVsIWaPSrdE++3HT8IApI4lbtv0HHk1cpy5yjbbROq0ds8btO/Zm15pDPg+2ZtuA+9wnOYZyLFtt1z7Og8bcSv5R+z3XH9/5c1m7DXdspt9M9Q9Em9Kv3X0SvLxf3XfkvNl29/1eToDG384J8F15WhFq4mynEfsmx/Gexx6vqdtp24A899kO3Pj12Nrx63mI2yffo2Uosk41yj9vWVvZQj32awPJn73tFKJSWfprvnZ7pmpj1QLNzAbTgPWAjgz21cRvH3i7QVRPwMI+OQG+R832sdRjn3afbzqCa/ccSCMY3WvmfdwdoclTSBncNrB19dI2MNJvn4/F9uODG/+UqRxjiVXZ50LZiciXevnn+IXKvoFL9fJPv/HBnrmMDA6kzp/SoY2NL8a/dcuwOTo20Vb9X9buiEEbrt1AbW5PtntDX3XUIAUQRffArcavIwqN30fsKmlUVm/0FlUga5Tnc9SZlEganQN9tM9BKMkzLv7puUq9cZOoHb+2g6JnZXHxJyV82+bB+P1FDYiyyj8+j31c/W0Uv3ZqWdb9tq8BuOpVnlMXZs2+8VkTsnrxhxR7KxVI4w+hA0tKPhqzjJyTEo3N9yAiKX4ljVYbbigJtF0htQOXvezTTOz3BXLsG+XPrLXdAeQRlG9pk48P9RJPs8kz1DLoyDltffPVCbQqLgkVXQb7HMQd16T6E3p7dzvbMsXuQyYzAPfAuglIXg/14MfFFZd8Qkw8Sce0LPHXK0PcyFnfK9N4n+KSp12Oeskz1HYg7Njijn2IsaeNK8TY08af57Fv6yKwrbYB9AV70N3Ga8epo1Gt/KHFnxS7O4q2G69dBkmc7ugziwtJWR1/jTEp/kYj6CLLEUdjPVVnFBq60Op8p8ftO/5lWTRg1/RsZdsx1BdtKm7kFsIo1O1p168y0ebGH1eGEOLXuN34tQyN1j/dMvg8DxJj3Dlwz0OcEM6FsuNOG39R0rThbon96NhE9Di6965C/sZO1vG3W+dbmgHIQdNfbEsKVveHcvGoXvzX9lU6L3d/M6NP2ZdXZWo2dn3NdmiyfhlEnqPoZutP3OtxZShyJtBKGfS1pNiLFBc/sXdf/E11ANLDSMOKq/hCElDaJK89r83n9L3VA+yWo4gEGqedyhHKuWi1DHHx56VRG2i2DEXG3ij+ZmIvOu6yx55l/FmWoakOQJKBJIXT2+6Iff2RNoN5bvShQqZhp8dORFvZNDr+WVtX+T2ZdgJFlqHs8Zet/hfRfsvadkONv6WTldf6alGjzSLWh/MsS5Hr23mVo6gylDH+Ii7E5/Fzi1pDz+Pnnu2A3BPk/xMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDAenwHgGKt3XjbvP312ZNPUAcAoNMTv2yXr8xH27Hxi9HmdggAgA5iJ353oxMAgC5M/nQCQHdb5jsA5EeS+pnjB32HAQAIbeTPLADobr2+A0B+I/8TE1PVfZuGB6JH2SfP9VH3Aa64AQF3jXWWzDqApNEjFcafsZl+MzLYV7Nvqr+S/OVR3XfkvIfoOl8Z24Qdsy4f2gOEXTv3zIdeBhTYAWiFsdea4yqMoNLkT87H/gOPRudgZLCS5HdvHDLf/dFPKm/oHzBvWTtgjl+onKdbb7nZfOAv/s5v0B0mbZsIrT0kXTPSmaKQuhVyGdCcniwreRyn4gdVYRqteYcUazNluuexx6Pn9uhfOoF9Jydr3iv7Pv/kuDk6NhF9Pbr3rqDLXO98hRJ3mgvv2iZCag/N3jAQYhnQvJ4i7y6RSiMVRvisNEmdl7sWrrGKMlTyeslf2B3AqQuz5t73boie6wwg1A4gzfkKpV41m0TLGHdcGUKsN8hhCaidyiJTSXsK6aPS1IvfnuoKjbUTprzPn5s0R8/H7//UX502IWo0ywxpaaKVdhFKe9AlQ41JpL2BQMj3+4of7elpp6InVZK0d54UPXJod6QjQh3txI3+tx86HD0e3rG95r0y+rfdOXY0ely390vBlK2dWWbR56nRXVeht4eHn56t1pmtqyuv2YMFe9/Apano5oLbb6q8X763LEuIaPODYPZoQe8k0U0rujyXC4u6T98nj1JxblgzFD0v+s4TN6FobHYD1djsffpcyqQjttDvl9cEL4lfNmnAmwcXl4N06Uf9oRmOtlBoPYs7V3KOdJ/9KPQ1H7HWaw/2Prc96D5pD9vuvr+wulV7s8DicmHcLcF2m9C7x9x2gi75JLBUWtns2wiFXellrVkSjVZ8/T5JPHLRUZ6Loiq8jo7tCms3TCVxa+dll1cSi8QtpBMosqE2O/q3OwHdpucW98XZuqWS/H2XS/9gnZRF64h7rmTJSs6HezurniP5PkmmRXTUdqz12oNbDn1utycf50B/d724pR27bWL3hr5on2xCYy/D4Ag5/ikIrSR60dEmlUa4o88i2SMum36tcctoWd+noyOJ2/5e38myGfvGZ6NNSJLUziwkOiK1l7HiRpg6ypdzZI9G7bolCSmE2ZrdHuLahMRrt4dQOmK3M5NO16Z1yd3P50nKJ7e/BWRXDhl5upXGV2V3R/26T5OIxCf3yLvvk/1xI6YQR/+2HUN91c3tjEPhjvq1040bRdvnSOn32XUu72XGRsfd5SZLnY25+0Mh149kk1mxfT1A45ZBhKz/y/UjvYaELvogmFQE91OmetHx1AuLlcZedrArjTgayLqzxu1Wdo3fjdts2Rpd+JLOa3Sv8X73g8SiHaqyE767TzvjELiJNO6Ty43OkXDP0YNbtkaPRZ2jtO1B31sv5qJpPHb8s5/cXlk6vLD0tmGhs0iJmYvAXfpJYDu5S+WRC456sVFfS6o0kYWK47uyVy+UzpnqyNKesi+Je2EGE1In4Lq2r3Gi14Yb2rULN5HKufnVJ7bXjPrtc2QvaRWVROV8f+FjH66Jv+324Jkd/+aFc+AO4NClHUCjKa9UFBlhTs86I9A6laaIJJoUt3tBVCv8+lWVr38wMWkOTdZPoKF0AqfHTkSb7ZEWfs5zow8FMYJrdG5Eo3Pj+/xoGdav6kvdHkLitmM93rJ86A4sQmkHyHkGELfUkLTc4L6WZkSaR/KXSpnEjlsrfLOx+678C78vk2soPhpuUp2yj3/SudkxMemtbrXaJuz9PuNuZukw1OVDFNQBaCJNaqjNVuS4pYesE2ijmNtpgL6XTlydOuKSUWfciDOE+pV17G7Mec+Kk9pGM3GH1g6QQwcglWXdtjtilxnaWW7IU5qYQ4y720hykyR3etsdhZwjqRMyW8oyqZapXXRC3MhWqoZQ1G2aWTZMH/dRd+pIPG9Fnqusz1GesedZn/KKmzYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADKosd3ACjW2o23zdtfnz35BHUAADo98ct2+cp8tB0bvxhtbocAAOggduJ3NzoBAOjC5E8nAHS3Zb4DQH4kqZ85ftB3GACA0Eb+zAKA7tbrOwDkN/I/MTFV3bdpeCB6lH3yXB91H+CKGxBw11hnyawDSBo9UmH8GZvpNyODfTX7pvoryV8e1X1HznuIrvOVsU3YMevyoT1A2LVzz3zoZUCBHYBWGHutOa7CCCpN/uR87D/waHQORgYHlp6T/gHzlrUD5vgFRv55SdsmQmsPSdeMdKYopG6FXAYU1AHEVfJ6FUYrTUgVptGad0ixNjvyFyOVh4g94pfkb7+vLOqdr1DOVbNJNPS4k8oRYhnQvJ4i7y6RUdCunXui5z4rTVLn5Y6INVZRhkou5brnscej5+7Sj+vUhVmze0Of2Tc+a46OTUT7RvfeFWQ505yvUOpVM+0ipPbQ6t1iWoYQ6w0a6yn61kJttL4qTTPxh5Zgsu4AVKgdQL1ZZr16JYouRzuDIt/twZ6lx90YkOYGAjqBLrwGkFRJ0lQcqXRFTx+bbaShT9uzSP6havVc+ThPje66Cr09PPz0bOzNAi69gUCWDjct7JPnMoDYdvf9ZnSvCbJtIKMOwL7A6FYSrczuPrfimIV9Rd954iaUZhur7vPRUJslCd5u0FtXGzM9V1n7L0vyt0elId/OareJdttDkUm03s0C9sDHvYEgKs/MrHWsy3UdCW1+ElgqrWzuCEErtbtP36cXHPX7hVT4Ij58pKNjOz6NzS5H3D6JtdpYFxJQUXG3MvpXkuh1k+Sv++Js3TIcPfoul/7BOimLfYE66Vy5SVfrliRTSW55l8WOtdn2YLcL2XycA7stpo1byLUj+3s19iKOObKV6Z+CiJs22pXGN03mbgV3v948WNlXGR1VKru+T9/rO1k2Qy70yhYyHZHay1hxI3o9B3KOtL6551QSks7WfJ6jeu0hrk2E0hE3ijupLvF5kvIp5G8BycjTrTS+Krs7mtF9dgKRpRL7fdpQ40ZMIY7+bTuG+qpbSJ2xzR316/JVvdGo3soq5Pvksw02+b48E1Kj495KmyiDMiwhooAOIHE5YXVlBN3ofaFJGvWE1Hkl0bt4bG7St/eFlHjcRJrmYmQct0xFLzOmbQ/13uuLLhU2asdJcYd6FxlyvgvIrhDacButN/umcbmJxr5Q6r43jnQCId/9cG1f8lS9XscRwrWLNOdG3+uLnO8vfOzDNfGXsT3Y7Bg3L8RfhrhRQAfQaMorFUVGl9ML9UVHn4cm/SbRpLjdiq0Vfv0q+z31f3YoncDpsRPRZnukhZ/z3OhDQYzg0pybevUqhPOjZVi/qi91ewhJUjvWDw+G2A6Q8wxATrIuf9jcpYa419KMSPNI/lIpk9hxa4VvNnbflX/h92WyxOGj4SbVKfv41zs3vupWq20ilLiTYm8Ud0jLhyioA9BEmtRQm63IcUsPWSfQRjG30wB9L524OnXEJaPOuBFnCPUr69jdmPOeFSe1jWbiDq0dIIcOQCrLum13xC4ztLPckKc0MYcYd7eR5CZJ7vS2Owo5R1InZLaUZVItU7vohLiRrVQNoag7XbJsmD7uzunUkXjeijxXWZ+jPGPPsz7lFTdtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACABvjLfUABf22Tv5KJEFEpgRwS/5njB6OvT0xMRY+7du6JHukIAKBDk//lK/Ox27Hxi9Hm4/+pAAB4Sv5uR0AngFAs8x0AAMAP1iOBNsmIXtf805DrAnJNIPTrAVzIBoAGSVLX9931fnef+xjyUpC9pMX1CwCFk4RjbyYwEtMDT12Otv/5i8XkLs9XX7+uuk82fS7vldfk+Z6vPhNsubh+0R24BoCgl1Vk23/g0WgLPflM9Q9Ub/vcd3LS7N44FO2TTYzN9Jt737vBfP7JcXPfkfOmbMtZm4YHSnEekB4dAIJPQpJ4Qks+Esc9jz0ePR8Z7Kvu12QvyT+JdAJbtwxHz7fdfX9QZWrmWgbKjw4AQemkEejz5yab2l8GZTsHqK+3wesAmrD90OHqEtDRmFUeWf55+OlZc+fYUXOnMeYPTWUm4Buj/+7EDADBKGsSOnVhtvr88I7t0bZ1tTGbB011OchdEnpwy9Zgkr9LrmPoZu/TR2YBnYMOAKUSavKRTsDuCKbnFveHzr6eIfTCtV7P0H2S/OVCNjoHS0AIbvRvjzwl4es+eW6/FiJN+Kcu1C77lEH12PYPRDMWWcay92nyv2HNkPnuj37iMVJkhRkAglNvBBrq7ZO2HUN9NZvavWHxeYgkwesxj7uNVe9g+sBf/F0pzgMaowNAMOx1Z10zt/dJgpLbJ2+95eYgloGOjk0s2WcnfHffvvHwloOSbmeNu41VO7Dv/V+/V2CEKN0SUFLD5G+JoF4SGptZTEI6ApVHW+gj0Gv7Gif6uI4jRHK7qn0nk5ZL9n/qr05Hn2EY3Wvmadfl1Zvnf4Yh7DXbXTv3RK9TYdBI0gj03oURqHQCPkkdluR3etsdNfsfafLnPDf6UFDtIek2Vr22IdczJPn/tZkw6/Z+KajY4akDiEv87kU8IdN2QUeARksQZRiBLvzetpahQmsDcgtrUmdsX8wO9RbWTrG2wfJmVvWmt8h7t7UzsDuC0BpAUQce7X2QSkagYp3xq5Pqg4zytROWzzHIrazHrbuZkL+kwbR791tWg+heHx/csTuCEDoBO+mnPfDCd9ydiBGoX7rUs3mhI5Cvy3Iba5mtrbOK4q6kZLma0ttu8k+6Z7vefdzuspDPTqBRJ5Z04EUInVeZZy3uB5AYgYYjxDuWfLatszm2oVYG0lmtprS9BCS35rlrt3LfsHsHh/1JwlvXDEXruL7v5GjnwPvuvDp11sIINExyAd5np1BEIq6XH27c/MFc2nm7f/6k3dWUtjqASqJZ/Gi4PbrX2/iqnxhc+EDJvbdU9vn+RGejGYzcay5xxs1g5DX9i45FdwKNpop2OZJmLWXoCBiB+mV/nuHQ5Kz35C/1Xa79fOFjHy58wPXw0/mXvZmVlHr7mtWb1X3bNf8hxsIMQPe5JIHKqE4+1CP3RBd9N4fd68bFJ/ukA7t1Y2Wmovvc5C+zmSLjb/eaS+gX4EMfhXYqqcP6/xNI4pfPMkxbh1n2SSfgU9ok3OyHA8/WaQPymoz8G72vVRKrtEfJK3Ye0sGmu0/ovmimbH1AstU8lPkHweyg3dv4dHov+4voVeux/8aJvU+Tpf1JVH2flm3xb6H4+cNYrcxadJ++p2wjUEHyzz4BSdLQ5C8aJXr7Q2xFDXzk58vIX5/XS/ZJA6SkUfIua3nU/n1xz7MmP1t+f3QdbGbx+lfcQDruA5FCBtJ6Tkb33tV0vG13APaFu2b/Hro46uluDv3DViNWDrcPfFwHporuwLSiNxot6KxFE3zNX3Bc6CAq/x3h4mhB3udzJmCPPkMegXaipA+zhfghtrjEn3Y2LAO2pP+EZ//CjNgeGNVbJpXfnVWZ630GppmBdDsrKZnMAOxOoPq30K07OOxPdeoFPfl76JHAPhb/20d+nNiB6QXJIjswu5K4S25plt3kuXRybxms7NP/k1YqjFR+uRAf0sf5mxmBwu+H2YpY8oxL/PY1LVVvbVwSu3YC7qx40/BAzV831T83HtcRaFvM4zpE3gPppIvoPVncvpf0R6PSTNnbmb5kFbubVN1bEOM6sLzLoCfMjtWN0yVxxs1adMQgyd+evdjJVGIXRXcEUs51JRiBolhWso3Osa6X27P3LSsvVd9vD3oGLlWSu7YDbb+S5OV98ro+6uhf2/btN/Ut+auzdrtudgaQlHiTcqjdxrPKQ85F9JrXerJO/nF/EVFHdUkX8YroBOISaqMOTJch0iw/2GUQ7ZSj0TF2OwIdLZz5g9oPUSXFraMGnYW5HYGPTqCV7yP5dzY72bptotFgSJL74JpKp/Ce4crA6LnXjHn25dqB0e4NfWbkzZXXJUFKp6IdTLt5KSnxpsmhWeQh9/dJ53bj5g+23wG4F47q/SlcW1IB8u4ANGYRF3ea2NP8tcesEmm9YxwXr8Qk7HVzqfQ/mJisPqZdWvHRAQAqboStA4SkNqGdwfpVi/vWXVUZPdttwnWoiTYh0rYLLUNc4m3UtrPMQ24noK+33AE0Cr6Z2/SS1nKzTkBpkmk7txjWW5NupSxp401D1/vl8dQLkzXlyzpuII9lH9nfaPDW6jL0bqfNN7q+lKYj0FG/nfD1e9K07azzkNsJ2LG1PANodc3Wx5punvHmVZ4yxgxkwR49+2oD7baRpOsEPsrkxurG1vIShclB3uv/RWv3OoDxgOSPUPj+H986oV3TngEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQPylOCAH7l995K8yIkRUSiCHxC//8Yb9H5Pv2rkneqQjAIAOTf6Xr8zHbsfGL0ZbqH/jHgCQQ/J3OwI6AYRime8AAAB+sB4JtEn/s+205LqAXBMI/XoAF7IBoEGS1PV9d73f3ec+hrwUZC9pcf2ic9GjI1ihj0Alvnseezx6PjLYZwYuTZlNwwPm6PnF98g+MdU/ED0fm+k3W1Zeivbdd+S8Gd17V5DlipvRlGXmgvR6m3gv4CUJWbdSzoecfCTJR7H2D9TsU5L89fHo2IQp23KWdG77Dzwa/HlAelwERvBJSBKPJp9QliHc0X9cwo+ze0PlvVu3DEeP2+6+P6gyNXMtA+VHB4DSjUBDSZit2Dc+a8qsE84BFtEBAGD036XoABCMsiahUxeWjuq3rjZm82D994RKrmPoZu/TR2YBnYMOAKUSavKRBG8n+em5+P0hsq9n6HUM3ex9kvz1QjY6A3cBIdi7fjTh6z55br8WIk32py6Y0qkeWyvx2/s0+Yd+DpAeHQCCE3cnjY5A5d75//t9q03Idgwt3hUkDk3OVu8ACvkisCR4+46mpHMh5wCdgSUgBMNdd3b3SYLS2ydDWAaKu5ffTf72vhCTf9LtrPVuYUXnyGUGkNQw+fAI6iWhsRlT+hHotX2NE32oHwJrRMslnbCUQT7DMLrX8KGwEuvN8z/DEPaITj5BKI9UGLQipCUUqcOS/E5vu6Nm/yNN/pznRh8qRXuwL2RrBxbin7GAhw4gLvG7F/F02i7oCNDKEkRoI9CF39vWMhRtAHEaLW9mVW96i7x3WzsDuyMIrQEUdeDRGTqpPsgoXzth+RyD3Mp6/EK5PsNQdmsTBtPutbGsBtG9Pj64Y3cEIXQCdtJPe+CF77i7CUmo2OO8eaEj4LgXo94qiruSkuVqSm+7yT/pnu1693G7y0I+O4FGnVjSgRchdF5lnrW4H0BiBBqOUK61hNK2zubYhloZSGe1mtJb1L3D9icJNwVyN0c7B95359WpsxZGoGHyfQG+iERcLz/cuPmDubTzdv/8SburKW11AJVEs/jRcHd0736SMOoYZmaD+CRhWWcwjaaKdsxJs5YydASMQP2yP88gH2Tznfylvj/89Kz5wsc+XPiA6+Gn8y97M3mo3r5m9WZ533aj/xBjcSTR7/VuDrvXTZqtpJnB6H/sUVT87V5zCf0CfOij0E4ldVg/YCeJXz7LMG0dZtmnn2b2JW0SbvbDgWfrtAF5TUb+jd7XKolV2qPkFTvn6CDT3Sd0XzQztj4g2WoeyvyDYPX+Q4zKH8YyQf/dk+ZmMH7+MFa7s5YyjkAFyT/7BCRJQ5O/aJTo7Q+xFTXwkZ8vI399Xi/ZJw2QkkbJu6zlUfv3xT3Pmvxs+f3RdbCZxetfzQ6k2/lcRtsdgH3hrkz0D1uNWDm82QNfFK3orYwWqn/BMWG0IPt8zgTs0WfII9BOlPRhthA/xBaX+JuZDScNgPZby6Nplknld2dV5nqfgWlmIN3OSkomMwC3E7Dv4NDXyyK0GYxdSZL+VEK9TkueSyf3lsGBJR+kkspf+Y/Jw/k4fzMjUPj9MFsRS55xiT8uabc6K97k/IVZ/XPjcR2BtsU8rkPkPZBOuojek8Xte0l/NCrNlL3oj5XHxe4eeLcDa9SJ5VEGPWF2rK1WkKTY7WQqsYuiOwIp57oSjEBRLCvZRudY18vt2fuWlZdiBz0DlyrJ/ah1k6Hs0/fJc30U9v9xcPtNfdW/Oqvsdt3sDCAp8Sbl0HYG0kl5yLmIXvNaT9bJv5U/h1tEJxCXUBt1YLoMkWb5wS6DaKccjY5xUodlL5uItMsmbkfgoxNo5ftI/p3NTrZum2g0GJLkPrhm6Wz+2ZcXn5+6MLskJ0mnoh1Cu3kpKfGmyaFZ5CH390nnduPmD9aUpTeLddt6fwrX3u/rIp5e7KrHjt1NpPZrSX/t0V6HE+0uqyQdY624NfEu/O9TaS6kxtHYfSGRIy7p2wnMbRP2aFg7g/WrFn/OutUDsYMi+z2nLixty0n/41kzI3/7vZL8JfF+IWUuyjIPaQ7Si+gag62n3bsGWr1NLynhZD0CbRRzu7cY1kucrZQlbbzNcsuXddxAHss+sl8TZjNtIs0y9O4m2kTa2b2O+nWkbS8BpWnbWechdyZgxyb7eopcs/WxpptnvHmVp4wxA1nQ0bPPNtBuG0maLfgokxurG1vLF4FNDvJe/y9au9cBjAckf4TC9//41gntmvYMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA1B546nKQ/2EI0DUuXp7v2kbYzWUPIflfvjI/77sT6PY60O3lN91+8qURUgn88Z0Au7ns1H90PSo/uhn1HwAAAAAAAAAAAOjCu0UAAF18v3g3404Zvzj+6GokfwAoGUYufnH8AXjBpyz94vj7x8wVeevJ44eu3XhbbMU9e/KJpn6fJJ/rVvTkEmMR8fvC8feL+FEWPXlUnDPHD1b3nZiYqj7ftXNP0BWJ+P0ifr/KHj88Vx5ZMqi3HRu/GG1JIwyfyhy/jNTLHL8oc/wcf3Q1vdUy7RZaJUpT+UON316rL2P8guNfzuPPNQo0XXlCawTtxu/7IqnGwPH3F383Hn8+X9MZlrVbeez1wmZsGh4w+w88mnjBqQhZxP+Od37Q+Nbf1lksNx8Xqd3608rxL3v9v/2mPvPw07PmCx/7cOZxoTi97VYe+yKRVGqRdp+QRrBr5555XxeW2o3fJzkHcvw0tmbi1wTk89iXPf64uJrZ51MW7XfLyktBnAN46AC0UvzzlX7ztuv6ql9L5Xhl1WIF14qj+565OGvMwr6HfnjR+Dbec3X0OHxNbzX+K9cOmLdeUxu/7Jt46Upl58K+b516xfj24opV0eOb+pdX419+3dLjL/t+cWmuZt8/nr1sQj3+KtTjr51XUv3fOJCu/n/osw+Yb3/uM14SqMQ2NtNvRgZr45/qX3r8dd+pC4vx33fkfNEhI2NtLR5I5bdJJbdHCh8dGYr22R3C3b+zIfo+93t9NOC/PPitavLRJKPxn37JmJE3D0X77IR057tvjJKWJq5Pf+khL9N4+Z1f+d7+avLXJG8f//e/bSjaZ3cIn9y8Puo0tOP40//2VW/x1zv+4oP/qvb4y/tCOP7y+/788cdrkr9b/09OVepPvfr/nnfdEO2TTqDIMsjvuuexx2uSvyZ5+/jv3jgU7bM7hHvfuyH6Ptm2bhmO9m27+36vS1loXearx1rZJfl/49Rk9Kjk+akXJqNGECpNNpJ8Dv5sMnpUknwePHYmegyVJntJ/t9/ZjJ6tJP/Xx1/Nnr0KS75pzn+8lzqjx7/TW9f47UTbqX+7/3/xoOu/5rsJfnvOzkZPSp5/vknx6NOAJ2hrSWgOL/7xOHoUSq//Sik8u//+Wz0+O//4aj595JUfyOsyvSeA5X4JfnYj0KSvz7+wejfmz8wxnx2zW+ZEEb/6n/bX4lfkr/9KCT56+Ot3z9ibjXGfPmtN0ezgC/+x08FsY7b6Pgffv5K9fiLEx6Ofzv1Xx+l/osfBFb/tx+qxC/J334Ukvz18c6xSvxHTWUWgHLKvAP4+9u2L9lnj4K0Efw//3qr+cE/PW9C84OdS+O3R6HaCfy/237XnHjqnPFN1vXtTuCfdy2N354FaCfw3fe/r7LjzK+Nr9G/kHV9exbQzPEXm6QTeOpcNAv4yp/cUXgnJmv69jJQM/U/4rkNyJq+vQx0eMfS+O1ZgHYCD25ZiH9soogwEXIHEF3YMqamIfzO9cZMz5nqiD8kcUkobjnCTTouWYIoOvnYo/+kTsClST/O22683jxz5tdeZwFuJ/Cu6yp1R67D1Dv+oXA7AVdo9d8VXdg1pqYjsGnSR+fpbeciWFJHIDYOJDcIJRfBZBbg804IW/UukxLSO3zi3PKby82PXkx+PQT2sX/rQmdQpvNh1/2y0o7AtXtDn9k3Xv7yYalcPkK0/YY+89KsiTZ5rna9pXGnUPToP8571vTWbPWEeCHyHdcvr9nc5C8dQsheuVLZ3OO//YbMVyxzIXXe3spmx1BfzWYnf+kM0MUdgCQ5GbHHSarwul+Wg1w+boWLW7uvl/DTdgZFkSUbl53wG73mezaQdO2k0fGXC8ChiLt+1aj+h+RozNq9Jvx6+5kJdJZMM9o1fZU1/zR8XACWDkZG6jpqr4nn3JW2k5ivC5HiX34913Yn4pucAxnlp0n0IVyAdx1+Pn1yDPEGiEOTs211IOiSDuDnP34q2lxfN2GTxCwJ+vc//ae5/PzvfOWLhfyt9BfPnI22Mmp0Dr4b+LFv1AbK4vTYiWhDd2upweS1VFNUAyb+eEUm0KzLUPSsi/hr+b6BAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECbHnjqciH/hzSABBcvz3dtI+zmsoeQ/C9fmZ/33Ql0ex3o9vKbbj/50gipBP74ToDdXHbqP7oelR/djPoPAAAAAAAAAAAAdOHdIgCALr5fvJtxp4xfHH90NZI/AJQMIxe/OP4AvOBTln5x/P1j5oq89eTxQ9duvC224p49+URTv0+Sz3UrenKJsYj4feH4+0X8KIuePCrOmeMHq/tOTExVn+/auSfoikT8fhG/X2WPH54rjywZ1NuOjV+MtqQRhk9ljl9G6mWOX5Q5fo4/upreapl2C60Span8ocZvr9WXMX7B8S/n8ecaBZquPKE1gnbj932RVGPg+PuLvxuPP5+v6QzL2q089nphMzYND5j9Bx5NvOBUhCzif8c7P2h862/rLJabj4vUbv1p5fiXvf7fflOfefjpWfOFj30487hQnN52K499kUgqtUi7T0gj2LVzz7yvC0vtxu+TnAM5fhpbM/FrAvJ57Msef1xczezzKYv2u2XlpSDOATx0AFop/vlKv3nbdX3Vr6VyvLJqsYJrxdF9z1ycNWZh30M/vGh8G++5Onocvqa3Gv+VawfMW6+pjV/2Tbx0pbJzYd+3Tr1ifHtxxaro8U39y6vxL79u6fGXfb+4NFez7x/PXjahHn8V6vHXziup/m8cSFf/P/TZB8y3P/cZLwlUYhub6Tcjg7XxT/UvPf6679SFxfjvO3K+6JCRsZ52GsCfP/549FwbgLj65amaDsAVNYAFP/in56PHb3/uM4XfWibx/+XBb1WTj+qdnqpJQLZqAlpw4qlz0eNX/uQOL/F/5Xv7q8lfzV2cqukAbNoBqGfO/Dp6/OJ//FQpjr97Dnwd/6S632z999UGJP57HqvEr8lfDVyaqukAXFEHYDk6NhE9ju69i9tDSyjz1eNGlX/XW2orXGjqJZ/tN7Q1YSpEUvIPSVLyb3T83XOw6e1rosdPf+khr2vpaeu/zgpCVi/5o/MUfvlw/89rRxCh0aWfOIefr50B+JI0+m/W2268Pnr80//21WASaD0y+g/lHLSS5EOv+424o3+UX2EdgDv1DdXpl0yq5Z9QuMs67b6vyNF/M8c16X2+ZwFuvT45le59ZUvqJP/OlEkHIJXbreC/c31lNBT3WohJqF4iCin52KP/tMm93ushzALc4/uu62pnYqF2vqpR/Q6t/scl93oJnuTfuXrbvQiWVNE3DjRe63/Pu26ILoL5vBPCFnqiaTXJ3/Kby82PXgxjBpDm2L914bpAmc5H6Ek+jaREv3tDn9k3Xv7yoaAloO039JmXZk20yXMVwgVgd/Qf5z1remu2enwvQcR5x/XLazY3+UuHELJXrlQ29/iX4SK8kDpvb2WzY6ivZrOTv3QG6OIOQJKcjNjjJFV43R93EUxmAUJ+ZlEJVG8frImjTsJP2xkURW/ftNkJv9FrvmcDccdfNDr+IV0A1ts3m6n/IdHbN22a8OvtZybQWTLNaNf0pb/TIa4B5U06GBmp66i9Jp5zV9pOYvKzv/Ind3hZyvqXX8+13Yn4JudARvlpEn1SJ+LT4efTJ0cf9b+RQ5OzbXUg6JIO4Oc/firaXF83YZPELAn69z/9p7n8/O985YuFfBjmxTNno62MGp2D7wZ+7Bu1gbI4PXYi2tDdWmoweS3VFPlJyDx+LvH7K4OPTzJn+fOIHwAAAAAAAAAAAABKjP9KEQAy4Pv/BQYAeKD/IXs3dQLdVFYAqIuECAAoPTozAFhAQgQAtIS7bQCgw3TbzICODAC68M4fSf5SXjoBAGAGAACdhSQHAGgZnQgAdCHWygGgi5H8AQAAAAAAAAAAAAAAAADdo8d3AEA9azfeVnNb59mTT1BngYzQmDpY2ZOnxH/m+MHo+YmJqehx1849pSsHABSaOGWTT8XKdmz8YrS5HULI7PjtrWzlAADvibNMybNeGcpUDgAIJnGWIXl2QhmAsuj1HQCKtWl4wOw/8Kispc+HtpZur/mXXVwHFdrxBugAOkQnJc+yd2Ly6F68FhKvPIYWsytpdhV63EDXSrN0EvoyipZBL1rLZsfrPoYaf71jHmLcSTcPuOdCX/cdJwKfATCCKJYcbxkRK3vUKaNl3SfP9THkGcxvvnFpfLJPYr/mDdeass7A9LiHOHtJit+uK1rHQosdAdDRQZoRBKOIbMnxHHtxrjo6/un0/Pzq69dFj3rs9bm8T14LbSQqsWisE6/MR5vGKduLr1X2/Wzq9ehree3Hz78WRBmanX2FNoPphNkjPM0A3DXPNCOIkNdDG1Xs0OK1XbnmmmiUvGr1gHny2Unz3vVD0aP9+gd/6y3mK3//L+a5V01Qx/zwPx6Inl/Vu3h4fzw5aX57aCh6fHVu8f233nKz+d5PnjFlvvYSynWMVuIPJXZ47gCarTyhTiftpO+Wx15OsTsu4Ttujf0bo9+Onl+3cpkxKyvHWJK/a8M1y6LHT//uO6JOIHSS/F2DKyuH/AM3v817J6BLb1pH7OU2VW+f8JlIm43fXkKkE+jyDqDdu05CWA9tNHsR7np5GWYx6vlzk+bMpcWvx196vbr/Oz+dNg98/WvmMx//hPcRaNzoX0msv5ipPH/tyrx57cri/p+cW3jBA02ek8tXmXWrlkf7NDnODyzWGU2muu+5l+eMWdj33Wesk1Mwbb8PPz1rRgb7al6b6l96DUb2SVnGZvrNpoV99x05b7bdfb8Z3WvoBEqqJ6u/0dLKCMi5Ra7QRJrFbZMh/H0adwbwr75xOHr+s49uX/LeizOVDkC85+Bo9Lhu75dMaB3A0NcrZZj8eG0ZpANQL79y2bzre//gJX6J+cvf2R891+Sveqamqsl+x02VGcyhpxeX4aQDuP1d66PnD//Ts+bkT89Fz7/8x7cXVg77pgE72Q9cqnRgR8+bmn32+05dmDVbVlY6LukMjo5NRM9H994V7EAIOcwA3JFNKyMgGT1pAyhSqx1Y0l00vmYxS5Z/EhK/Lgcd/OnPq/v2/+/vNqFyE7+9HPQPZyoJZ9XVK8w/feBfm29/4BvmQ+//aDAjULvu60zleO0qYnX/E2fnzMbfWhO1gT/6y4elEyisHJK8xUjloWaUbxaS/e6NlWO+7+RiB7Z7Q58ZefPN0fPPPzleRKjIUSVrtECSt2xu5XfXzOWCnd0otr5pebTP/V5f+gYHqlujfVK2C1ctxi3Pf3zuSrT5Zo/uxY39xly/Ivn9b1pTKYcsA/m6o8Me/bsj/DetNOY3li/d71u90b9697cPR5uM/OOSv4z8Jfn/n4ePRFvR8d/z2OPRc3fpJ275Rzoq277x2Zr9W7cMR4+yFMSdQV3UASSxk71MgaUR6FRYjLx5KGoAOg0umlTSR76/P0rmbmcVt++GNUPVfdIJvPMNy2v23Th8XXUW4LsBSCegHcHUQp8kX8vI3x79h6yyzj9fjV+Tv4z8dfQfimg2G+PYh7ZHm03agGx2vf/W9vdFW5FkhvGFj324upwTZ/uhw9EmI397OUjfLyN/uXZw59jRaBMsAXXJEpA9Akoiox977VMfpcFI8hfyGI2AjDFfvGGk8CmwjN7X6BBzgT3iF//mrUPmf56erD5qB/Y3P3nW3Hrz+uhRFT0LsJd/4jsCU2oXZsoxmNROwJ4NbB4wZnrOmGdfNkvqfWg0qduzgdlPbo/iNxcW33PvezdUX9elnwe3bK1eA0CXfg4grgFUK5DVAOyRjzaG6uinoOsAOvpX516dW9IJiE3fqnRgmvT1Ud6vSV8e/4/vVabvf/uB95kzExfNn/33/2H+7D/8u2DWo+NuA9U7gcpIbgH13THIuf2j39+1ZBBkzwbWL7SFpBlCiOzZwOaFzsDex3p/Z8rsT0HENYA1V+lri0nfFzf5K0nqSjqD61ca86tPVKbv11vt953rFpextBOQxK9kKSiUTmDo6tqVvclXKkm/TMn/2hWLh2/6ciXp+07+aV1amAz+9upKO/jx+bnq9a+jv6jtFHzcBdTI9ELe3zFU6QgOTc5WLwDrNQB04TUASaKyVBNHKrtu0gC0EbivSSNwyZ0QQn52Huvo8jMlMScZuW55tEnyF6/NVTbb/3puMtpOvVB7Ucym1wPkdxVxPeAX5xamWFbi1w97ufvdTiEUcjunm/j1w172vqTv+9D7P+olccbdvaZ1PGm/m/x9ilu6kYSvST9uP8m/i2cAmvw1WbtklBM3wmm2EWV9LUCTvybnOKcutt4wZdQfx8dMQEf6zXYcIdHRfjOdRijStgEftz7b7UHu2NG7d2wy0k87ync7ED4Q1gVLQC/87OfRluRvTViksv+nz/4X86ufvxBtRZPf/V8/l1+jmD7362grs5lXXo22MpHzKYOUj37mP2fSBr7xwJ8XOos5PXYi2uI8UlQQCEJTla6o2xyzbAy+b83Ms2FnVTbfnwTu1tiVjw8Q5vFzGf0DAAAAAAAAAAAA6FoPPJXiflcAQH0XL8+TTAGgG5O//Efl3dQJdFNZAaAuEiIAoPTozABgAQkRANAS7rYBgA7TbTMDOjIA6MI7fyT5S3npBACAGQAAdBaSHACgZXQiANCFWCsHgC5G8gcAAAAAAAAAAAAAAAAAdI8e3wEA9azdeFvNbZ1nTz5BnQUyQmPqYGVPnhL/meMHo+cnJqaix10795SuHABQaOKUTT4VK9ux8YvR5nYIIbPjt7eylQMAvCfOMiXPemUoUzkAIJjEWYbk2QllAMqi13cAKNam4QGz/8CjspY+H9paur3mX3ZxHVRoxxugA+gQnZQ8y96JyaN78VpIvPIYWsyupNlV6HEDXSvN0knoyyhaBr1oLZsdr/sYavz1jnmIcSfdPOCeC33dd5wIfAbACKJYcrxlRKzsUaeMlnWfPNfHkGcwv/nGpfHJPon9mjdca8o6A9PjHuLsJSl+u65oHQstdrSuJ4+kb1ckZwpcfU4Fyo4c+2+Mftv0vvRS1GDPXFp87eXzleO/avVA9PzKNddE7wvtnnq7E7M7gBd/WYl/+IYB8+qcMa9dmTcv/Wo62tdz1VXmQ+//qPcytLL8Ju0ilOPfbPwhxQ7PMwB3zTPNCCLk9dBGU9zQ4rVJcpfGKcle2c/ldfHcq2EVQY754X88ED2/qrc2Nu0MJPkrmQW8/MplU+ZrL6Fcx2gl/lBih+cOoNnKE+p0Mmn24s5g7I5L+I7bHv2L61YuM2Zl8vLOhmuWmfGXXjdlNriyx1yYCWMZWmctWkfs5TZVb5/wmUibjd9eQqQT6PIOoN27TkJYD200exHuenkZZjFJNPm/ac0q84tzL5sHvv4185mPf8L7CDRp9O+S5Z/XrpggaPKcXL7KrFu1PNqnyXF+YLHOaDLVfc+9PGfMwr7vPmOt1RVM2+/DT8+akcG+mtem+pcOImSflGVspt9sWth335HzZtvd95vRvYZOoKSWZfE3WnRTzewT0pCKvrtAy9DK9NceAfmIHX7J+f7yd/bXJH9N8u6MUfbZHYKQ75Nt42+tib7+o798uNA6ZI/87eTvxq77dL92DLpv65bh6GvpBGgDXdQB2JVAK7hd+d199vuk4us+eS6joKJHQq12YPajzVcnsGT5p46LM+Ve+pHRv23V1Suix29//xtBJR832cfZ+qbFTsNXJyAjedniRvnuPntGsHtDX+z3oss6AB3F2NKMgKTyx32vL32DA9Wt0T4p24WrFuOW5z8+dyXafHMT/I39xly/Ijn5yzKQkGUgXwnUXv5xk/ybVhrzG8vjk38Io39hj/6bcfQX1hVtD/Hf89jj0XN36Sdp+ce2b3y25mtmAV3aAbQ6AvJZ+YVU0ke+v3/JCF802iedwDvfsLxm343D10WPISwFSaLXZD91pZwj/8o6/3w1/pCSvytaz8/x/XmQtfovfOzD0fNTF2qTeSNx7z86NhE9ju69qzTXwtBGB2CPgJoV1wB8TYFl9G6P8IU76o/b979+NRd9rz0TEEXPAuzlH5ckfbngW+Y7fuROn1Du9mlUp916vXnAmPWr6r8nFJLU3cS+dbUxmwfrvwedYVk3NQAd/atz9s3llpFrjLkhZokz6f06C/iz//4/vM8C6pHbQMt+C6hvMsr9o9/ftWS/1nHZpufCqvdpaJKXTeMn8Xe+zDJCXANYc1VlC4Gb/O2krpu4fqWpxi/PdUtK/iF2AkNXL6vZVJlmBNeu6KluqgwzAnHpSmX77dXLoy3u4q86+dNz0eOX//j2YJZQpmcr246hvmizLwCjizsASWyyVBNHK7ts2gDiXotrBHkvA8nPlMScZOS65dEmiV68Jn9yYC7+PXINIJROQO7lt0myjxvlux1BSNxP9ErCd0f6difgfp+vPwWhidvmJnx3v+/rX3Fr9zY34bv73QvA6KIPgmny12Tt+vH5uSi5N1PJ4xqR/I4v//HtmX2wRJO/Juc4py623jDPTFyM3S+/88/+w78r9AMyk6+83lLHEZLpy437zVD+DESrbSCu3hdF2oPcsaN379gOTc5Go/w0id7tQPhAWBd8EviFn/082pL8rQmLVPb/9Nn/Yn718xeirWjyu//r5/JrFNPnfh1tZTbzyqvRViZyPmWQ8tHP/OdM2sA3HvjzQmcxp8dORFucR4oKAkFoqtIVtbadZWPwvR6fZ8POqmy+/xREt8buqwx5tQlG/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL3qy/oFrN942H7f/7MknMv9dSH8OOP4AXD1ZJ56nju2Pfe3t795FEioo8Z85fjD6+sTEVPW1XTv3RI+hnwM6L6A4PVk22qTkb3cCggadb+KPo52BdAQhHv+4MtgxixDjBrqaNNzpV680tSUtE6F5ciwvX5lPvR0bvxjU8ZdYGpVBYta4Q4odKLuevJZ8GvG9JNQokZRltCnlqDfyjyMj6xBmAs3GHvosBiibXtNlkpZL7PVysWvnnmoHEWqyaSX5l9mm4YHocf+BR6PzE+p5ATpeK0s/vpeCmlku0WWHUJceJB6NLy7mRvt8l8eOP0289mMoZQDKblk733zp9WXRNtezvLpPnm9Yu37JPn2vvCZefHnOhDxaltGmbjLilC20hDM20x9tOnuZ6h+ItltvuTnaJ5vu0/fdsGbI3HfkvNl29/3eyqPnQmLS+JR+7e6T2OX9yncZgK7tAKLR2w8PRM9XLq/Mwu2E//Tzk+amG4aiffb+m4eGzU8mJ6KOQBwZ/WYhDdhN/poc7WWfpH1KO4IQEo7EcM9jj0fPRwb7qglS7Ts5GXUCdhIVsu/zT44b37HLcZR4JfakJTjdZ3du7j4AHmcALk32kvylE3BN/nIy6gR8sJNG3ChTE6a9T0fN8pp2Ar5HnW7yV3bcuzcORZ2AbfeGvij53/veDWbrlso5KLosGruO/G12Jybxy+aeD4ldzoV8v68yAJ0k0w7gur85HG1xyV9MXZ6PZgBv/PrfmQ0HnzRF0mTujh71a0mYknQ2D9aOMnXUHMLI007+cbYfOhxtbvIX+8Zno0cpy51jR81fm4ngEqid7J8/F1+H7P10AkBAdwFd/Lfba77WmYA8SuJXv/z475lXLlUSUtGdgD1qtkeeu2+5OUqcxy8YYzQRzcyaUy9MmpE3D0WJ8+jYYhlCdHhH7fEX0qkpXf55cMvWyg6P5Tl1YXbJuZDOS8h5OHp+6fsl/oefno06sJpyAGhJTzvr/za9FnB1rzFz88a8NmfMzNx8dd1fH23aCbxv20dyvdUyadnETjpxyVOSjtKk84emMuoc3XtXobeHJo3+7fJsXW3M9JypdGJO/Em0UyuiPHFlcM+HW4a4DsxX/ECnyWwGIMleXLXQEejXmvTd5B/KyFMSvySdzQtJR9fP5dFOODra3LqQdGTZYXSv8X4vup3kNy+UK03iD4Ubq1sG3xetgU6W6TUA8frCds2KnmhTA9bzIsWNOiW52JuMOMX6Vcb8YGIx+ctFxzju2nPe68+N1v7V9Gxl2zHUF23uReAySCpDWeIHOn4GIEs3V/fXNkg72cftlwvARZPEKUk6iSYYSTg26QSi1xcer+1bvIhqdwI6ExB5zwbkd2nHE1eGOPZrbvy+NFsO3R9K/EAnyWwJ6KXL89EoP02iL+ICsCb/uGSj4hJ7GnEXg30tCR2anI1Gx2nLERd7COvnzZQj9IvxQEdfBP7+oa9lGsT7d3wilwQksa7bdocp0nOjD5WqLHnFW2Q5ii4D0ClaajRZr3nnfQeQKVDZyuIjcZap/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgMD1ZP0D1268bT5u/9mTT2T+u5D+HHD8Abh6sk48Tx3bH/va29+9iyRUUOI/c/xg9PWJianqa7t27okeQz8HdF5AcXqybLRJyd/uBAQNOt/EH0c7A+kIQjz+cWWwYxYhxg10NWm4069eaWpLWiZC8+RYXr4yn3o7Nn4xqOMvsTQqg8SscYcUO1B2PXkt+TTie0moUSIpy2hTylFv5B9HRtYhzASajT30WQxQNr2myyQtl9jr5WLXzj3VDiLUZNNK8i+zTcMD0eP+A49G5yfU8wJ0vFaWfnwvBTWzXKLLDqEuPUg8Gl9czI32+S6PHX+aeO3HUMoAdPUM4NLry6LHlct7zPL5uej5XM/y6uv2vpm5SlvtX/Z69Pjiy5XXQh0t62hTR5witFHn2Ex/5cnEVBTvVP/AkhmN7jt1YTZ6n7jvyHmz7e77zehe46U8ei4efnrWjAz21bxml8HeJ+WR8m5a2Oe7DEAnqGTwVkZvPzxQTf5u4leyz90vnYZ2HEdGv9lwLT6P5C/JRLdG+5QkWOkIQhh1Sgz3PPZ49FwSqCZIm+xzk6kk0Gqn4TF2OY4Sr5383fh1n9uRuecIQMEdQJK4TsA2sMLfQM1OGpoc7QQZt0+SpY48tROQUafPTsBN/vVGzrbdGxbfu3XLcPRYdFk0djmebrxpOjEpg3ZivsoAdJJMO4BGpi77a6eazN0k4369ebB2lKnJP4SRp538m7VvfLbm6xATaKNOrAxlAMqkkA5A1/99SzPyPH6hduSpI2f5Xll3LqNo/b/kMYVYBqDrOgB7/V+Tu53gr+415qrl8a/Zru7vK/Q6QKsjT3vU6XPEGTf6d5Pi1tWVGYz9er3E6XsEHRdbs2UAEMAMQJO95vtQRv2tJJ2k94W47KAJUrbpufIlTTv+spYBKKvMl4BeX9iuWdETbb4vACeNnOOSzvpVi1s9bieQd0eQdu1/eray7Rjqi7aki8AhSypDWeIHOv5zAK9cmq0u4Sg72cft93EBWBKnJOkkmmAk4SS9Jq7ti78AeXRsIuoERN73o8vv0o4nKc56r7nx+9JsOXR/KPEDnSSzPwXx0uX5aJSfJtFLB1JU8o9LNvUSe9ok5vL1oaRDk7PR6DhtOeJiH917l/c/d9FMOeLKAKB5Pa0k1u8f+prJ0vt3fCKXBCSxrtt2hynSc6MPlaosecVbZDmKLgPQKVpqNFmveefZeIu+UFu2svj6UxBZ/jySPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXawnjx+6duNt83H7z558IpffBwAIgCT/6VevxG5JHQMAoHiZjcg1uT91bH/d97393buCng0wewHQLXqySpqNEn9cRxBSUtXEf+b4weq+ExNT1ee7du6JHkOKGQDa0eMj+YfUCcQl/jjaGdARAOgUvaaLSfJvlPjVpuGB6HH/gUejx10798yH1gk0usYSWrwA/OrxNfr3PQtoJvknzQhkNuA7qdpJ3y2PvYRlz16E77gBdMAM4NLry6LHlct7zPL5uej5XM9yc9MNQ+bp5ydr9s3MVXLVzUPDZvzss+bFlyuv+WInSB3hJ+2T5/oYikadmBurzl5CncEAKFYle7eYfI798EA1+WuSV5L8pROQffZ+Sf4/mZyodhxHRr/ZcOkiL2Mz/dE21V9J7kKe6yb7ZNPn8l7dd9+R88anVmYw0iHoJp0Bt+UC3S3zawCa7HUG4Jr85aQZeuNQ1AmERJP87ltuNvtOTprdG4eiR3XrLTebzz85Hj1+4C/+Lojk3+4MRjqBUGYCaTujEGIFOkXmHcB1f3M4eoxL/mLq8nyU/N/49UoSHf/ge42PZHPPY49Hz0cG+xZj6x+ITf5Ckv+9790QPYqjYxNm2933m9G9xlsClRmJHb+WQeO/Yc2Qef7cZLVzk85Lvpb9IXRi9tdxsxn3GoaQDsv+mg4BCKgDuPhvt9d8rTMBebRH/b/8+O+ZVy7NmtBo8nQ7AU3+difgK3HKyF2S48jgwNJkaXVi3/3RTyr7F5a0Tr1QSf6yXzoPH51Y2ttuRdz1Fvs6ht0h0BEAzetpd/3fptcCru41Rq73vjZnogu/uu6vjzbtBN637SOFNGJ79K/sUfTW1cZMzxlz/MLi66cuxHdUkkDF6N67Co/dHfmn6cTk67iZTFFlcK9bxC1XaQelsxV3Ccuexcj7lK87slq9jkKHhY6bAehdPlctdAT6tSb90Nb93QQvSVWSv+4LadQvj27HFUc6MBnpSwdmJ38pj5bBLsvWLcM1M4E8kpMdv530ZVaiNMlLzLcudFz2hXm9GC9JX5K/lGFsptKBffWTb61ez8gjfrcctnrnRDvXOHqsfXYKUh75ne0+FhkzAp4BqGtW1P7Yly5X6vrAip7oGoCvGUDc6N+1Y6h2ZP2e4aWjZlveI+g0MetsYP0qY65dCH96Nl38cckqy7K48debuQxcqozwfzAxGcUtj+LZl03NLEY6uJE3V8oltqy8VHNXVtbx6/M0HXBacZ2DxK3y6oT1Zz/w1GJD/MzbV8R+rTE++qm39ez56jPV1+2v9Vi7Pz/L2PPsvNZ2eSfWcgcgt29e3d9XN/G7tCPw0QFIzDLKlRFvo6SfRJLrvvHZwjqBejE3E7smU3mU5BlXhjw6gXrx252WWndVZflNO684hyaTX8wrftVO3VHSmemMs/4MIZv45WdIstakbT9KkpdkP/7y/PyGVT2pH/X79NH9uVknVffn6e/J6uu1zs/vpk4h0w4gaZQfx70AnGcHkCaR7t7Ql5gY4yQ13qxHn43ibkeeCaiV2OUciHrnwT1PeZUh72OfZ/w6GtfOK88yNIpftFqGNJ1Xu497En5+Xp1ZaFpuHN8/9LVMA3n/jk/kPgNYt+0Ok6fnRh/KfAaQd8x5lcVn7O2WIYTY2ynDlju/OT/24Ed6Qnns9CRaZm018CwDKWrdMM+fn9c1AONBFmXx/UnjdjswE4B2ZjD2z/D9te81fq4RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAH68njh67deNt83P6zJ5/I5fcBAAIgyX/61SuxW1LHAAAoXmYjck3uTx3bX/d9b3/3rqBnA8xeAHSLnqySZqPEH9cRhJRUNfGfOX6wuu/ExFT1+a6de6LHkGIGgHb0+Ej+IXUCcYk/jnYGdAQAOkWv6WKS/BslfrVpeCB63H/g0ehx184986F1Ao2usYQWLwC/enyN/n3PAppJ/kkzApkN+E6qdtJ3y2MvYdmzF+E7bgAdMAO49Pqy6HHl8h6zfH4uej7Xs7z6ur1vZq6Sq/qXvR49vvhy5TVf7ASpI/ykffJcH0PRqBNzY9XZS6gzGAAl6QAk+Rz74YFq8tckrwlf2Z2B22kYM2eOjH7TvG/bR7wko7GZ/uhxZLCvmtyn+heTpnYGsk+eR+9f2HffkfPGp1ZmMHaHIJ0BnQDQ3TK/BhCX8G0DK3rM1OXwPg6gSd5YHYDdGWhnIY9HxyZMCMm/3RlMSJ1A2s+IhBAr0CkKvwgcQvKXZHPPY49XR/9xCT/O7g19Zt/4rNm6ZTjqBLbdfb8Z3Wu8JVDpjOz4k8pgz2A2LewLYQZjfx03m3GvYQjpsOyv6RCAEnQAuv5fZpL8fZPEKSN3SY4jg0uXq+wZjL1POoHdaxf3+erE0t52K+Kut9jXMewOgY4AaF5Pu+v/Nr0WcHWvMZLvX5trnPhfuVRJqu/b9pFCGrE9+lf2KHrramOm54w5fmHx9VMX4hO/LgWN7r2r8NjdkX8aceUosgzudYt2lrDi7nDydTdZK99Hh4WOmwFosr9qoSMoy6hfE6MkVUn+9r4QaJJxO644cR1YvfK4M4E8kpMdv5243QvujS7CV6/TWNdkJPavfvKt1esZecTvlsNW75zUu1akx9pnpyDlkd/Z7mORMSPgGYC6ZkXtj31pYd0/7gJwkTOAuNG/a8dQ7cj60GT9jiDvEXSamHU2sH6VMdcuhD89m74MbrLKsixu/PVmLgOXpszgmqXLPs++XNuR6bUYtWXlpZprGlnHr8/TdMBpxXUOErfKqxPWn/3AU4sN8TNvXxH7tcb46Kfe1rPnq89UX7e/1mPt/vwsY8+z81rb5Z1Yyx2A3L55dX9f3cTv0o7ARwcgMcsoV0a8jZJ+EkmucdcB8uoE6sXcbOyNypBHJ1AvfrvTUuuuqsxe7M7LVa8zyyt+1U7dsTsznY3VnyFkE7/8DEnWmrTtR0nykuzHX56f37CqJ/Wjfp8+uj8366Tq/jz9PVl9vdb5+d3UKWTaATRzm6cmfpVnB5AmkbqjykaSGm/Wo89GcbcjzwTUSuxyDkS98+Cep7zKkPexzzN+HY1r55VnGRrFL1otQ5rOq93HPQk/P6/OLDQtN47vH/papoG8f8cncp8BrNt2h8nTc6MPZT4DyDvmvMriM/Z2yxBC7O2UYcud35wfe/AjPaE8dnoSLbO2GniWgRS1bpjnz8/rGoDxIIuy+P4PgNrtwEwA2pnB2D/D99e+1/i5RgAAAADAdL3/H+dnvUxD91o7AAAAAElFTkSuQmCC",
        "frame": {
          "w": 48,
          "h": 48
        },
        "anchor": {
          "x": 24,
          "y": 45
        },
        "mirror": true,
        "anims": [
          {
            "id": "idle",
            "frames": 6,
            "ms": 160,
            "loop": true
          },
          {
            "id": "walk",
            "frames": 8,
            "ms": 100,
            "loop": true
          },
          {
            "id": "attack",
            "frames": 6,
            "ms": 90,
            "loop": false,
            "hit": 3
          },
          {
            "id": "heavy",
            "frames": 8,
            "ms": 100,
            "loop": false,
            "hit": 6
          },
          {
            "id": "cast",
            "frames": 6,
            "ms": 140,
            "loop": true
          },
          {
            "id": "magic",
            "frames": 6,
            "ms": 100,
            "loop": false,
            "hit": 3
          },
          {
            "id": "hurt",
            "frames": 4,
            "ms": 90,
            "loop": false
          },
          {
            "id": "death",
            "frames": 7,
            "ms": 130,
            "loop": false
          }
        ]
      },
      "level": 8,
      "stats": {
        "hp": 110,
        "mp": 30,
        "str": 9,
        "mag": 12,
        "end": 10,
        "agi": 5,
        "luck": 4
      },
      "resists": {
        "el-fire": "weak",
        "el-ice": "absorb"
      },
      "xp": 30,
      "money": 15,
      "drops": [
        {
          "item": "it-potion",
          "chance": 40
        },
        {
          "item": "it-ice-amulet",
          "chance": 3
        }
      ],
      "actions": [
        {
          "skill": "sk-double",
          "weight": 2
        },
        {
          "skill": "sk-ice-lance",
          "weight": 2
        }
      ],
      "weathers": [
        {
          "weather": "snow",
          "effect": "appears"
        },
        {
          "weather": "blizzard",
          "effect": "stronger"
        }
      ],
      "times": []
    }
  ],
  "groups": [
    {
      "id": "gr-forest-slimes",
      "name": "Gluants de la forêt",
      "members": [
        {
          "enemy": "en-slime",
          "x": 0.2,
          "y": 0.55
        },
        {
          "enemy": "en-slime",
          "x": 0.78,
          "y": 0.6
        },
        {
          "enemy": "en-bat",
          "x": 0.5,
          "y": 0.2
        }
      ],
      "canFlee": true,
      "surprise": true
    },
    {
      "id": "gr-bat-swarm",
      "name": "Nuée",
      "members": [
        {
          "enemy": "en-bat",
          "x": 0.2,
          "y": 0.3
        },
        {
          "enemy": "en-bat",
          "x": 0.4,
          "y": 0.65
        },
        {
          "enemy": "en-bat",
          "x": 0.6,
          "y": 0.3
        },
        {
          "enemy": "en-bat",
          "x": 0.8,
          "y": 0.65
        }
      ],
      "canFlee": true,
      "surprise": true
    },
    {
      "id": "gr-snow-slimes",
      "name": "Gluants des neiges",
      "note": "Dans la montagne enneigée.",
      "members": [
        {
          "enemy": "en-snow-slime",
          "x": 0.25,
          "y": 0.6
        },
        {
          "enemy": "en-snow-slime",
          "x": 0.5,
          "y": 0.3
        },
        {
          "enemy": "en-snow-slime",
          "x": 0.75,
          "y": 0.6
        }
      ],
      "canFlee": false,
      "surprise": false
    }
  ]
};
