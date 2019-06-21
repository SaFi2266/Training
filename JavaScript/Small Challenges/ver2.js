// Object.create
var personProto = {
    calAge: function() {
        console.log(2019 - this.yob);
    }
};

var me = Object.create(personProto);