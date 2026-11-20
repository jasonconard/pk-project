import { GameDatabase } from '../../app/modules/database-editor/shared/database';

/**
 * The game's database (elements, weapon types, states, skills, items, characters…). Written by the database editor's export (editor →
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
  ]
};
