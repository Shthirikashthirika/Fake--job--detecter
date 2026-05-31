function checkJob() {

    let jobText = document.getElementById("jobText").value.toLowerCase();

    let result = document.getElementById("result");
    let loading = document.getElementById("loading");
    let scoreText = document.getElementById("scoreText");
    let scoreBox = document.querySelector(".score-box");

    if(jobText.trim() === ""){
        alert("Please paste a job description!");
        return;
    }

    loading.style.display = "block";
    result.innerHTML = "";

    setTimeout(() => {

        let riskScore = 0;
        let reasons = [];

        const keywords = [
            { word:"no experience", score:20, reason:"No Experience Required" },
            { word:"earn money quickly", score:25, reason:"Unrealistic Earnings" },
            { word:"urgent hiring", score:15, reason:"Urgent Hiring Pressure" },
            { word:"immediate join", score:15, reason:"Immediate Joining Pressure" },
            { word:"work from home", score:10, reason:"Suspicious Work From Home Offer" },
            { word:"registration fee", score:30, reason:"Registration Fee Requested" },
            { word:"limited seats", score:15, reason:"Scarcity Tactic Used" },
            { word:"whatsapp", score:10, reason:"WhatsApp Only Contact" },
            { word:"@gmail.com", score:20, reason:"Personal Email Used" }
        ];

        let detectedCount = 0;

        keywords.forEach(item => {
            if(jobText.includes(item.word)){
                riskScore += item.score;
                reasons.push(item.reason);
                detectedCount++;
            }
        });

        if(riskScore > 100){
            riskScore = 100;
        }

        let trustScore = 100 - riskScore;

        let riskLevel = "";
        let riskClass = "";

        if(riskScore <= 30){
            riskLevel = "LOW RISK";
            riskClass = "low-risk";
        }
        else if(riskScore <= 60){
            riskLevel = "MEDIUM RISK";
            riskClass = "medium-risk";
        }
        else{
            riskLevel = "HIGH RISK";
            riskClass = "high-risk";
        }

        let issuesHtml = "";

        if(reasons.length > 0){
            issuesHtml = "<ul>";

            reasons.forEach(reason => {
                issuesHtml += `<li>${reason}</li>`;
            });

            issuesHtml += "</ul>";
        }
        else{
            issuesHtml = "<p>No suspicious keywords detected.</p>";
        }

        result.innerHTML = `
            <div class="risk-badge ${riskClass}">
                ${riskLevel}
            </div>

            <h3>Risk Score: ${riskScore}%</h3>
            <h3>Trust Score: ${trustScore}%</h3>

            <p><b>Detected Keywords:</b> ${detectedCount}</p>

            <h4>Detected Issues</h4>
            ${issuesHtml}

            <h4>Suggestions</h4>
            <ul>
                <li>Verify company website</li>
                <li>Check LinkedIn company profile</li>
                <li>Never pay registration fees</li>
                <li>Research company reviews online</li>
            </ul>
        `;

        scoreText.innerText = riskScore + "%";

        if(riskScore <= 30){
            scoreBox.style.borderColor = "#22c55e";
            scoreBox.style.color = "#22c55e";
            scoreBox.style.boxShadow = "0 0 20px #22c55e";
        }
        else if(riskScore <= 60){
            scoreBox.style.borderColor = "#f59e0b";
            scoreBox.style.color = "#f59e0b";
            scoreBox.style.boxShadow = "0 0 20px #f59e0b";
        }
        else{
            scoreBox.style.borderColor = "#ef4444";
            scoreBox.style.color = "#ef4444";
            scoreBox.style.boxShadow = "0 0 20px #ef4444";
        }

        loading.style.display = "none";

    }, 1500);
}