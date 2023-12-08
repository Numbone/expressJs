import  express from 'express';
const app = express();
const PORT= 8080;
app.use(express.json());
const db = [
    { id: 1, title: 'Course Title' },
    { id: 2, title: 'Course Title2' },
    { id: 3, title: 'Course Title3' },
    { id: 4, title: 'Course Title4' }
];

app.get('/', (req, res) => {
    res.send(JSON.stringify({message:'send message'}));
    res.sendStatus(200);
    res.json({message:'send message'});
    res.send();
})

app.get('/courses', (req, res) => {
   
    res.json(db.filter(c=>c.title.indexOf(req.query?.title as string) > -1));
   
})
app.get('/courses/:id', (req, res) => {
    const findCourses =db.find(item => item.id === +req.params.id);
    if (!findCourses){
        res.send(404);
        return 
    }
    res.json(findCourses);
   
})

app.post('/courses', (req, res) => {
   db.push({
    id:+(new Date()),
    title:req.body.title
   })
   res.json({
    id:+(new Date()),
    title:req.body.title
   })
})



app.listen(PORT, () => {
    console.log('listening on 8080' )
})