console.log('my name:', name + ',', 'my email:', email);

var usersAge = window.prompt('How old are you?');

if (window.confirm("Is that really your age?")) {
    console.log(usersAge);
    window.alert(usersAge + " is an awesome age!");
}