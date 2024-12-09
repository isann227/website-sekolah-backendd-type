import { HttpException, HttpStatus, Injectable, Logger, Response } from '@nestjs/common';
const { parse, formatISO } = require('date-fns');
import axios from 'axios';

@Injectable()
export class HelperFun {

    static currDateTime(){
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() +"-"+ currentdate.getDate() + "-"
                        +(currentdate.getMonth()+1)+ " "
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();

                        return datetime

    }

    static convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
    }



    static decodeBase64(id){
        return Buffer.from(id, 'base64').toString('ascii')
    }

  static exclude(user, keys) {
        user.forEach(function(list, index) {
                delete list[keys];
        });
    return user
  }
  

static convertBigIntToString(data){
    return data.map((data) => {
        // Fungsi rekursif untuk melakukan konversi dalam objek
        const recursiveConvert = (obj: any): any => {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const value = obj[key];
              if (typeof value === 'bigint') {
                obj[key] = value.toString();
              } else if (typeof value === 'object' && value !== null) {
                // Jika value adalah objek, panggil rekursif
                obj[key] = recursiveConvert(value);
              }
            }
          }
          return obj;
        };
        // Menerapkan fungsi rekursif ke data yang akan dikonversi
        return recursiveConvert(data);
      })
    }

    static toObject(data) {
      return JSON.parse(JSON.stringify(data, (key, value) =>
          typeof value === 'bigint'
              ? Number(value)
              : value // return everything else unchanged
      ));
  }

  static cleanNumberPhone(number = "0"){
      number = number.replaceAll('-', '');
      let splitNumber = number.toString().split("")
      if(splitNumber[0] == "0" && splitNumber[1] == "8"){
          return "+62" + number.toString().substring(1, 16)
      }
      if(splitNumber[0] == "6" && splitNumber[1] == "2"){
          return "+" + number.toString().substring(0, 16)
      }
      if(splitNumber[0] == "8"){
          return "+62" + number.toString().substring(0, 16)
      }
  }

  static cleanNumberPhoneWa(number = "0"){
    number = number.replaceAll('-', '');
    let splitNumber = number.toString().split("")
    if(splitNumber[0] == "0" && splitNumber[1] == "8"){
        return "62" + number.toString().substring(1, 16)
    }
    if(splitNumber[0] == "6" && splitNumber[1] == "2"){
        return number.toString().substring(0, 16)
    }
    if(splitNumber[0] == "8"){
        return "62" + number.toString().substring(0, 16)
    }
}

  static loggingError(title : string,msg:any, stack? : string){
    var currtime = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
    Logger.error(title + ' >> ' + JSON.stringify(msg), "stackTrace : " + stack)
    Logger.warn(title + ' >> ' + JSON.stringify(msg), "stackTrace : " + stack)
    // axios.post('https://hooks.slack.com/services/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', {
    //     text: ' [API NEST] '+title+' ('+currtime+') >> '+msg+' >> ' + "stackTrace : " + stack ?? "",
    // });
  }

   static generateRandomOtpString(length = 6){
    const charSet = "1234567890";
    let result = "";
    for(let i = 0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * charSet.length);
      result += charSet[randomIndex];
    }
    return result;
  }

  static formatDateToIndonesian(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Bulan dimulai dari 0
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    // Tambahkan leading zero untuk hari dan bulan yang kurang dari 10
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

  static addHours(date, hours) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return this.formatDateToIndonesian(date);
  }

  static addError(field, message){
    let errors = {};

    if(!errors[field]){
      errors[field] = [];
    }

    errors[field].push(message);

    return errors;
  }

  static reverseTanggalStrip(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split("-"); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join("-"); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

static upperCaseWords(str) {
  str = str.toLowerCase();
  // Membagi string menjadi array kata-kata berdasarkan spasi
  const words = str.split(' ');
  // Mengubah huruf pertama setiap kata menjadi huruf besar
  const upperCaseWords = words.map(word => word[0].toUpperCase() + word.slice(1));
  // Menggabungkan array kata-kata yang sudah diubah menjadi string baru
  const upperCaseString = upperCaseWords.join(' ');
  return upperCaseString;
}

}