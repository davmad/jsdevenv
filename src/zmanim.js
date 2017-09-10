var currLang = 'en';

function getHebABC(charNum){
    var curChar = "";

    switch(charNum){
        case 1:
            curChar = "×";
            break;
        case 2:
            curChar = "×‘";
            break;
        case 3:
            curChar = "×’";
            break;
        case 4:
            curChar = "×“";
            break;
        case 5:
            curChar = "×”";
            break;
        case 6:
            curChar = "×•";
            break;
        case 7:
            curChar = "×–";
            break;
        case 8:
            curChar = "×—";
            break;
        case 9:
            curChar = "×˜";
            break;
        case 10:
            curChar = "×™";
            break;
        case 20:
            curChar = "×›";
            break;
        case 30:
            curChar = "×œ";
            break;
        case 40:
            curChar = "×ž";
            break;
        case 50:
            curChar = "× ";
            break;
        case 60:
            curChar = "×¡";
            break;
        case 70:
            curChar = "×¢";
            break;
        case 80:
            curChar = "×¤";
            break;
        case 90:
            curChar = "×¦";
            break;
        case 100:
            curChar = "×§";
            break;
        case 200:
            curChar = "×¨";
            break;
        case 300:
            curChar = "×©";
            break;
        case 400:
            curChar = "×ª";
            break;
        case 500:
            curChar = "×ª×§";
            break;
        case 600:
            curChar = "×ª×¨";
            break;
        case 700:
            curChar = "×ª×©";
            break;
        case 800:
            curChar = "×ª×ª";
            break;
        case 900:
            curChar = "×ª×ª×§";
            break;
        default:
            curChar = "";
    }
    return(curChar);
}

function setLastChar(curChar){
    var lastChar = "";

    switch(curChar){
        case "×›":
            lastChar = "×š";
            break;
        case "×ž":
            lastChar = "×";
            break;
        case "× ":
            lastChar = "×Ÿ";
            break;
        case "×¤":
            lastChar = "×£";
            break;
        case "×¦":
            lastChar = "×¥";
            break;
        default:
            lastChar = curChar;
    }
    return(lastChar);
}

var en_hHebYear = function (year){
    return(year);
};

var he_hHebYear = function (year){
    var curChar, curNum, hebYr = "", curDiv = 100;

    curNum = (year - (year % 1000)) / 1000;
    year = year % 1000;
    hebYr = hebYr + getHebABC(curNum);
    curNum = 0;
    while(year != 0){
        hebYr = hebYr + getHebABC(curNum);
        curNum = (year - (year % curDiv));
        year = year % curDiv;
        curDiv = curDiv / 10;
    }
    curChar = getHebABC(curNum);
    hebYr = hebYr + '"' + setLastChar(curChar);
    return(hebYr);
};


var en_holidays = function (cday, cmonth, cyear) {
    // American civil holidays and some major religious holiday
    if (cmonth == 1 && cday == 1)
        return "New Year's Day";
    else if (cmonth == 2 && cday == 12)
        return "Lincoln's Birthday";
    else if (cmonth == 2 && cday == 14)
        return "Valentine's Day";
    else if (cmonth == 2 && cday == NthDOW(3, 2, 2, cyear))
        return "President's Day";
    else if (cmonth == 3 && cday == 17)
        return "St. Patrick's Day";
    else if (cmonth == 3 || cmonth == 4) {
        var e = Easter(cyear);
        if (cmonth == e[1] && cday == e[2])
            return "Easter";
    }
    else if (cmonth == 5 && cday == NthDOW(2, 1, 5, cyear))
        return "Mother's Day";
    else if (cmonth == 5 && cday == NthDOW(3, 7, 5, cyear))
        return "Armed Forces Day";
    else if (cmonth == 5 && cday == NthDOW(0, 2, 5, cyear))
        return "Memorial Day";
    else if (cmonth == 6 && cday == 14)
        return "Flag Day";
    else if (cmonth == 6 && cday == NthDOW(3, 1, 6, cyear))
        return "Father's Day";
    else if (cmonth == 7 && cday == 4)
        return "Independence Day";
    else if (cmonth == 9 && cday == NthDOW(1, 2, 9, cyear))
        return "Labor Day";
    else if (cmonth == 10 && cday == NthDOW(2, 2, 10, cyear))
        return "Columbus Day";
    else if (cmonth == 10 && cday == 31)
        return "Halloween";
    else if (cmonth == 11 && cday == 11)
        return "Veterans' Day";
    else if (cmonth == 11 && cday == NthDOW(4, 5, 11, cyear))
        return "Thanksgiving";
    else if (cmonth == 12 && cday == 25)
        return "Christmas";

    return "";
};

