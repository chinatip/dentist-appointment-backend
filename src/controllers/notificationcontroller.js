const request = require('request');

import _ from 'lodash'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Appointment from '../models/appointment'
import Clinic from '../models/clinic'
import DentistTimeslot from '../models/dentist-timeslot'
import Patient from '../models/patient'

function Sendnoti(data, sendid) {
    console.log(data + "_" + sendid);
    var message = "test 1"
    var sid = "100001859704611"
        //"2217425031604903";
    if (data) {
        message = data;
    }
    if (sendid != "") {
        sid = sendid;
    }
    var resjson = {
        text: message,
        id: sid,
    };
    // 'https://radiant-reaches-17313.herokuapp.com/sendmessages'
    // "https://colossal-penalty.glitch.me/sendmessages"
    request({
        "uri": "https://radiant-reaches-17313.herokuapp.com/sendmessages",
        "method": "POST",
        "json": resjson
    }, (err, res, body) => {
        if (!err) {
            console.log('Sended!');
        } else {
            console.error(err);
        }
    });
}

function updateStatus(appoint) {
    var appointslot = appoint.slot;
    var appointdate = new Date(appointslot.startTime);
    var apphour = appointdate.getHours();
    var appminute = appointdate.getMinutes();
    var sendtext = "your appointment at " + apphour + "." + appminute;
    var clinic = appointslot.clinic;
    sendtext += " in " + clinic.name + " are approved";
    var apppatient = appoint.patient;

    var sendid = apppatient.facebookId;
    Sendnoti(sendtext, sendid);

}



export const findById = async(req, res) => {
    try {
        const { id } = req.body;
        //let appointment = await Appointment.findById({ _id }).deepPopulate('patient treatment slot slot.dentist slot.clinic')
        console.log(id);

        let result = "your id is " + id + ", right?";
        respondResult(res)(result)
    } catch (err) {
        respondErrors(res)(err)
    }
}

module.exports.Sendnoti = Sendnoti;
module.exports.updateStatus = updateStatus;

var timestart = false;
var counttime2 = setInterval(function() {
    if (timestart) {
        var d = new Date();
        var minute = d.getMinutes()
        var hour = d.getHours()
        console.log("M " + minute);
        //loadlist(d);
        if (minute == 0) {
            console.log("new hour");

        } else {
            console.log("current hour");
            //loadnotilist();
        }
    } else {
        // console.log("stop");
    }


}, 60000); //second 1000 milli 100 60000 minute

async function loadnotilist() {
    var date = new Date();
    var cday = date.getDate();
    var cmonth = date.getMonth();
    var cminute = date.getMinutes();
    var chour = date.getHours();
    try {
        var appointlist = await getappointlist();
        if (appointlist.length == 0) {
            console.log("no appointment");
            // var clname = await getclinicByname("แพท")
            // console.log(clname);
        } else {
            appointlist.forEach(appoint => {
                var appointslot = appoint.slot;
                var appointdate = new Date(appointslot.startTime);
                if (appointdate.getDate() === cday && appointdate.getMonth() === cmonth) {
                    var apphour = appointdate.getHours();
                    var appminute = appointdate.getMinutes();
                    if (apphour - 1 === chour) {
                        var sendtext = "you have appointment at " + apphour + "." + appminute;
                        var clinic = appointslot.clinic;
                        sendtext += " in " + clinic.name;
                        var apppatient = appoint.patient;

                        var sendid = apppatient.facebookId;
                        Sendnoti(sendtext, sendid);
                    }
                }

            });
        }
    } catch (error) {

    }
}

async function loadlist(date) {
    try {
        var cliniclist = await getcliniclist()
            //console.log(cliniclist);
        var clinic1 = await getclinicByid(cliniclist[0]._id)
        console.log(clinic1);
        console.log("---");
        var dd = {
            name: cliniclist[0].name,
            address: cliniclist[0].address,
        }
        var clinic2 = await getclinic(dd)
        console.log(clinic2);
        console.log("---");
        var appointlist = await getappointlist()
        if (appointlist.length == 0) {
            console.log("no appoint");
        } else {
            appointlist.forEach(element => {

            });
        }
        console.log("---2");
        var clname = await getclinicByname("KU")
        console.log(clname);
        console.log("---3");
        var slot = await getslotlist()
        console.log(slot);
        console.log("---4");

    } catch (error) {
        console.log("error");
    }

}



async function getcliniclist() {
    //const clinics = Clinic.find({ deleted: false }).deepPopulate('dentists dentists.treatments')
    try {
        const cl = await Clinic.find({ deleted: false }).deepPopulate('dentists dentists.treatments')
        return cl
    } catch (error) {
        return 'err'
    }

}

function getclinicByid(id) {
    return Clinic.findById(id).deepPopulate('dentists dentists.treatments')

}

function getclinicByname(data) {
    return Clinic.find({ name: { '$regex': data, '$options': 'i' } }).deepPopulate('dentists dentists.treatments')
        // new RegExp(data, 'i')
        // Clinic.findOne({ name: { '$regex': data, '$options': 'i' } }, function(error, comments) {
        //     if (error) { console.log('error'); } else {
        //         console.log(comments); 
        //     }
        // });

}

function getclinic(data) {
    return Clinic.find(data).deepPopulate('dentists dentists.treatments')
        //return Clinic.findOne(data).deepPopulate('dentists dentists.treatments')
}


function getappointlist() {
    return Appointment.find({ deleted: false }).deepPopulate('patient treatment slot slot.dentist slot.clinic')

    // Appointment.find({ deleted: false }, function(error, comments) {
    //     if (error) {
    //         console.log('error');
    //     } else {
    //         console.log(comments); 
    //         return comments;
    //     }
    // });


}

function getappointByid(id) {
    return Appointment.findById(id).deepPopulate('patient treatment slot slot.dentist slot.clinic')

}

function getpatientlist() {
    return Patient.find({ deleted: false })
        // Patient.find({ deleted: false }, function(error, comments) {
        //     if (error) {
        //         console.log('error');
        //     } else {
        //         console.log(comments);
        //     }
        // });

}

function getpatientByid(id) {
    return Patient.findById(id)

}

async function getslotlist() {
    try {
        const sl = await DentistTimeslot.find({ deleted: false }).populate('dentist').populate('clinic')
        return sl
    } catch (error) {
        return 'err'
    }
}

function getslotByid(id) {
    return DentistTimeslot.findById(id).populate('dentist').populate('clinic')

}