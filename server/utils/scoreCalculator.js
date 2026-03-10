export const calculateRoleScore = (roleStats) => {
    let score = 0;
  
    if (!roleStats) {
      return {
        score: 10,
        confidence: "Low"
      };
    }
  
    if (roleStats.totalApplications >= 3) {
      score += 20;
    }
  
    if (roleStats.interviews > 0) {
      score += 30;
    }
  
    if (roleStats.offers > 0) {
      score += 40;
    }
  
    score = Math.min(score, 100);
  
    let confidence = "Low";
  
    if (score >= 60) confidence = "High";
    else if (score >= 30) confidence = "Medium";
  
    return { score, confidence };
  };