var en_moadim = function (cday, cmonth, cyear, hday, hmonth, dow) {
    var hd;

    if(hmonth == 6) {
        if(hday == 1 || hday == 2)
            return "Rosh Hashana"
        else if(hday == 3 && dow != 7)
            return "Fast of Gedalia";
        else if(hday == 4 && dow == 1)
            return "Fast of Gedalia";
        else if(hday == 10)
            return "Yom Kippur"
        else if(hday >= 15 && hday <= 22)
            return "Sukkot"
        else if(hday == 23)
            return "Sukkot (d)"
    }
    else if(hmonth == 8) {
        if(hday >= 25)
            return "Chanukkah"
    }
    else if(hmonth == 9) {
        if(hday <= 2) {
            return "Chanukkah"
        }
        else if(hday == 3) {
            // Kislev can be malei or chaser
            if(cday == 1) {
                cday = 29;
                cmonth = 11;
            }
            else if(cday == 2) {
                cday = 30;
                cmonth = 11;
            }
            else
                cday -= 3;
            var hdate = civ2heb(cday, cmonth, cyear);
            hd = eval(hdate.substring(0, hdate.indexOf(' ')));
            if(hd == 29)
                return "Chanukkah"
        }
        else if(hday == 10)
            return "Fast of Tevet"
    }
    else if(hmonth == 10) {
        if(hday==15)
            return "Tu b'Shvat"
    }
    else if(hmonth == 11 || hmonth == 13) {
        if(hday == 11 && dow == 5)
            return "Taanit Esther"
        else if(hday == 13 && dow != 7)
            return "Taanit Esther"
        else if(hday == 14)
            return "Purim"
        else if(hday == 15)
            return "Shushan Purim"
    }
    else if(hmonth == 0) {

        if(hday == 12 && dow == 5)
            return "Taanit Bechorot"
        else if(hday == 14 && dow != 7)
            return "Taanit Bechorot"
        else if(hday >= 15 && hday <= 21)
            return "Pesach"
        else if(hday == 22)
            return "Pesach (d)"
    }
    else if(hmonth == 1) {
        if(hday == 3 && dow == 5)
            return "Yom Ha'Atzmaut"
        else if(hday == 4 && dow == 5)
            return "Yom Ha'Atzmaut"
        else if(hday == 5 && dow != 6 && dow != 7)
            return "Yom Ha'Atzmaut"
        if(hday == 14)
            return "Pesah sheni"
        else if(hday == 18)
            return "Lag B'Omer"
        if(hday == 28)
            return "Yom Yerushalayim"
    }
    else if(hmonth == 2) {
        if(hday == 6)
            return "Shavuot"
        else if(hday == 7)
            return "Shavuot (d)"
    }
    else if(hmonth == 3) {
        if(hday == 17 && dow != 7)
            return "Fast of Tammuz"
        if(hday == 18 && dow == 1)
            return "Fast of Tammuz"
    }
    else if(hmonth == 4) {
        if(hday == 9 && dow != 7)
            return "Tisha B'Av"
        if(hday == 10 && dow == 1)
            return "Tisha B'Av"
        if(hday == 15)
            return "Tu B'Av"
    }

    return "";
};


