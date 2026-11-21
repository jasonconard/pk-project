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
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAALCAYAAABlNU3NAAAA2ElEQVR42qWTsRGDMAxFv32pU3CUFBSZIBOkouYoGCJlSgZwxWWCTJAi5wmYhYKSo2ABUgTlhCIHLvkNQl9+xlgCZsVRMsVRMuFPSc6OknlaAQA83NQPnfkVLjlWFuVpBe0kPBfyCc5lNUNuQjV0/JCvMRYnyI7ZRwFfnKcVeCx9yQAAKw25CS2+7O/vPMXcDzFsP3TGtw4AcH6cXhc0v3Ndx1KNSRpjccnl7WD4U6puCvjWwbcOdVOoXaQxzJaWWxN9reaZtb6mfx0CA8C3uTFbB0jLbxnIJ1EbcJSrTf0CAAAAAElFTkSuQmCC",
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
      "sprite": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAABWUlEQVR42q2Uv0rDUBSHvxsqgToIpQhKrdCudhMy1KGbgw/gMzh06QN0cNfFp/ABHOwkUocLdoqbJNBYFCSUdmihVrgOkpCkN2kqHgjk/s653z3n/jnwjzacKQUgsoLKpYrS6f54JHTAPRM+FinQAPb++aZdbH/3QAsfzpQ63BZCC/z6VpnfwJ2ogTtRaZVsDMwDNpKC7U3Jo2WZiGZ5//wSOhrVnRAmF0Uscx7TknZ6fBTucSHqkIsiAJY5x/am4TjwydcllhmPA7h69FczLZcq6vLJBeCsugXAnbfMXW5fegD0Oi388UgUdEGbAAFOrOrvz/UDvU5LGVnAbrNGt1lbgaTp4elHS9dZ2gNI6sEWxK7Uhexnvp40XTdPrMs0WjJAWmz0sIxk6lELbkIAy7N4rPw8YJ2vL71wriPt+D2tn99Qtxp/7qWOtHFu2/jjkRDreucmFrTCHz5n7Z+lnxEbAAAAAElFTkSuQmCC",
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
