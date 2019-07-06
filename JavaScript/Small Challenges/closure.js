function interviewQuestion(job) {
    return function jobQuestion(name) {
        if (job == 'teacher') {
            console.log('Hello, ' + name + ', ' + ' What\'s subject you teach?');
        } else if (job == 'designer') {
            console.log('Hello, ' + name + ', ' + ' What\'s design type you special with?');
        } else {
            console.log('Hello, ' + name + ', ' + ' What\'s do you do?');
        }
    };
}

var one = interviewQuestion('teacher')('Mike');