var he_holidays = function (cday, cmonth, cyear) {
    // American civil holidays and some major religious holiday
    if (cmonth == 1 && cday == 1)
        return "×¨××© ×”×©× ×” ×”××–×¨×—×™×ª";
    else if (cmonth == 2 && cday == 12)
        return "×”×•×œ×“×ª ×œ×™× ×§×•×œ×Ÿ";
    else if (cmonth == 2 && cday == 14)
        return "×—×’ ×”××”×‘×”";
    else if (cmonth == 2 && cday == NthDOW(3, 2, 2, cyear))
        return "×™×•× ×”× ×©×™×";
    else if (cmonth == 3 && cday == 17)
        return "×™×•× ×¡×˜. ×¤×˜×¨×™×§";
    else if (cmonth == 3 || cmonth == 4) {
        var e = Easter(cyear);
        if (cmonth == e[1] && cday == e[2])
            return "×—×’ ×”×¤×¡×—×";
    }
    else if (cmonth == 5 && cday == NthDOW(2, 1, 5, cyear))
        return "×™×•× ×”××";
    else if (cmonth == 5 && cday == NthDOW(3, 7, 5, cyear))
        return "Armed Forces Day";
    else if (cmonth == 5 && cday == NthDOW(0, 2, 5, cyear))
        return "×™×•× ×”×–×›×¨×•×Ÿ (××¨×”\"×‘)";
    else if (cmonth == 6 && cday == 14)
        return "×™×•× ×”×“×’×œ";
    else if (cmonth == 6 && cday == NthDOW(3, 1, 6, cyear))
        return "×™×•× ×”××‘ ×•×”×ž×©×¤×—×”";
    else if (cmonth == 7 && cday == 4)
        return "×™×•× ×”×¢×¦×ž××•×ª (××¨×”\"×‘)";
    else if (cmonth == 9 && cday == NthDOW(1, 2, 9, cyear))
        return "×—×’ ×”×¢×‘×•×“×”";
    else if (cmonth == 10 && cday == NthDOW(2, 2, 10, cyear))
        return "×™×•× ×§×•×œ×•×ž×‘×•×¡";
    else if (cmonth == 10 && cday == 31)
        return "×™×•× ×§×•×œ×•×ž×‘×•×¡";
    else if (cmonth == 11 && cday == 11)
        return "Veterans' Day";
    else if (cmonth == 11 && cday == NthDOW(4, 5, 11, cyear))
        return "×—×’ ×”×”×•×“×™×”";
    else if (cmonth == 12 && cday == 25)
        return "×—×’ ×”×ž×•×œ×“";

    return "";
};

var he_moadim = function (cday, cmonth, cyear, hday, hmonth, dow) {
    var hd;

    if(hmonth == 6) {
        if(hday == 1 || hday == 2)
            return "×¨××© ×”×©× ×”";
        else if(hday == 3 && dow != 7)
            return "×¦×•× ×’×“×œ×™×”";
        else if(hday == 4 && dow == 1)
            return "×¦×•× ×’×“×œ×™×”";
        else if(hday == 10)
            return "×™×•× ×›×™×¤×•×¨";
        else if(hday >= 15 && hday <= 22)
            return "×¡×•×›×•×ª";
        else if(hday == 23)
            return "×¡×•×›×•×ª (×’)";
    }
    else if(hmonth == 8) {
        if(hday >= 25)
            return "×—× ×•×›×”";
    }
    else if(hmonth == 9) {
        if(hday <= 2) {
            return "×—× ×•×›×”";
        }
        else if(hday == 3) {
            // Kislev can be malei or chaser
            if(cday == 1) {
                cday = 29;
                cmonth = 11;
            }
            else if(cday == 2) {
                cday = 30;
                cmonth = 11;
            }
            else
                cday -= 3;
            var hdate = civ2heb(cday, cmonth, cyear);
            hd = eval(hdate.substring(0, hdate.indexOf(' ')));
            if(hd == 29)
                return "×—× ×•×›×”";
        }
        else if(hday == 10)
            return "×¦×•× ×¢×©×¨×” ×‘×˜×‘×ª";
    }
    else if(hmonth == 10) {
        if(hday==15)
            return "×˜\"×• ×‘×©×‘×˜";
    }
    else if(hmonth == 11 || hmonth == 13) {
        if(hday == 11 && dow == 5)
            return "×ª×¢× ×™×ª ××¡×ª×¨";
        else if(hday == 13 && dow != 7)
            return "×ª×¢× ×™×ª ××¡×ª×¨";
        else if(hday == 14)
            return "×¤×•×¨×™×";
        else if(hday == 15)
            return "×©×•×©×Ÿ ×¤×•×¨×™×";
    }
    else if(hmonth == 0) {
        if(hday == 12 && dow == 5)
            return "×ª×¢× ×™×ª ×‘×›×•×¨×•×ª";
        else if(hday == 14 && dow != 7)
            return "×ª×¢× ×™×ª ×‘×›×•×¨×•×ª";
        else if(hday >= 15 && hday <= 21)
            return "×¤×¡×—";
        else if(hday == 22)
            return "×¤×¡×— (×’)";
    }
    else if(hmonth == 1) {
        if(hday == 3 && dow == 5)
            return "×™×•× ×”×¢×¦×ž××•×ª";
        else if(hday == 4 && dow == 5)
            return "×™×•× ×”×¢×¦×ž××•×ª";
        else if(hday == 5 && dow != 6 && dow != 7)
            return "×™×•× ×”×¢×¦×ž××•×ª";
        if(hday == 14)
            return "×¤×¡×— ×©× ×™";
        else if(hday == 18)
            return "×œ\"×’ ×‘×¢×•×ž×¨";
        if(hday == 28)
            return "×™×•× ×™×¨×•×©×œ×™×";
    }
    else if(hmonth == 2) {
        if(hday == 6)
            return "×©×‘×•×¢×•×ª";
        else if(hday == 7)
            return "×©×‘×•×¢×•×ª (×’)";
    }
    else if(hmonth == 3) {
        if(hday == 17 && dow != 7)
            return "×¦×•× ×™\"×– ×‘×ª×ž×•×–";
        if(hday == 18 && dow == 1)
            return "×¦×•× ×™\"×– ×‘×ª×ž×•×–";
    }
    else if(hmonth == 4) {
        if(hday == 9 && dow != 7)
            return "×ª×©×¢×” ×‘××‘";
        if(hday == 10 && dow == 1)
            return "×ª×©×¢×” ×‘××‘";
        if(hday == 15)
            return "×˜\"×• ×‘××‘";
    }
    return "";
};

