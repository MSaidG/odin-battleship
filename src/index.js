import tornado from "./tornado.png"
import "./style.css"
import log from './log.js'

log("Hello World!")

const img = document.createElement('img')
img.src = tornado
document.body.appendChild(img)
