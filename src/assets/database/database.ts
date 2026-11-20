import { GameDatabase } from '../../app/modules/database-editor/shared/database';

/**
 * The game's database (elements, weapon types, states, skills, items…). Written by the database editor's export (editor →
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
  ]
};
