import { menu_time, menu } from "./menu.js";
// import data from './menu.json' assert { type: 'json' };
import { getStringDay, isWeekend } from "./utils.js";

// var data = JSON.parse(menu);
// const monday = menu.monday
// const tuesday = menu.tuesday
// console.log(data)
const time = menu_time.time

let dayNumeral = new Date().getDay()

let day = getStringDay(dayNumeral)

const forward = document.querySelector(".day-changer .forward")
const backward = document.querySelector(".day-changer .backward")

forward.addEventListener("click", (e)=>{
    e.preventDefault()
    dayNumeral = (dayNumeral + 1 + 7)%7
    day = getStringDay(dayNumeral)
    if(!putData(day)){
        console.log("dayNumeral", dayNumeral)
        dayNumeral = (dayNumeral - 1)%7
    }
})

backward.addEventListener("click", (e)=>{
    e.preventDefault()
    dayNumeral = Math.abs(dayNumeral - 1 + 7)%7
    day = getStringDay(dayNumeral)
    if(!putData(day)){
        console.log("dayNumeral", dayNumeral)
        dayNumeral = (dayNumeral + 1)%7
    }
})

function putData(day){
    if(!Object.keys(menu).includes(day)){
        return 0
    }
    let dayIsWeekend = isWeekend(day)

    console.log(dayIsWeekend)

    const dayElement = document.querySelector(".day-container .day-header .heading")

    console.log(dayElement)

    dayElement.innerText = day

    let menuForTheDay = menu[day]

    console.log(menuForTheDay)
    
    const btime = document.querySelector(".breakfast-menu .time")
    const ltime = document.querySelector(".lunch-menu .time")
    const stime = document.querySelector(".snack-menu .time")
    const dtime = document.querySelector(".dinner-menu .time")

    const bmenu = document.querySelector(".breakfast-menu .item-list")
    const lmenu = document.querySelector(".lunch-menu .item-list")
    const smenu = document.querySelector(".snack-menu .item-list")
    const dmenu = document.querySelector(".dinner-menu .item-list")

    bmenu.innerHTML = '';
    lmenu.innerHTML = '';
    smenu.innerHTML = '';
    dmenu.innerHTML = '';
    for(const item in menuForTheDay.breakfast){
        let item_ = menuForTheDay.breakfast[item]
        const node = document.createElement("li");
        if(!item_.veg){
            node.classList.add("text-red-300")
        }
        const textnode = document.createTextNode(item_.name.toLowerCase());
        node.appendChild(textnode)
        bmenu.appendChild(node)
        
    }
    for(const item in menuForTheDay.lunch){
        let item_ = menuForTheDay.lunch[item]
        const node = document.createElement("li");
        if(!item_.veg){
            node.classList.add("text-red-300")
        }
        const textnode = document.createTextNode(item_.name.toLowerCase());
        node.appendChild(textnode)
        lmenu.appendChild(node)
    }
    for(const item in menuForTheDay.snacks){
        let item_ = menuForTheDay.snacks[item]
        const node = document.createElement("li");
        if(!item_.veg){
            node.classList.add("text-red-300")
        }
        const textnode = document.createTextNode(item_.name.toLowerCase());
        node.appendChild(textnode)
        smenu.appendChild(node)
    }
    for(const item in menuForTheDay.dinner){
        let item_ = menuForTheDay.dinner[item]
        const node = document.createElement("li");
        if(!item_.veg){
            node.classList.add("text-red-300")
        }
        const textnode = document.createTextNode(item_.name.toLowerCase());
        node.appendChild(textnode)
        dmenu.appendChild(node)
    }

    if(dayIsWeekend){
        btime.innerText = `${time.breakfast.weekend.start} - ${time.breakfast.weekend.end} `
        ltime.innerText = `${time.lunch.weekend.start} - ${time.lunch.weekend.end} `
        stime.innerText = `${time.snacks.weekend.start} - ${time.snacks.weekend.end} `
        dtime.innerText = `${time.dinner.weekend.start} - ${time.dinner.weekend.end} `
    } else{
        btime.innerText = `${time.breakfast.weekday.start} - ${time.breakfast.weekday.end} `
        ltime.innerText = `${time.lunch.weekday.start} - ${time.lunch.weekday.end} `
        stime.innerText = `${time.snacks.weekday.start} - ${time.snacks.weekday.end} `
        dtime.innerText = `${time.dinner.weekday.start} - ${time.dinner.weekday.end} `
    }
    return 1
}

putData(day)

