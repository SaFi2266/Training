(function() {
    // Constructor 
    function Qestions(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    // Add Property through prototype
    Qestions.prototype.showQuestion = function() {
        // body...
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
        var d = '';
        for (var sp = 0; sp < this.question.length; sp++) {
            d += '-';
        }
        console.log(d);
    };

    // Add Property through prototype
    Qestions.prototype.pickAnswer = function(answer) {
        if (answer === this.correct) {
            score++;
            console.log('Correct Answer !!\nYour Score is ' + score + '\n\n\n');
        } else {
            console.log('Wrong .. Try again\nYour Score is ' + score + '\n\n\n');
        }
    };

    var qts = ['The Average American does what 22 times a day ?',
        'On Sunday in Florida it is illegal for a single woman to do what ?',
        'What is Johnny Depp afraid of ?',
        'Do goldfish really have a memory of three seconds ?',
        'Where was the fortune cookie actually invented ?'
    ];

    var awr = [
        ['Smoke', 'Open fridge'],
        ['Have sex', 'Sky dive', 'Publicly walk naked'],
        ['Mice', 'Dogs', 'Clowns'],
        ['Yes', 'No'],
        ['America', 'China']
    ];

    var score = 0;
    var cor = [1, 1, 2, 1, 0];

    function nextQ() {
        var r = Math.floor(Math.random() * qts.length);
        var rq = new Qestions(qts[r], awr[r], cor[r]);
        rq.showQuestion();
        var theAnswer = (prompt('Please choose your answer '));
        rq.pickAnswer(parseInt(theAnswer));
        if (theAnswer != 'exit') {
            nextQ();
        }
    }
    // call the function here
    nextQ();
})();