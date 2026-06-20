const Student = require("../models/Student");
const Job = require("../models/Job");

const getRecommendedJobs = async (req, res) => {
try {

    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const studentSkills = student.skills.map(
        skill => skill.toLowerCase().trim()
    );

    const jobs = await Job.find();

    const recommendations = jobs
    .map(job => {

        const requiredSkills = job.skills.map(
            skill => skill.toLowerCase().trim()
        );

        const matchedSkills = requiredSkills.filter(
            skill => studentSkills.includes(skill)
        );

        const score = requiredSkills.length > 0
            ? Math.round(
                (matchedSkills.length / requiredSkills.length) * 100
            )
            : 0;

        return {
            jobId: job._id,
            jobTitle: job.title,
            score,
            matchedSkills
        };
    })

    .filter(job => job.score > 0)

    .sort((a, b) => b.score - a.score);



    res.status(200).json({
        success: true,
        student: student.name,
        recommendations
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });

}

};

module.exports = {
getRecommendedJobs
};