var multiLang = {
    en: {
        hebMonth : ['Nisan', 'Iyyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
            'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat',
            'Adar', 'Adar I', 'Adar II'],
        hHebDay: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        civMonth: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        weekDay: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Shabbat'],
        hHebYear: en_hHebYear,
        holidays: en_holidays,
        moadim: en_moadim
    },
    he: {
        hebMonth : ['Nisan', 'Iyyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
            'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat',
            'Adar', 'Adar I', 'Adar II'],
        hHebDay: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        civMonth: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        weekDay: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Shabbat'],
        hHebYear: he_hHebYear,
        holidays: he_holidays,
        moadim: he_moadim
    }
};





function Gauss(year) {
    var a,b,c,m, Mar;	// Mar => "day in March" on which Pesach falls (return value)

    a = Math.floor((12 * year + 17) % 19);
    b = Math.floor(year % 4);
    m = 32.044093161144 + 1.5542417966212 * a +  b / 4.0 - 0.0031777940220923 * year;
    if (m < 0) {
        m -= 1;
    }
    Mar = Math.floor(m);
    if (m < 0) {
        m++;
    }
    m -= Mar;
    c = Math.floor((Mar + 3 * year + 5 * b + 5) % 7);
    if (c == 0 && a > 11 && m >= 0.89772376543210 ) {
        Mar++;
    } else if (c == 1 && a > 6 && m >= 0.63287037037037) {
        Mar += 2;
    } else if (c == 2 || c == 4 || c == 6) {
        Mar++;
    }
    Mar += Math.floor((year - 3760) / 100) - Math.floor((year - 3760) / 400) - 2;
    return Mar;
}

function leap(y) {
    return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
}

function civMonthLength(month, year) {
    if (month == 2) {
        return 28 + (leap(year) ? 1 : 0 );
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30;
    }
    return 31;
}

function civ2heb(day, month, year) {
    var d = day, m = month, y = year, hy, pesach, anchor, adarType;

    m -= 2;
    if (m <= 0) { // Jan or Feb
        m += 12;
        y -= 1;
    }

    d += Math.floor(7 * m / 12 + 30 * (m - 1)); // day in March
    hy = y + 3760;	// get Hebrew year
    pesach = Gauss(hy);
    if (d <= pesach - 15) { // before 1 Nisan
        anchor = pesach;
        d += 365;
        if(leap(y)) {
            d++;
        }
        y -= 1;
        hy -= 1;
        pesach = Gauss(hy);
    } else {
        anchor = Gauss(hy + 1);
    }
    d -= pesach - 15;
    anchor -= pesach - 12;
    y++;
    if(leap(y)) {
        anchor++;
    }
    for(m = 0; m < 11; m++) {
        var days;
        if(m == 7 && anchor % 30 == 2)
            days = 30; // Cheshvan
        else if(m == 8 && anchor % 30 == 0)
            days = 29; // Kislev
        else
            days = 30 - m % 2;
        if(d <= days)
            break;
        d -= days;
    }

    adarType = 0;			// plain old Adar
    if (m == 11 && anchor >= 30) {
        if (d > 30) {
            adarType = 2;	// Adar 2
            d -= 30;
        } else {
            adarType = 1;	// Adar 1
        }
    }
    if(m >= 6) {    // Tishrei or after?
        hy++;		// then bump up year
    }
    if(m == 11) {		// Adar?
        m += adarType;	// adjust for Adars
    }

    return (d + ' ' + m + ' ' + hy);
}


