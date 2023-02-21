let LFSR = 0
let LFSL = 0
function Full_Stop () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(100)
}
function Full_Forwards () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 150)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 150)
    basic.pause(100)
}
function Soft_Left () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
    basic.pause(100)
}
// should be 90 degrees
function Hard_Left () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    basic.pause(100)
}
function Soft_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
    basic.pause(100)
}
// should be 90 degrees
function Hard_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    basic.pause(100)
}
basic.forever(function () {
    LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    if (LFSL == 1 && LFSR == 1) {
        Full_Forwards()
    } else if (LFSL == 1) {
        Soft_Right()
    } else if (LFSR == 1) {
        Soft_Left()
    } else {
        Full_Stop()
    }
})
