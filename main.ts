let Avoiding = 0
let LFSR = 0
let LFSL = 0
function Full_Stop () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(100)
}
function Full_Forwards () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
    basic.pause(100)
}
function Soft_Left () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
}
function Distance_Stop () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
    basic.pause(200)
    while (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        Full_Stop()
    }
}
// should be 90 degrees
function Hard_Left () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
    basic.pause(100)
}
function Soft_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
}
// should be 90 degrees
function Hard_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
    basic.pause(200)
}
function Avoid () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
    basic.pause(200)
    Hard_Right()
    Full_Forwards()
    while (Avoiding == 1) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
            Soft_Right()
        } else {
            Soft_Left()
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            Hard_Right()
            Avoiding = 0
        }
    }
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        Avoiding = 1
        Avoid()
    }
    LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    if (LFSL == 1 && LFSR == 1) {
        Full_Forwards()
    } else if (LFSL == 1) {
        Soft_Left()
    } else if (LFSR == 1) {
        Soft_Right()
    } else {
        Full_Stop()
    }
})