function Easter(Y) {
    // based on the algorithm of Oudin
    var C = Math.floor(Y / 100), N = Y - 19 * Math.floor(Y / 19), K = Math.floor((C - 17) / 25),
        I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30*Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J, M = 3 + Math.floor((L + 40) / 44), D = L + 28 - 31 * Math.floor(M / 4), ret = new Object();

    ret[1] = M;
    ret[2] = D;

    return ret;
}

function DOW(day,month,year) {
    var a = Math.floor((14 - month)/12),
        y = year - a, m = month + 12*a - 2,
        d = (day + y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + Math.floor((31*m)/12)) % 7;

    return d + 1;
}

function NthDOW(nth,weekday,month,year) {
    if (nth > 0) {
        return (nth - 1) * 7 + 1 + (7 + weekday - DOW((nth - 1) * 7 + 1, month, year)) % 7;
    }
    var days = civMonthLength(month, year);

    return days - (DOW(days, month, year) - weekday + 7) % 7;
}

















export function getHebDate(day, month, year) {
    return civ2heb(day, month, year);
}




























/* KaluachJS - Kaluach Javascript Hebrew/civil calendar
 *   Version 1.00
 * Copyright (C) 5760,5761 (2000 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Requires kdate.js - Kaluach Javascript Hebrew date routines
 * Acknowledgment given to scripts by:
 *	 - Tomer and Yehuda Shiran (docjs.com)
 *   - Gordon McComb
 *   - irt.org
 *   - javascripter.net
 * Terms of use:
 *   - Permission will be granted to use this script on personal
 *     web pages. All that's required is that you please ask.
 *     (Of course if you want to send a few dollars, that's OK too :-)
 *   - Use on commercial web sites requires a $50 payment.
 * website: http://www.kaluach.net
 * email: abumami@kaluach.net
 */

var jewishHolidays = 1;
var civilHolidays = 0;

function doCal(month, year) {
    var ret = calendar(month, year);
    var result = BuildLuachHTML(ret);
    document.getElementById("calBld").innerHTML = result;
}



function calendar(selM, selY) {
    var m = selM + 1;
    var y = selY;
    var d = civMonthLength(m, y);
    var firstOfMonth = new Date (y, selM, 1);
    var startPos = firstOfMonth.getDay() + 1;
    var retVal = new Object();
    retVal[1] = startPos;
    retVal[2] = d;
    retVal[3] = m;
    retVal[4] = y;
    return (retVal);
}

