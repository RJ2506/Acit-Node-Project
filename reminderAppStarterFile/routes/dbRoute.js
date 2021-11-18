const { PrismaClient } = require('@prisma/client')

app.use(express.json());
app.use(express.urlencoded({}));
const prisma = newPrismaClient();

app.post("/users", async (req, res) => {
    const {email, name} = req.body;
    const existingUser = await prisma.user.findUnique({ where: {email}});
    if (existingUser) {
        res.json({error: "User already exists"});
    } else {
        const createdUser = await prisma.user.create({
            data: {name, email}
        });
        res.json({createdUser});
    }
});

app.get("/users", async(req, res) => {
    const users = await prisma.user.findMany({ include: {reminders} });
    res.json(users)
})

app.put("/users/:id", async(req, res) => {
    const userID = req.params.id;
    const { name } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: {id: userID}})
        if (!user) throw new Error("No user found");
    
        const user = await prisma.user.update({
            where: {id: userID},
            data: {
                name, 
            }
        });
        res.json(user);        
    } catch (error) {
        res.status(404).json(error);
        console.log(error);
    }

    const user = await prisma.user.findUnique({ where: {id: userID}})
    if (!user) throw new Error("No user found");

    const user = await prisma.user.update({
        where: {id: userID},
        data: {
            name, 
        }
    });
    res.json(user);
});