function submitfeedback() {
    if (document.getElementById("name").value == "") {
        alert("Please provide your name!");
        document.getElementById("name").focus();
        return false;
    }
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (document.getElementById("email").value == "") {
        alert("Please provide your email!");
        document.getElementById("email").focus();
        return false;
    } else if (!document.getElementById("email").value.match(mailformat)) {
        alert("You have entered an invalid email address!");
        document.getElementById("email").focus();
        return false;
    }

    alert("Thank you for your feedback....");
    let feedback = {};
    feedback.name = document.getElementById("name").value;
    feedback.foodquality = document.getElementById("excellentfood").checked ? "excellent" :
        document.getElementById("goodfood").checked ? "Good" :
        document.getElementById("averagefood").checked ? "Average" : "Dissatisfied";
    feedback.showquality = document.getElementById("excellentshow").checked ? "excellent" :
        document.getElementById("goodshow").checked ? "Good" :
        document.getElementById("averageshow").checked ? "Average" : "Dissatisfied";
    feedback.overall = document.getElementById("Excellent").checked ? "Excellent" :
        document.getElementById("Good").checked ? "Good" :
        document.getElementById("Average").checked ? "Average" : "Dissatisfied";
    feedback.comments = document.getElementById("comments").value;

    localStorage.setItem("feedback", JSON.stringify(feedback));
    document.getElementById("feedback-form").reset();
}