function BuildLuachHTML(parms)  {
    var hebColor = "darkblue";		// color of font representing Heb date
    var civColor = "darkred";		// color of font representing Civ date
    var hebDate;
    var hebDay;
    var now = new Date();
    var tday = now.getDate();
    var tmonth = now.getMonth();
    var tyear = now.getYear();
    if(tyear < 1000)
        tyear += 1900;
    var cMonth = parms[3];
    var cYear = parms[4];
    var monthName = multiLang[currLang].civMonth[cMonth];
    var lastDate = civMonthLength(cMonth, cYear);
    var hm;
    var hMonth;
    var hYear;
    var hmS;
    var hmE;

    // get starting Heb month in civil month
    hebDate = civ2heb(1, cMonth, cYear);
    hmS = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
    hMonth = eval(hmS.substring(0, hmS.indexOf(' ')));
    hYear = hmS.substring(hmS.indexOf(' ')+1, hmS.length);
    var start = multiLang[currLang].hebMonth[hMonth+1] + ' ' + multiLang[currLang].hHebYear(hYear);

    // get ending Heb month in civil month
    hebDate = civ2heb(lastDate, cMonth, cYear);
    hmE = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
    hMonth = eval(hmE.substring(0, hmE.indexOf(' ')));
    hYear = hmE.substring(hmE.indexOf(' ')+1, hmE.length);
    var end = multiLang[currLang].hebMonth[hMonth+1] + ' ' + multiLang[currLang].hHebYear(hYear);

    var hebSpan;
    // check if start and end Heb months are the same
    if(hmS == hmE)
        hebSpan = start;
    else
        hebSpan = start + ' / ' + end

    var result = '<center>';

    var col;

    // set up our table structure
    result += '<table border="0" cellpadding="0" cellspacing="1" style="border-collapse:separate;width:100%;">';		// table settings
    result +=	 '<tr>';		// create table header cell
    result +=	 '<td colspan="7" style="background-color:#edfaff;color:#010101;font-size:18px;height:30px;line-height:28px;text-align:center;">';		// create table header cell
    result +=		'<span class="calGdate">';	// set font for table header
    result +=			monthName + ' ' + cYear;
    result +=		'</span>';		// close table header's font settings
    result +=		'<span class="calJdate">'; // set font for table header
    result +=			'&nbsp&nbsp ' + hebSpan;
    result +=		'</span>'; // close table header's font settings
    result +=	 '</td>'; // close header cell
    result +=	 '</tr>';		// create table header cell

    // variables to hold constant settings
    var openCol = '<td style="height:58px;line-height:54px;text-align:center;"><span style="font-weight:normal;font-size:18px;color:#000000;">';
    var closeCol = '</span></td>';

    // create first row of table to set column width and specify week day
    result += '<tr style="background-color:#ffffff;">';
    for (var dayNum = 1; dayNum < 8; ++dayNum) {
        result += openCol + multiLang[currLang].weekDay[dayNum] + closeCol;
    }
    result += '</tr>';

    var cell = 1
    var cDay = 1
    var row;
    for (row = 1; row <= 6; row++) {
        result+='<tr valign="top">'
        for (col = 1; col <= 7; col++)  {

            // convert civil date to hebrew
            hebDate = civ2heb(cDay, cMonth, cYear);
            hebDay = eval(hebDate.substring(0, hebDate.indexOf(' ')));

            hm = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
            hMonth = eval(hm.substring(0, hm.indexOf(' ')));

            if (cell < parms[1])
                result += '<td bgColor="#ededed"></td>';
            else {

                var moed = "";
                if(jewishHolidays)
                    moed = multiLang[currLang].moadim(cDay, cMonth, cYear, hebDay, hMonth, col);
                var holiday = "";
                if(civilHolidays)
                    holiday = multiLang[currLang].holidays(cDay, cMonth, cYear);

                var bg;
                if((cDay == tday) && (parms[3] == (tmonth+1)) && (parms[4] == tyear))
                // highight the current day
                    bg = 'bgColor=#9DEEAB';
                else if (moed != "")
                // highlight Heb holiday
                    bg = 'bgColor=#5cd3fe';
                else if (holiday != "") {
                    // highlight civil holiday
                    bg = 'bgColor=#F3AEE7';
//					moed = holiday;
                }
                else
                // no highlight
                    bg = 'bgColor=#d9f4fd';

                // assemble the contents of our day cell
                result += '<TD ' + bg + ' style="height:60px;text-align:center;padding:10px 12px;">';
                result +=   '<table BORDER=0 COLS=2 style="height:16px;width:84px;">';
                result +=     '<tr>';
                result +=       '<td>';
                result +=         '<FONT face="Arial" COLOR="' + civColor + '">';
                result +=           cDay;
                result +=         '</font>';
                result +=       '</td>';
                result +=       '<td>';
                result +=         '<FONT face="Arial" COLOR="' + hebColor + '">';
                result +=           '<div align=right>' + multiLang[currLang].hHebDay[hebDay] + '</div>';
                result +=         '</FONT>';
                result +=       '</td>';
                result +=     '</tr>';
                result +=   '</table>';
                result +=   '<FONT face="Arial" size=-2>'
                if (moed != "")
                    result += moed;
                if (moed != "" && holiday != "")
                    result += '<br>';
                if (holiday != "")
                    result += holiday;
                result +=   '</FONT>'
                result += '</TD>';

                cDay++
            }

            if (cDay <= lastDate)
                cell++
            else{
                while((cell%7)!=0){
                    result += '<td bgColor="#ededed"></td>';
                    cell++;
                }
                break;
            }
        }

        result += '</TR>'
        if(cDay > parms[2])
            break;
    }

    result += '</table>'
    result += '<div style="padding:10px 4px;">Copyright &copy; 5760,5761 (2000 CE), Abu Mami and Yisrael Hersch. All rights reserved.<br>'
    result += 'email: <a href="mailto:abumami@kaluach.net"> abumami@kaluach.net</a> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp web site: <a href="http://www.kaluach.net">http://www.kaluach.net</a></div>'
    result += '</center>'
    return result;
}










