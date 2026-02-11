import Job from "../models/jobs.js";

export const getAnalyticsSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobs = await Job.find({ user: userId });

    const totalApplications = jobs.length;

    const interviews = jobs.filter(job => job.status === "interview").length;
    const offers = jobs.filter(job => job.status === "offer").length;
    const rejections = jobs.filter(job => job.status === "rejected").length;

    const interviewRate = totalApplications
      ? ((interviews / totalApplications) * 100).toFixed(1)
      : 0;

    const offerRate = totalApplications
      ? ((offers / totalApplications) * 100).toFixed(1)
      : 0;

    // Most applied role
    const roleCount = {};
    jobs.forEach(job => {
      roleCount[job.role] = (roleCount[job.role] || 0) + 1;
    });

    let topRole = null;
    let maxCount = 0;

    for (let role in roleCount) {
      if (roleCount[role] > maxCount) {
        maxCount = roleCount[role];
        topRole = role;
      }
    }

    res.status(200).json({
      totalApplications,
      interviews,
      offers,
      rejections,
      interviewRate: `${interviewRate}%`,
      offerRate: `${offerRate}%`,
      topRole: topRole || "N/A"
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
