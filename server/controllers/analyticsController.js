import Job from "../models/jobs.js";
import { calculateRoleScore } from "../utils/scoreCalculator.js";

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

export const getApplicationTimeline = async (req, res) => {
  try {
    const userId = req.user._id;

    const timeline = await Job.aggregate([
      {
        $match: {
          user: userId
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const formattedTimeline = timeline.map(item => {
      const { year, month } = item._id;
    
      return {
        label: `${monthNames[month - 1]} ${year}`,
        count: item.count
      };
    });

    res.status(200).json({
      timeline: formattedTimeline
    });

  } catch (error) {
    console.error("Timeline Error:", error);
    res.status(500).json({ message: "Failed to fetch timeline data" });
  }
};

export const getRolePerformance = async (req, res) => {
  try {
    const userId = req.user._id;

    const roles = await Job.aggregate([
      {
        $match: { user: userId }
      },
      {
        $group: {
          _id: "$role",
          total: { $sum: 1 },
          interviews: {
            $sum: {
              $cond: [{ $eq: ["$status", "interview"] }, 1, 0]
            }
          },
          offers: {
            $sum: {
              $cond: [{ $eq: ["$status", "offer"] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    const formatted = roles.map(role => {
      const interviewRate = role.total
        ? ((role.interviews / role.total) * 100).toFixed(1)
        : 0;

      const successRate = role.total
        ? ((role.offers / role.total) * 100).toFixed(1)
        : 0;

      return {
        role: role._id,
        totalApplications: role.total,
        interviews: role.interviews,
        offers: role.offers,
        interviewRate: `${interviewRate}%`,
        successRate: `${successRate}%`
      };
    });

    res.status(200).json({ roles: formatted });

  } catch (error) {
    console.error("Role Performance Error:", error);
    res.status(500).json({ message: "Failed to fetch role performance" });
  }
};

export const getRoleScore = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ message: "Role query required" });
    }

    const stats = await Job.aggregate([
      { $match: { user: userId, role: role } },
      {
        $group: {
          _id: "$role",
          totalApplications: { $sum: 1 },
          interviews: {
            $sum: { $cond: [{ $eq: ["$status", "interview"] }, 1, 0] }
          },
          offers: {
            $sum: { $cond: [{ $eq: ["$status", "offer"] }, 1, 0] }
          }
        }
      }
    ]);

    const roleStats = stats[0];

    const result = calculateRoleScore(roleStats);

    res.status(200).json({
      role,
      score: result.score,
      confidence: result.confidence
    });

  } catch (error) {
    console.error("Score Error:", error);
    res.status(500).json({ message: "Failed to calculate score" });
  }
};