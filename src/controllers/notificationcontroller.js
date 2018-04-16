const request = require('request');

import _ from 'lodash'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Appointment from '../models/appointment'
import Clinic from '../models/clinic'
import DentistTimeslot from '../models/dentist-timeslot'
import Patient from '../models/patient'

export function Sendnoti(data, sendid) {
    console.log(data + " " + sendid);
    var sid = "2217425031604903";
    if (sendid != "") {
        sid = sendid;
    }
    var resjson = {
        text: "test 1",
        id: sid,
    };
    // 'https://radiant-reaches-17313.herokuapp.com/sendmessages'
    request({
        "uri": "https://colossal-penalty.glitch.me/sendmessages",
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

var timestart = false;
var counttime2 = setInterval(function() {
    if (timestart) {
        var d = new Date();
        var minute = d.getMinutes()
        console.log("M " + minute);
        loadlist(d);
        if (minute == 0) {
            console.log("new hour");

        }
    } else {
        // console.log("stop");
    }


}, 60000); //second 1000 milli 100 60000 minute

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
    //return Clinic.find({ deleted: false })
    // Clinic.find({ deleted: false }, function(error, comments) {
    //     if (error) { console.log('error'); } else {
    //         console.log(comments); 
    //     }

    // });

}

function getclinicByid(id) {
    return Clinic.findById(id).deepPopulate('dentists dentists.treatments')

}

function getclinicByname(data) {
    return Clinic.findOne({ name: { '$regex': data, '$options': 'i' } }).deepPopulate('dentists dentists.treatments')
        // new RegExp(data, 'i')
        // Clinic.findOne({ name: { '$regex': data, '$options': 'i' } }, function(error, comments) {
        //     if (error) { console.log('error'); } else {
        //         console.log(comments); 
        //     }
        // });

}

function getclinic(data) {
    return Clinic.findOne(data).deepPopulate('dentists dentists.treatments')

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