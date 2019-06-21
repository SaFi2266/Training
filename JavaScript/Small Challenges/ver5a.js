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
    };

    Qestions.prototype.pickAnswer = function(answer) {
        if (answer === this.correct) {
            console.log('Correct Answer !!');
        } else {
            console.log('Try again');
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

    var cor = [1, 1, 2, 1, 0];
    var r = Math.floor(Math.random() * qts.length);
    var rq = new Qestions(qts[r], awr[r], cor[r]);

    rq.showQuestion();

    var theAnswer = parseInt(prompt('Please choose your answer '));

    rq.pickAnswer(theAnswer);
})();