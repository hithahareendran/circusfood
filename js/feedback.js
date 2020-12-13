function submitfeedback()
{
    let feedback = {};
    feedback.name = document.getElementById("name").value;
    feedback.quality = document.getElementById("excellent").checked ? "excellent":
    document.getElementById("good").checked ? "good":
    document.getElementById("average").checked ? "average":"poor";
    localStorage.setItem("feedback",JSON.stringify(feedback));   
}
