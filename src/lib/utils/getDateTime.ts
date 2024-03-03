import moment from 'moment';

interface GetDate {
    (date: string): string;
}

export const getTime = (date:any):string =>{
    let hour =  date !== null? date.getHours():"";
    let min =  date !== null? date.getMinutes():"";
    let sec =  date !== null? date.getSeconds():"";
    let x = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    min = min < 10 ? '0'+min: min;
    const mytime= hour + ':' + min +  ' ' + x;
    //const mytime= hour + ':' + min + ':' + sec + ' ' + x;
    return mytime;
}

export const getDateFormat:GetDate  = (date: string)=>{
    return moment(date).format("LL")
}

export const getFullDay:GetDate  = (date: string)=>{
    let day = moment(date).format("dddd");
    console.log(day)
    // let month =  moment(date).format('MMM');  
    // let year =  moment(date).format('YYYY');  
    return `${day}`;
}




