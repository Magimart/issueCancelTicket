import moment from 'moment';

// interface GetDate {
//     (date: string): string;
// }
export const getFullDayTime = (date: Date): string =>{                 
    return `${moment(date).format('llll')}`
}

export const getMonthYear = (date: Date) =>{                 
    return `${moment(date).format('Y')}-${moment(date).format('M')}`
}

export const shuffleArray = (array:object[]) => array.map((el:any) =>el.url).sort(() => Math.random() - 0.5);

export const getArray = (arr:object):object=>{
    if(arr === null){
        return arr;
    }else{
        return Object.entries(arr).map((el) =>{return el[1]});
    }
}