doCal();









/*



if (Drupal.jsEnabled) {
    $(document).ready(
        function(){
            init_vars();
            $('#zmanim-loc-show').click(function() {
                set_and_show_all_times();
            });
            $('#daily-date-show').click(function() {
                set_and_show_daily_times(false);
            });
            $('#shabbat-date-show').click(function() {
                set_and_show_shabbat_times(false);
            });
        }
    )
}

function get_times(ploc,pdate,s_type) {
    if ((ploc != curr_loc) || (pdate != curr_date) || (s_type != curr_type)) {
        curr_loc = ploc;
        curr_date = pdate;
        curr_type = s_type;
        $.post("/general/ajax/get_times", {loc: ploc, date: pdate},   function(data) {
            if (((s_type == 1) || (s_type == 3)) && (pdate == $('#edit-daily-date-datepicker-popup-0').val())) {
                if (data.dst) {
                    $("#zmanim-daily-dst").removeClass("zmanim-dst-off").addClass("zmanim-dst-on");
                } else {
                    $("#zmanim-daily-dst").removeClass("zmanim-dst-on").addClass("zmanim-dst-off");
                }
                $("#zmanim-daily-alot").html(data.alot);
                $("#zmanim-daily-hanetz").html(data.sunrise);
                $("#zmanim-daily-shema").html(data.shema);
                $("#zmanim-daily-tefilla").html(data.tefillah);
                $("#zmanim-daily-chatzot").html(data.chatzot);
                $("#zmanim-daily-minchag").html(data.minchag);
                $("#zmanim-daily-minchak").html(data.minchak);
                $("#zmanim-daily-plag").html(data.plag);
                $("#zmanim-daily-sunset").html(data.sunset);
                $("#zmanim-daily-tzet").html(data.tzet);
            }
            if (((s_type == 2) || (s_type == 3)) && (pdate == $('#edit-shabbat-date-datepicker-popup-0').val())) {
                if (data.dst) {
                    $("#zmanim-shabbat-dst").removeClass("zmanim-dst-off").addClass("zmanim-dst-on");
                } else {
                    $("#zmanim-shabbat-dst").removeClass("zmanim-dst-on").addClass("zmanim-dst-off");
                }
                if (data.omer) {
                    if (data.chag) {
                        z_omer = ", "+data.omer;
                    } else {
                        z_omer = "<br />"+data.omer;
                    }
                } else {
                    z_omer = "";
                }
                if (data.chag) {
                    z_chag = "<br />"+data.chag;
                } else {
                    z_chag = "";
                }
                $("#zmanim-shabbat-date").html(data.hebrew + ", " + data.formated_gregorian);
                $("#zmanim-shabbat-extra").html(data.parasha + z_chag + z_omer);
                $("#zmanim-shabbat-knissat").html(data.knissat_shabbat);
                $("#zmanim-shabbat-motzei").html(data.motsei_shabbat);
                $("#zmanim-shabbat-rabtam").html(data.motsash_rab_tam);
            }
        }, "json");
    }
}

function init_vars() {
    curr_loc = "";
    curr_date = "";
    curr_type = "";
    set_and_show_all_times();
}

function set_and_show_all_times() {
    set_and_show_daily_times(true);
    set_and_show_shabbat_times(true);
}

function set_and_show_daily_times(s_both) {
    get_times($('#edit-city').val(),$('#edit-daily-date-datepicker-popup-0').val(),s_both?3:1);
}

function set_and_show_shabbat_times(s_both) {
    get_times($('#edit-city').val(),$('#edit-shabbat-date-datepicker-popup-0').val(),s_both?3:2);
}




*/