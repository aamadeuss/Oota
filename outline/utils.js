function getStringDay(dayNumber){
    switch(dayNumber){
        case 0:
            return 'sunday'
        case 1:
            return 'monday'
        case 2:
            return 'tuesday'
        case 3:
            return 'wednesday'
        case 4:
            return 'thursday'
        case 5:
            return 'friday'
        case 6:
            return 'saturday'
        default:
            return 'error'
    }
}

function isWeekend(dayString){
    switch(dayString){
        case 'sunday' || 'saturday':
            return true
        default:
            return false
    }
}

export { getStringDay, isWeekend };