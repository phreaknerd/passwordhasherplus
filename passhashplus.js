var urls = {};

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.indexOf(str) == 0;
	};
}

$('#length').val (12);
$('#strength').val (2);

function toggleField () {
	var button = this;
	var field = $(this).prev ("input").get (0);
	if ("text" == field.type) {
		field.type = "password";
		button.value = "a";
		button.title = "Show contents (Ctrl + *)";
	} else {
		field.type = "text";
		button.value = "*";
		button.title = "Mask contents (Ctrl + *)";
	}
}

$('#unmaskseed').click (toggleField);
$('#unmasktag').click (toggleField);
$('#unmaskpassword').click (toggleField);

$('#bump').click (function () {
	$("#tag").val (bump ($("#tag").val ()));
	update ();
});


var selectfield = $('#urls').get (0);
var tagfield = $('#tag').get (0);
var seedfield = $('#seed').get (0);
var lengthfield = $('#length').get (0);
var strengthfield = $('#strength').get (0);
var inputfield = $('#input').get (0);
var hashfield = $('#hash').get (0);
var widenbutton = $('#widenhash');

widenbutton.click (function() {
  if ("<->" == widenbutton.get(0).value) {
    hashfield.style["width"] = "26em";
    widenbutton.get(0).value= ">.<";
    widenbutton.get(0).title= "Narrow hash field"
  } else {
    hashfield.style["width"] = "1em";
    widenbutton.get(0).value= "<->";
    widenbutton.get(0).title = "Widen hash field"
  }
});

hashfield.readOnly = true;

function update () {
	var config = new Object ();
	config.tag = tagfield.value;
	config.policy = new Object ();
	config.policy.seed = seedfield.value;
	config.policy.length = lengthfield.value;
	config.policy.strength = strengthfield.value;
	config.options = options;
	var input = inputfield.value;
	var hash = generateHash (config, input);
	hashfield.value = hash;
}

tagfield.addEventListener ("keydown", update);
seedfield.addEventListener ("keydown", update);
inputfield.addEventListener ("keydown", update);
tagfield.addEventListener ("keyup", update);
seedfield.addEventListener ("keyup", update);
inputfield.addEventListener ("keyup", update);
tagfield.addEventListener ("change", update);
seedfield.addEventListener ("change", update);
inputfield.addEventListener ("change", update);
lengthfield.addEventListener ("change", update);
strengthfield.addEventListener ("change", update);

hashfield.addEventListener ("click", function () {
	hashfield.select ();
});

function selectionChanged () {
	var url = $("#urls option:selected").val ();
	var config = urls[url];
	tagfield.value = config.tag;
	seedfield.value = config.policy.seed;
	lengthfield.value = config.policy.length;
	strengthfield.value = config.policy.strength;
	update ();
}

selectfield.addEventListener ("change", selectionChanged);

function loadJsonData () {
	options=JSON.parse($('#json-internal-options').text ());
	$("script[id^=json-config]").each (function () {
		var url = $(this).attr("id").replace (/json-config-/, "");
		urls[url] = JSON.parse($(this).text ());
	});
}

var revealdatabase = $('#revealdatabase').get(0);
var database = $('#database').get(0);
$('#revealdatabase').click(function () {
  if (revealdatabase.value=="Reveal") {
    revealdatabase.value="Hide";
    revealdatabase.title="Hide Database";
    database.style['display'] = 'block';
  } else {
    revealdatabase.value="Reveal";
    revealdatabase.title="Reveal Database";
    database.style['display'] = 'none';
  }
});