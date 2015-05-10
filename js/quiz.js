//putter inn spørsmål i en array slik at jeg kan bruke de senere.
var question1 = { spørsmål: "hvor mange innbyggere er det i Lillesand?", alternativer: ["5 000", "10 000", "50 000", "4 000"], riktigAlternativ: 1};
var question2 = { spørsmål: "Er Lillesand en populær sommerby?", alternativer: ["Ja", "Nei"], riktigAlternativ: 0};
var questions = [question1, question2]

function initialiserVariabler(){
	//forskjellige variabler
	currentQuestionIndex = 0;
	//brukes for å vise hvor mange riktige/gale svar du har
	riktigeSvar = 0;
	galeSvar = 0;
	//brukes for å vise hvilke svar du hadde riktig
	dineSvar = [];
	fasit = [];
	containerDiv= '<div id="container"></div>';
	container = $('#container');
	//lag fasit i loop
	for (i= 0; i < questions.length; i++){
		fasit += questions[i]["riktigAlternativ"];
	};
};


$( document ).ready(function() {
	initialiserVariabler();
	$('body').append(containerDiv)
	makeQuestion(questions[currentQuestionIndex]);
});

function makeQuestion(question){
	console.log(question);
	$('#container').prepend('<ol type="a" id="spørsmål"></ol>');
	$('#container').prepend("<h2>" + question["spørsmål"] + "</h2>");
	for(i=0; i < question["alternativer"].length; i++){
		$('#spørsmål').append("<li class='btn'><a onclick='svar(" + i + ", "+ 
							  question['riktigAlternativ']+ ")'href='#' >" + 
							  question["alternativer"][i] + "</a></li>");
	};
};

function svar(valgt, riktigSvar){
	fjernSpørsmål();
	currentQuestionIndex++;
	console.log(currentQuestionIndex, questions.length)


	riktigEllerGalt(valgt,riktigSvar);
	if (currentQuestionIndex < (questions.length)){
		console.log("nesteSpørsmål")
		makeQuestion(questions[currentQuestionIndex]);
	}else{
		console.log("resultater")
		resultater();
	}

};

function riktigEllerGalt(valgt, riktigSvar){
	if (valgt == riktigSvar){
		$('#container').append("<p>Gratulerer, det er riktig svar</p>");
		riktigeSvar++;
		dineSvar += valgt;
	}else{
		$('#container').append("<p>Feil, bedre lykke neste gang</p>");
		galeSvar++;
		dineSvar += valgt;
	};
}

function resultater(){
	$('#container').prepend('<P>Du hadde ' + riktigeSvar + ' riktige av ' + questions.length + ' mulige</p>')
	resultatTabell();
	$('#container').prepend('<h2>Gratulerer, du har fulført quizen.</h2');
	
};

function resultatTabell(){
	$('#container').prepend('<table></table>');
	$('table').append('<tr><td>Spørsmål:<td>Fasit:</td><td>Ditt svar:</td><td>Riktig?</td></tr>');
	for(i = 0; i < fasit.length; i++){
		$('table').append('<tr><td>' + questions[i]['spørsmål'] + '<td>' + 
						  questions[i]['alternativer'][fasit[i]] + '</td><td>' + 
						  questions[i]['alternativer'][dineSvar[i]] + '</td><td>' + 
						  riktigSvar(fasit[i], dineSvar[i]) + '</td></tr>');
	};
	$('#container').append('<a href="#" id="tilbake" class="btn" onclick="startPåNytt()">Prøv på nytt</a>')
};

function riktigSvar(fasit, dittSvar){
	if (fasit == dittSvar){
		return "Riktig!";
	}else{
		return "Feil!"
	}
}
function finnBokstav(index){
	var range = ['a','b','c','d','e','f'];
	return range[index];
}

function fjernSpørsmål(){
	$('#container').empty();
}

function startPåNytt(){
	initialiserVariabler();
	fjernSpørsmål();
	console.log(currentQuestionIndex)
	makeQuestion(questions[currentQuestionIndex]);
}