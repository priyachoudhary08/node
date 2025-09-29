const User= require('../models/user')

async function handleGetAllUser(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

async function handlGetUserById(req, res){
  const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
}

async function handleUpdateUserById(req, res){
 const {
        first_name,
        last_name,
        email,
        gender,
        job_title
    } = req.body;

    const updateData = {
        firstName: first_name,
        lastName: last_name,
        email,
        gender,
        jobTitle: job_title
    };

    const result = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }  // new:true -> return updated doc
    );

    if (!result) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    return res.json({
        status: 'success',
        message: 'User updated successfully',
        data: result
    });
}

async function handledeleteUserById(req, res){
await User.findByIdAndDelete(req.params.id)
    return res.json({ status: 'success', msg: 'deleted successfully' });
}

async function handleCreateUser(req, res){
      const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
        return res.status(400).json({ msg: 'All field are required ' })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    return res.status(201).json({ msg: 'success' , id: result._id })
}


// render html only then 
// router.get('/users', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html)
// })


module.exports ={
  handleGetAllUser ,
  handlGetUserById  ,
  handleUpdateUserById  ,
  handledeleteUserById,
  handleCreateUser

}