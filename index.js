const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
// const users = require('./MOCK_DATA.json');
const app = express();
PORT = 8000;

//connecting mongoose 
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => {
        console.log('Mongo DB Connected ')
    }).catch(err => console.log('Mongo Error ', err)
    )

// schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    jobTitle: {
        type: String
    }
}, { timestamps: true })

// model 
const User = mongoose.model('user', userSchema);

//MIDDLEWARE

app.use(express.urlencoded({ extended: false }))
// routes 

// render html only then 
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html)
})

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    // always add X to custom headers (not built-in header)
    // res.setHeader('X-myName' , 'priya choudhary');
    // console.log(req.headers);
    return res.json(allDbUsers)
})

app.route('/api/users/:id').get(async (req, res) => {
    const user = await User.findById(req.params.id);

    // const id = Number(req.params.id);
    // const user = allDbUsers.find(u => u.id == id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
}).patch(async (req, res) => {
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

    //     const id = Number(req.params.id);
    //     const index = users.findIndex(u => u.id === id);
    //     if (index === -1) {
    //     return res.status(404).json({ status: 'fail', message: 'User not found' });
    //   }
    //     // Merge the updates with the existing user
    //     users[index] = { ...users[index], ...body };
    return res.json({
        status: 'success',
        message: 'User updated successfully',
        data: result
    });

}).delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    //     const id = req.params.id;
    //     const userIndex = users.findIndex(obj => obj.id == id)
    //      if (userIndex === -1) {
    //     return res.status(404).json({ status: 'fail', message: 'User not found' });
    //   }
    //     users.splice(userIndex, 1)
    return res.json({ status: 'success', msg: 'deleted successfully' });
})

app.post('/api/users', async (req, res) => {
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

    return res.status(201).json({ msg: 'success' })

    // now we can remove this manuall inserting user in file and can finally use mongo db 
    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: 'success', id: users.length })
    // })
})


app.listen(PORT, () => {
    console.log(`Server Started at port : ${PORT}`);

})
