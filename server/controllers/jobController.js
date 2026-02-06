import Job from "../models/jobs.js";

// CREATE job
export const createJob = async (req, res) => {
  try {
    const { company, role, status, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const job = await Job.create({
      user: req.user._id,
      company,
      role,
      status,
      notes,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET jobs (filters + search + sorting + pagination)
export const getJobs = async (req, res) => {
  try {
    const {
      status,
      search,
      sort = "createdAt:desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = { user: req.user._id };

    // ✅ STATUS FILTER
    if (status) {
      query.status = status;
    }

    // ✅ SEARCH (company + role)
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    // ✅ SORTING
    const [sortField, sortOrder] = sort.split(":");
    const sortObj = {
      [sortField]: sortOrder === "asc" ? 1 : -1,
    };

    // ✅ PAGINATION
    const skip = (Number(page) - 1) * Number(limit);

    const jobs = await Job.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.json({
      data: jobs,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
// GET single job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.company = req.body.company || job.company;
    job.role = req.body.role || job.role;
    job.status = req.body.status || job.status;
    job.notes = req.body.notes || job.notes;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();
    res.json({ message: "Job removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET dashboard job stats
export const getJobStats = async (req, res) => {
    try {
      const stats = await Job.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);
  
      const formatted = {
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      };
  
      stats.forEach(item => {
        formatted[item._id] = item.count;
      });
  
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
